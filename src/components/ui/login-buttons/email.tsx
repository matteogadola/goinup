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
import { useForm } from '@mantine/form'
import { useUiStore } from '@/store/ui'

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
  const { loginLoading, loginProvider, setLoginProvider } = useUiStore()
  const [ error, setError ] = useState<string | null>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const onSubmit = async (data: any) => {
    setError(null)
    setLoginProvider('email')

    try {
      await formAction(data)
    } catch(e: any) {
      setError(e.message)
      return
    } finally {
      setLoginProvider(null)
    }
  }

  return (
    <div className="flex flex-col space-y-2" id="email-login">

      <form onSubmit={form.onSubmit(onSubmit)}>

        <TextInput
          withAsterisk={false}
          label="Email"
          key={form.key('email')}
          {...form.getInputProps('email')}
          required
        />
        <PasswordInput
          withAsterisk={false}
          label="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
          required
        />

        {!!error &&
          <ErrorText className="mt-4">{error}</ErrorText>
        }

        <Button type="submit" className="mt-4" loading={loginProvider === 'email'} disabled={loginLoading} fullWidth>Accedi</Button>
      </form>
    </div>
  )
}
