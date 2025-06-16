'use client'

import { useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit, Trash2, Mail, Phone, Building, Lock, Clock } from 'lucide-react'
import { Lead, LeadStatus } from '@/types'
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
  try {
    const statusDate = new Date(statusChangedAt)
    const now = new Date()
    
    // Check if dates are valid
    if (isNaN(statusDate.getTime()) || isNaN(now.getTime())) {
      return 0
    }
    
    const diffTime = Math.abs(now.getTime() - statusDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  } catch (error) {
    console.warn('Error calculating days in status:', error)
    return 0
  }
}

// Format days for display
const formatDaysInStatus = (days: number): string => {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day'
  return `${days} days`
}

export default function LeadCard({ lead, onEdit }: LeadCardProps) {
  const { deleteLead, canEditLead, moveLead } = useLeads()
  const [showActions, setShowActions] = useState(false)
  const [showMobileActions, setShowMobileActions] = useState(false)
  const isEditable = canEditLead(lead.id)
  const isDemoLead = lead.id.startsWith('demo-lead-')
  const daysInStatus = getDaysInStatus(lead.statusChangedAt)
  
  // Define all available columns for mobile navigation
  const allColumns: { id: LeadStatus; title: string; color: string }[] = [
    { id: 'New', title: 'New Leads', color: 'bg-blue-600' },
    { id: 'Contacted', title: 'Contacted', color: 'bg-yellow-600' },
    { id: 'Follow-Up', title: 'Follow-Up', color: 'bg-orange-600' },
    { id: 'Won', title: 'Won', color: 'bg-green-600' },
    { id: 'Lost', title: 'Lost', color: 'bg-red-600' },
  ]
  
  // Get available columns (exclude current status)
  const availableColumns = allColumns.filter(col => col.id !== lead.status)
  
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
  
  const handleMoveToColumn = (newStatus: LeadStatus) => (e: React.MouseEvent) => {
    e.stopPropagation()
    moveLead(lead.id, newStatus)
    setShowMobileActions(false)
  }
  
  const handleMobileCardTap = () => {
    setShowMobileActions(!showMobileActions)
  }
  
  // Close mobile actions when another card is tapped or when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMobileActions(false)
    }
    
    if (showMobileActions) {
      // Small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timer)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showMobileActions])
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-card-bg border-l-4 ${statusColors[lead.status] || 'border-l-gray-500'} 
        rounded-lg p-4 mb-3 cursor-grab hover:shadow-lg transition-all duration-200 
        group relative ${isDemoLead ? 'bg-gradient-to-br from-card-bg to-gray-800' : ''}
        ${isDragging ? 'z-50' : ''}
        ${showMobileActions ? 'ring-2 ring-blue-500' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleMobileCardTap}
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
        {isDemoLead && !showMobileActions && (
          <span className="text-blue-400 font-medium md:hidden">Tap to move!</span>
        )}
        {isDemoLead && !showMobileActions && (
          <span className="text-blue-400 font-medium hidden md:inline">Drag me!</span>
        )}
      </div>
      
      {/* Mobile Move Buttons */}
      {showMobileActions && (
        <div className="mt-3 md:hidden">
          <div className="text-center mb-2">
            <span className="text-xs text-gray-400 font-medium">Move to:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {availableColumns.map((column) => (
              <button
                key={column.id}
                onClick={handleMoveToColumn(column.id)}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${column.color} text-white hover:opacity-80`}
              >
                <span>{column.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {showMobileActions && (
        <div className="mt-2 text-center md:hidden">
          <span className="text-xs text-gray-400">Tap card again to close</span>
        </div>
      )}
    </div>
  )
} 