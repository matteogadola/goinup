'use client'

import { HamburgerIcon, XIcon } from '@/components/icons';
import { ChevronRightIcon } from '@/components/icons';
import type { NavLink } from '@/types/app';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import goinupLogo from 'public/images/credits/goinup.png'
import teamValtellinaLogo from 'public/images/credits/team-valtellina.webp'
import { useState } from 'react';

interface Props {
  links: NavLink[];
  promoter?: string;
}

export default function NavbarMobile({ links, promoter }: Props) {
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);

  if (promoter === 'goinup') {
    return (
      <section className="flex md:hidden outline-none">
        {
          isSidenavOpen ?
            <div className="flex-col w-2/3 absolute top-0 right-0 z-10 shadow-md bg-slate-100 text-gray-600 h-screen">
              <div className="flex h-12 pl-4 px-8 items-center justify-end">
                <button className="outline-none" onClick={() => setIsSidenavOpen(false)}>
                  <XIcon />
                </button>
              </div>

              <ul className="w-full">
                {
                  links.filter(item => item?.visible !== false).map((link, index) => (
                    <li key={index}>
                      <Link href={link.path} onClick={() => setIsSidenavOpen(false)}>
                        <span className="block px-2 py-4 hover:opacity-70">{link.name}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            :
            <button onClick={() => setIsSidenavOpen(true)}>
              <HamburgerIcon />
            </button>
        }
      </section>

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
