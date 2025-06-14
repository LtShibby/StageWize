'use client'

import { useState } from 'react'
import { Plus, Lock } from 'lucide-react'
import { Lead } from '@/types'
import { useLeads } from '@/store/useLeads'
import Header from '@/components/Header'
import Board from '@/components/Board'
import Modal from '@/components/Modal'
import LeadForm from '@/components/LeadForm'
import DemoBanner from '@/components/DemoBanner'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined)
  const { canAddLead, isDemoMode } = useLeads()
  const canAdd = canAddLead()
  
  const handleAddLead = () => {
    if (canAdd) {
      setEditingLead(undefined)
      setIsModalOpen(true)
    }
  }
  
  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingLead(undefined)
  }
  
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header onAddLead={handleAddLead} />
      
      {/* Demo Banner */}
      {isDemoMode && <DemoBanner />}
      
      <main className="max-w-7xl mx-auto p-4 lg:p-6">
        <Board onEditLead={handleEditLead} />
      </main>
      
      {/* Mobile Floating Action Button */}
      <button
        onClick={handleAddLead}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center lg:hidden transition-colors ${
          canAdd
            ? 'bg-electric-blue text-white card-glow hover:bg-blue-600'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canAdd}
        title={canAdd ? "Add new lead" : "Demo limit reached"}
        aria-label={canAdd ? "Add new lead" : "Demo limit reached"}
      >
        {canAdd ? <Plus size={24} /> : <Lock size={24} />}
      </button>
      
      {/* Lead Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      >
        <LeadForm lead={editingLead} onClose={handleCloseModal} />
      </Modal>
    </div>
  )
} 