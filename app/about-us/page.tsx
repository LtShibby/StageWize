import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20 flex-1">
        <h1 className="text-4xl lg:text-5xl font-anton mb-8">About Us</h1>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              StageWize was born from the frustration of using overly complex CRM systems that 
              get in the way of actually closing deals. We believe lead management should be 
              visual, intuitive, and focused on what matters most - moving prospects through 
              your pipeline.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why StageWize?</h2>
            <p className="text-gray-300 mb-4">
              Traditional CRMs are built for enterprise teams with complex workflows. But most 
              sales professionals just need to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>See their pipeline at a glance</li>
              <li>Move leads between stages quickly</li>
              <li>Track follow-ups and notes</li>
              <li>Export data when needed</li>
            </ul>
            <p className="text-gray-300">
              StageWize does exactly that - nothing more, nothing less.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Built by WozWize</h2>
            <p className="text-gray-300 mb-4">
              StageWize is developed by{' '}
              <a 
                href="https://wozwize.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                WozWize
              </a>
              , a team focused on creating simple, effective tools for sales professionals 
              and small businesses.
            </p>
            <p className="text-gray-300">
              We believe in building software that gets out of your way and lets you focus 
              on what you do best - building relationships and closing deals.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-4">
              We'd love to hear from you! Whether you have questions, feedback, or just want 
              to say hello, reach out to us:
            </p>
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800">
              <p className="text-gray-300 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:matt@wozwize.com" className="text-blue-400 hover:text-blue-300">
                  matt@wozwize.com
                </a>
              </p>
              <p className="text-gray-300">
                <strong>Website:</strong>{' '}
                <a 
                  href="https://wozwize.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  wozwize.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 