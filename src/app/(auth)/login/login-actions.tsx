'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@utils/supabase/server'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'

export const handleSubmit = async (event: any) => {
  event.preventDefault();
  console.log(event.target)
}

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
export async function loginWithPassword(formData: FormData): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    switch (error.code) {
      case 'invalid_credentials':
        throw new Error('Indirizzo email o password non corretti.')
      case 'signup_disabled':
        throw new Error('Le registrazioni sono attualmente disabilitate.')
      default:
        throw new Error(error.message)
    }
  }

  revalidatePath('/console', 'layout')
  redirect('/console')
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://goinupvertical.it/auth/callback',
    },
  })

  if (error) {
    throw new Error(error.message)
  }
  
  if (data.url) {
    redirect(data.url)
  }
}

export async function loginWithFacebook() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: 'https://goinupvertical.it/auth/callback',
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
  
}

export async function loginWithStrava() {
}
