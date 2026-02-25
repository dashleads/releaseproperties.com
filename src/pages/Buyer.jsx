import { useState } from 'react'
import { Link } from 'react-router-dom'

function Buyer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cities: '',
  })

  const [consent, setConsent] = useState({
    smsConsent: false,
    termsConsent: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Format phone number as user types
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').substring(0, 10)
    if (digits.length >= 10) {
      return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6, 10)}`
    } else if (digits.length >= 6) {
      return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`
    } else if (digits.length >= 3) {
      return `(${digits.substring(0, 3)}) ${digits.substring(3)}`
    }
    return digits
  }

  // Validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) return false

    const domain = email.split('@')[1].toLowerCase()
    const typos = ['gmial.com', 'gmal.com', 'gamil.com', 'gnail.com', 'hotmal.com', 'yahooo.com', 'yaho.com']
    if (typos.includes(domain)) return false

    return true
  }

  // Validate name
  const isValidName = (name) => {
    return /^[a-zA-Z][a-zA-Z\s'-]{0,49}$/.test(name.trim()) && name.trim().length >= 2
  }

  // Validate phone number
  const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) return false

    const areaCode = digits.substring(0, 3)
    const exchange = digits.substring(3, 6)

    if (areaCode[0] === '0' || areaCode[0] === '1') return false
    if (exchange[0] === '0' || exchange[0] === '1') return false
    if (/^(\d)\1{9}$/.test(digits)) return false
    if (digits === '1234567890' || digits === '0987654321') return false

    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else if (name === 'name') {
      const cleaned = value.replace(/[^a-zA-Z\s'-]/g, '').substring(0, 100)
      setFormData((prev) => ({ ...prev, [name]: cleaned }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    } else if (!isValidName(formData.name)) {
      newErrors.name = 'Enter a valid name'
    }

    // Phone is optional, but validate format if provided
    if (formData.phone.trim()) {
      if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Enter a valid 10-digit phone number'
      } else if (!consent.smsConsent) {
        newErrors.smsConsent = 'You must agree to receive SMS to provide a phone number'
      }
    }

    // Email is required
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (validateForm()) {
      setIsSubmitting(true)

      const payload = {
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        name: formData.name,
        customField: {
          cities_interested: formData.cities,
        },
        source: 'Buyer Registration Form',
        tags: ['buyer-lead', 'website-submission'],
      }

      try {
        const response = await fetch('https://services.leadconnectorhq.com/hooks/32BVxewQUNt09ieqvjRt/webhook-trigger/d00ab78b-bfb3-43e3-b047-816f678f74a2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        setIsSubmitted(true)
      } catch (error) {
        console.error('Form submission error:', error)
        setSubmitError('Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      cities: '',
    })
    setConsent({ smsConsent: false, termsConsent: false })
    setErrors({})
    setIsSubmitted(false)
    setSubmitError('')
  }

  if (isSubmitted) {
    return (
      <div className="bg-navy-900 pt-24">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-lg mx-auto px-6 lg:px-8 py-20 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl text-white mb-4">You're On The List!</h2>
            <p className="text-lg text-navy-300 mb-8 leading-relaxed">
              Thank you for registering! We'll be in touch when we have deals that match your criteria.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-navy-900 pt-24 pb-16">
      <div className="max-w-xl mx-auto px-6 lg:px-8 py-8 w-full">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">
            Get Access to Off-Market Deals
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy-200 mb-2">
              Your Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-navy-800 border ${errors.name ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="Full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy-200 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-navy-800 border ${errors.phone ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="(555) 555-5555"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-200 mb-2">
              Email <span className="text-cyan-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-navy-800 border ${errors.email ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Cities Interested In */}
          <div>
            <label htmlFor="cities" className="block text-sm font-medium text-navy-200 mb-2">
              Cities You're Interested In
            </label>
            <input
              type="text"
              id="cities"
              name="cities"
              value={formData.cities}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="e.g., Dallas, Fort Worth, Houston"
            />
          </div>

          {/* A2P SMS Consent Checkbox */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="smsConsent"
                checked={consent.smsConsent}
                onChange={(e) => {
                  setConsent((prev) => ({ ...prev, smsConsent: e.target.checked }))
                  if (errors.smsConsent) setErrors((prev) => ({ ...prev, smsConsent: '' }))
                }}
                className="mt-1 h-5 w-5 shrink-0 rounded border-navy-600 bg-navy-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer accent-cyan-500"
              />
              <label htmlFor="smsConsent" className="text-sm text-navy-300 leading-relaxed cursor-pointer">
                I agree to receive SMS messages from 14163729 Canada Inc. DBA "Release Properties" at the mobile number provided for real estate property updates and investment opportunities. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. By checking this box, I authorize Release Properties to store my consent details (timestamp, IP address, and page URL) as proof of opt-in. View our{' '}
                <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
                  Terms of Service
                </Link>
                .
              </label>
            </div>
            {errors.smsConsent && (
              <p className="mt-1 text-sm text-red-400">{errors.smsConsent}</p>
            )}
            {/* Terms & Privacy Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="termsConsent"
                checked={consent.termsConsent}
                onChange={(e) => setConsent((prev) => ({ ...prev, termsConsent: e.target.checked }))}
                className="mt-1 h-5 w-5 shrink-0 rounded border-navy-600 bg-navy-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer accent-cyan-500"
              />
              <label htmlFor="termsConsent" className="text-sm text-navy-300 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
                  Privacy Policy
                </Link>{' '}
                of 14163729 Canada Inc. DBA "Release Properties." I understand that my information, including my phone number and any SMS opt-in data, will not be shared with third parties or affiliates for marketing or promotional purposes. I acknowledge that message and data rates may apply and that I can opt out at any time by replying STOP or contacting deals@releaseproperties.com.
              </label>
            </div>
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-center">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Get on the Buyers List'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Buyer
