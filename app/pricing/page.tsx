import Link from 'next/link'
import { Check, ArrowRight, Star, Crown, Zap } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free Demo',
      price: '$0',
      period: '',
      description: 'Try before you buy',
      icon: <Zap className="text-gray-400" size={24} />,
      features: [
        'LocalStorage only',
        'Max 1 lead',
        'Auto-wipe on refresh',
        'No persistence',
        'Basic kanban view'
      ],
      cta: 'Try Demo',
      ctaLink: '/demo',
      popular: false,
      buttonStyle: 'bg-gray-600 text-white hover:bg-gray-700'
    },
    {
      name: 'StageWize Solo',
      price: '$19',
      period: '/mo',
      yearlyPrice: '$190/yr',
      description: 'Perfect for individual professionals',
      icon: <Star className="text-blue-400" size={24} />,
      features: [
        '1 user',
        'Hosted cloud DB',
        'Full Kanban features',
        'CSV import/export',
        'Reminders + alerts',
        'Email support',
        'Mobile responsive'
      ],
      cta: 'Start Solo',
      ctaLink: 'mailto:matt@wozwize.com?subject=StageWize Solo - Get Started',
      popular: true,
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700 card-glow'
    },
    {
      name: 'StageWize Team',
      price: '$59',
      period: '/mo',
      yearlyPrice: '$590/yr',
      description: 'Built for growing sales teams',
      icon: <Crown className="text-yellow-400" size={24} />,
      features: [
        'Up to 5 users',
        'Multi-user pipeline',
        'Admin tools',
        'WhatsApp + Email reminders',
        'Audit logs',
        'Team collaboration',
        'Priority support',
        'Advanced reporting'
      ],
      cta: 'Start Team',
      ctaLink: 'mailto:matt@wozwize.com?subject=StageWize Team - Get Started',
      popular: false,
      buttonStyle: 'bg-yellow-500 text-black hover:bg-yellow-400'
    },
    {
      name: 'StageWize Agency',
      price: '$149',
      period: '/mo',
      setupFee: '$1500 setup',
      description: 'Enterprise solution for agencies',
      icon: <Crown className="text-purple-400" size={24} />,
      features: [
        'White-label branding',
        'Client staging',
        'Dedicated DB',
        'Priority support',
        'Custom onboarding',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      ctaLink: 'mailto:matt@wozwize.com?subject=StageWize Agency - Enterprise Inquiry',
      popular: false,
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-anton mb-6 glitch-text" data-text="Simple Pricing, Powerful Results">
            Simple Pricing, Powerful Results
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your team size and needs. All plans include our core visual pipeline features.
          </p>
          <div className="inline-flex items-center bg-card-bg rounded-lg p-1 mb-12">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
              Monthly
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Yearly (Save 17%)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative bg-card-bg rounded-lg border-2 p-8 ${
                  plan.popular 
                    ? 'border-blue-600 transform scale-105' 
                    : 'border-gray-800 hover:border-gray-700'
                } transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-anton mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  
                  {plan.yearlyPrice && (
                    <div className="text-sm text-green-400 mb-2">
                      or {plan.yearlyPrice} (save 17%)
                    </div>
                  )}
                  
                  {plan.setupFee && (
                    <div className="text-sm text-gray-400">
                      + {plan.setupFee}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={plan.ctaLink}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors font-medium ${plan.buttonStyle}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card-bg/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-anton mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Everything you need to know about StageWize</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Can I switch plans anytime?</h3>
              <p className="text-gray-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing differences.
              </p>
            </div>
            
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">What happens to my data if I cancel?</h3>
              <p className="text-gray-400">
                You can export all your data as CSV before canceling. We keep your data for 30 days 
                after cancellation in case you want to reactivate.
              </p>
            </div>
            
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Do you offer custom integrations?</h3>
              <p className="text-gray-400">
                Yes! Agency plan includes custom integrations. For other plans, we can discuss 
                custom development on a project basis.
              </p>
            </div>
            
            <div className="bg-card-bg p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-gray-400">
                Our demo gives you a full experience of the core features. For paid plans, 
                we offer a 14-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-yellow-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-anton mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join hundreds of sales professionals who've simplified their pipeline with StageWize
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/demo"
              className="flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              <span>Try Free Demo</span>
              <ArrowRight size={20} />
            </Link>
            <a 
              href="mailto:matt@wozwize.com?subject=StageWize - Let's Talk"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-colors font-medium text-lg"
            >
              <span>Contact Sales</span>
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 