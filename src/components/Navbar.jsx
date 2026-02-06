import { Link } from 'react-router-dom'

function Navbar() {
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

          <div className="flex items-center gap-6">
            <Link
              to="/#how-it-works"
              className="hidden md:block text-sm text-white/80 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/#why-us"
              className="hidden md:block text-sm text-white/80 hover:text-white transition-colors"
            >
              Why Us
            </Link>
            <Link
              to="/buyer"
              className="text-sm font-medium px-5 py-2.5 bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 rounded-full shadow-lg shadow-cyan-500/25"
            >
              Join Buyers List
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
