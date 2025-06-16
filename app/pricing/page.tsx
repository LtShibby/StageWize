'use client'

import Link from 'next/link'
import { Check, ArrowRight, Star, Crown, Zap, ChevronDown } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function PricingPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
      setOpenFAQ(openFAQ === index ? null : index)
    }

    const faqs = [
      {
        question: "Is there a free trial?",
        answer: "Our demo gives you a full experience of the core features. For paid plans, we offer a 14-day money-back guarantee."
      },
      {
        question: "Is there an onboarding fee?",
        answer: "Yes. To ensure every customer gets started on the right foot, all paid plans include a one-time $99 onboarding fee. This covers personalized setup help, workflow walkthroughs, and Q&A with our team. (Legacy Stage clients get custom onboarding as part of their contract.) \n\n We make onboarding mandatory because bad onboarding leads to churn, confusion, and complaints. We'd rather give you a strong foundation and make sure StageWize fits your workflow — not waste your time guessing."
      },
      {
        question: "What if I want to import my existing data?",
        answer: "We offer a CSV Import Setup service for complex files or custom mapping. Just reach out — pricing varies depending on your format and needs."
      },
      {
        question: "What happens to my data if I cancel?",
        answer: "You can export all your data as CSV before canceling. We keep your data for 30 days after cancellation in case you want to reactivate."
      },
      {
        question: "Do you offer custom integrations?",
        answer: "Yes! Our Agency plan includes full support for custom integrations. If you are on a lower-tier plan and need something specific (like syncing with your CRM, Slack, or another tool), we are happy to scope it out as a one-time development add-on."
      },
      {
        question: "Can I increase the number of leads I can store?",
        answer: "Absolutely. All paid plans come with a base lead allowance, but you can expand it anytime. Additional lead blocks (50 per block) are just $2.50/month."
      },
      {
        question: "Can I get a custom subdomain for my business?",
        answer: "Yep — we can set up a private subdomain like yourteam.stagewize.com. This is available for Growth Stage and above. Contact us to discuss setup options."
      }
    ]

    const plans = [
      {
        name: 'Starter Stage',
        price: '$19',
        period: '/mo',
        description: 'For individual professionals',
        icon: <Star className="text-blue-400" size={24} />,
        features: [
          '1 user',
          '50 lead records total',
          'Basic kanban',
          'CSV export'
        ],
        cta: 'Start Starter',
        ctaLink: 'mailto:matt@wozwize.com?subject=Starter Stage - Get Started',
        popular: true,
        buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700 card-glow'
      },
      {
        name: 'Growth Stage',
        price: '$75',
        period: '/mo',
        description: 'For small teams ready to grow',
        icon: <Star className="text-yellow-400" size={24} />,
        features: [
          'Up to 5 users',
          '50 leads per user (250 max)',
          'CSV export',
          'Custom stages',
          'Reminders + alert rules'
        ],
        cta: 'Start Growth',
        ctaLink: 'mailto:matt@wozwize.com?subject=Growth Stage - Get Started',
        popular: false,
        buttonStyle: 'bg-yellow-500 text-black hover:bg-yellow-400'
      },
      {
        name: 'Momentum Stage',
        price: '$130',
        period: '/mo',
        description: 'For scaling teams who mean business',
        icon: <Crown className="text-purple-400" size={24} />,
        features: [
          'Up to 10 users',
          '100 leads per user',
          'User roles + permissions',
          'Bulk actions',
          'Priority email support',
          'Premium support access'
        ],
        cta: 'Start Momentum',
        ctaLink: 'mailto:matt@wozwize.com?subject=Momentum Stage - Get Started',
        popular: false,
        buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700'
      },
      {
        name: 'Legacy Stage',
        price: "Let's Chat!",
        period: '',
        setupFee: "",
        description: 'Custom enterprise solutions',
        icon: <Crown className="text-gray-400" size={24} />,
        features: [
          'Unlimited users',
          'Unlimited leads',
          'Dedicated database',
          'White-label branding',
          'Custom onboarding',
          'Private subdomain',
          'Optional integrations (by agreement)'
        ],
        cta: 'Contact Sales',
        ctaLink: 'mailto:matt@wozwize.com?subject=Legacy Stage - Custom Inquiry',
        popular: false,
        buttonStyle: 'bg-gray-700 text-white hover:bg-gray-600'
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

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card-bg rounded-lg border border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="text-xl font-semibold pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`} 
                    size={20} 
                  />
                </button>
                <div
                  className={`px-6 pb-6 transition-all duration-300 ease-in-out origin-top transform ${
                    openFAQ === index ? 'scale-y-100 opacity-100 h-auto' : 'scale-y-0 opacity-0 h-0'
                  }`}
                  style={{ transitionProperty: 'transform, opacity, height' }}
                >
                                     <div className="text-gray-400 leading-relaxed">
                     {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                       <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
                         {paragraph}
                       </p>
                     ))}
                   </div>
                </div>
              </div>
            ))}
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