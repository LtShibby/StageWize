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
  closestCorners,
  DragOverEvent,
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
  const [overId, setOverId] = useState<string | null>(null)
  
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
  
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setOverId(over?.id as string || null)
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    setActiveId(null)
    setActiveLead(null)
    setOverId(null)
    
    if (!over) {
      return
    }
    
    const leadId = active.id as string
    const currentLead = leads.find(l => l.id === leadId)
    
    if (!currentLead) {
      return
    }
    
    // Determine the target status
    let newStatus: LeadStatus
    
    // If dropped over a column, use that column's status
    if (columns.some(col => col.id === over.id)) {
      newStatus = over.id as LeadStatus
    } 
    // If dropped over another lead, find that lead's status/column
    else {
      const targetLead = leads.find(l => l.id === over.id)
      if (targetLead) {
        newStatus = targetLead.status
      } else {
        // Fallback: no valid drop target
        return
      }
    }
    
    // Only move if the status is different
    if (currentLead.status !== newStatus) {
      moveLead(leadId, newStatus)
    }
  }
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
            isOver={overId === column.id}
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