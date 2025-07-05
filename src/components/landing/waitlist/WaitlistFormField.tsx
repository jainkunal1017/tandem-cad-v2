
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';

interface WaitlistFormFieldProps {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
  required?: boolean;
}

export const WaitlistFormField = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  required = false
}: WaitlistFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}{required ? '*' : ''}</FormLabel>}
          <FormControl>
            <div className={`relative ${Icon ? 'has-icon' : ''}`}>
              {Icon && <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />}
              <Input 
                type={type}
                placeholder={placeholder}
                className={Icon ? 'pl-10' : ''}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
