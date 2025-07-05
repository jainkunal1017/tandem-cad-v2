
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader, Mail, Phone } from 'lucide-react';
import { WaitlistFormField } from './WaitlistFormField';
import { useWaitlistForm } from './use-waitlist-form';
import { WaitlistFormValues } from './waitlist-schema';

interface WaitlistFormProps {
  onSuccess?: (userData?: WaitlistFormValues) => void;
  simplified?: boolean;
}

const WaitlistForm = ({ onSuccess, simplified = false }: WaitlistFormProps) => {
  const { form, isSubmitting, handleSubmit } = useWaitlistForm({ onSuccess });

  return (
    <div className="w-full mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!simplified && (
            <>
              <WaitlistFormField
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="John"
              />
              
              <WaitlistFormField
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Doe"
              />
            </>
          )}
          
          <WaitlistFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            icon={Mail}
            required
          />
          
          <WaitlistFormField
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            type="tel"
            icon={Phone}
          />
          
          {!simplified && (
            <>
              <WaitlistFormField
                control={form.control}
                name="job_title"
                label="Job Title (Optional)"
                placeholder="Product Designer"
              />
              
              <WaitlistFormField
                control={form.control}
                name="company"
                label="Company (Optional)"
                placeholder="Acme Inc."
              />
            </>
          )}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;
