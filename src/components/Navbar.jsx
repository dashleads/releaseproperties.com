import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center">
            <img
              src="/releasepropertieslogo6_clear.png"
              alt="Release Properties"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/buyer"
              className="text-sm font-medium px-5 py-2.5 bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 rounded-full shadow-lg shadow-cyan-500/25"
            >
              Join Buyers List
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/buyer"
              className="text-xs font-medium px-4 py-2 bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 rounded-full shadow-lg shadow-cyan-500/25"
            >
              Join Buyers List
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-navy-900/95 backdrop-blur-sm rounded-xl px-6 py-4 mb-4 border border-navy-700/50">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/80 hover:text-white transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/80 hover:text-white transition-colors py-2"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/80 hover:text-white transition-colors py-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
