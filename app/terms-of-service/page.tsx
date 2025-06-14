import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20 flex-1">
        <h1 className="text-4xl lg:text-5xl font-anton mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using StageWize, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Demo Mode</h2>
            <p className="text-gray-300 mb-4">
              The demo version of StageWize is provided for evaluation purposes only:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Limited to 1 user-created lead</li>
              <li>Data resets on page refresh</li>
              <li>No data persistence or backup</li>
              <li>No warranty or support provided</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Paid Services</h2>
            <p className="text-gray-300 mb-4">
              For paid plans, additional terms apply:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Monthly or annual billing as selected</li>
              <li>14-day money-back guarantee</li>
              <li>Service level agreements as specified in your plan</li>
              <li>Data backup and recovery included</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-300">
              StageWize is provided "as is" without warranty of any kind. We shall not be liable 
              for any damages arising from the use of this service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-300">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:matt@wozwize.com" className="text-blue-400 hover:text-blue-300">
                matt@wozwize.com
              </a>
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 