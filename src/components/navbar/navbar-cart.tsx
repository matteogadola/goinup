'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CartIcon, UserIcon } from '@components/icons';
import { createClient } from '@utils/supabase/client';
import { useCartStore } from '@store/cart';
import { Badge, Drawer, MantineProvider, Button, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CartItems from '@components/cart/cart-items';

export default function CartButton() {
  const { items } = useCartStore();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    close()
    router.push('/checkout')
  }

  return (
    <>
    {!!(items.length && pathname !== '/checkout') &&
    <MantineProvider>
    <UnstyledButton className="hidden md:flex" onClick={open}>
      <CartIcon className="hover:text-blue-600" />
      <Badge size="xs" circle className="relative -left-2 -top-1">{items.length}</Badge>
    </UnstyledButton>

    <Drawer opened={opened} position="right" onClose={close} title="Carrello">
      <div className="flex flex-col justify-between" style={{height:"calc(100vh - 64px - 32px)"}}>
        <CartItems />
        {!!items.length &&
          <div>
            <div className="text-xs text-gray-900 mt-4">
              Il totale verrà mostrato nella schermata successiva
              </div>
            <div className="mt-4">
                <Button onClick={handleClick} variant="filled" fullWidth classNames={{label: 'light'}}>
                  Vai al pagamento
                </Button>
            </div>
          </div>
        }
      </div>
      
    </Drawer>
  </MantineProvider>
    }
    </>
  )
}