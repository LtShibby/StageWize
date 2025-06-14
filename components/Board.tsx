'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { LeadStatus, Lead } from '@/types'
import { useLeads } from '@/store/useLeads'
import Column from './Column'
import LeadCard from './LeadCard'

interface BoardProps {
  onEditLead: (lead: Lead) => void
}

const columns: { id: LeadStatus; title: string }[] = [
  { id: 'New', title: 'New Leads' },
  { id: 'Contacted', title: 'Contacted' },
  { id: 'Follow-Up', title: 'Follow-Up' },
  { id: 'Won', title: 'Won' },
  { id: 'Lost', title: 'Lost' },
]

export default function Board({ onEditLead }: BoardProps) {
  const { leads, getLeadsByStatus, moveLead, loadLeads } = useLeads()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeLead, setActiveLead] = useState<Lead | null>(null)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  
  useEffect(() => {
    loadLeads()
  }, [loadLeads])
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    const lead = leads.find(l => l.id === active.id)
    setActiveLead(lead || null)
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveId(null)
      setActiveLead(null)
      return
    }
    
    const leadId = active.id as string
    const newStatus = over.id as LeadStatus
    
    // Only move if the status is different
    const currentLead = leads.find(l => l.id === leadId)
    if (currentLead && currentLead.status !== newStatus) {
      moveLead(leadId, newStatus)
    }
    
    setActiveId(null)
    setActiveLead(null)
  }
  
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {columns.map(column => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            leads={getLeadsByStatus(column.id)}
            onEditLead={onEditLead}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeLead ? (
          <div className="transform rotate-3 opacity-80">
            <LeadCard lead={activeLead} onEdit={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
} 