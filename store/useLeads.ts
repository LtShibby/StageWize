import { create } from 'zustand'
import { Lead, LeadStatus } from '@/types'
import { getLeadsFromStorage, saveLeadsToStorage, generateLeadId } from '@/lib/leads'
import toast from 'react-hot-toast'

// Sample demo lead data for all stages - more realistic distribution
const getSampleDemoLeads = (): Lead[] => [
  // New Leads (3 leads)
  {
    id: 'demo-lead-new-1',
    name: 'Alex Rodriguez',
    email: 'alex.r@innovate.com',
    phone: '+1 (555) 987-6543',
    company: 'Innovate Solutions',
    leadSource: 'Social Media',
    notes: 'Found us through LinkedIn. Interested in our automation tools for their growing team.',
    status: 'New',
    createdAt: '2025-06-13T10:30:00.000Z', // Created 1 day ago
    updatedAt: '2025-06-13T10:30:00.000Z',
    statusChangedAt: '2025-06-13T10:30:00.000Z', // 1 day in New
  },
  {
    id: 'demo-lead-new-2',
    name: 'Jennifer Walsh',
    email: 'j.walsh@creativeco.com',
    phone: '+1 (555) 234-5678',
    company: 'Creative Co.',
    leadSource: 'Website',
    notes: 'Downloaded our pricing guide. Small design agency looking for client management solution.',
    status: 'New',
    createdAt: '2025-06-14T04:30:00.000Z', // Created 6 hours ago
    updatedAt: '2025-06-14T04:30:00.000Z',
    statusChangedAt: '2025-06-14T04:30:00.000Z', // 6 hours in New
  },
  {
    id: 'demo-lead-new-3',
    name: 'Robert Martinez',
    email: 'r.martinez@techstart.io',
    phone: '+1 (555) 345-6789',
    company: 'TechStart',
    leadSource: 'Referral',
    notes: 'Referred by existing customer. Early-stage startup, budget-conscious but interested.',
    status: 'New',
    createdAt: '2025-06-14T08:30:00.000Z', // Created 2 hours ago
    updatedAt: '2025-06-14T08:30:00.000Z',
    statusChangedAt: '2025-06-14T08:30:00.000Z', // 2 hours in New
  },

  // Contacted (2 leads)
  {
    id: 'demo-lead-contacted-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Innovations Inc.',
    leadSource: 'Website',
    notes: 'Initial call completed. Interested in enterprise solution. Scheduled follow-up for next week.',
    status: 'Contacted',
    createdAt: '2025-06-11T10:30:00.000Z', // Created 3 days ago
    updatedAt: '2025-06-13T22:30:00.000Z', // Updated 12 hours ago
    statusChangedAt: '2025-06-12T10:30:00.000Z', // 2 days in Contacted
  },
  {
    id: 'demo-lead-contacted-2',
    name: 'Mark Stevens',
    email: 'm.stevens@growthagency.com',
    phone: '+1 (555) 456-7890',
    company: 'Growth Agency',
    leadSource: 'Cold Call',
    notes: 'Positive initial conversation. Wants to see demo next Tuesday. Team of 8 people.',
    status: 'Contacted',
    createdAt: '2025-06-09T10:30:00.000Z', // Created 5 days ago
    updatedAt: '2025-06-13T16:30:00.000Z', // Updated 18 hours ago
    statusChangedAt: '2025-06-10T10:30:00.000Z', // 4 days in Contacted
  },

  // Follow-Up (4 leads - most active stage)
  {
    id: 'demo-lead-followup-1',
    name: 'Michael Chen',
    email: 'm.chen@startup.io',
    phone: '+1 (555) 555-0123',
    company: 'StartupHub.io',
    leadSource: 'Referral',
    notes: 'Proposal sent. Waiting for internal review. Budget approved, just need final sign-off from CEO.',
    status: 'Follow-Up',
    createdAt: '2025-06-07T10:30:00.000Z', // Created 7 days ago
    updatedAt: '2025-06-12T10:30:00.000Z', // Updated 2 days ago
    statusChangedAt: '2025-06-09T10:30:00.000Z', // 5 days in Follow-Up
  },
  {
    id: 'demo-lead-followup-2',
    name: 'Lisa Park',
    email: 'lisa.p@consultingfirm.com',
    phone: '+1 (555) 678-9012',
    company: 'Park Consulting',
    leadSource: 'Trade Show',
    notes: 'Demo completed. Comparing with 2 other solutions. Decision expected by end of month.',
    status: 'Follow-Up',
    createdAt: '2025-06-04T10:30:00.000Z', // Created 10 days ago
    updatedAt: '2025-06-11T10:30:00.000Z', // Updated 3 days ago
    statusChangedAt: '2025-06-06T10:30:00.000Z', // 8 days in Follow-Up
  },
  {
    id: 'demo-lead-followup-3',
    name: 'James Wilson',
    email: 'j.wilson@salesteam.com',
    phone: '+1 (555) 789-0123',
    company: 'SalesTeam Pro',
    leadSource: 'Website',
    notes: 'Requested custom pricing for 15-person team. Sent proposal yesterday. Very interested.',
    status: 'Follow-Up',
    createdAt: '2025-06-05T10:30:00.000Z', // Created 9 days ago
    updatedAt: '2025-06-13T10:30:00.000Z', // Updated 1 day ago
    statusChangedAt: '2025-06-11T10:30:00.000Z', // 3 days in Follow-Up
  },
  {
    id: 'demo-lead-followup-4',
    name: 'Amanda Foster',
    email: 'a.foster@digitalmarketing.com',
    phone: '+1 (555) 890-1234',
    company: 'Digital Marketing Plus',
    leadSource: 'Social Media',
    notes: 'Trial user for 2 weeks. Loves the interface. Discussing team plan upgrade.',
    status: 'Follow-Up',
    createdAt: '2025-06-06T10:30:00.000Z', // Created 8 days ago
    updatedAt: '2025-06-14T06:30:00.000Z', // Updated 4 hours ago
    statusChangedAt: '2025-06-04T10:30:00.000Z', // 10 days in Follow-Up
  },

  // Won (2 leads)
  {
    id: 'demo-lead-won-1',
    name: 'Emma Thompson',
    email: 'emma.t@globaldyne.com',
    phone: '+1 (555) 777-8888',
    company: 'GlobalDyne Corp',
    leadSource: 'Trade Show',
    notes: 'Contract signed! 12-month agreement for premium package. Implementation starts next month.',
    status: 'Won',
    createdAt: '2025-06-08T10:30:00.000Z', // Created 6 days ago
    updatedAt: '2025-06-13T10:30:00.000Z', // Updated 1 day ago
    statusChangedAt: '2025-06-13T10:30:00.000Z', // 1 day in Won
  },
  {
    id: 'demo-lead-won-2',
    name: 'Carlos Rodriguez',
    email: 'c.rodriguez@successagency.com',
    phone: '+1 (555) 111-2222',
    company: 'Success Agency',
    leadSource: 'Referral',
    notes: 'Closed! Annual subscription for team of 12. Very happy with onboarding process.',
    status: 'Won',
    createdAt: '2025-06-05T10:30:00.000Z', // Created 9 days ago
    updatedAt: '2025-06-07T10:30:00.000Z', // Updated 7 days ago
    statusChangedAt: '2025-06-07T10:30:00.000Z', // 7 days in Won
  },

  // Lost (1 lead)
  {
    id: 'demo-lead-lost-1',
    name: 'David Kim',
    email: 'david.k@budget.com',
    phone: '+1 (555) 444-3333',
    company: 'Budget Solutions Ltd',
    leadSource: 'Cold Call',
    notes: 'Went with competitor due to price. Keep for future when budget increases.',
    status: 'Lost',
    createdAt: '2025-06-08T10:30:00.000Z', // Created 6 days ago
    updatedAt: '2025-06-09T10:30:00.000Z', // Updated 5 days ago
    statusChangedAt: '2025-06-09T10:30:00.000Z', // 5 days in Lost
  },
]

