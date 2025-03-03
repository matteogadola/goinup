import Link from 'next/link'
import LoginForm from '@components/login/form';

export default function LoginPage() {
  return (
    <div className="flex grow justify-center items-center">
      <div className="w-4/5 md:w-3/5 lg:w-2/5 h-fit py-8 px-6 bg-yellow-400/40 rounded">
        <div>
          <h3 className="text-2xl">Unisciti per un&apos;esperienza personalizzata</h3>
          <p>Iscrivendoti risparmierai tempo nelle iscrizioni e potrai godere di funzionalità personalizzate</p>
        </div>
        <LoginForm className="py-6" />
        <div className="">
          <p className="text-xs">
            Iscrivendoti accetti i <Link href="/legal/terms" className="hover:text-blue-800">Termini di servizio</Link> e la nostra <Link href="/legal/privacy-policy" className="hover:text-blue-800">Informativa sulla privacy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
