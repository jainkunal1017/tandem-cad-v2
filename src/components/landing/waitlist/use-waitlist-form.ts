
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { waitlistFormSchema, type WaitlistFormValues } from './waitlist-schema';

interface UseWaitlistFormProps {
  onSuccess?: (userData?: WaitlistFormValues) => void;
}

export function useWaitlistForm({ onSuccess }: UseWaitlistFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      job_title: '',
      company: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values: WaitlistFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Insert into profiles table instead of waitlist
      const { error } = await supabase
        .from('profiles')
        .upsert([
          {
            id: crypto.randomUUID(),
            email: values.email,
            first_name: values.first_name || '',
            last_name: values.last_name || '',
            phone_number: values.phone || '',
            job_title: values.job_title || '',
            company: values.company || '',
            full_name: `${values.first_name || ''} ${values.last_name || ''}`.trim() || undefined,
          }
        ], { 
          onConflict: 'email'
        });

      if (error) {
        console.error('Waitlist submission error:', error);
        toast({
          title: "Error",
          description: "Failed to join waitlist. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });

      form.reset();
      
      if (onSuccess) {
        onSuccess(values);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting,
  };
}
