import type { CurrentUser } from 'sanity'

type User = Omit<CurrentUser, 'role'> | null;
type Role = 'owner' | 'admin' | 'editor' | 'contributor'; // oppure 

/**
 * owner        : full access
 * admin        : full access
 * editor       : full access
 * contributor  : persone esterne che possono solo modificare i contenuti grafici (graphics designer, copywriter, fotografi, ...)
 */

// Recupera gli id con: npx sanity users list
const owners: string[] = ['p1Pq1LEdr']
const admins: string[] = [...owners, 'id...']
const editors: string[] = [...admins, 'id...']
const contributors: string[] = [...editors, 'id...']

export const hasRole = (user: User, role: Role = 'contributor') => {
  if (user === null || !user?.id) return false;

  switch (role) {
    case 'owner':
      return owners.includes(user.id)
    case 'admin':
      return admins.includes(user.id)
    case 'editor':
      return editors.includes(user.id)
    case 'contributor':
      return contributors.includes(user.id)
    default:
      return false
  }
}
