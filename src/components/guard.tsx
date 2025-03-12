'use server'

import FadeUpAnimation from '@components/animations/fade-up';
import Credits from '@components/credits'
import UpcomingEvents from '@components/events/upcoming'
import BannerCarnet from '@components/home/banner-carnet';
import { Role } from '@d/user';
import { useCartStore } from '@store/cart';
import { dt } from '@utils/date';
import { urlFor } from '@utils/sanity';
import { getSeries, getUpcomingEvents } from '@utils/sanity/queries'

type Props = {
  hasRole: Role
}

export default function Guard({ hasRole }: Partial<Props>) {


  return (
    <>
    
        <div className="">
          Nessun elemento nel carrello
        </div>
    </>
  );


}
