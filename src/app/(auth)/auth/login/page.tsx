import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import LoginForm from './login-form'
import { Metadata } from 'next'

export interface SignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const metadata: Metadata = {
  title: 'Goinup Login',
}

export default async function SignIn() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect(session.user.app_metadata.role ? '/admin' : '/account')
  }

  return (
    <>
      <LoginForm />
    </>
  )
}