'use client'

import FadeUpAnimation from '@components/animations/fade-up';
import Credits from '@components/credits'
import UpcomingEvents from '@components/events/upcoming'
import BannerCarnet from '@components/home/banner-carnet';
import { UnstyledButton } from '@mantine/core';
import { useCartStore } from '@store/cart';
import { dt } from '@utils/date';
import { urlFor } from '@utils/sanity';
import { getSeries, getUpcomingEvents } from '@utils/sanity/queries'
import clsx from 'clsx';

export default function CartItems({ className }: any) {
  const { items, removeItem } = useCartStore();

  return (
    <div className={clsx(className)}>
      {!!items.length &&
        <div className="flex h-full flex-col">
          <div className="">
            <div className="flex-1 overflow-y-auto">

              <div className="">
                <div className="flow-root">
                  <ul role="list" className=" divide-y divide-gray-100">
                    {items.map((item, index) =>
                      <li key={index} className="flex py-6">
                        <div className="flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base text-gray-900">
                              <h3>{item.product_name}</h3>
                              <p className="">{item.price / 100}€</p>
                            </div>

                            <div className="flex justify-between text-base text-gray-900">
                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              <div className="flex">
                                <button type="button" className="hidden md:flex" onClick={() => removeItem(index)}>
                                  Rimuovi
                                </button>
                              </div>
                              
                            </div>
                          </div>

                        </div>
                      </li>
                    )}
                  </ul>

                  {/*<div className="flex justify-between text-base font-medium text-gray-900 my-4">
                    <p>Totale</p>
                    <p>(totalAmount + (paymentMethod === 'stripe' ? calcStripeTax(cartItems) : 0)) / 100€</p>
                  </div>*/}

                </div>

              </div>
            </div>




                      
            </div>
          </div>
      }
      {!items.length &&
        <div className="">
          Nessun elemento nel carrello
        </div>
      }
    </div>
  );


}
