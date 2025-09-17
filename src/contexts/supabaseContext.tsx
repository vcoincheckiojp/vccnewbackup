import React, { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import supabase from '../utils/supabase/supabase'

interface SupabaseContextProps {
  client: SupabaseClient
  isConnected: boolean
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined)

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Test query nhỏ để check kết nối
    supabase
      .from('news')
      .select('id')
      .limit(1)
      .then(({ error }) => {
        if (error) {
          console.error('❌ Supabase connect failed:', error.message)
          setIsConnected(false)
        } else {
          console.log('✅ Supabase connected')
          setIsConnected(true)
        }
      })

    // Example: listen realtime events on news table
    const channel = supabase
      .channel('news-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news' },
        (payload) => {
          console.log('🔔 Realtime change in news:', payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ client: supabase, isConnected }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext)
  if (!ctx) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return ctx
}
