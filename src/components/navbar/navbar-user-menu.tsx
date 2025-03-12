'use server'

import Link from 'next/link';
import { createClient } from '@utils/supabase/server';
import NavbarUser from './navbar-user';
import Guard from '@components/guard';

// si risolve ???
// https://stackoverflow.com/questions/78055882/update-parts-of-the-ui-when-authenticated-with-supabase-and-nextjs-14
// https://github.com/giuppidev/giuppi.dev/tree/main

// LEGACY
// <Link href="/login">Accedi</Link>

export default async function UserMenu() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <>
      <Guard hasRole="admin">

      </Guard>
    </>
  )
}
