'use client'

import { useMemo } from 'react'
import { useFormStatus } from 'react-dom'

export default function GoogleLoginButton({ formAction }: { formAction: any }) {
  const { pending, action } = useFormStatus()
  const isLoading = useMemo(() => pending && (action as any)?.name === formAction?.name, [pending, action])

  return (
    <button formAction={formAction} className="flex items-center h-12 bg-white hover:cursor-pointer shadow-xs hover:shadow-lg text-black px-3 rounded" disabled={pending}>
      <img src={isLoading ? "images/logo/google-loading.webp" : "images/logo/google.png"} alt="Google login" width="36" height="36" />
      <span className={`ml-4 ${isLoading ? 'opacity-40' : ''}`}>Accedi con Google</span>
    </button>
  )
  /*
  return (
    <button formAction={loginWithGoogle} className="flex items-center h-12 bg-white hover:cursor-pointer shadow-xs hover:shadow-lg text-black px-3 rounded" disabled={pending}>
      <img src={isLoading ? "images/logo/google-loading.webp" : "images/logo/google.png"} alt="Google login" width="36" height="36" />
      <span className={`ml-4 ${isLoading ? 'opacity-40' : ''}`}>Accedi con Google</span>
    </button>
  )
  */
}
