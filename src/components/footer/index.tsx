import Link from 'next/link'
import FooterSocial from './footer-social'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mt-8 py-4 flex items-center justify-center gap-y-2 md:space-x-12 flex-col md:flex-row">
        <img src="/images/credits/goinup.png" height={60} width={60} alt="Logo" />

        <div className="order-last md:order-none text-center">
          <p className="text-sm">
            <Link href="/about" className="hover:text-blue-600">Contatti</Link> | <Link href="/legal/terms" className="hover:hover:text-blue-600">Termini e Condizioni</Link> | <Link href="/legal/privacy-policy" className="hover:hover:text-blue-600">Informativa sulla Privacy</Link>
          </p>
          <p className="block text-xs text-slate-400">© 2025 GOinUP</p>
        </div>

        <FooterSocial />
      </div>
    </footer>
  )
}
