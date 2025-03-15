import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { dt } from '@/utils/date'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Goinup Vertical",
  description: "Circuito di gare vertical a scopo benefico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser()
  if (!user) redirect('/login')

  const events = await getEvents()

  return (
    <div className="flex">
      <div className="min-w-64 pr-4 border-r-1">
        <div className="mt-4">
          <span className="font-unbounded text-xl">Eventi</span>
          <ul className="separator mt-4">
            {events?.map((item: any, index) =>
              <li key={index} className="py-2 whitespace-nowrap">
                <Link href={'/console/events/' + item.slug}>{item.name}</Link>
              </li>
            )}
          </ul>
        </div>
  
      </div>
      <div className="pl-4">{children}</div>
    </div>
  );
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