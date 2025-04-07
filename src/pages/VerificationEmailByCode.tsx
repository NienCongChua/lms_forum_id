
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifyEmail, resendVerificationCode } from '@/services/auth';
import { getSession, clearSession, SESSION_KEYS, SessionData } from '@/utils/sessionToken';

const VerificationEmailByCode = () => {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize countdown from session storage
  useEffect(() => {
    const session = getSession(SESSION_KEYS.REGISTRATION);
    if (session && session.countdownEnd) {
      const remainingTime = Math.max(0, Math.floor((session.countdownEnd - Date.now()) / 1000));
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      }
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);

        // Update countdown end time in session storage
        const session = getSession(SESSION_KEYS.REGISTRATION);
        if (session) {
          session.countdownEnd = Date.now() + (countdown - 1) * 1000;
          sessionStorage.setItem(SESSION_KEYS.REGISTRATION, JSON.stringify(session));
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Extract email and token from query parameters and validate
  useEffect(() => {
    // Get parameters from URL
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    // Get session data
    const session = getSession(SESSION_KEYS.REGISTRATION);

    console.log('VerificationEmailByCode loaded with:', {
      emailParam,
      tokenParam,
      sessionExists: !!session,
      sessionEmail: session?.email,
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

      // Token is valid or no token in session yet, set the email
      setEmail(emailParam);

      // Update or create session
      if (!session) {
        // Create a new session
        const newSession: SessionData = {
          email: emailParam,
          timestamp: Date.now(),
          token: tokenParam
        };
        sessionStorage.setItem(SESSION_KEYS.REGISTRATION, JSON.stringify(newSession));
        console.log('Created new registration session with token');
      } else {
        // Update existing session
        session.email = emailParam;
        session.token = tokenParam;
        sessionStorage.setItem(SESSION_KEYS.REGISTRATION, JSON.stringify(session));
        console.log('Updated registration session with token');
      }
    } else if (emailParam) {
      // Email without token
      setEmail(emailParam);

      // Create or update session without token validation
      if (!session) {
        const newSession: SessionData = {
          email: emailParam,
          timestamp: Date.now()
        };
        sessionStorage.setItem(SESSION_KEYS.REGISTRATION, JSON.stringify(newSession));
        console.log('Created new registration session without token');
      }
    } else if (session && session.email) {
      // No URL parameters but we have a session
      setEmail(session.email);
      console.log('Using email from existing session:', session.email);
    } else {
      // No valid session or URL parameters
      console.log('No email found in URL or session');
      toast({
        title: "Missing email address",
        description: "Please register again to verify your email.",
        variant: "destructive"
      });
      navigate('/register');
    }
  }, [location, navigate, toast]);

  const handleComplete = async (value: string) => {
    console.log('Verification code completed:', value);
    setIsSubmitting(true);

    if (!email) {
      toast({
        title: "Error",
        description: "Email address is missing. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(`Verifying email ${email} with code ${value}`);
      const response = await verifyEmail(email, value);

      if (response.error) {
        console.error('Verification error:', response.error);

        // Special case: if we get an error but it might be a UI issue
        if (response.error.includes('Invalid') || response.error.includes('expired')) {
          // Try one more time
          try {
            console.log('Retrying verification...');
            const retryResponse = await verifyEmail(email, value);
            if (!retryResponse.error) {
              // Success on retry
              clearSession(SESSION_KEYS.REGISTRATION);
              toast({
                title: "Verification successful",
                description: "Your account has been verified. You can now login.",
              });
              navigate('/login');
              return;
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
            // Continue to show the original error
          }
        }

        toast({
          title: "Verification failed",
          description: response.error,
          variant: "destructive"
        });
      } else {
        // Clear the registration session after successful verification
        clearSession(SESSION_KEYS.REGISTRATION);

        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now login.",
        });
        navigate('/login'); // Navigate to the login page
      }
    } catch (error) {
      console.error('Unexpected verification error:', error);
      toast({
        title: "Verification failed",
        description: "An unexpected error occurred. Please try again.",
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
            <h1 className="text-2xl font-bold mb-2">Verification Code</h1>
            <p className="text-muted-foreground">
              Enter the 8-digit code sent to your email
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <InputOTP
                maxLength={8}
                value={value}
                onChange={setValue}
                onComplete={handleComplete}
                className="justify-center"
                containerClassName="gap-1 md:gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>

              <div className="text-center text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                {countdown > 0 ? (
                  <span className="text-muted-foreground">
                    Resend in <span className="font-medium">{countdown}s</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={async () => {
                      if (email) {
                        try {
                          // Start the countdown timer
                          const countdownDuration = 60; // 60 seconds = 1 minute
                          setCountdown(countdownDuration);

                          // Store countdown end time in session storage
                          const session = getSession(SESSION_KEYS.REGISTRATION);
                          if (session) {
                            session.countdownEnd = Date.now() + countdownDuration * 1000;
                            sessionStorage.setItem(SESSION_KEYS.REGISTRATION, JSON.stringify(session));
                          }

                          const response = await resendVerificationCode(email);
                          if (response.error) {
                            toast({
                              title: "Error",
                              description: response.error,
                              variant: "destructive"
                            });
                            // Reset countdown on error
                            setCountdown(0);
                          } else {
                            toast({
                              title: "Code resent",
                              description: "A new verification code has been sent to your email."
                            });
                          }
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: "Failed to resend verification code. Please try again.",
                            variant: "destructive"
                          });
                          // Reset countdown on error
                          setCountdown(0);
                        }
                      } else {
                        toast({
                          title: "Error",
                          description: "Email address is missing. Please try again.",
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Resend
                  </button>
                )}
              </div>
            </div>

            <Button
              onClick={() => handleComplete(value)}
              disabled={value.length !== 8 || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-primary hover:underline inline-flex items-center text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default VerificationEmailByCode;
