//import { usePathname } from 'next/navigation';
//import Link from 'next/link';

//import Image from 'next/image'
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';
//import googleLogo from '/public/images/logo/google.png'
// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main

'use client'

import { useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button, MantineProvider, PasswordInput, TextInput } from '@mantine/core'
import { useAuthStore } from '@store/auth'
//import { loginWithGoogle, signIn } from '../login-actions'
import ErrorText from '@components/ui/error-text'

interface Credentials {
  email: string
  password: string
}

interface Props {
  formAction: any;
  isLoading: boolean,
  loadingProvider: string | null,
  error: string | null,
  onClick: () => Credentials
}

export default function EmailLoginForm({ formAction }: Partial<Props>) {
  //const { isLoading, loadingProvider, error, setLoading, setError } = useAuthStore()
  const { pending, action } = useFormStatus()
  const isLoading = useMemo(() => pending && (action as any)?.name === 'loginWithPassword', [pending, action])
  /*const handleSubmit = async (event: any) => {
    setLoading('email')

    event.preventDefault();
    const data = new FormData(event.target);

    try {
      await signIn({
        email: data.get('email') as string,
        password: data.get('password') as string
      })
    } catch(e: any) {
      setError(e)
    } finally {
      setLoading()
    }
  }*/

  return (
    <div className="flex flex-col space-y-2" id="email-login">
      <MantineProvider>
        <TextInput
          withAsterisk={false}
          label="Email"
          id="email"
          name="email"
          type="email"
          required
        />
        <PasswordInput
          withAsterisk={false}
          label="Password"
          id="password"
          name="password"
          type="password"
          required
        />
        {/*!!error && <ErrorText>{error.message}</ErrorText>*/}
        <Button type="submit" formAction={formAction} loading={isLoading} disabled={pending}>Accedi</Button>
      </MantineProvider>
    </div>
  )
/*
  return (
    <div className="flex flex-col space-y-2" id="email-login">
      <form onSubmit={handleSubmit}>
        <MantineProvider>
          <TextInput
            withAsterisk={false}
            label="Email"
            id="email"
            name="email"
            type="email"
            required
          />
          <PasswordInput
            withAsterisk={false}
            label="Password"
            id="password"
            name="password"
            type="password"
            required
          />
          <Button type="submit" loading={loadingProvider === 'email'} disabled={isLoading}>Accedi</Button>
        </MantineProvider>
      </form>
    </div>
  )*/
}
