
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  description?: string;
  children: ReactNode;
}

const FormField = ({ id, label, description, children }: FormFieldProps) => {
  return (
    <div className="space-y-2.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

export default FormField;
