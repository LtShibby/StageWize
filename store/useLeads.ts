import { create } from 'zustand'
import { Lead, LeadStatus } from '@/types'
import { getLeadsFromStorage, saveLeadsToStorage, generateLeadId } from '@/lib/leads'
import toast from 'react-hot-toast'

// Sample demo lead data for all stages
const getSampleDemoLeads = (): Lead[] => [
  {
    id: 'demo-lead-new',
    name: 'Alex Rodriguez',
    email: 'alex.r@innovate.com',
    phone: '+1 (555) 987-6543',
    company: 'Innovate Solutions',
    leadSource: 'Social Media',
    notes: 'Found us through LinkedIn. Interested in our automation tools for their growing team.',
    status: 'New',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-lead-contacted',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Innovations Inc.',
    leadSource: 'Website',
    notes: 'Initial call completed. Interested in enterprise solution. Scheduled follow-up for next week.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: 'demo-lead-followup',
    name: 'Michael Chen',
    email: 'm.chen@startup.io',
    phone: '+1 (555) 555-0123',
    company: 'StartupHub.io',
    leadSource: 'Referral',
    notes: 'Proposal sent. Waiting for internal review. Budget approved, just need final sign-off from CEO.',
    status: 'Follow-Up',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'demo-lead-won',
    name: 'Emma Thompson',
    email: 'emma.t@globaldyne.com',
    phone: '+1 (555) 777-8888',
    company: 'GlobalDyne Corp',
    leadSource: 'Trade Show',
    notes: 'Contract signed! 12-month agreement for premium package. Implementation starts next month.',
    status: 'Won',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'demo-lead-lost',
    name: 'David Kim',
    email: 'david.k@budget.com',
    phone: '+1 (555) 444-3333',
    company: 'Budget Solutions Ltd',
    leadSource: 'Cold Call',
    notes: 'Went with competitor due to price. Keep for future when budget increases.',
    status: 'Lost',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
]

interface LeadsStore {
  leads: Lead[]
  isLoading: boolean
  isDemoMode: boolean
  
  // Actions
  loadLeads: () => void
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  moveLead: (id: string, newStatus: LeadStatus) => void
  getLeadsByStatus: (status: LeadStatus) => Lead[]
  canAddLead: () => boolean
  canEditLead: (id: string) => boolean
  clearDemoData: () => void
}

export const useLeads = create<LeadsStore>((set, get) => ({
  leads: [],
  isLoading: false,
  isDemoMode: true, // Demo mode is always active
  
  loadLeads: () => {
    set({ isLoading: true })
    try {
      // In demo mode, always start with sample data
      if (get().isDemoMode) {
        localStorage.removeItem('stagewize-leads')
        const sampleLeads = getSampleDemoLeads()
        set({ leads: sampleLeads, isLoading: false })
        
        // Show demo notification
        setTimeout(() => {
          toast('🎭 Demo Mode: Try dragging leads between stages! You can add 1 more lead.', {
            duration: 6000,
            icon: '🎭',
          })
        }, 2000)
        return
      }
      
      // Normal mode (disabled in demo)
      const leads = getLeadsFromStorage()
      set({ leads, isLoading: false })
    } catch (error) {
      console.error('Error loading leads:', error)
      set({ isLoading: false })
      toast.error('Failed to load leads')
    }
  },
  
  canAddLead: () => {
    const { leads, isDemoMode } = get()
    if (isDemoMode) {
      // Count only user-created leads (not demo leads)
      const userLeads = leads.filter(lead => !lead.id.startsWith('demo-lead-'))
      return userLeads.length < 1
    }
    return true
  },
  
  canEditLead: (id: string) => {
    const { isDemoMode } = get()
    if (isDemoMode) {
      // Demo leads cannot be edited, only user-created leads can be
      return !id.startsWith('demo-lead-')
    }
    return true
  },
  
  addLead: (leadData) => {
    const { canAddLead, leads, isDemoMode } = get()
    
    // Check demo limits
    if (!canAddLead()) {
      toast.error('🎭 Demo limit reached! Contact us to unlock unlimited leads.', {
        duration: 5000,
      })
      return
    }
    
    const newLead: Lead = {
      ...leadData,
      id: generateLeadId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const updatedLeads = [...leads, newLead]
    set({ leads: updatedLeads })
    
    // In demo mode, don't persist to localStorage
    if (!isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    toast.success(`Lead "${newLead.name}" added${isDemoMode ? ' (Demo Mode)' : ''}!`)
    
    // Show upgrade hint after adding first lead in demo
    if (isDemoMode) {
      const userLeads = updatedLeads.filter(lead => !lead.id.startsWith('demo-lead-'))
      if (userLeads.length === 1) {
        setTimeout(() => {
          toast('💡 That\'s your 1 lead limit! Want unlimited? Contact us!', {
            duration: 6000,
            icon: '💡',
          })
        }, 2000)
      }
    }
  },
  
  updateLead: (id, updates) => {
    const { leads, isDemoMode, canEditLead } = get()
    
    // Check if this lead can be edited
    if (!canEditLead(id)) {
      toast.error('🎭 Demo leads cannot be edited! Add your own lead to try editing.', {
        duration: 4000,
      })
      return
    }
    
    const updatedLeads = leads.map(lead =>
      lead.id === id
        ? { ...lead, ...updates, updatedAt: new Date().toISOString() }
        : lead
    )
    
    set({ leads: updatedLeads })
    
    // In demo mode, don't persist to localStorage
    if (!isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    toast.success(`Lead updated${isDemoMode ? ' (Demo Mode)' : ''}!`)
  },
  
  deleteLead: (id) => {
    const { leads, isDemoMode, canEditLead } = get()
    
    // Check if this lead can be deleted
    if (!canEditLead(id)) {
      toast.error('🎭 Demo leads cannot be deleted! They reset on page refresh.', {
        duration: 4000,
      })
      return
    }
    
    const lead = leads.find(l => l.id === id)
    const updatedLeads = leads.filter(lead => lead.id !== id)
    
    set({ leads: updatedLeads })
    
    // In demo mode, don't persist to localStorage  
    if (!isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    toast.success(`Lead "${lead?.name}" deleted${isDemoMode ? ' (Demo Mode)' : ''}!`)
  },
  
  moveLead: (id, newStatus) => {
    const { leads, isDemoMode } = get()
    const lead = leads.find(l => l.id === id)
    if (!lead) return
    
    const updatedLeads = leads.map(lead =>
      lead.id === id
        ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
        : lead
    )
    
    set({ leads: updatedLeads })
    
    // In demo mode, don't persist to localStorage
    if (!isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    const isDemoLead = id.startsWith('demo-lead-')
    toast.success(`"${lead.name}" moved to ${newStatus}${isDemoMode ? ' (Demo)' : ''}${isDemoLead ? ' - Try the others!' : ''}`)
  },
  
  getLeadsByStatus: (status) => {
    return get().leads.filter(lead => lead.status === status)
  },
  
  clearDemoData: () => {
    localStorage.removeItem('stagewize-leads')
    set({ leads: [] })
    toast('Demo data cleared', { icon: '🗑️' })
  },
})) 