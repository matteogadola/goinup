'use client';

import { Burger } from '@mantine/core';
import { useUiStore } from '@/store/ui';

export default function NavbarBurger() {
  const { sidenavOpened, sidenavToggle } = useUiStore()

  return (
    <Burger
      opened={sidenavOpened}
      onClick={sidenavToggle}
      hiddenFrom="sm"
      size="md"
    />
  )
}
