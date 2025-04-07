
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

const VerificationEmailByCode = () => {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

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
      const response = await verifyEmail(email, value);

      if (response.error) {
        toast({
          title: "Verification failed",
          description: response.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Verification successful",
          description: "Your account has been verified. You can now login.",
        });
        navigate('/login'); // Navigate to the login page
      }
    } catch (error) {
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
                Didn't receive a code? <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={async () => {
                    if (email) {
                      try {
                        const response = await resendVerificationCode(email);
                        if (response.error) {
                          toast({
                            title: "Error",
                            description: response.error,
                            variant: "destructive"
                          });
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
