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
      <section className="relative min-h-screen bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium">Off-Market Deals in USA & Canada</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8">
              Find Your Next
              <span className="block mt-2 text-cyan-400">Investment Deal</span>
            </h1>
            <p className="text-xl text-navy-300 leading-relaxed mb-12 max-w-2xl mx-auto">
              Get exclusive access to off-market properties before they hit the MLS.
              Whether you're a flipper, landlord, or investor — we have deals for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/buyer" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5">
                Join the Buyers List
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-200">
                See How It Works
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
                <div className="text-center group">
                  <div className="text-4xl font-serif text-white mb-2 group-hover:text-cyan-400 transition-colors">Off-Market</div>
                  <div className="text-sm text-navy-400">Exclusive Deals</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-serif text-white mb-2 group-hover:text-cyan-400 transition-colors">Below Market</div>
                  <div className="text-sm text-navy-400">Discounted Prices</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-serif text-white mb-2 group-hover:text-cyan-400 transition-colors">Direct Access</div>
                  <div className="text-sm text-navy-400">No Middlemen</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Getting access to exclusive deals is easy. Join our buyers list and start receiving opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '01', title: 'Join the Buyers List', desc: 'Tell us what you\'re looking for — property types, locations, and your investment criteria.' },
              { num: '02', title: 'Receive Deals', desc: 'Get notified when we have properties that match your criteria. All deals are off-market and below retail.' },
              { num: '03', title: 'Close & Profit', desc: 'Move quickly on deals that fit your strategy. We make the buying process smooth and straightforward.' }
            ].map((step, i) => (
              <div key={i} className={`animate-on-scroll opacity-0 delay-${(i + 1) * 100}`}>
                <div className="group relative bg-navy-50 p-8 lg:p-10 hover:bg-navy-900 transition-all duration-500 card-hover rounded-2xl overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="text-6xl font-serif text-cyan-500 mb-6 group-hover:text-cyan-400 transition-colors">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 lg:py-32 bg-navy-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="section-label text-cyan-400 before:bg-cyan-400 mb-4">Deal Types</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Properties for Every
                <span className="text-cyan-400"> Investment Strategy</span>
              </h2>
              <p className="text-xl text-navy-300 leading-relaxed mb-8">
                From fix-and-flip opportunities to buy-and-hold rentals, we source deals
                across property types to match your investment goals.
              </p>
              <Link to="/buyer" className="btn-primary rounded-full">
                Get on the List
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-on-scroll opacity-0 delay-200">
              {[
                { icon: '🏠', title: 'Single Family', desc: 'Flip or rental ready' },
                { icon: '🏢', title: 'Multi-Family', desc: 'Cash flow properties' },
                { icon: '🌲', title: 'Land', desc: 'Development opportunities' },
                { icon: '🏚️', title: 'Distressed', desc: 'Deep discount deals' }
              ].map((item, i) => (
                <div key={i} className="bg-navy-800/50 border border-navy-700 p-6 hover:border-cyan-500/50 hover:bg-navy-800 transition-all duration-300 group rounded-xl">
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
                <span className="text-cyan-500"> Find Deals</span>
              </h2>
              <p className="text-xl text-navy-600 leading-relaxed mb-8">
                Stop competing with retail buyers on the MLS. Get direct access to
                motivated seller deals at prices that make sense for investors.
              </p>

              {/* Comparison */}
              <div className="bg-navy-50 p-6 rounded-xl mb-8">
                <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-navy-900 mb-4 pb-4 border-b border-navy-200">
                  <div></div>
                  <div className="text-center">MLS Deals</div>
                  <div className="text-center text-cyan-600">Our Deals</div>
                </div>
                {[
                  ['Pricing', 'Retail', 'Below Market'],
                  ['Competition', 'High', 'Low'],
                  ['Speed', 'Slow', 'Fast'],
                  ['Access', 'Public', 'Exclusive']
                ].map(([label, trad, us], i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 text-sm py-3 border-b border-navy-100 last:border-0">
                    <div className="font-medium text-navy-900">{label}</div>
                    <div className="text-center text-navy-500">{trad}</div>
                    <div className="text-center text-cyan-600 font-semibold">{us}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 animate-on-scroll opacity-0 delay-200">
              {[
                { title: 'Off-Market Inventory', desc: 'Access properties before they hit the MLS. Less competition means better deals for you.' },
                { title: 'Below Market Pricing', desc: 'We negotiate directly with motivated sellers to secure deals at investor-friendly prices.' },
                { title: 'Verified Deals', desc: 'Every property is vetted. We provide accurate information so you can move with confidence.' },
                { title: 'Fast & Direct', desc: 'No agents in the middle. Work directly with us for quick closings and smooth transactions.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 bg-navy-50 hover:bg-navy-100 transition-colors duration-300 group rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
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
          <svg className="w-16 h-16 text-cyan-500 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <blockquote className="font-serif text-3xl md:text-4xl text-navy-900 leading-relaxed mb-8">
            "Release Properties has become my go-to source for investment deals. The properties
            are priced right and the process is seamless. Closed on 3 deals in the last 6 months."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
              J
            </div>
            <div className="text-left">
              <div className="font-semibold text-navy-900">Jason T.</div>
              <div className="text-sm text-navy-500">Real Estate Investor, Texas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-cyan-500 to-cyan-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 animate-on-scroll opacity-0">
            Ready to Find Your Next Deal?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-on-scroll opacity-0 delay-100">
            Join our buyers list today and get exclusive access to off-market
            investment properties delivered straight to you.
          </p>
          <Link to="/buyer" className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-semibold rounded-full hover:bg-navy-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-on-scroll opacity-0 delay-200">
            Join the Buyers List
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
