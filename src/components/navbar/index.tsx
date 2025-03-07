import { usePathname } from 'next/navigation';
import NavbarBrand from './navbar-brand'
import NavbarLinks from './navbar-links'
import NavbarUser from './navbar-user'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface Props {
  promoter?: string;
}

export default async function Navbar({ promoter }: Props) {
  //const supabase = createServerComponentClient({ cookies });
  //const session = await supabase.auth.getSession();
  const navLinks = [
    { name: "Home", path: "/", visible: false },
    { name: "Classifiche", path: "/results" },
    { name: "Media", path: "/media" },
    { name: "Regolamento", path: "/regulation" },
  ]

  return (
    <header className="z-10 w-full">
      <div className="flex h-12 px-8 items-center justify-between">
        <NavbarBrand promoter={promoter} />

        <div className="flex space-x-6 items-center">
          <NavbarLinks links={navLinks} promoter={promoter} />
          <NavbarUser />
        </div>
      </div>
    </header>
  )
}