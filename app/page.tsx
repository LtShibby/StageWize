import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BarChart3, Database, Bell, Download, Users, Building, Briefcase } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0a0e1a]/90 to-[#070c13]/95"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-anton mb-6 glitch-text" data-text="Visual Lead CRM for Closer Teams.">
                Visual Lead CRM for Closer Teams.
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8">
                Drag, drop, and close deals faster—with zero bloat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link 
                  href="/demo" 
                  className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg card-glow"
                >
                  <span>Try the Demo</span>
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/pricing" 
                  className="flex items-center space-x-2 bg-yellow-500 text-black px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium text-lg"
                >
                  <span>See Pricing</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Right side - Hero image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/HeroBannerImage.png"
                alt="StageWize Kanban Preview"
                width={600}
                height={400}
                priority
                className="max-w-lg w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card-bg/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-anton mb-4">
              Everything You Need to Close More Deals
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              StageWize gives you the essential tools without the complexity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Pipeline View</h3>
              <p className="text-gray-400">
                Drag and drop leads through your sales stages. See your entire pipeline at a glance.
              </p>
            </div>

            <div className="bg-card-bg p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Database className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local or Cloud Storage</h3>
              <p className="text-gray-400">
                Start with local storage, upgrade to cloud when you're ready to scale.
              </p>
            </div>

            <div className="bg-card-bg p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Bell className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reminders & Alerts</h3>
              <p className="text-gray-400">
                Never miss a follow-up. Get notified when it's time to reach out.
              </p>
            </div>

            <div className="bg-card-bg p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Download className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">CSV Import/Export</h3>
              <p className="text-gray-400">
                Bring your existing data in, take your data out. No vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-anton mb-4">
              Built for Teams That Close
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're flying solo or leading a team, StageWize scales with you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-black" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Freelancers</h3>
              <p className="text-gray-400">
                Track client opportunities and never let a lead slip through the cracks. 
                Perfect for consultants, designers, and service providers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-black" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Sales Teams</h3>
              <p className="text-gray-400">
                Collaborate on deals, share pipeline visibility, and close more together. 
                Built for teams of 2-50 people.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="text-black" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Small Agencies</h3>
              <p className="text-gray-400">
                Manage client relationships and new business development. 
                White-label options available for client-facing work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] via-[#0a0e1a]/90 to-[#070c13]/95">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-anton mb-6">
            Ready to Close More Deals?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of sales professionals who've simplified their pipeline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/demo"
              className="flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              <span>Try Free Demo</span>
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/pricing"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors font-medium text-lg"
            >
              <span>View Pricing</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 