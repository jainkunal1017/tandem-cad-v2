
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function PasswordAuth() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'designintandem') {
      // Store in localStorage to remember the user has been authenticated
      localStorage.setItem('tandem-auth', 'true');
      toast({
        title: "Welcome to Tandem",
        description: "Authentication successful",
      });
      navigate('/dashboard');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <Button 
            variant="ghost" 
            className="self-start mb-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <img 
            src="/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png" 
            alt="Tandem Logo" 
            className="h-24 w-auto" 
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password to continue"
              className="text-center"
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          
          <Button type="submit" className="w-full">
            Enter Tandem
          </Button>
        </form>
      </div>
    </div>
  );
}
