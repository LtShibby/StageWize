import { Lead } from '@/types'

const STORAGE_KEY = 'stagewize-leads'

export const getLeadsFromStorage = (): Lead[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading leads from storage:', error)
    return []
  }
}

export const saveLeadsToStorage = (leads: Lead[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  } catch (error) {
    console.error('Error saving leads to storage:', error)
  }
}

export const generateLeadId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const exportLeadsToCSV = (leads: Lead[]): void => {
  const headers = [
    'Name',
    'Email',
    'Phone',
    'Company',
    'Lead Source',
    'Status',
    'Notes',
    'Created At',
    'Updated At'
  ]
  
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      `"${lead.name}"`,
      `"${lead.email}"`,
      `"${lead.phone}"`,
      `"${lead.company}"`,
      `"${lead.leadSource}"`,
      `"${lead.status}"`,
      `"${lead.notes.replace(/"/g, '""')}"`,
      `"${lead.createdAt}"`,
      `"${lead.updatedAt}"`
    ].join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `stagewize-leads-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
} 