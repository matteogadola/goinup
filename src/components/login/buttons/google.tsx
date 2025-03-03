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

import { useMemo } from 'react'
import { useFormStatus } from 'react-dom'
import { loginWithGoogle } from '../actions'

export default function GoogleButton() {
  const { pending, action } = useFormStatus()
  //const [state, formAction] = useFormState(signUp, { error: '' })

  const isLoading = useMemo(() => pending && (action as any)?.name === 'loginWithGoogle', [pending, action])

  return (
    <button formAction={loginWithGoogle} className="flex items-center h-12 bg-white hover:bg-slate-100 hover:cursor-pointer shadow-xs hover:shadow-sm text-black px-3 rounded" disabled={pending}>
      <img src={isLoading ? "images/logo/google-loading.webp" : "images/logo/google.png"} alt="Google login" width="36" height="36" />
      <span className={`ml-4 ${isLoading ? 'opacity-40' : ''}`}>Accedi con Google</span>
    </button>
  )
}
