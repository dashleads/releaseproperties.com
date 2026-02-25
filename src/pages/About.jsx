import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-navy-900 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4 text-cyan-400 before:bg-cyan-400">
            About Us
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Who We Are
          </h1>
          <p className="text-navy-300">
            Off-market investment deals across the United States and Canada
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-navy-900 mb-6">Our Mission</h2>
          <p className="text-lg text-navy-600 leading-relaxed mb-4">
            14163729 Canada Inc. DBA "Release Properties" connects real estate investors
            with exclusive off-market deals across the United States and Canada. We source properties
            directly from motivated sellers and make them available to our network of buyers at
            below-market prices.
          </p>
          <p className="text-lg text-navy-600 leading-relaxed">
            Our goal is simple: give investors a reliable pipeline of deals they can't find on the MLS.
            Whether you're a seasoned flipper, a buy-and-hold landlord, or just getting started in real
            estate investing, we help you find opportunities that make financial sense.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-navy-900 mb-6">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-navy-900 mb-2">Source Off-Market Deals</h3>
              <p className="text-navy-600 leading-relaxed">
                We work directly with property owners to find deals before they ever hit the open
                market. This means less competition and better pricing for our buyers.
              </p>
            </div>
            <div className="bg-navy-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-navy-900 mb-2">Below-Market Pricing</h3>
              <p className="text-navy-600 leading-relaxed">
                Every deal we send is priced for investors. We negotiate directly with sellers to
                ensure our buyers get properties at prices that leave room for profit.
              </p>
            </div>
            <div className="bg-navy-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-navy-900 mb-2">All Property Types</h3>
              <p className="text-navy-600 leading-relaxed">
                Single-family homes, multi-family properties, vacant land, and commercial
                properties. Whatever your investment strategy, we have deals for you.
              </p>
            </div>
            <div className="bg-navy-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-navy-900 mb-2">Fast & Direct</h3>
              <p className="text-navy-600 leading-relaxed">
                No middlemen. Work directly with our team for fast closings and a smooth
                transaction process from start to finish.
              </p>
            </div>
          </div>
        </section>

        {/* Why Investors Trust Us */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-navy-900 mb-6">Why Investors Trust Us</h2>
          <div className="space-y-6">
            {[
              { title: 'Exclusive Access', desc: 'Our deals are not listed on the MLS. You get first access to properties that the general public never sees.' },
              { title: 'Transparent Process', desc: 'We provide accurate property details so you can make informed decisions. No surprises, no hidden issues.' },
              { title: 'USA & Canada Coverage', desc: 'We source deals across the United States and Canada, giving you access to markets with the best investment potential.' },
              { title: 'Investor-Focused', desc: 'Everything we do is built around helping investors succeed. From deal sourcing to closing, we\'re in your corner.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-navy-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-900 rounded-2xl p-10 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Ready to Find Your Next Deal?</h2>
          <p className="text-navy-300 mb-8 max-w-lg mx-auto">
            Join our buyers list and start receiving exclusive off-market investment
            opportunities delivered directly to you.
          </p>
          <Link
            to="/buyer"
            className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Join the Buyers List
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default About
