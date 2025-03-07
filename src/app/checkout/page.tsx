'use client'

import FadeUpAnimation from '@components/animations/fade-up';
import Credits from '@components/credits'
import UpcomingEvents from '@components/events/upcoming'
import BannerCarnet from '@components/home/banner-carnet';
import { useCartStore } from '@store/cart';
import { dt } from '@utils/date';
import { urlFor } from '@utils/sanity';
import { getSeries, getUpcomingEvents } from '@utils/sanity/queries'

export default function CheckoutPage() {
  const { items } = useCartStore();
  const state: any = {}

  return (
    <>
    <section className="W-full lg:w-1/2 m-auto">
      {/*state.isLocationsOpened && <EntryFormLocationsDialog onClose={closeLocations} />*/}
      {!!items.length &&
        <div className="">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto px-4">
              <div className="">
                <h2 className="overtitle" id="slide-over-title">Carrello</h2>
                <h2 className="title">Conferma l'ordine</h2>
              </div>

              <div className="">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-100">
                    {items.map((item, index) =>
                      <li key={index} className="flex py-6">
                        <div className="ml-2 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>{item.productName}</h3>
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

                    {/*paymentMethod === 'stripe' &&
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
                    */}

                  </ul>

                  <div className="ml-2 flex justify-between text-base font-medium text-gray-900 my-4">
                    <p>Totale</p>
                    <p>{/*(totalAmount + (paymentMethod === 'stripe' ? calcStripeTax(cartItems) : 0)) / 100*/}€</p>
                  </div>

                </div>

              </div>
            </div>





            </div>
          </div>
      }
    </section>
    </>
  );


}
