'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const FEATURES = [
  {
    title: 'AI-Powered Content',
    description: 'Let GPT-4 and Claude craft compelling, professional CV content tailored to your target role.'
  },
  {
    title: 'Full Customization',
    description: 'Choose templates, colors, fonts, layout, and sections to create a CV that\'s truly yours.'
  },
  {
    title: 'ATS Optimized',
    description: 'Pass automated screening systems with keyword-optimized, properly formatted content.'
  },
  {
    title: 'Real-Time Preview',
    description: 'See every change instantly with a live preview that mimics the final PDF output.'
  },
  {
    title: 'Job-Targeted',
    description: 'Paste a job description and watch your CV get tailored specifically for that role.'
  },
  {
    title: 'Instant PDF Export',
    description: 'Download a print-ready, professional PDF in seconds.'
  }
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '3 CVs',
      '50 AI calls/month',
      '5 templates',
      'Standard PDF export'
    ],
    cta: 'Start Free'
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    features: [
      'Unlimited CVs',
      'Unlimited AI calls',
      'All templates',
      'Priority AI (faster)',
      'ATS scoring',
      'Version history',
      'No watermark'
    ],
    featured: true,
    cta: 'Go Pro'
  },
  {
    name: 'Enterprise',
    price: '$29',
    period: '/user/month',
    features: [
      'Everything in Pro',
      'Team management',
      'API access',
      'Custom branding',
      'Priority support',
      'SSO'
    ],
    cta: 'Contact Us'
  }
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent py-20 md:py-28 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Your Perfect CV
              <span className="block text-primary-200 mt-2">
                Powered by AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto mb-10">
              Generate a professional, customizable CV in minutes. Let AI write
              your content, then fine-tune every detail—design, layout, sections,
              and style—to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
              >
                Start Creating Free
              </Link>
              <Link
                href="/templates"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Templates
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-200">
              No credit card required • Set up in under 5 minutes
            </p>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              From AI content generation to pixel-perfect customization,
              we&apos;ve got every aspect of CV creation covered.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Tell AI About Yourself',
                  description: 'Enter your basic information and optionally paste a job description.'
                },
                {
                  step: '02',
                  title: 'AI Writes & You Refine',
                  description: 'AI generates professional content. Edit, tweak, and perfect every word.'
                },
                {
                  step: '03',
                  title: 'Design & Download',
                  description: 'Customize the template, colors, and layout, then export a polished PDF.'
                }
              ].map((step) => (
                <div key={step.step} className="relative p-8 text-center">
                  <div className="text-6xl font-bold text-primary-200 mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
              >
                Create Your CV Now
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Start free and upgrade when you&apos;re ready for more.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`p-8 rounded-xl ${
                    plan.featured
                      ? 'bg-primary-600 text-white shadow-2xl transform md:-translate-y-4'
                      : 'bg-white shadow-md'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm opacity-80">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 ${
                            plan.featured ? 'text-primary-200' : 'text-primary-600'
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/register')}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.featured
                        ? 'bg-white text-primary-700 hover:bg-primary-50'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
