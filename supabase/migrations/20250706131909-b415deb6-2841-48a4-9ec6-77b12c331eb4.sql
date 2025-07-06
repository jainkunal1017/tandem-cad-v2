
-- Add missing columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN preferred_cad TEXT,
ADD COLUMN username TEXT;

-- Create a unique constraint on username to prevent duplicates
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_username_unique UNIQUE (username);
