import { useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) return false
    const domain = email.split('@')[1].toLowerCase()
    const typos = ['gmial.com', 'gmal.com', 'gamil.com', 'gnail.com', 'hotmal.com', 'yahooo.com', 'yaho.com']
    if (typos.includes(domain)) return false
    return true
  }

  const isValidName = (name) => {
    return /^[a-zA-Z][a-zA-Z\s'-]{0,49}$/.test(name.trim()) && name.trim().length >= 2
  }

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

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    } else if (!isValidName(formData.name)) {
      newErrors.name = 'Enter a valid name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message'
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
        notes: formData.message,
        source: 'Contact Us Form',
        tags: ['contact-form', 'website-submission'],
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

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-navy-900 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4 text-cyan-400 before:bg-cyan-400">
            Get In Touch
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-navy-300">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl text-navy-900 mb-6">Get in Touch</h2>
            <p className="text-navy-600 leading-relaxed mb-8">
              Whether you're looking to join our buyers list, have a question about a property,
              or want to learn more about what we do, reach out anytime.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Address</h3>
                  <p className="text-navy-600">18 King Street East, Suite 1400</p>
                  <p className="text-navy-600">Toronto, ON M5C 1C4</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                  <a href="tel:+16452324654" className="text-navy-600 hover:text-cyan-600 transition-colors">
                    +1 (645) 232-4654
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                  <a href="mailto:deals@releaseproperties.com" className="text-navy-600 hover:text-cyan-600 transition-colors">
                    deals@releaseproperties.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-navy-50 rounded-xl">
              <h3 className="font-semibold text-navy-900 mb-2">Looking to invest?</h3>
              <p className="text-navy-600 text-sm leading-relaxed mb-4">
                Join our buyers list to receive exclusive off-market deals delivered directly to you.
              </p>
              <Link
                to="/buyer"
                className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Join the Buyers List
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {isSubmitted ? (
              <div className="bg-navy-50 rounded-xl p-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-navy-900 mb-3">Message Sent!</h3>
                <p className="text-navy-600 mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', message: '' })
                  }}
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1.5">
                    Your Name <span className="text-cyan-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-400' : 'border-navy-200'} rounded-xl text-navy-800 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all`}
                    placeholder="Full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
                    Email <span className="text-cyan-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-400' : 'border-navy-200'} rounded-xl text-navy-800 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-400' : 'border-navy-200'} rounded-xl text-navy-800 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all`}
                    placeholder="(555) 555-5555"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1.5">
                    Message <span className="text-cyan-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-400' : 'border-navy-200'} rounded-xl text-navy-800 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-center text-sm">{submitError}</p>
                  </div>
                )}

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
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
