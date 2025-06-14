'use client'

import { useState, useEffect } from 'react'
import { Lead, LeadStatus } from '@/types'
import { useLeads } from '@/store/useLeads'

interface LeadFormProps {
  lead?: Lead
  onClose: () => void
}

const leadSources = [
  'Website',
  'Referral',
  'Cold Call',
  'Email Campaign',
  'Social Media',
  'Trade Show',
  'Advertisement',
  'Other'
]

const statuses: { value: LeadStatus; label: string }[] = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Follow-Up', label: 'Follow-Up' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' },
]

export default function LeadForm({ lead, onClose }: LeadFormProps) {
  const { addLead, updateLead } = useLeads()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    leadSource: 'Website',
    notes: '',
    status: 'New' as LeadStatus,
  })
  
  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        leadSource: lead.leadSource,
        notes: lead.notes,
        status: lead.status,
      })
    }
  }, [lead])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim()) {
      return
    }
    
    if (lead) {
      updateLead(lead.id, formData)
    } else {
      addLead(formData)
    }
    
    onClose()
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Lead Source
          </label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
          >
            {leadSources.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 bg-dark-bg border border-border-gray rounded-lg text-white focus:outline-none focus:border-electric-blue resize-none"
          placeholder="Add any additional notes about this lead..."
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {lead ? 'Update Lead' : 'Add Lead'}
        </button>
      </div>
    </form>
  )
} 