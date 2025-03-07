'use client'

import type { NavLink } from '@/types/app';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import goinupLogo from 'public/images/credits/goinup.png'
import teamValtellinaLogo from 'public/images/credits/team-valtellina.webp'
import NavbarMobile from './navbar-mobile';

interface Props {
  links: NavLink[];
  promoter?: string;
}

export default function NavbarLinks({ links, promoter }: Props) {
  const routePath = usePathname();

  if (promoter === 'goinup') {
    return (
      <div className={routePath === '/' ? 'text-white' : 'text-gray-600'}>
        <nav className="hidden md:flex">
          <ul className="space-x-6">
            {
              links.filter(item => item?.visible !== false).map((link, index) => (
                <li key={index} className="inline-block">
                  <Link href={link.path}>
                    <span className="block mt-2 md:mt-0 hover:opacity-70">{link.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>

        <div className="flex md:hidden">
          <NavbarMobile links={links} promoter={promoter} />
        </div>
      </div>
    )
  }

  if (promoter === 'team-valtellina') {
    return (
      <></>
    )
  }

  return (
    <></>
  )
}
