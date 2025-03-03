'use client'

import Link from 'next/link';
import { useState } from 'react';
import { HamburgerIcon, XIcon } from '@components/icons';

export default function MobileButton({ links }: { links: any[] }) {
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);

  return (
    <>
      {
        isSidenavOpen ?
          <div className="flex-col w-2/3 absolute top-0 right-0 z-10 shadow-md bg-white text-gray-600 h-screen">
            <div className="flex h-12 pl-4 px-8 items-center justify-end">
              <button className="focus:outline-none hover:cursor-pointer" onClick={() => setIsSidenavOpen(false)}>
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
          <button className="focus:outline-none hover:cursor-pointer" onClick={() => setIsSidenavOpen(true)}>
            <HamburgerIcon />
          </button>
      }
    </>
  )
}
