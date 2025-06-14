'use client'

import { Download, Plus } from 'lucide-react'
import { useLeads } from '@/store/useLeads'
import { exportLeadsToCSV } from '@/lib/leads'

interface HeaderProps {
  onAddLead: () => void
}

export default function Header({ onAddLead }: HeaderProps) {
  const { leads } = useLeads()
  
  const handleExport = () => {
    exportLeadsToCSV(leads)
  }
  
  return (
    <header className="bg-card-bg border-b border-border-gray p-4 lg:p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-electric-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-anton text-xl">SW</span>
            </div>
            <div>
              <h1 
                className="text-2xl lg:text-3xl font-anton text-white glitch-text" 
                data-text="StageWize"
              >
                StageWize
              </h1>
              <p className="text-gray-400 text-sm">Visual Lead Pipeline</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-sm text-gray-400">
            {leads.length} leads total
          </div>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-electric-yellow text-black rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            disabled={leads.length === 0}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          
          <button
            onClick={onAddLead}
            className="flex items-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors font-medium card-glow"
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>
    </header>
  )
} 