import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-10 grid md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/releasepropertieslogo6_clear.png"
                alt="Release Properties"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm">
              Off-market investment deals across the United States and Canada.
              Exclusive properties for investors, below market value.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buyer" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Join Buyers List
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Sell My Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-navy-300 text-sm hover:text-cyan-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
              Contact
            </h4>
            <ul className="space-y-1 text-navy-300 text-xs">
              <li>18 King Street East, Suite 1400</li>
              <li>Toronto, ON M5C 1C4</li>
              <li className="pt-1">
                <a href="tel:+16452324654" className="hover:text-cyan-400 transition-colors duration-200">+1 (645) 232-4654</a>
              </li>
              <li>
                <a href="mailto:deals@releaseproperties.com" className="hover:text-cyan-400 transition-colors duration-200">deals@releaseproperties.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-800 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-navy-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} 14163729 Canada Inc. DBA "Release Properties". All rights reserved.
          </p>
          <p className="text-xs text-navy-500">
            Serving property owners across USA & Canada
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
