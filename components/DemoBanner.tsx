'use client'

import { X, ExternalLink } from 'lucide-react'
import { useState } from 'react'

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
              🎭 <strong>Explore StageWize!</strong> Try dragging the demo leads • Add your own lead (1 max) • Everything resets on refresh
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-yellow-300 text-sm">
              Ready to unlock unlimited leads?
            </span>
            <a 
              href="mailto:matt@wozwize.com?subject=StageWize%20Pro%20Upgrade&body=Hi! I'd like to upgrade from the StageWize demo to get unlimited leads and full features."
              className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-yellow-400 transition-colors"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 