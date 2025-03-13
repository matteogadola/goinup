'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { UserIcon } from '@components/icons';
import { createClient } from '@utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NavbarUser({ user, className }: { user: any, className?: string }) {
  //const routePath = usePathname();
  const router = useRouter();
  //const auth = supabase.auth;
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false)

  const toggle = async () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    toggle();

    if (error) {
      console.error(error)
    }

    router.push('/');
    router.refresh();
  }

  return (
    <>
      <button className="hidden md:flex hover:opacity-70 hover:cursor-pointer" onClick={toggle} title={user.email}>
        <Avatar>
          {/*<AvatarImage src="" />*/}
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </button>
      {isOpen &&
        <div className="absolute right-4 top-10 z-20 pt-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
          <Link
            href="/account"
            onClick={toggle}
            className="flex min-w-max items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100"
          >
            {/*<img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src="/images/logos/goinup.png" alt="avatar" />*/}
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700">{user.user_metadata.first_name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </Link>

          {/*<hr className="border-gray-200 dark:border-gray-700 " />

          <a href="#" className="line-through block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            Profilo
          </a>

          <a href="#" className="line-through block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            Impostazioni
          </a>*/}

          <hr className="border-gray-200 dark:border-gray-700 " />

          <Link
            href="/admin"
            onClick={toggle}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Amministrazione
          </Link>

          {/*<a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
            </a>

            <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
            </a>*/}

          <hr className="border-gray-200 dark:border-gray-700 " />

          <a onClick={handleLogout} href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            Esci
          </a>
        </div>
      }
    </>
  )
}