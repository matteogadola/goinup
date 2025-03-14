//import { Event } from '@/types/events'
import { dt } from '@/utils/date';
//import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
//import { Database } from '@/types/supabase';
//import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Console from './console';
//import { Metadata } from 'next';
import { createClient } from '@utils/supabase/server';
import Link from 'next/link';

//export const metadata: Metadata = {
//  title: 'Console di amministrazione',
//}

export default async function ConsolePage() {
  const user = await getUser()
  if (!user) redirect('/login')

  const events = await getEvents()

  if (!user?.app_metadata?.role) {
    return (
      <>
        <div className="page">
          <div className="flex flex-col bg-red-100 bg-opacity-80 max-w-lg p-4">
            <span className="font-semibold">Utente non abilitato</span>
            <span>Contattare l&apos;amministratore per richiedere le abilitazioni necessarie</span>
          </div>
        </div>
      </>
    )
  }

  if (!events?.length) {
    return (
      <>
        <div className="page">
          <div className="flex flex-col bg-yellow-100 bg-opacity-80 max-w-lg p-4">
            <span className="font-semibold">Nessun risultato</span>
            <span>Contattare l&apos;amministratore nel caso si creda manchino le abilitazioni necessarie</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
    <div className="flex">
    </div>
    </>
  )
}

const getUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    return null;
  }
  return user;
}

const getEvents = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .from('events')
    .select()
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<Event[]>();
  
  return data
}