interface LeadsStore {
  leads: Lead[]
  isLoading: boolean
  isDemoMode: boolean
  hasShownDemoNotification: boolean
  
  // Actions
  loadLeads: () => void
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'statusChangedAt'>) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  moveLead: (id: string, newStatus: LeadStatus) => void
  reorderLeads: (leadIds: string[]) => void
  getLeadsByStatus: (status: LeadStatus) => Lead[]
  canAddLead: () => boolean
  canEditLead: (id: string) => boolean
  resetDemoData: () => void
}

export const useLeads = create<LeadsStore>((set, get) => ({
  leads: [],
  isLoading: false,
  isDemoMode: true, // Demo mode is always active
  hasShownDemoNotification: false,
  
  loadLeads: () => {
    set({ isLoading: true })
    try {
      // In demo mode, check if we have existing data first
      if (get().isDemoMode) {
        const existingLeads = getLeadsFromStorage()
        
        // If no existing data or only demo data, load fresh demo data
        if (existingLeads.length === 0 || existingLeads.every(lead => lead.id.startsWith('demo-lead-'))) {
          const sampleLeads = getSampleDemoLeads()
          set({ leads: sampleLeads, isLoading: false })
          saveLeadsToStorage(sampleLeads) // Persist demo data
        } else {
          // Load existing data (mix of demo + user leads)
          set({ leads: existingLeads, isLoading: false })
        }
        
        // Show demo notification only once
        if (!get().hasShownDemoNotification) {
          set({ hasShownDemoNotification: true })
          setTimeout(() => {
            toast('🎭 Demo Mode: Try dragging leads between stages! You can add 1 more lead.', {
              duration: 6000,
              icon: '🎭',
            })
          }, 1000)
        }
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
      statusChangedAt: new Date().toISOString(),
    }
    
    const updatedLeads = [...leads, newLead]
    set({ leads: updatedLeads })
    
    // In demo mode, persist to localStorage
    if (isDemoMode) {
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
    
    // In demo mode, persist to localStorage
    if (isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    toast.success(`Lead updated${isDemoMode ? ' (Demo Mode)' : ''}!`)
  },
  
  deleteLead: (id) => {
    const { leads, isDemoMode, canEditLead } = get()
    
    // Check if this lead can be deleted
    if (!canEditLead(id)) {
      toast.error('🎭 Demo leads cannot be deleted! They persist between sessions.', {
        duration: 4000,
      })
      return
    }
    
    const lead = leads.find(l => l.id === id)
    const updatedLeads = leads.filter(lead => lead.id !== id)
    
    set({ leads: updatedLeads })
    
    // In demo mode, persist to localStorage  
    if (isDemoMode) {
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
        ? { 
            ...lead, 
            status: newStatus, 
            updatedAt: new Date().toISOString(),
            statusChangedAt: lead.status !== newStatus ? new Date().toISOString() : lead.statusChangedAt
          }
        : lead
    )
    
    set({ leads: updatedLeads })
    
    // In demo mode, persist to localStorage
    if (isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
    
    const isDemoLead = id.startsWith('demo-lead-')
    toast.success(`"${lead.name}" moved to ${newStatus}${isDemoMode ? ' (Demo)' : ''}${isDemoLead ? ' - Try the others!' : ''}`)
  },
  
  reorderLeads: (leadIds) => {
    const { leads, isDemoMode } = get()
    
    // Create a map for faster lookup
    const leadMap = new Map(leads.map(lead => [lead.id, lead]))
    
    // Reorder leads based on the new order, filtering out any undefined values
    const reorderedLeads = leadIds.map(id => leadMap.get(id)).filter((lead): lead is Lead => lead !== undefined)
    
    // Add any leads that weren't in the reorder list (shouldn't happen, but safety check)
    const reorderedIds = new Set(leadIds)
    const remainingLeads = leads.filter(lead => !reorderedIds.has(lead.id))
    
    const updatedLeads = [...reorderedLeads, ...remainingLeads]
    set({ leads: updatedLeads })
    
    // In demo mode, persist to localStorage
    if (isDemoMode) {
      saveLeadsToStorage(updatedLeads)
    }
  },
  
  getLeadsByStatus: (status) => {
    return get().leads.filter(lead => lead.status === status)
  },
  
  resetDemoData: () => {
    const sampleLeads = getSampleDemoLeads()
    set({ leads: sampleLeads, hasShownDemoNotification: false })
    saveLeadsToStorage(sampleLeads)
    toast('Demo data reset to defaults', { icon: '🔄' })
  },
})) 