'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@utils/supabase/server'

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
export async function signIn(prevState: any, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error?.message }
  }

  revalidatePath('/account', 'layout')
  redirect('/account')
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    throw new Error('mmm')
  }
  
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
  
}

export async function loginWithFacebook() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    throw new Error('mmm')
  }

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
  
}

export async function loginWithStrava() {
}
