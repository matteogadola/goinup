'use client'

import { useUiStore } from '@/store/ui';
import Link from 'next/link';

export default function Sidebar({
  links,
}: {
  links: any[]
}) {
  const { sidenavToggle } = useUiStore()

  return (
    <div className="">

      <ul className="w-full">
        {
          links.filter(item => item?.visible !== false).map((link, index) => (
            <li key={index}>
              <Link href={link.path} onClick={sidenavToggle}>
                <span className="block px-2 py-4 hover:opacity-70">{link.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
