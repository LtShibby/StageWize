'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Lead } from '@/types'
import Header from '@/components/Header'
import Board from '@/components/Board'
import Modal from '@/components/Modal'
import LeadForm from '@/components/LeadForm'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  
  const handleAddLead = () => {
    setEditingLead(null)
    setIsModalOpen(true)
  }
  
  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingLead(null)
  }
  
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header onAddLead={handleAddLead} />
      
      <main className="max-w-7xl mx-auto p-4 lg:p-6">
        <Board onEditLead={handleEditLead} />
      </main>
      
      {/* Mobile Floating Action Button */}
      <button
        onClick={handleAddLead}
        className="fixed bottom-6 right-6 w-14 h-14 bg-electric-blue text-white rounded-full shadow-lg flex items-center justify-center lg:hidden card-glow hover:bg-blue-600 transition-colors"
        aria-label="Add new lead"
      >
        <Plus size={24} />
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