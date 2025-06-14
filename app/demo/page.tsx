'use client'

import { useEffect, useState } from 'react'
import Board from '@/components/Board'
import DemoBanner from '@/components/DemoBanner'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LeadForm from '@/components/LeadForm'
import Modal from '@/components/Modal'
import { useLeads } from '@/store/useLeads'
import { Lead } from '@/types'

export default function Demo() {
  const { loadLeads, canAddLead } = useLeads()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined)

  useEffect(() => {
    // Load leads on page mount (will load existing data or fresh demo data)
    loadLeads()
  }, [loadLeads])

  const handleAddLead = () => {
    if (canAddLead()) {
      setEditingLead(undefined)
      setIsFormOpen(true)
    }
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingLead(undefined)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navigation />
      <DemoBanner />
      
      <main className="w-full px-4 py-10 flex-1">
        <div className="mx-auto max-w-7xl overflow-x-auto rounded-xl bg-zinc-900 shadow-lg">
          <Header onAddLead={handleAddLead} />
          <div className="min-w-[1000px] p-6">
            <Board onEditLead={handleEditLead} />
          </div>
        </div>
      </main>

      <Modal 
        isOpen={isFormOpen} 
        onClose={handleCloseForm}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      >
        <LeadForm
          lead={editingLead}
          onClose={handleCloseForm}
        />
      </Modal>

      {/* Mobile FAB */}
      <button
        onClick={handleAddLead}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-200 z-50 md:hidden ${
          canAddLead() 
            ? 'bg-electric-blue text-white hover:bg-blue-700' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!canAddLead()}
        title={canAddLead() ? "Add new lead" : "Demo limit reached"}
      >
        <span className="text-2xl">+</span>
      </button>
      
      <Footer />
    </div>
  )
} 