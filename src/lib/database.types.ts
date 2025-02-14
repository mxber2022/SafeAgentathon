export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          language: string
          content_data: Json
          creator_id: string
          creator_share: number | null
          agent_share: number | null
          uri: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          language: string
          content_data: Json
          creator_id: string
          creator_share?: number | null
          agent_share?: number | null
          uri?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          language?: string
          content_data?: Json
          creator_id?: string
          creator_share?: number | null
          agent_share?: number | null
          uri?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}