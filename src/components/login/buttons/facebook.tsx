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
import { loginWithFacebook } from '../actions'

export default function FacebookButton() {
  const { pending, action } = useFormStatus()
  const isLoading = useMemo(() => pending && (action as any)?.name === 'loginWithFacebook', [pending, action])
  //const [state, formAction] = useFormState(signUp, { error: '' })

  return (
    <button formAction={loginWithFacebook} className="flex items-center h-12 bg-white shadow-xs hover:shadow-sm hover:bg-slate-100 hover:cursor-pointer text-black px-4 rounded" disabled={pending}>
    {/*<button formAction={formAction} className="flex items-center h-12 bg-gray-50 shadow-sm hover:bg-gray-100 text-black px-4 rounded" disabled={pending}>*/}
      <img src={isLoading ? "images/logo/facebook-loading.webp" : "images/logo/facebook.png"} alt="Facebook login" width="30" height="30" />
      <span className={`ml-4 ${isLoading ? 'opacity-40' : ''}`}>Accedi con Facebook</span>
    </button>
  )
}