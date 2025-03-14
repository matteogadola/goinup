//import { usePathname } from 'next/navigation';
//import NavbarBrand from './navbar-brand'
//import NavbarLinks from './navbar-links'
//import NavbarUser from './navbar-user'
import Link from 'next/link';

//import { createClient } from '@/utils/supabase/server';
//import NavbarLinks from './navbar-links';
//import NavbarMobile from './navbar-mobile';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';

// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main
export default function Sidebar({
  links,
}: {
  links: any[]
}) {

  return (
    <div className="flex-col w-2/3 absolute top-0 right-0 z-10 shadow-md bg-white text-gray-600 h-screen">

            <ul className="w-full">
              {
                links.filter(item => item?.visible !== false).map((link, index) => (
                  <li key={index}>
                    <Link href={link.path}>
                      <span className="block px-2 py-4 hover:opacity-70">{link.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
  )
}
