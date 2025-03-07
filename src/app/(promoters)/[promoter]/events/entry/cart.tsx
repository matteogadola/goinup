'use client'

import Image from 'next/image'
import classNames from 'classnames'
import { useStore } from '@/store/store'
import { createCheckout } from '@/lib/checkout'

import mastercardLogo from 'public/images/logos/mastercard.svg'
import visaLogo from 'public/images/logos/visa.svg'
import amexLogo from 'public/images/logos/amex-old.svg'
import sepaLogo from 'public/images/logos/sepa.svg'
import { useState } from 'react'
import EntryFormLocationsDialog from './form-locations-dialog'
import { useRouter } from 'next/navigation'
import { base64, calcStripeTax } from '@/lib/helpers'

export default function EntryCart() {
  const { replace } = useRouter()
  const cartItems = useStore((state) => state.cartItems)
  const paymentMethod = useStore((state) => state.paymentMethod)
  const removeCartItem = useStore((state) => state.removeCartItem)
  const clearCartItems = useStore((state) => state.clearCartItems)
  const setPaymentMethod = useStore((state) => state.setPaymentMethod)
  const [error, setError] = useState(null)

  const totalAmount = cartItems.reduce((a, b) => a + b.price, 0)

  const checkout = async () => {
    setState({ ...state, isLoading: true });

    try {
      const order = await createCheckout({
        payment_method: paymentMethod,
        user_email: cartItems[0].entry?.email,
        customer_first_name: cartItems[0].entry?.first_name,
        customer_last_name: cartItems[0].entry?.last_name,
        items: cartItems
      })
      setError(null)

      if (order) {
        clearCartItems()
        replace(`/confirm?q=${base64.encode(order)}`)
      }
    } catch (e: any) {
      console.log(JSON.stringify(e.message))
      setError(e.message)
    } finally {
      setState({ ...state, isLoading: false })
    }
  }

  const [state, setState] = useState({ error: '', isLoading: false, isLocationsOpened: false })

  const openLocations = () => {
    setState({ ...state, isLocationsOpened: true })
  }

  const closeLocations = () => {
    setState({ ...state, isLocationsOpened: false })
  }

  return (
    <section>
      {state.isLocationsOpened && <EntryFormLocationsDialog onClose={closeLocations} />}
      {cartItems.length > 0 &&
        <div className="">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto px-4">
              <div className="">
                <h2 className="overtitle" id="slide-over-title">Conferma</h2>
                <h2 className="title">Carrello</h2>
              </div>

              <div className="">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-100">
                    {cartItems.map((item, index) =>
                      <li key={index} className="flex py-6">
                        <div className="ml-2 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="">{item.price / 100}€</p>
                            </div>

                            <div className="flex justify-between text-base text-gray-900">
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              <div className="flex">
                                <button type="button" disabled={state.isLoading} className="text-xs text-button hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40" onClick={() => removeCartItem(index)}>Rimuovi</button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </li>
                    )}

                    {paymentMethod === 'stripe' &&
                      <li className="flex pt-6">
                        <div className="ml-2 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>Commissioni di servizio</h3>
                              <p className="">{calcStripeTax(cartItems) / 100}€</p>
                            </div>
                          </div>

                        </div>
                      </li>
                    }

                  </ul>

                  <div className="ml-2 flex justify-between text-base font-medium text-gray-900 my-4">
                    <p>Totale</p>
                    <p>{(totalAmount + (paymentMethod === 'stripe' ? calcStripeTax(cartItems) : 0)) / 100}€</p>
                  </div>

                </div>

              </div>
            </div>


            <div className="border-t border-gray-200 py-4 px-4 sm:px-6">
              <span className="text-base font-medium text-gray-900">Metodo di Pagamento</span>
              <div className="grid grid-cols-1 gap-y-2 mt-4">

                <div className="flex items-center pl-4 border border-gray-200 rounded">
                  <input type="radio" value="stripe" id="payment-method-stripe" disabled={state.isLoading} checked={paymentMethod === 'stripe'} onChange={e => setPaymentMethod('stripe')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                  <label htmlFor="payment-method-stripe" className={classNames("w-full ml-2 text-sm font-medium text-gray-900", { "py-2": paymentMethod === 'stripe', "py-4": paymentMethod !== 'stripe' })}>
                    <span>Online</span>
                    {paymentMethod === 'stripe' && <span className="block font-normal text-xs">Conferma immediata</span>}
                  </label>
                  <Image src={mastercardLogo} height={30} alt="mastercard" />
                  <Image src={visaLogo} height={30} alt="visa" />
                  <Image src={amexLogo} height={30} alt="amex" />
                </div>

                {totalAmount >= 100000
                  ? <div className="flex items-center pl-4 pr-2 border border-gray-200 rounded">
                    <input type="radio" value="sepa" id="payment-method-sepa" checked={paymentMethod === 'sepa'} onChange={e => setPaymentMethod('sepa')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                    <label htmlFor="payment-method-sepa" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span>Bonifico Bancario</span>
                    </label>
                    <Image src={sepaLogo} height={50} alt="sepa" />
                  </div>
                  : <div className="flex items-center pl-4 border border-gray-200 rounded">
                    <input type="radio" value="cash" id="payment-method-cash" disabled={state.isLoading} checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod('cash')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                    <label htmlFor="payment-method-cash" className={classNames("w-full ml-2 text-sm font-medium text-gray-900", { "py-2": paymentMethod === 'cash', "py-4": paymentMethod !== 'cash' })}>
                      <span>Contanti</span>
                      {paymentMethod === 'cash' && <span className="block font-normal text-xs">Sarà necessario recarsi presso uno degli <button onClick={() => openLocations()} className="text-button">store abilitati</button></span>}
                    </label>
                  </div>
                }
              </div>



              {error && <div className="mt-4">
                <div className="relative px-2 py-1 leading-normal text-red-700" role="alert">
                  <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </span>
                  <p className="ml-8">{error}</p>
                </div>
              </div>}

              <div className="mt-4">

                <button
                  onClick={() => checkout()}
                  disabled={state.isLoading}
                  className="flex w-full items-center justify-center rounded-md bg-button px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {state.isLoading &&
                    <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                    </svg>
                  }
                  {paymentMethod === 'stripe' ? 'Vai al Pagamento' : 'Conferma iscrizione'}
                </button>


              </div>
            </div>
          </div>
        </div>
      }
    </section>

  )
}
