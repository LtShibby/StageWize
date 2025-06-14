'use client'

import { Download, Plus, Lock } from 'lucide-react'
import { useLeads } from '@/store/useLeads'
import { exportLeadsToCSV } from '@/lib/leads'

interface HeaderProps {
  onAddLead: () => void
}

export default function Header({ onAddLead }: HeaderProps) {
  const { leads, canAddLead, isDemoMode } = useLeads()
  const canAdd = canAddLead()
  
  // Separate demo and user leads
  const demoLeads = leads.filter(lead => lead.id.startsWith('demo-lead-'))
  const userLeads = leads.filter(lead => !lead.id.startsWith('demo-lead-'))
  
  const handleExport = () => {
    if (isDemoMode && leads.length === 0) {
      return // No export in demo mode with no data
    }
    exportLeadsToCSV(leads, isDemoMode)
  }
  
  const handleAddClick = () => {
    if (canAdd) {
      onAddLead()
    }
  }
  
  return (
    <header className="bg-card-bg border-b border-border-gray p-4 lg:p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-anton text-xl">SW</span>
            </div>
            <div>
              <h1 
                className="text-2xl lg:text-3xl font-anton text-white glitch-text" 
                data-text="StageWize"
              >
                StageWize
              </h1>
              <p className="text-gray-400 text-sm">
                Visual Lead Pipeline {isDemoMode && <span className="text-yellow-400">• Demo Mode</span>}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-sm text-gray-400">
            {isDemoMode ? (
              <div className="text-right">
                <div>{demoLeads.length} demo leads • {userLeads.length}/1 your leads</div>
                <div className="text-xs text-yellow-400">Try dragging the demo leads!</div>
              </div>
            ) : (
              `${leads.length} lead${leads.length !== 1 ? 's' : ''} total`
            )}
          </div>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={leads.length === 0}
            title={isDemoMode ? "Export demo data (limited)" : "Export all leads to CSV"}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          
          <button
            onClick={handleAddClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              canAdd 
                ? 'bg-blue-600 text-white hover:bg-blue-700 card-glow' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!canAdd}
            title={canAdd ? "Add new lead" : "Demo limit reached - upgrade for unlimited leads"}
          >
            {canAdd ? <Plus size={16} /> : <Lock size={16} />}
            <span>{canAdd ? 'Add Lead' : 'Locked'}</span>
          </button>
        </div>
      </div>
    </header>
  )
} 