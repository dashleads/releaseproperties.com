import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Home() {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observerRef.current.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 text-white overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="text-center animate-fade-in">
            <p className="text-amber-400 font-medium tracking-wide mb-6">
              Cash Offers in USA & Canada
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
              Sell Your Property
              <span className="block mt-2">Fast & Easy</span>
            </h1>
            <p className="text-xl text-navy-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              Skip the hassle of traditional real estate. We buy homes and land directly
              from owners — no agents, no repairs, no waiting months for a sale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz" className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-navy-900 font-semibold rounded-full hover:bg-amber-400 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25">
                Get Your Cash Offer
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-200">
                See How It Works
              </a>
            </div>

            {/* Simple trust indicators */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-navy-400">
                <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-1">7 Days</div>
                  <div className="text-sm">Fast Closing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-1">$0 Fees</div>
                  <div className="text-sm">No Commissions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-white mb-1">Any Condition</div>
                  <div className="text-sm">No Repairs Needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>


      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <div className="section-label justify-center mb-4">The Process</div>
            <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto">
              We've simplified property sales. No open houses, no negotiations, no uncertainty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '01', title: 'Submit Your Property', desc: 'Share basic details about your property through our simple form. Takes less than 2 minutes.' },
              { num: '02', title: 'Get Your Cash Offer', desc: 'We review the details and present you with a fair, no-obligation cash offer within 24-48 hours.' },
              { num: '03', title: 'Close & Get Paid', desc: 'Accept the offer and choose your closing date. We handle everything — you receive cash.' }
            ].map((step, i) => (
              <div key={i} className={`animate-on-scroll opacity-0 delay-${(i + 1) * 100}`}>
                <div className="group bg-navy-50 p-8 lg:p-10 hover:bg-navy-900 transition-all duration-500 card-hover">
                  <div className="text-6xl font-serif text-amber-500 mb-6 group-hover:text-amber-400 transition-colors">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-2xl text-navy-900 group-hover:text-white mb-4 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-navy-600 group-hover:text-navy-300 transition-colors leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 lg:py-32 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="section-label text-amber-400 before:bg-amber-400 mb-4">What We Buy</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                We Purchase All
                <span className="text-amber-400"> Property Types</span>
              </h2>
              <p className="text-xl text-navy-300 leading-relaxed mb-8">
                Whether it's a family home that needs repairs, vacant land you inherited,
                or a commercial building — we're ready to make you a fair cash offer.
              </p>
              <Link to="/quiz" className="btn-primary">
                Request Your Offer
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0 delay-200">
              {[
                { icon: '🏠', title: 'Houses', desc: 'Single & multi-family homes' },
                { icon: '🏢', title: 'Commercial', desc: 'Retail, office, industrial' },
                { icon: '🌲', title: 'Land', desc: 'Vacant lots & acreage' },
                { icon: '🏚️', title: 'Distressed', desc: 'Foreclosures & fixer-uppers' }
              ].map((item, i) => (
                <div key={i} className="bg-navy-800/50 border border-navy-700 p-6 hover:border-amber-500/50 transition-all duration-300 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="font-serif text-xl text-white mb-1">{item.title}</h3>
                  <p className="text-navy-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-on-scroll opacity-0">
              <div className="section-label mb-4">Why Choose Us</div>
              <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-6">
                A Better Way to
                <span className="text-amber-500"> Sell Property</span>
              </h2>
              <p className="text-xl text-navy-600 leading-relaxed mb-8">
                Traditional real estate means agents, repairs, showings, and months of uncertainty.
                We offer a direct, transparent alternative.
              </p>

              {/* Comparison */}
              <div className="bg-navy-50 p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-navy-900 mb-4 pb-4 border-b border-navy-200">
                  <div></div>
                  <div className="text-center">Traditional</div>
                  <div className="text-center text-amber-600">With Us</div>
                </div>
                {[
                  ['Timeline', '3-6 months', '7-14 days'],
                  ['Repairs', 'Required', 'None'],
                  ['Fees', '6% commission', '$0'],
                  ['Showings', 'Multiple', 'Zero']
                ].map(([label, trad, us], i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 text-sm py-3 border-b border-navy-100 last:border-0">
                    <div className="font-medium text-navy-900">{label}</div>
                    <div className="text-center text-navy-500">{trad}</div>
                    <div className="text-center text-amber-600 font-semibold">{us}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 animate-on-scroll opacity-0 delay-200">
              {[
                { title: 'No Repairs Required', desc: 'We buy properties as-is. Don\'t spend time or money fixing things up — that\'s our job.' },
                { title: 'No Agent Commissions', desc: 'Keep more of your equity. We don\'t charge any fees, commissions, or closing costs.' },
                { title: 'Flexible Closing', desc: 'Close in as little as 7 days or pick a date that works for your timeline.' },
                { title: 'Certainty of Sale', desc: 'No financing contingencies or deals falling through. When we make an offer, we close.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 bg-navy-50 hover:bg-navy-100 transition-colors duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 flex items-center justify-center text-navy-900 font-bold group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-navy-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 lg:py-32 bg-navy-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center animate-on-scroll opacity-0">
          <svg className="w-16 h-16 text-amber-500 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <blockquote className="font-serif text-3xl md:text-4xl text-navy-900 leading-relaxed mb-8">
            "Release Properties made selling my inherited home incredibly simple. No repairs,
            no hassle, and I had cash in hand within two weeks."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-navy-900 font-bold">
              M
            </div>
            <div className="text-left">
              <div className="font-semibold text-navy-900">Michael R.</div>
              <div className="text-sm text-navy-500">Property Seller, Texas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-amber-500">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-6 animate-on-scroll opacity-0">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-navy-800 mb-10 max-w-2xl mx-auto animate-on-scroll opacity-0 delay-100">
            Request your no-obligation cash offer today. We'll get back to you within
            24-48 hours with a fair price for your property.
          </p>
          <Link to="/quiz" className="btn-dark animate-on-scroll opacity-0 delay-200">
            Request Your Cash Offer
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
