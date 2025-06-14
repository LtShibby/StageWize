'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { LeadStatus, Lead } from '@/types'
import LeadCard from './LeadCard'

interface ColumnProps {
  id: LeadStatus
  title: string
  leads: Lead[]
  onEditLead: (lead: Lead) => void
  isOver?: boolean
}

const columnColors = {
  'New': 'border-blue-500',
  'Contacted': 'border-yellow-500',
  'Follow-Up': 'border-orange-500',
  'Won': 'border-green-500',
  'Lost': 'border-red-500',
}

const columnBgColors = {
  'New': 'bg-blue-500/10',
  'Contacted': 'bg-yellow-500/10',
  'Follow-Up': 'bg-orange-500/10',
  'Won': 'bg-green-500/10',
  'Lost': 'bg-red-500/10',
}

export default function Column({ id, title, leads, onEditLead, isOver = false }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id })
  
  return (
    <div className="flex-1 min-w-[280px] max-w-[350px]">
      <div className={`border-t-4 ${columnColors[id]} bg-card-bg rounded-lg shadow-lg`}>
        <div className="p-4 border-b border-border-gray">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">{title}</h2>
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
              {leads.length}
            </span>
          </div>
        </div>
        
        <div
          ref={setNodeRef}
          className={`
            min-h-[500px] p-4 transition-all duration-200
            ${isOver ? 'drop-zone' : ''}
            ${isOver ? columnBgColors[id] : ''}
          `}
        >
          <SortableContext items={leads.map(lead => lead.id)} strategy={verticalListSortingStrategy}>
            {leads.length > 0 ? (
              leads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={onEditLead}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg">📋</p>
                <p className="text-sm">No leads in this stage</p>
                <p className="text-xs mt-1 text-gray-600">Drag leads here or add new ones</p>
              </div>
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  )
} 