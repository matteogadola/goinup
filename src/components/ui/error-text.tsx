import { ReactNode } from 'react';
import clsx from 'clsx';

export default function ErrorText({
  children,
  className,
}: {
  children: ReactNode,
  className?: string,
}) {
  return (
    <div className={clsx("text-sm text-red-600", className)}>
      {children}
    </div>
  )
}
