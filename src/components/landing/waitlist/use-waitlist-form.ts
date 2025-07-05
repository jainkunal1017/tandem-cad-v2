
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { waitlistFormSchema, WaitlistFormValues } from './waitlist-schema';

interface UseWaitlistFormProps {
  onSuccess?: (userData?: WaitlistFormValues) => void;
}

export const useWaitlistForm = ({ onSuccess }: UseWaitlistFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      job_title: '',
      company: ''
    }
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting waitlist form with values:', values);
      
      // Insert the waitlist entry into Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            // Map form fields to database columns
            first_name: values.first_name || null,
            last_name: values.last_name || null,
            email: values.email,
            phone_number: values.phone || null, // Map phone field to phone_number column
            job_title: values.job_title || null,
            company: values.company || null
          }
        ]);
      
      if (error) {
        // Handle duplicate email error specifically
        if (error.code === '23505') {
          throw new Error('This email is already on our waitlist!');
        }
        throw new Error(error.message);
      }
      
      console.log('Successfully added to waitlist table, now sending notification...');
      
      // Send email notification
      try {
        // Use the full URL with the project ID
        const functionUrl = 'https://ihwcnwgxhzpthbisqkap.supabase.co/functions/v1/waitlist-notification';
        
        const notificationResponse = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add CORS headers
            'Origin': window.location.origin
          },
          body: JSON.stringify({
            first_name: values.first_name || null,
            last_name: values.last_name || null,
            email: values.email,
            phone: values.phone || null,
            job_title: values.job_title || null,
            company: values.company || null
          })
        });
        
        if (!notificationResponse.ok) {
          const errorData = await notificationResponse.text();
          console.error('Notification API error:', errorData);
          throw new Error(`Failed to send notification: ${errorData}`);
        }
        
        const notificationResult = await notificationResponse.json().catch(() => null);
        console.log('Notification result:', notificationResult);
        
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue with form success even if email fails
        toast({
          title: "You're on the waitlist! 🎉",
          description: "You were added, but there was an issue sending the notification email.",
        });
      }
      
      toast({
        title: "You're on the list! 🎉",
        description: "We'll notify you when it's your turn.",
      });
      
      // Pass the user data to the onSuccess callback
      if (onSuccess) {
        onSuccess(values);
      }
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    handleSubmit: form.handleSubmit(onSubmit)
  };
};
