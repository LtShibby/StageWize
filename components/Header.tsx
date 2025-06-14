'use client'

import Image from 'next/image'
import { Plus, Download } from 'lucide-react'
import { useLeads } from '@/store/useLeads'
import { exportLeadsToCSV } from '@/lib/leads'

interface HeaderProps {
  onAddLead: () => void
}

export default function Header({ onAddLead }: HeaderProps) {
  const { leads, canAddLead, isDemoMode } = useLeads()

  const handleExport = () => {
    exportLeadsToCSV(leads, isDemoMode)
  }

  return (
    <div className="bg-zinc-800 border-b border-zinc-700 p-4 rounded-t-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logoIcon.png"
            alt="StageWize"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div>
            <h1 className="text-xl font-anton text-white">StageWize Demo</h1>
            <p className="text-sm text-zinc-400">Visual Lead Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
            disabled={leads.length === 0}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          
          <button
            onClick={onAddLead}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              canAddLead()
                ? 'bg-electric-blue text-white hover:bg-blue-700'
                : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
            }`}
            disabled={!canAddLead()}
            title={canAddLead() ? "Add new lead" : "Demo limit reached"}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Lead</span>
          </button>
        </div>
      </div>
    </div>
  )
} 