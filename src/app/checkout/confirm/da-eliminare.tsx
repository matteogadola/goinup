'use client'

import { useCartStore } from '@store/cart';
import { useEffect } from 'react';

export default function DaEliminare() {
  useEffect(() => useCartStore.setState({ items: [] }), [])

  return <></>
}
