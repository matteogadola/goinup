import { Session } from '@supabase/supabase-js'
import { jwtDecode } from 'jwt-decode'
import { createClient } from './server'
import { Claims } from '@/types/user'

export const getClaims = async (session?: Session | null) => {

  try {
    if (!session) {
      const supabase = await createClient()
      const { data } = await supabase.auth.getSession()
      session = data.session
    }

    if (!session) return null

    return jwtDecode<Claims>(session.access_token)
  } catch(e) {
    return null
  }
}