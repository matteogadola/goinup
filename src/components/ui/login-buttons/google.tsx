'use client'

import { useUiStore } from '@/store/ui'

export default function GoogleLoginButton({ formAction }: { formAction: any }) {
  const { loginLoading, loginProvider, setLoginProvider } = useUiStore()

  const handleClick = () => {
    setLoginProvider('google')
    formAction()
  }

  return (
    <button onClick={handleClick} className="flex items-center h-12 bg-white hover:cursor-pointer shadow-xs hover:shadow-lg hover:scale-105 text-black px-3 rounded w-62 m-auto disabled:opacity-80" disabled={loginLoading}>
      <img src={loginProvider === 'google' ? "images/logo/google-loading.webp" : "images/logo/google.png"} alt="Google login" width="36" height="36" />
      <span className="ml-4">Accedi con Google</span>
    </button>
  )
}
