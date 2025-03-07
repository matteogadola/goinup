import { Event } from '@/types/events'
import { dt } from '@/lib/date';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import AdminConsole from './admin-console';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Console di amministrazione',
}

// rinomina in manage ???

export default async function Admin() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  if (!session) {
    redirect('/auth/login');
  }

  const { data: events } = await supabase
    .from('events')
    .select(`*, attachments(*)`)
    .eq('promoter_id', 'goinup')
    .gte('date', dt().startOf('year').format())
    .order('date', { ascending: true })
    .returns<Event[]>();

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
      <AdminConsole events={events} />
    </>
  )
}
