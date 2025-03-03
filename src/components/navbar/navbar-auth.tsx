//import { usePathname } from 'next/navigation';
//import NavbarBrand from './navbar-brand'
//import NavbarLinks from './navbar-links'
//import NavbarUser from './navbar-user'
import Link from 'next/link';

import { createClient } from '@utils/supabase/server';
//import NavbarLinks from './navbar-links';
//import NavbarMobile from './navbar-mobile';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
//import { cookies } from 'next/headers';

// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main
export default async function AuthButton() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <>
      {error || !data?.user
        ? <Link href="/login">Accedi</Link>
        : <span>ciao {data?.user.email}</span>}
    </>
  )
}
