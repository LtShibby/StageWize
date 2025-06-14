'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  return (
    <div className="bg-gradient-to-r from-blue-900 to-yellow-900 border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 text-black px-2 py-1 rounded-md text-xs font-bold uppercase">
              Demo Mode
            </div>
            <p className="text-white text-sm">
              🎭 You're using StageWize in demo mode. Data resets on refresh. Want full access?{' '}
              <Link 
                href="/pricing" 
                className="text-yellow-300 hover:text-yellow-200 underline font-medium"
              >
                Check pricing →
              </Link>
            </p>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors ml-4"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
} 