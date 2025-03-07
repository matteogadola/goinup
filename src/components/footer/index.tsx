import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/images/credits/goinup.png'
import FooterLogo from './footer-logo';
import FooterLinks from './footer-links';

interface Props {
  promoter?: string;
}

export default function Footer({ promoter }: Props) {
  return (
    <footer className="mt-auto">
      <div className="mt-8 py-4 flex items-center justify-center gap-y-2 md:space-x-12 flex-col md:flex-row">
        <FooterLogo promoter={promoter} />

        <div className="order-last md:order-none text-center">
          <p className="text-sm"><Link href="/contact" className="hover:opacity-60">Contatti</Link> | <Link href="/legal/terms" className="hover:opacity-60">Termini e Condizioni</Link> | <Link href="/legal/privacy-policy" className="hover:opacity-60">Informativa sulla Privacy</Link></p>
          {promoter === 'goinup' && <p className="block text-xs text-slate-400">© 2023 GOinUP{/* | via Don Guanella 24, Morbegno P.IVA 00891820144*/}</p>}
          {/*<p className="hidden text-xs text-slate-400">Realizzato da <a href="https://www.teeva.it" target="_blank" rel="noreferrer">Teeva</a></p>*/}
        </div>

        <FooterLinks promoter={promoter} />
      </div>
    </footer>
  )
}
