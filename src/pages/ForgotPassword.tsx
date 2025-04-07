import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { forgotPassword } from '@/services/auth';
import { saveSession, SESSION_KEYS, generateToken } from '@/utils/sessionToken';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await forgotPassword(email);

      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive"
        });
      } else {
        // Generate a secure token for this session
        const token = generateToken();

        // Save email and token to session storage for the reset flow
        saveSession(SESSION_KEYS.RESET_PASSWORD, { email, token });

        setIsSubmitted(true);
        toast({
          title: "Verification code sent",
          description: "Please check your email for the verification code.",
        });

        // Navigate to verification page with email and token as query parameters
        navigate(`/reset-code-verification?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset request",
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
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {!isSubmitted
                ? "Enter your email to receive a password reset code"
                : "Check your email for the verification code"
              }
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !email}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Reset Code"}
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
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-primary/10 text-primary p-4 rounded-md text-center">
                If an account exists with <strong>{email}</strong>, you will receive
                a password reset link shortly.
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  Try Again
                </Button>
                <Link
                  to="/login"
                  className="text-primary hover:underline inline-flex items-center text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ForgotPassword;