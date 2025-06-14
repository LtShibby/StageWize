import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'StageWize - Visual Lead Management CRM',
  description: 'A modern, visual lead management system with kanban-style pipeline for sales teams and solo operators.',
  keywords: 'CRM, lead management, sales pipeline, kanban board, visual CRM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #2a2a2a',
            },
            success: {
              style: {
                border: '1px solid #0080FF',
              },
            },
            error: {
              style: {
                border: '1px solid #ff4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 