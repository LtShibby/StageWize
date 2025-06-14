import { create } from 'zustand'
import { Lead, LeadStatus } from '@/types'
import { getLeadsFromStorage, saveLeadsToStorage, generateLeadId } from '@/lib/leads'
import toast from 'react-hot-toast'

interface LeadsStore {
  leads: Lead[]
  isLoading: boolean
  
  // Actions
  loadLeads: () => void
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  moveLead: (id: string, newStatus: LeadStatus) => void
  getLeadsByStatus: (status: LeadStatus) => Lead[]
}

export const useLeads = create<LeadsStore>((set, get) => ({
  leads: [],
  isLoading: false,
  
  loadLeads: () => {
    set({ isLoading: true })
    try {
      const leads = getLeadsFromStorage()
      set({ leads, isLoading: false })
    } catch (error) {
      console.error('Error loading leads:', error)
      set({ isLoading: false })
      toast.error('Failed to load leads')
    }
  },
  
  addLead: (leadData) => {
    const newLead: Lead = {
      ...leadData,
      id: generateLeadId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const updatedLeads = [...get().leads, newLead]
    set({ leads: updatedLeads })
    saveLeadsToStorage(updatedLeads)
    toast.success(`Lead "${newLead.name}" added successfully!`)
  },
  
  updateLead: (id, updates) => {
    const updatedLeads = get().leads.map(lead =>
      lead.id === id
        ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
        : lead
    )
    
    set({ leads: updatedLeads })
    saveLeadsToStorage(updatedLeads)
    toast.success('Lead updated successfully!')
  },
  
  deleteLead: (id) => {
    const lead = get().leads.find(l => l.id === id)
    const updatedLeads = get().leads.filter(lead => lead.id !== id)
    
    set({ leads: updatedLeads })
    saveLeadsToStorage(updatedLeads)
    toast.success(`Lead "${lead?.name}" deleted successfully!`)
  },
  
  moveLead: (id, newStatus) => {
    const lead = get().leads.find(l => l.id === id)
    if (!lead) return
    
    const updatedLeads = get().leads.map(lead =>
      lead.id === id
        ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
        : lead
    )
    
    set({ leads: updatedLeads })
    saveLeadsToStorage(updatedLeads)
    toast.success(`"${lead.name}" moved to ${newStatus}`)
  },
  
  getLeadsByStatus: (status) => {
    return get().leads.filter(lead => lead.status === status)
  },
})) 