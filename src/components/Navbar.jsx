import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-serif text-xl text-white">
            Release Properties
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
              to="/quiz"
              className="text-sm font-medium px-5 py-2 bg-white text-navy-900 hover:bg-amber-400 transition-colors rounded-full"
            >
              Get Your Offer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
