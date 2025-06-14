import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20 flex-1">
        <h1 className="text-4xl lg:text-5xl font-anton mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              StageWize is designed with privacy in mind. In demo mode, all data is stored locally 
              in your browser and never transmitted to our servers.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Demo data is stored in your browser's localStorage</li>
              <li>No personal information is collected in demo mode</li>
              <li>Contact form submissions are sent directly via email</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              For paid plans, we collect only the information necessary to provide our service:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Account information for authentication</li>
              <li>Lead data for CRM functionality</li>
              <li>Usage analytics to improve our service</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-300">
              We implement industry-standard security measures to protect your data. 
              All data is encrypted in transit and at rest.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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