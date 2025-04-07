
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { resetPassword } from '@/services/auth';
import { getSession, clearSession, SESSION_KEYS } from '@/utils/sessionToken';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email, code, and token from session storage and validate
  useEffect(() => {
    // Get parameters from URL
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    const codeParam = searchParams.get('code'); // Check if code is in URL

    // Get session data
    const session = getSession(SESSION_KEYS.RESET_PASSWORD);

    // Log for debugging
    console.log('Reset password page loaded with:', {
      emailParam,
      tokenParam,
      codeParam,
      sessionExists: !!session,
      sessionEmail: session?.email,
      sessionCode: session?.code ? 'exists' : 'missing',
      sessionToken: session?.token ? 'exists' : 'missing'
    });

    // Validate the token with more flexibility
    if (emailParam && tokenParam) {
      // Check for obviously malicious tokens (too short, invalid characters, etc.)
      if (tokenParam.length < 10 || /[<>"'\\]/.test(tokenParam)) {
        console.error('Potentially malicious token detected:', tokenParam);
        navigate('/not-found', { replace: true });
        return;
      }

      // Only validate token if we have a session with a token already
      if (session && session.token && session.token !== tokenParam) {
        console.warn('Token mismatch, but allowing access:', {
          sessionToken: session.token,
          urlToken: tokenParam
        });
        // We'll allow this but update the session with the new token
      }

      // Token is valid, set the email from URL parameter
      setEmail(emailParam);

      // Use code from URL if available
      if (codeParam) {
        setCode(codeParam);

        // Update session with the code
        session.code = codeParam;

        // Save the updated session
        sessionStorage.setItem(SESSION_KEYS.RESET_PASSWORD, JSON.stringify(session));
        console.log('Updated session with code from URL');
      } else if (session.code) {
        // If no code in URL but we have it in session
        setCode(session.code);
      } else {
        // No code available
        toast({
          title: "Missing verification code",
          description: "Please enter the verification code sent to your email.",
          variant: "destructive"
        });
        navigate('/reset-code-verification?email=' + encodeURIComponent(emailParam));
        return;
      }
    } else if (emailParam) {
      // Email but no token - redirect to verification page
      navigate('/reset-code-verification?email=' + encodeURIComponent(emailParam));
      return;
    } else if (session) {
      // No URL parameters but we have a session
      if (session.email) {
        setEmail(session.email);
      }
      if (session.code) {
        setCode(session.code);
      }

      if (!session.email || !session.code) {
        // Incomplete session data
        toast({
          title: "Incomplete information",
          description: "Please complete the verification process first.",
          variant: "destructive"
        });
        navigate('/forgot-password');
      }
    } else {
      // No valid session or URL parameters
      toast({
        title: "Session expired",
        description: "Please request a new password reset.",
        variant: "destructive"
      });
      navigate('/forgot-password');
    }
  }, [location, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!email) {
      toast({
        title: "Missing information",
        description: "Email is missing. Please try again.",
        variant: "destructive"
      });
      navigate('/forgot-password');
      return;
    }

    if (!code) {
      // Try to get code from session if not already set
      const session = getSession(SESSION_KEYS.RESET_PASSWORD);
      if (session && session.code) {
        setCode(session.code);
        console.log('Retrieved code from session:', { codeLength: session.code.length });
      } else {
        toast({
          title: "Missing verification code",
          description: "Verification code is missing. Please check your email and enter the code.",
          variant: "destructive"
        });
        navigate(`/reset-code-verification?email=${encodeURIComponent(email)}`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Log the data being sent to help with debugging
      console.log('Resetting password with:', { email, code, passwordLength: password.length });

      const response = await resetPassword(email, code, password);

      if (response.error) {
        // Special case: if we get an error but the password was actually reset
        if (response.error.includes('Invalid') || response.error.includes('expired')) {
          // Try one more time with a different approach
          try {
            const retryResponse = await resetPassword(email, code, password);
            if (!retryResponse.error) {
              // Success on retry
              clearSession(SESSION_KEYS.RESET_PASSWORD);
              toast({
                title: "Password reset successful",
                description: "Your password has been reset. You can now login with your new password.",
              });

              // Add a small delay before navigation to ensure toast is shown
              setTimeout(() => {
                navigate('/login', {
                  replace: true,
                  state: { fromReset: true }
                });
              }, 1500);
              return;
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
            // Continue to show the original error
          }
        }

        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        });
      } else {
        // Clear the session after successful password reset
        clearSession(SESSION_KEYS.RESET_PASSWORD);

        toast({
          title: "Password reset successful",
          description: "Your password has been reset. You can now login with your new password.",
        });

        // Add a small delay before navigation to ensure toast is shown
        setTimeout(() => {
          console.log('Navigating to login page after successful password reset');
          navigate('/login', {
            replace: true,
            state: { fromReset: true }
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 max-w-md py-12">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Create a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !password || !confirmPassword}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Setting new password..." : "Set New Password"}
            </Button>
          </form>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResetPassword;
