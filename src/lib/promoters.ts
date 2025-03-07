import supabase from '@/lib/supabase';
import type { Promoter } from '@/types/promoters';

export const getPromoters = async () => {
  const { data } = await supabase.from('promoters').select().returns<Promoter[]>();
  return data ?? [];
};

export const getPromoter = async (id: string) => {
  const { data } = await supabase.from('promoters').select().eq('id', id).returns<Promoter[]>().single();
  return data;
};
