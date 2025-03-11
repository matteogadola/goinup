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
export async function loginWithPassword(credentials: SignInWithPasswordCredentials): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    switch (error.code) {
      case 'invalid_credentials':
        throw new Error('Indirizzo email o password non corretti.')
      default:
        throw new Error(error.message)
    }
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
      redirectTo: 'http://localhost:3000/auth/callback',
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
