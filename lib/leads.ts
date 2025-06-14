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

export const exportLeadsToCSV = (leads: Lead[], isDemoMode: boolean = true): void => {
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
  
  let csvContent = [headers.join(',')]
  
  // Add demo banner if in demo mode
  if (isDemoMode) {
    csvContent.unshift(
      '"=== STAGEWIZE DEMO EXPORT ==="',
      '"This is demo data from StageWize"',
      '"Contact us for the full version: matt@wozwize.com"',
      '"Data is limited to 1 lead in demo mode"',
      '""'
    )
  }
  
  // Add lead data
  csvContent.push(
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
  )
  
  // Add footer in demo mode
  if (isDemoMode) {
    csvContent.push(
      '""',
      '"Want unlimited leads? Upgrade to StageWize Pro!"',
      '"Visit: stagewize.com | Email: matt@wozwize.com"'
    )
  }
  
  const finalContent = csvContent.join('\n')
  const blob = new Blob([finalContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    const filename = isDemoMode 
      ? `stagewize-demo-${new Date().toISOString().split('T')[0]}.csv`
      : `stagewize-leads-${new Date().toISOString().split('T')[0]}.csv`
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
} 