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
      Bookmark: {
        Row: {
          collectionId: number
          createdAt: string
          id: number
          title: string
          url: string
        }
        Insert: {
          collectionId: number
          createdAt?: string
          id?: number
          title: string
          url: string
        }
        Update: {
          collectionId?: number
          createdAt?: string
          id?: number
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "Bookmark_collectionId_fkey"
            columns: ["collectionId"]
            isOneToOne: false
            referencedRelation: "ResuCollection"
            referencedColumns: ["id"]
          }
        ]
      }
      Resu: {
        Row: {
          authorId: string
          collectionId: number | null
          content: string
          createdAt: string
          id: number
          quoteId: number | null
        }
        Insert: {
          authorId: string
          collectionId?: number | null
          content: string
          createdAt?: string
          id?: number
          quoteId?: number | null
        }
        Update: {
          authorId?: string
          collectionId?: number | null
          content?: string
          createdAt?: string
          id?: number
          quoteId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Resu_author_fk"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Resu_collectionId_fkey"
            columns: ["collectionId"]
            isOneToOne: false
            referencedRelation: "ResuCollection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Resu_quoteId_fkey"
            columns: ["quoteId"]
            isOneToOne: false
            referencedRelation: "Resu"
            referencedColumns: ["id"]
          }
        ]
      }
      ResuCollection: {
        Row: {
          createdAt: string
          id: number
        }
        Insert: {
          createdAt?: string
          id?: number
        }
        Update: {
          createdAt?: string
          id?: number
        }
        Relationships: []
      }
      Tag: {
        Row: {
          id: number
          name: string
          parentId: number | null
        }
        Insert: {
          id?: number
          name: string
          parentId?: number | null
        }
        Update: {
          id?: number
          name?: string
          parentId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Tag_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          }
        ]
      }
      TagAttach: {
        Row: {
          bookmarkId: number | null
          id: number
          resuId: number | null
          tagId: number
          threadId: number | null
        }
        Insert: {
          bookmarkId?: number | null
          id?: number
          resuId?: number | null
          tagId: number
          threadId?: number | null
        }
        Update: {
          bookmarkId?: number | null
          id?: number
          resuId?: number | null
          tagId?: number
          threadId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "TagAttach_bookmarkId_fkey"
            columns: ["bookmarkId"]
            isOneToOne: false
            referencedRelation: "Bookmark"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TagAttach_resuId_fkey"
            columns: ["resuId"]
            isOneToOne: false
            referencedRelation: "Resu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TagAttach_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TagAttach_threadId_fkey"
            columns: ["threadId"]
            isOneToOne: false
            referencedRelation: "Thread"
            referencedColumns: ["id"]
          }
        ]
      }
      Thread: {
        Row: {
          collectionId: number
          createdAt: string
          id: number
          title: string
        }
        Insert: {
          collectionId: number
          createdAt?: string
          id?: number
          title: string
        }
        Update: {
          collectionId?: number
          createdAt?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Thread_collectionId_fkey"
            columns: ["collectionId"]
            isOneToOne: false
            referencedRelation: "ResuCollection"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
