
-- Add waitlist fields to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN phone_number TEXT,
ADD COLUMN job_title TEXT,
ADD COLUMN company TEXT;

-- Update the handle_new_user function to extract more data from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    first_name,
    last_name,
    avatar_url
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Add policy to allow users to insert their own profile (for additional data updates)
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Migrate existing waitlist data to profiles table (if any exists)
-- This will help preserve any existing waitlist signups
INSERT INTO public.profiles (
  id,
  email, 
  first_name, 
  last_name, 
  phone_number, 
  job_title, 
  company,
  created_at
)
SELECT 
  gen_random_uuid(),
  email,
  first_name,
  last_name,
  phone_number,
  job_title,
  company,
  created_at
FROM public.waitlist
WHERE email NOT IN (SELECT email FROM public.profiles WHERE email IS NOT NULL)
ON CONFLICT (id) DO NOTHING;

-- Drop the waitlist table since we're merging it into profiles
DROP TABLE public.waitlist;
