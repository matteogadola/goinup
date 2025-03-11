'use client'

import Link from 'next/link';
import { useState } from 'react';
import { CartIcon, HamburgerIcon, XIcon } from '@components/icons';
import { useCartStore } from '@store/cart';
import { useDisclosure } from '@mantine/hooks';
import { Badge, MantineProvider, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function MobileButton({ links }: { links: any[] }) {
  //const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);
  const [opened, { toggle }] = useDisclosure();
  const { items } = useCartStore();

  return (
    <>
      <button className="focus:outline-none hover:cursor-pointer flex" onClick={toggle}>
        <MantineProvider>
          {!!items.length &&
            <Badge size="xs" circle className="relative left-2 -top-1">{items.length}</Badge>
          }
        </MantineProvider>
        <HamburgerIcon />
      </button>
      {
        opened &&
          <div className="flex-col w-2/3 absolute top-0 right-0 z-10 shadow-md bg-white text-gray-600 h-screen">
            <div className="flex h-16 px-4 items-center justify-end">
            <MantineProvider>
              {!!items.length &&
              <Link href="/checkout" onClick={toggle}>
                <div className="flex">
                  <CartIcon className="hover:text-blue-600" />
                  <Badge size="xs" circle className="relative -left-2 -top-1">{items.length}</Badge>
                  </div>
                </Link>
              }
              <button className="focus:outline-none hover:cursor-pointer ml-2" onClick={toggle}>
                <XIcon />
              </button>
            </MantineProvider>
              
            </div>

            <ul className="w-full">
              {
                links.filter(item => item?.visible !== false).map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} onClick={toggle}>
                      <span className="block px-2 py-4 hover:opacity-70">{link.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
      }
    </>
  )
}
