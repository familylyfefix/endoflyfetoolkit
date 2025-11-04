import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }).max(255),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface WaitlistFormProps {
  defaultEmail?: string;
}

export const WaitlistForm = ({ defaultEmail = '' }: WaitlistFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: data.email.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') {
          toast.info("You're already on the waitlist! 🎉", {
            description: "We'll notify you as soon as we launch.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast.success("🎉 You're on the list!", {
          description: "We'll notify you when we launch!",
        });
        
        // Send confirmation email (non-blocking)
        supabase.functions.invoke('send-waitlist-confirmation', {
          body: { email: data.email.toLowerCase().trim() }
        }).catch(error => {
          console.error('Failed to send confirmation email:', error);
        });
      }
    } catch (error) {
      console.error('Error signing up for waitlist:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
        <p className="text-lg font-semibold text-primary mb-2">✅ You're All Set!</p>
        <p className="text-muted-foreground">
          We'll send you an email as soon as we launch on November 28th.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register('email')}
            disabled={isSubmitting}
            className="h-12 text-base"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 px-8 whitespace-nowrap"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>🔒 Join the Waitlist</>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
};
