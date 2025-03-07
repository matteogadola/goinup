'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CartIcon, UserIcon } from '@components/icons';
import { createClient } from '@utils/supabase/client';
import { useCartStore } from '@store/cart';
import { Badge, Drawer, MantineProvider, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function CartButton() {
  const { items } = useCartStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MantineProvider>
        <UnstyledButton className="hidden md:flex" onClick={open}>
          <CartIcon className="hover:text-blue-600" />
          <Badge size="xs" circle className="relative -left-2 -top-1">{items.length}</Badge>
        </UnstyledButton>

        <Drawer opened={opened} position="right" onClose={close} title="Carrello">
          la scarrellataaa
        </Drawer>
      </MantineProvider>
    </>
  )
}