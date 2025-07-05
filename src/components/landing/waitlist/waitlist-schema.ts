
import { z } from 'zod';

// Form validation schema
export const waitlistFormSchema = z.object({
  first_name: z.string().min(2, { message: 'First name is required' }).optional(),
  last_name: z.string().min(2, { message: 'Last name is required' }).optional(),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().optional(), // Will be stored in the phone_number column in Supabase
  job_title: z.string().optional(),
  company: z.string().optional()
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
