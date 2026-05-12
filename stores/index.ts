import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AIReport, JournalEntry, Subscription } from '@/types'

interface AppState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  
  currentReport: AIReport | null
  setCurrentReport: (report: AIReport | null) => void
  
  roastMode: boolean
  toggleRoastMode: () => void
  
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  subscription: Subscription | null
  setSubscription: (sub: Subscription | null) => void
  
  journalEntries: JournalEntry[]
  setJournalEntries: (entries: JournalEntry[]) => void
  
  clearAll: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      currentReport: null,
      setCurrentReport: (report) => set({ currentReport: report }),
      
      roastMode: false,
      toggleRoastMode: () => set((state) => ({ roastMode: !state.roastMode })),
      
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      subscription: null,
      setSubscription: (sub) => set({ subscription: sub }),
      
      journalEntries: [],
      setJournalEntries: (entries) => set({ journalEntries: entries }),
      
      clearAll: () => set({
        user: null,
        isAuthenticated: false,
        currentReport: null,
        subscription: null,
        journalEntries: [],
      }),
    }),
    {
      name: 'trader-dna-storage',
      partialize: (state) => ({
        roastMode: state.roastMode,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)

interface UIState {
  loading: boolean
  setLoading: (loading: boolean) => void
  
  toasts: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  }>
  addToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  
  toasts: [],
  addToast: (type, message) => set((state) => ({
    toasts: [...state.toasts, { id: Math.random().toString(36).substr(2, 9), type, message }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),
}))