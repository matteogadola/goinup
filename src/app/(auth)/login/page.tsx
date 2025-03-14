import Link from 'next/link'
import { Divider } from '@mantine/core';
import FacebookLoginButton from '@/components/ui/login-buttons/facebook';
import GoogleLoginButton from '@/components/ui/login-buttons/google';
import EmailLoginForm from '@/components/ui/login-buttons/email';
import { loginWithFacebook, loginWithGoogle, loginWithPassword } from './login-actions';

export default function LoginPage() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL)

  return (
    <div className="flex grow justify-center items-center">
      <div className="max-w-md md:max-w-xl h-fit py-8 px-6 bg-yellow-400/40 rounded">
        <div>
          <h3 className="text-2xl">Unisciti per un&apos;esperienza personalizzata</h3>
          <p>Iscrivendoti risparmierai tempo nelle iscrizioni e potrai godere di funzionalità personalizzate</p>
        </div>
        <div className="flex flex-col mt-6" id="social-login">
          <span className="text-sm m-auto uppercase">Accedi con i tuoi account preferiti</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/*<StravaButton formAction={loginWithStrava} className="lg:col-span-2" />*/}
            <GoogleLoginButton formAction={loginWithGoogle} />
            <FacebookLoginButton formAction={loginWithFacebook} />
          </div>
        </div>
        <Divider label="OPPURE" labelPosition="center" className="mt-8" />
        <div className="mt-4">
          <EmailLoginForm formAction={loginWithPassword} />
        </div>
        <div className="mt-8">
          <p className="text-xs">
            Iscrivendoti accetti i <Link href="/legal/terms" className="link">Termini di servizio</Link> e la nostra <Link href="/legal/privacy-policy" className="link">Informativa sulla privacy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
