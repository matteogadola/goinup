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

import { useFormState, useFormStatus } from 'react-dom'

export default function StravaButton({
  formAction,
  className,
}: {
  formAction?: (formData: FormData) => void,
  className?: string,
}) {
  const { pending } = useFormStatus()
  //const [state, formAction] = useFormState(signUp, { error: '' })

  return (
    <button formAction={formAction} className={`flex items-center h-12 bg-white shadow-sm hover:shadow text-black px-4 rounded ${className}`} disabled={pending}>
    {/*<button formAction={formAction} className="flex items-center h-12 bg-gray-50 shadow-sm hover:bg-gray-100 text-black px-4 rounded" disabled={pending}>*/}
      <img src={pending ? "images/logo/strava-loading.webp" : "images/logo/strava.png"} alt="Strava login" width="30" height="30" />
      <span className={`ml-4 ${pending ? 'opacity-40' : ''}`}>Accedi con Strava</span>
    </button>
  )
}