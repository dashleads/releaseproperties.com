import { useState } from 'react'
import { Link } from 'react-router-dom'

function BuyerInput() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    notes: '',
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
    } else if (name === 'firstName' || name === 'lastName') {
      const cleaned = value.replace(/[^a-zA-Z\s'-]/g, '').substring(0, 50)
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Required'
    } else if (!isValidName(formData.firstName)) {
      newErrors.firstName = 'Enter a valid first name'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Required'
    } else if (!isValidName(formData.lastName)) {
      newErrors.lastName = 'Enter a valid last name'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Required'
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Enter a valid address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required'
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        address1: formData.address,
        propertyAddress: formData.address,
        notes: formData.notes,
        source: 'Buyer Input Form',
        tags: ['buyer-lead', 'employee-submitted'],
      }

      try {
        // TODO: Replace with your GoHighLevel webhook URL
        const response = await fetch('YOUR_WEBHOOK_URL_HERE', {
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
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      notes: '',
    })
    setErrors({})
    setIsSubmitted(false)
    setSubmitError('')
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-navy-900">
        <header className="py-6">
          <div className="flex justify-center">
            <Link to="/">
              <img
                src="/releasepropertieslogo6_clear.png"
                alt="Release Properties"
                className="h-12 w-auto"
              />
            </Link>
          </div>
        </header>

        <div className="flex-grow flex items-center">
          <div className="max-w-lg mx-auto px-6 lg:px-8 py-20 text-center animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl text-white mb-4">Buyer Added!</h2>
            <p className="text-lg text-navy-300 mb-8 leading-relaxed">
              The buyer information has been submitted successfully.
            </p>
            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Add Another Buyer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <header className="py-6">
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="/releasepropertieslogo6_clear.png"
              alt="Release Properties"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      <div className="flex-grow flex items-center py-8">
        <div className="max-w-xl mx-auto px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-2">
              Add Potential Buyer
            </h1>
            <p className="text-navy-300">
              Enter the buyer's information below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-navy-200 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-navy-800 border ${errors.firstName ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-navy-200 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-navy-800 border ${errors.lastName ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-navy-200 mb-2">
                Address Interested In
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-navy-800 border ${errors.address ? 'border-red-500' : 'border-navy-700'} rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all`}
                placeholder="Enter the property address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400">{errors.address}</p>
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
                Email
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

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-navy-200 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="Any additional information about the buyer..."
              />
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
                'Submit Buyer'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BuyerInput
