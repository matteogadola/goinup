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

import { useUiStore } from '@/store/ui'

export default function FacebookLoginButton({ formAction }: { formAction: any }) {
  const { loginLoading, loginProvider, setLoginProvider } = useUiStore()

  const handleClick = () => {
    setLoginProvider('facebook')
    formAction()
  }

  return (
    <button onClick={handleClick} className="flex items-center h-12 bg-white hover:cursor-pointer shadow-xs hover:shadow-lg hover:scale-105 text-black px-3 rounded w-62 m-auto disabled:opacity-80" disabled={loginLoading}>
      <img src={loginProvider === 'facebook' ? "/images/logo/facebook-loading.webp" : "/images/logo/facebook.png"} alt="Facebook login" width="30" height="30" />
      <span className="ml-4">Accedi con Facebook</span>
    </button>
  )
}

/*export default function FacebookLoginButton() {
  const { isLoading, loadingProvider, setLoading } = useAuthStore()

  const handleClick = async () => {
    setLoading('facebook')

    try {
      await loginWithFacebook()
    } finally {
      setLoading()
    }
  }

  return (
    <button formAction={handleClick} className="flex items-center h-12 bg-white shadow-xs hover:shadow-sm hover:bg-slate-100 hover:cursor-pointer text-black px-4 rounded" disabled={isLoading}>
    <button formAction={formAction} className="flex items-center h-12 bg-gray-50 shadow-sm hover:bg-gray-100 text-black px-4 rounded" disabled={pending}>
      <img src={loadingProvider === 'facebook' ? "images/logo/facebook-loading.webp" : "images/logo/facebook.png"} alt="Facebook login" width="30" height="30" />
      <span className={`ml-4 ${isLoading ? 'opacity-40' : ''}`}>Accedi con Facebook</span>
    </button>
  )
}*/