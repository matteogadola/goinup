//import { usePathname } from 'next/navigation';
//import NavbarBrand from './navbar-brand'
//import NavbarLinks from './navbar-links'
//import NavbarUser from './navbar-user'
import Link from 'next/link';
import AuthButton from './navbar-auth';
import MobileButton from './navbar-mobile';

//import { createClient } from '@/utils/supabase/server';
//import NavbarLinks from './navbar-links';
//import NavbarMobile from './navbar-mobile';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';

// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main
export default async function Navbar() {
  const navLinks = [
    { name: "Home", path: "/", visible: false },
    { name: "Classifiche", path: "/results" },
    { name: "Foto e Video", path: "/media" },
    { name: "Regolamento", path: "/regulation" },
  ]

  return (
    <header className="grid grid-cols-2 md:grid-cols-[200px_1fr_200px] px-4 h-16">
      <div className="flex items-center justify-start">
        <Link href="/" className="hover:opacity-70">
          <img src="/images/logo/goinup-header.webp" className="h-12 object-contain" alt="Logo" />
        </Link>
      </div>
      <nav className="hidden md:flex items-center justify-center">
        <ul className="space-x-8">
          {
            navLinks.filter(item => item?.visible !== false).map((link, index) => (
              <li key={index} className="inline-block">
                <Link href={link.path}>
                  <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <div className="flex items-center justify-end">
        <div className="hidden md:flex">
          <AuthButton />
        </div>
        <div className="flex md:hidden">
          <MobileButton links={navLinks} />
        </div>
      </div>
    </header>
  )
}
