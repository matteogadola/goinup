'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  promoter?: string;
}

export default function NavbarBrand({ promoter }: Props) {
  const routePath = usePathname();

  if (routePath === '/') {
    return <div></div>
  }

  if (promoter === 'goinup') {
    return (
      <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
        <Link href="/">GO<span className="text-accent">in</span>UP</Link>
      </div>
    )
  }

  if (promoter === 'team-valtellina') {
    return (
      <div className="text-lg md:text-xl font-unbounded font-bold hover:opacity-70">
        <Link href="/"><span className="text-red-400">Team</span> Valtellina</Link>
      </div>
    )
  }

  return (
    <div></div>
  )
}
