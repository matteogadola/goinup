//import { usePathname } from 'next/navigation';
//import NavbarBrand from './navbar-brand'
//import NavbarLinks from './navbar-links'
//import NavbarUser from './navbar-user'
import Link from 'next/link';
import NavbarBurger from './navbar-burger';
import NavbarUserButton from './navbar-user';
import NavbarCartButton from './navbar-cart';
import { createClient } from '@/utils/supabase/server';

//import { createClient } from '@/utils/supabase/server';
//import NavbarLinks from './navbar-links';
//import NavbarMobile from './navbar-mobile';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';

// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main
export default async function Navbar({
  links,
}: {
  links: any[]
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className="page grid grid-cols-3 items-center h-full">
      <NavbarBurger />

      <div className="flex items-center justify-center w-40">
        <Link href="/" className="hover:scale-105">
          <img src="/images/logo/goinup-header.webp" className="h-11 object-contain" alt="Logo" />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center">
        <ul className="space-x-8">
          {
            links.filter(item => item?.visible !== false).map((link, index) => (
              <li key={index} className="inline-block">
                <Link href={link.path}>
                  <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="flex items-center justify-end ">
        <NavbarCartButton />
        <NavbarUserButton user={user} />
      </div>
    </div>
  )
}
