import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCaptureProps {
  score: number;
  tier: number;
  onSuccess: () => void;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({ score, tier, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call edge function to send email and store results
      const { error } = await supabase.functions.invoke('send-quiz-results', {
        body: { 
          email: data.email,
          score,
          tier
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Check your email for your personalized results!', {
        description: 'We\'ve sent your quiz results and FREE guide to your inbox.'
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error submitting quiz results:', error);
      toast.error('Oops! Something went wrong.', {
        description: 'Please try again or contact support if the issue persists.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 animate-fade-in">
        <div className="text-center space-y-6">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <span className="text-5xl">✉️</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            You're Almost Done!
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Enter your email to see your personalized results and receive your{' '}
            <span className="font-semibold text-primary">FREE Conversation Starter Guide</span>.
          </p>

          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg text-left">
            <p className="font-semibold text-foreground mb-2">What happens next:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>📊 See your complete readiness score</li>
              <li>📥 Get your FREE PDF guide instantly</li>
              <li>💡 Receive personalized recommendations</li>
              <li>🎯 Join the waitlist for our full playbook</li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left block text-base">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        disabled={isSubmitting}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Results...
                  </>
                ) : (
                  'Get My Results & FREE Guide →'
                )}
              </Button>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground">
            We respect your privacy. No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </Card>
    </div>
  );
};
