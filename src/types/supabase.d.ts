export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      entries: {
        Row: {
          bib_number: number | null;
          birth_date: string;
          birth_place: string | null;
          country: string;
          email: string;
          event_id: string | null;
          first_name: string | null;
          gender: string;
          id: number;
          item_id: number | null;
          last_name: string | null;
          order_item_id: number | null;
          phone_number: string;
          team: string | null;
          tin: string;
        };
        Insert: {
          bib_number?: number | null;
          birth_date: string;
          birth_place?: string | null;
          country?: string;
          email: string;
          event_id?: string | null;
          first_name?: string | null;
          gender: string;
          id?: number;
          item_id?: number | null;
          last_name?: string | null;
          order_item_id?: number | null;
          phone_number: string;
          team?: string | null;
          tin: string;
        };
        Update: {
          bib_number?: number | null;
          birth_date?: string;
          birth_place?: string | null;
          country?: string;
          email?: string;
          event_id?: string | null;
          first_name?: string | null;
          gender?: string;
          id?: number;
          item_id?: number | null;
          last_name?: string | null;
          order_item_id?: number | null;
          phone_number?: string;
          team?: string | null;
          tin?: string;
        };
      };
      events: {
        Row: {
          body: string | null;
          capacity: number;
          category: string;
          date: string | null;
          description: string | null;
          detail: Json | null;
          edition: number;
          flyer: string | null;
          id: string;
          name: string;
          promoter_id: number | null;
          status: string;
          summary: string | null;
        };
        Insert: {
          body?: string | null;
          capacity?: number;
          category: string;
          date?: string | null;
          description?: string | null;
          detail?: Json | null;
          edition?: number;
          flyer?: string | null;
          id: string;
          name: string;
          promoter_id?: number | null;
          status?: string;
          summary?: string | null;
        };
        Update: {
          body?: string | null;
          capacity?: number;
          category?: string;
          date?: string | null;
          description?: string | null;
          detail?: Json | null;
          edition?: number;
          flyer?: string | null;
          id?: string;
          name?: string;
          promoter_id?: number | null;
          status?: string;
          summary?: string | null;
        };
      };
      items: {
        Row: {
          category: string;
          description: string | null;
          detail: Json | null;
          event_id: string | null;
          id: number;
          name: string;
          price: number;
          status: string;
          stock: number;
          summary: string | null;
        };
        Insert: {
          category: string;
          description?: string | null;
          detail?: Json | null;
          event_id?: string | null;
          id?: number;
          name: string;
          price: number;
          status?: string;
          stock?: number;
          summary?: string | null;
        };
        Update: {
          category?: string;
          description?: string | null;
          detail?: Json | null;
          event_id?: string | null;
          id?: number;
          name?: string;
          price?: number;
          status?: string;
          stock?: number;
          summary?: string | null;
        };
      };
      order_items: {
        Row: {
          description: string | null;
          id: number;
          item_id: number | null;
          name: string | null;
          order_id: number | null;
          price: number;
          quantity: number;
        };
        Insert: {
          description?: string | null;
          id?: number;
          item_id?: number | null;
          name?: string | null;
          order_id?: number | null;
          price: number;
          quantity?: number;
        };
        Update: {
          description?: string | null;
          id?: number;
          item_id?: number | null;
          name?: string | null;
          order_id?: number | null;
          price?: number;
          quantity?: number;
        };
      };
      orders: {
        Row: {
          amount: number;
          date: string;
          id: number;
          notification_date: string | null;
          notification_status: string | null;
          payment_date: string | null;
          payment_id: string | null;
          payment_method: string;
          payment_status: string;
          status: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          amount: number;
          date: string;
          id?: number;
          notification_date?: string | null;
          notification_status?: string | null;
          payment_date?: string | null;
          payment_id?: string | null;
          payment_method: string;
          payment_status: string;
          status?: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          date?: string;
          id?: number;
          notification_date?: string | null;
          notification_status?: string | null;
          payment_date?: string | null;
          payment_id?: string | null;
          payment_method?: string;
          payment_status?: string;
          status?: string;
          user_email?: string;
          user_id?: string | null;
        };
      };
      promoters: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
