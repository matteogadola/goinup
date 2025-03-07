import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import ResetPasswordForm from './reset-form'
import { Metadata } from 'next'

export interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

export const metadata: Metadata = {
  title: 'Goinup Reset Password',
}

export default async function ResetPassword() {
  //const supabase = createServerComponentClient<Database>({ cookies });
  //const { data: { session } } = await supabase.auth.getSession();

  //if (session) {
  //  redirect(session.user.app_metadata.role ? '/admin' : '/account')
  //}

  return (
    <>
      <ResetPasswordForm />
    </>
  )
}