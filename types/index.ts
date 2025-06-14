export type LeadStatus = 'New' | 'Contacted' | 'Follow-Up' | 'Won' | 'Lost'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  leadSource: string
  notes: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
  statusChangedAt: string
}

export interface Column {
  id: LeadStatus
  title: string
  color: string
  leads: Lead[]
}

export type ThemeMode = 'dark' | 'light' 