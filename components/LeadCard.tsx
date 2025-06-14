'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit, Trash2, Mail, Phone, Building, Lock, Clock } from 'lucide-react'
import { Lead } from '@/types'
import { useLeads } from '@/store/useLeads'

interface LeadCardProps {
  lead: Lead
  onEdit: (lead: Lead) => void
}

const statusColors: Record<string, string> = {
  'New': 'border-l-blue-500',
  'Contacted': 'border-l-yellow-500',
  'Follow-Up': 'border-l-orange-500',
  'Won': 'border-l-green-500',
  'Lost': 'border-l-red-500',
}

// Calculate days in current status
const getDaysInStatus = (statusChangedAt: string): number => {
  const statusDate = new Date(statusChangedAt)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - statusDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Format days for display
const formatDaysInStatus = (days: number): string => {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day'
  return `${days} days`
}

export default function LeadCard({ lead, onEdit }: LeadCardProps) {
  const { deleteLead, canEditLead } = useLeads()
  const [showActions, setShowActions] = useState(false)
  const isEditable = canEditLead(lead.id)
  const isDemoLead = lead.id.startsWith('demo-lead-')
  const daysInStatus = getDaysInStatus(lead.statusChangedAt)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: lead.id,
    data: {
      type: 'lead',
      lead,
    }
  })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${lead.name}"?`)) {
      deleteLead(lead.id)
    }
  }
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isEditable) {
      onEdit(lead)
    }
  }
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-card-bg border-l-4 ${statusColors[lead.status] || 'border-l-gray-500'} 
        rounded-lg p-4 mb-3 cursor-grab hover:shadow-lg transition-all duration-200 
        group relative ${isDemoLead ? 'bg-gradient-to-br from-card-bg to-gray-800' : ''}
        ${isDragging ? 'z-50' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      {...attributes}
      {...listeners}
    >
      {/* Demo Lead Badge */}
      {isDemoLead && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <span>🎭</span>
          <span>Demo</span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white text-sm pr-12">{lead.name}</h3>
        <div className={`flex space-x-1 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleEdit}
            className={`p-1 hover:bg-gray-700 rounded transition-colors ${
              isEditable 
                ? 'text-gray-400 hover:text-blue-400' 
                : 'text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isEditable}
            title={isEditable ? 'Edit lead' : 'Demo leads cannot be edited - add your own!'}
          >
            {isEditable ? <Edit size={14} /> : <Lock size={14} />}
          </button>
          <button
            onClick={handleDelete}
            className={`p-1 hover:bg-gray-700 rounded transition-colors ${
              isEditable 
                ? 'text-gray-400 hover:text-red-400' 
                : 'text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isEditable}
            title={isEditable ? 'Delete lead' : 'Demo leads cannot be deleted'}
          >
            {isEditable ? <Trash2 size={14} /> : <Lock size={14} />}
          </button>
        </div>
      </div>
      
      {/* Days in Status Indicator */}
      <div className="flex items-center text-yellow-400 text-xs mb-2">
        <Clock size={12} className="mr-1" />
        <span>{formatDaysInStatus(daysInStatus)} in {lead.status}</span>
      </div>
      
      {lead.company && (
        <div className="flex items-center text-gray-300 text-xs mb-2">
          <Building size={12} className="mr-1" />
          {lead.company}
        </div>
      )}
      
      <div className="space-y-1">
        {lead.email && (
          <div className="flex items-center text-gray-400 text-xs">
            <Mail size={12} className="mr-1" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
        
        {lead.phone && (
          <div className="flex items-center text-gray-400 text-xs">
            <Phone size={12} className="mr-1" />
            {lead.phone}
          </div>
        )}
      </div>
      
      {lead.leadSource && (
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 text-xs rounded ${
            isDemoLead 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}>
            {lead.leadSource}
          </span>
        </div>
      )}
      
      {lead.notes && (
        <div className="mt-2 text-gray-400 text-xs">
          <p className="line-clamp-2">{lead.notes}</p>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
        {isDemoLead && (
          <span className="text-blue-400 font-medium">Drag me!</span>
        )}
      </div>
    </div>
  )
} 