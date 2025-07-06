
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";

interface SignupFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onToggleMode: () => void;
}

export default function SignupForm({ isLoading, setIsLoading, onToggleMode }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    jobTitle: '',
    company: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: formData.phone,
            job_title: formData.jobTitle,
            company: formData.company,
            full_name: `${formData.firstName} ${formData.lastName}`.trim()
          }
        }
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account exists",
            description: "Account exists — try logging in.",
            variant: "destructive",
          });
          onToggleMode();
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link.",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title (Optional)</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="e.g. Mechanical Engineer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter your company name"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        <Mail className="h-4 w-4 mr-2" />
        Create Account
      </Button>
    </form>
  );
}
