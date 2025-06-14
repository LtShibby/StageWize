'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit, Trash2, Mail, Phone, Building } from 'lucide-react'
import { Lead } from '@/types'
import { useLeads } from '@/store/useLeads'

interface LeadCardProps {
  lead: Lead
  onEdit: (lead: Lead) => void
}

const statusColors = {
  'New': 'border-l-blue-500',
  'Contacted': 'border-l-yellow-500',
  'Follow-Up': 'border-l-orange-500',
  'Won': 'border-l-green-500',
  'Lost': 'border-l-red-500',
}

export default function LeadCard({ lead, onEdit }: LeadCardProps) {
  const { deleteLead } = useLeads()
  const [showActions, setShowActions] = useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${lead.name}"?`)) {
      deleteLead(lead.id)
    }
  }
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-card-bg border-l-4 ${statusColors[lead.status]} rounded-lg p-4 mb-3 cursor-grab 
        hover:shadow-lg transition-all duration-200 group
        ${isDragging ? 'dragging' : 'card-glow'}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white text-sm">{lead.name}</h3>
        <div className={`flex space-x-1 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(lead)
            }}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-electric-blue"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
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
          <span className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
            {lead.leadSource}
          </span>
        </div>
      )}
      
      {lead.notes && (
        <div className="mt-2 text-gray-400 text-xs">
          <p className="line-clamp-2">{lead.notes}</p>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        {new Date(lead.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
} 