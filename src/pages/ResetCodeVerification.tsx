
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const ResetCodeVerification = () => {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleComplete = (value: string) => {
    console.log('Verification code completed:', value);
    setIsSubmitting(true);
    
    // Simulate verification API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Verification successful",
        description: "You can now reset your password.",
      });
      navigate('/reset-password'); // Navigate to the password reset page
    }, 1500);
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
                Didn't receive a code? <button type="button" className="text-primary hover:underline">Resend</button>
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
                to="/forgot-password"
                className="text-primary hover:underline inline-flex items-center text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to email entry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResetCodeVerification;
