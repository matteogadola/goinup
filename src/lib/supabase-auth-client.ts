//import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '../types/supabase';

//export const createClient = () => createBrowserSupabaseClient<Database>();
export const createClient = () => createClientComponentClient<Database>();
