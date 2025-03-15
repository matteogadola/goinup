'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, forwardRef } from 'react'
import { UserIcon } from '@components/icons';
import { createClient } from '@utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Menu, Button, Text, Avatar, UnstyledButton } from '@mantine/core';

export default function NavbarUserButton({ user, className }: { user: User | null, className?: string }) {
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

  if (!user) return <></>

  return (
    <Menu shadow="md">
      <Menu.Target>
        <UnstyledButton className="hover:scale-105">
          <Avatar src={user.user_metadata.avatar_url} variant="transparent" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/account">
          <span className="text-lg font-semibold text-gray-700">{user.user_metadata.first_name}</span>
          <span className="block text-sm text-gray-500">{user.email}</span>
        </Menu.Item>
        {/* se ruolato */}
        <Menu.Divider />
        <Menu.Item component={Link} href="/console">
          Amministrazione
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item onClick={handleLogout}>
          Esci
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
  )
}
