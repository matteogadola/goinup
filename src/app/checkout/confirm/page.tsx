import { Metadata, NextPage } from 'next'
import Image from 'next/image'
import { redirect, useSearchParams } from 'next/navigation'
import { base64 } from '@utils/text'
import { useCartStore } from '@store/cart';
import { useEffect } from 'react';
/*
interface SearchParams {
  session_id?: string;
  q: string;
}

interface Props {
  searchParams: SearchParams;
}*/

export default function CheckoutConfirmPage({ searchParams }: any) {
  const order = base64.decode<any>(searchParams.q);
  console.log(order)
  const detail = <></>

  useEffect(() => useCartStore.setState({ items: [] }), [])

  if (order?.items === undefined || !order.items.length) {
    return (
      <>
        <section className="page">
          <span className="overtitle">Conferma</span>
          <div className="text mt-2">
            L&apos;iscrizione è stata completata con successo ma ci sono stati problemi nella generazione di questa pagina.<br />
            Riceverai a breve una mail di conferma.<br />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="page">
        <span className="overtitle">Conferma</span>
        <h1 className="title mt-3">Ordine n. {order.id}</h1>
        <div className="text mt-2">
          <table className="border border-slate-400 mt-8">
            <thead>
              <tr className="bg-slate-200">
                <td className="w-80 border-b py-2">Riferimento</td>
                <td className="w-60 border-b py-2">Descrizione</td>
                <td className="w-32 border-b py-2">Quantità</td>
                <td className="w-32 border-b py-2">Prezzo</td>
              </tr>
            </thead>
            <tbody>
              {
                order.items.map((item: any, index: any) =>
                  <tr key={index}>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.description}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.price / 100}€</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          
          {
            order.items[0]?.name === 'Iscrizione 1^ Vertical Frasnedo' &&
              <div className="mt-8">
                <span>Si prega di inviare copia del certificato medico, prima della gara, via mail a iscrizioni@teamvaltellina.com oppure consegnarlo presso il negozio 3Passi Patagonia</span>
              </div>
          }

          <p className="mt-8">A breve riceverai una mail con {
            order.payment_method === 'sepa'
              ? 'le istruzioni per poter effettuare il bonifico'
              : order.payment_method === 'cash'
                ? 'le istruzioni per poter effettuare il pagamento in contanti'
                : order.payment_method === 'on-site'
                  ? 'la conferma dell\'ordine'
                  : 'la conferma di pagamento'
          }
            .</p>
        </div>
      </section>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Goinup | Conferma ordine',
}
