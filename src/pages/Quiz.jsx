import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// US States and Canadian Provinces for validation
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

const US_STATE_NAMES = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado',
  'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
  'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
  'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
  'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
  'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina',
  'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania',
  'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas',
  'utah', 'vermont', 'virginia', 'washington', 'west virginia',
  'wisconsin', 'wyoming', 'district of columbia'
]

const CA_PROVINCES = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']

const CA_PROVINCE_NAMES = [
  'alberta', 'british columbia', 'manitoba', 'new brunswick',
  'newfoundland and labrador', 'newfoundland', 'nova scotia',
  'northwest territories', 'nunavut', 'ontario', 'prince edward island',
  'quebec', 'saskatchewan', 'yukon'
]

const propertyTypes = [
  { id: 'house', label: 'House', icon: '🏠' },
  { id: 'townhouse', label: 'Townhouse', icon: '🏘️' },
  { id: 'condo', label: 'Condo', icon: '🏢' },
  { id: 'multi-family', label: 'Multi-Family', icon: '🏛️' },
  { id: 'land', label: 'Land', icon: '🌲' },
  { id: 'commercial', label: 'Commercial', icon: '🏪' },
]

function Quiz() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    propertyType: '',
    // Address fields
    fullAddress: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    // Land-specific
    landInputType: 'address',
    parcelNumber: '',
    parcelCounty: '',
    // Contact
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    tcpaConsent: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showManualAddress, setShowManualAddress] = useState(false)
  const [addressSelected, setAddressSelected] = useState(false)

  const addressInputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const containerRef = useRef(null)

  const isLandProperty = formData.propertyType === 'land'
  const totalSteps = 3

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const shouldShowAutocomplete = step === 2 && !showManualAddress &&
      (!isLandProperty || (isLandProperty && formData.landInputType === 'address'))

    if (shouldShowAutocomplete && addressInputRef.current && window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['address_components', 'formatted_address'],
      })

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace()
        if (place.address_components) {
          let street = ''
          let city = ''
          let state = ''
          let zip = ''
          let country = ''

          place.address_components.forEach((component) => {
            const types = component.types
            if (types.includes('street_number')) {
              street = component.long_name + ' '
            }
            if (types.includes('route')) {
              street += component.long_name
            }
            if (types.includes('locality')) {
              city = component.long_name
            }
            if (types.includes('administrative_area_level_1')) {
              state = component.short_name
            }
            if (types.includes('postal_code')) {
              zip = component.long_name
            }
            if (types.includes('country')) {
              country = component.short_name === 'US' ? 'USA' : 'Canada'
            }
          })

          setFormData((prev) => ({
            ...prev,
            fullAddress: place.formatted_address,
            street,
            city,
            state,
            zip,
            country,
          }))
          setAddressSelected(true)
          setErrors((prev) => ({ ...prev, fullAddress: '', street: '', city: '', state: '', zip: '', country: '' }))
        }
      })
    }

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [step, isLandProperty, showManualAddress, formData.landInputType])

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

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

  // Format zip/postal code
  const formatZip = (value, country) => {
    if (country === 'Canada') {
      // Canadian postal code: A1A 1A1
      const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 6)
      if (cleaned.length > 3) {
        return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`
      }
      return cleaned
    } else {
      // US ZIP: 12345 or 12345-6789
      const digits = value.replace(/[^0-9-]/g, '').substring(0, 10)
      return digits
    }
  }

  // Validate state/province
  const isValidState = (state, country) => {
    const normalized = state.trim().toUpperCase()
    const normalizedLower = state.trim().toLowerCase()

    if (country === 'Canada') {
      return CA_PROVINCES.includes(normalized) || CA_PROVINCE_NAMES.includes(normalizedLower)
    } else {
      return US_STATES.includes(normalized) || US_STATE_NAMES.includes(normalizedLower)
    }
  }

  // Validate zip/postal code format
  const isValidZip = (zip, country) => {
    if (country === 'Canada') {
      // Canadian postal code: A1A 1A1
      return /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/.test(zip.trim())
    } else {
      // US ZIP: 12345 or 12345-6789
      return /^\d{5}(-\d{4})?$/.test(zip.trim())
    }
  }

  // Validate email more strictly
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) return false

    // Check for common typos in popular domains
    const domain = email.split('@')[1].toLowerCase()
    const typos = ['gmial.com', 'gmal.com', 'gamil.com', 'gnail.com', 'hotmal.com', 'yahooo.com', 'yaho.com']
    if (typos.includes(domain)) return false

    return true
  }

  // Validate name (letters, spaces, hyphens, apostrophes only)
  const isValidName = (name) => {
    return /^[a-zA-Z][a-zA-Z\s'-]{0,49}$/.test(name.trim()) && name.trim().length >= 2
  }

  // Validate phone number
  const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) return false

    // Check for obviously fake numbers
    const areaCode = digits.substring(0, 3)
    const exchange = digits.substring(3, 6)

    // Area codes can't start with 0 or 1
    if (areaCode[0] === '0' || areaCode[0] === '1') return false

    // Exchange can't start with 0 or 1
    if (exchange[0] === '0' || exchange[0] === '1') return false

    // Check for repeated digits (555-555-5555, 123-456-7890, etc.)
    if (/^(\d)\1{9}$/.test(digits)) return false
    if (digits === '1234567890' || digits === '0987654321') return false

    return true
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else if (name === 'zip') {
      setFormData((prev) => ({ ...prev, [name]: formatZip(value, formData.country) }))
    } else if (name === 'state') {
      // Allow typing but store uppercase for abbreviations
      setFormData((prev) => ({ ...prev, [name]: value }))
    } else if (name === 'firstName' || name === 'lastName') {
      // Only allow valid name characters
      const cleaned = value.replace(/[^a-zA-Z\s'-]/g, '').substring(0, 50)
      setFormData((prev) => ({ ...prev, [name]: cleaned }))
    } else if (name === 'fullAddress') {
      setFormData((prev) => ({ ...prev, [name]: value }))
      setAddressSelected(false)
    } else if (name === 'country') {
      // Reset zip when country changes (different format)
      setFormData((prev) => ({ ...prev, [name]: value, zip: '' }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const selectPropertyType = (type) => {
    setFormData((prev) => ({ ...prev, propertyType: type }))
    setErrors({})
    setTimeout(() => {
      setStep(2)
    }, 300)
  }

  const selectLandInputType = (type) => {
    setFormData((prev) => ({ ...prev, landInputType: type }))
    setShowManualAddress(false) // Reset manual address when switching
  }

  const validateStep = () => {
    const newErrors = {}

    if (step === 2) {
      if (isLandProperty && formData.landInputType === 'parcel') {
        // Parcel number validation
        if (!formData.parcelNumber.trim()) {
          newErrors.parcelNumber = 'Required'
        } else if (formData.parcelNumber.trim().length < 3) {
          newErrors.parcelNumber = 'Enter a valid parcel number'
        }

        if (!formData.parcelCounty.trim()) {
          newErrors.parcelCounty = 'Required'
        } else if (!/^[a-zA-Z\s'-]{2,}$/.test(formData.parcelCounty.trim())) {
          newErrors.parcelCounty = 'Enter a valid county name'
        }

        if (!formData.state.trim()) {
          newErrors.state = 'Required'
        } else if (!isValidState(formData.state, formData.country || 'USA')) {
          newErrors.state = 'Enter a valid state/province'
        }

        if (!formData.country) newErrors.country = 'Required'
      } else if (showManualAddress) {
        // Manual address entry validation
        if (!formData.street.trim()) {
          newErrors.street = 'Required'
        } else if (formData.street.trim().length < 5) {
          newErrors.street = 'Enter a valid street address'
        }

        if (!formData.city.trim()) {
          newErrors.city = 'Required'
        } else if (!/^[a-zA-Z\s'-]{2,}$/.test(formData.city.trim())) {
          newErrors.city = 'Enter a valid city name'
        }

        if (!formData.state.trim()) {
          newErrors.state = 'Required'
        } else if (!isValidState(formData.state, formData.country || 'USA')) {
          newErrors.state = 'Enter a valid state/province'
        }

        if (!formData.country) newErrors.country = 'Required'
      } else {
        // Google autocomplete validation
        if (!formData.fullAddress.trim() || !addressSelected) {
          newErrors.fullAddress = 'Please select an address from the dropdown'
        }
      }
    }

    if (step === 3) {
      // First name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Required'
      } else if (!isValidName(formData.firstName)) {
        newErrors.firstName = 'Enter a valid first name'
      }

      // Last name validation
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Required'
      } else if (!isValidName(formData.lastName)) {
        newErrors.lastName = 'Enter a valid last name'
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Required'
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Enter a valid 10-digit phone number'
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Required'
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Enter a valid email address'
      }

      if (!formData.tcpaConsent) newErrors.tcpaConsent = 'Consent required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (validateStep()) {
      setIsSubmitting(true)

      // Build the address string
      let fullPropertyAddress = formData.fullAddress
      if (showManualAddress || (isLandProperty && formData.landInputType === 'parcel')) {
        if (isLandProperty && formData.landInputType === 'parcel') {
          fullPropertyAddress = `Parcel: ${formData.parcelNumber}, ${formData.parcelCounty} County, ${formData.state}, ${formData.country}`
        } else {
          fullPropertyAddress = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`
        }
      }

      // Prepare payload for GoHighLevel
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        propertyType: formData.propertyType,
        propertyAddress: fullPropertyAddress,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        parcelNumber: formData.parcelNumber || '',
        parcelCounty: formData.parcelCounty || '',
        source: 'Release Properties Website',
        tags: ['website-lead', formData.propertyType],
      }

      try {
        const response = await fetch('https://services.leadconnectorhq.com/hooks/32BVxewQUNt09ieqvjRt/webhook-trigger/f7c06753-90a8-4e61-aa5c-3a77de828432', {
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
        setSubmitError('Something went wrong. Please try again or call us directly.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-navy-900">
        {/* Minimal Header */}
        <header className="py-6">
          <div className="text-center">
            <Link to="/" className="font-serif text-xl text-white">
              Release Properties
            </Link>
          </div>
        </header>

        <div className="flex-grow flex items-center">
          <div className="max-w-lg mx-auto px-6 lg:px-8 py-20 text-center animate-fade-in">
            <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl text-white mb-4">You're All Set!</h2>
            <p className="text-lg text-navy-300 mb-8 leading-relaxed">
              We've received your property information and will be in touch within 24-48 hours with your cash offer.
            </p>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-navy-900 font-semibold rounded-full hover:bg-amber-400 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25">
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* Footer - below the fold */}
        <footer className="bg-navy-950 py-10">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <Link to="/" className="font-serif text-lg text-white">
                Release Properties
              </Link>
              <p className="text-navy-400 text-sm mt-2 mb-6">
                Fair cash offers on homes and land across USA & Canada
              </p>
              <div className="flex justify-center gap-6 text-sm text-navy-500">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
              <p className="text-navy-600 text-xs mt-6">
                © {new Date().getFullYear()} Release Properties
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      {/* Main content area */}
      <div className="bg-navy-900">
        {/* Minimal Header */}
        <header className="py-6">
          <div className="text-center">
            <Link to="/" className="font-serif text-xl text-white">
              Release Properties
            </Link>
          </div>
        </header>

        <div className="pb-48">
          <div className="max-w-2xl w-full mx-auto px-6 lg:px-8">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 rounded-full transition-all duration-300 ${
                num === step
                  ? 'w-8 bg-amber-500'
                  : num < step
                  ? 'w-2 bg-amber-500'
                  : 'w-2 bg-navy-700'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Property Type */}
        {step === 1 && (
          <div className="text-center animate-fade-in">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              What type of property are you selling?
            </h1>
            <p className="text-navy-300 text-lg mb-12">
              Select one to continue
            </p>

            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => selectPropertyType(type.id)}
                  className={`w-full px-6 py-4 rounded-full border-2 text-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                    formData.propertyType === type.id
                      ? 'border-amber-500 bg-amber-500 text-navy-900'
                      : 'border-navy-600 text-white hover:border-amber-500 hover:bg-navy-800'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Location */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Where is your property located?
              </h1>
              <p className="text-navy-300 text-lg">
                We buy properties across the USA & Canada
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              {/* Land-specific toggle */}
              {isLandProperty && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-navy-700 mb-3 text-center">
                    How would you like to identify your land?
                  </label>
                  <div className="flex gap-3 max-w-sm mx-auto">
                    <button
                      type="button"
                      onClick={() => selectLandInputType('address')}
                      className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                        formData.landInputType === 'address'
                          ? 'bg-amber-500 text-navy-900'
                          : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                      }`}
                    >
                      Street Address
                    </button>
                    <button
                      type="button"
                      onClick={() => selectLandInputType('parcel')}
                      className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                        formData.landInputType === 'parcel'
                          ? 'bg-amber-500 text-navy-900'
                          : 'bg-navy-100 text-navy-600 hover:bg-navy-200'
                      }`}
                    >
                      Parcel Number
                    </button>
                  </div>
                </div>
              )}

              {/* Google Places Autocomplete */}
              {((!isLandProperty || (isLandProperty && formData.landInputType === 'address')) && !showManualAddress) && (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="fullAddress" className="block text-sm font-medium text-navy-700 mb-1.5">
                      {isLandProperty ? 'Land Address' : 'Property Address'}
                    </label>
                    <input
                      ref={addressInputRef}
                      type="text"
                      id="fullAddress"
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.fullAddress
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                      placeholder="Start typing your address..."
                      autoComplete="off"
                    />
                    {errors.fullAddress && <p className="text-red-500 text-xs mt-1">{errors.fullAddress}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowManualAddress(true)}
                    className="text-sm text-navy-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                  >
                    Enter address manually
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Manual Address Fields */}
              {showManualAddress && (!isLandProperty || formData.landInputType === 'address') && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowManualAddress(false)}
                    className="text-sm text-navy-500 hover:text-amber-600 transition-colors mb-2"
                  >
                    ← Use address search instead
                  </button>
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium text-navy-700 mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.street
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-navy-700 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          errors.city
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                            : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-navy-700 mb-1.5">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        maxLength={30}
                        className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          errors.state
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                            : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                        placeholder={formData.country === 'Canada' ? 'e.g., ON or Ontario' : 'e.g., CA or California'}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-navy-700 mb-1.5">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.country
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              )}

              {/* Parcel Number Fields (Land only) */}
              {isLandProperty && formData.landInputType === 'parcel' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="parcelNumber" className="block text-sm font-medium text-navy-700 mb-1.5">
                      Parcel Number (APN)
                    </label>
                    <input
                      type="text"
                      id="parcelNumber"
                      name="parcelNumber"
                      value={formData.parcelNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.parcelNumber
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                      placeholder="e.g., 123-456-789"
                    />
                    {errors.parcelNumber && <p className="text-red-500 text-xs mt-1">{errors.parcelNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parcelCounty" className="block text-sm font-medium text-navy-700 mb-1.5">
                        County
                      </label>
                      <input
                        type="text"
                        id="parcelCounty"
                        name="parcelCounty"
                        value={formData.parcelCounty}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          errors.parcelCounty
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                            : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                        placeholder="County name"
                      />
                      {errors.parcelCounty && <p className="text-red-500 text-xs mt-1">{errors.parcelCounty}</p>}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-navy-700 mb-1.5">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        maxLength={30}
                        className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          errors.state
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                            : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                        }`}
                        placeholder={formData.country === 'Canada' ? 'e.g., ON or Ontario' : 'e.g., CA or California'}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-navy-700 mb-1.5">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.country
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 bg-amber-500 text-navy-900 font-semibold rounded-full hover:bg-amber-400 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full py-3 text-navy-500 font-medium hover:text-navy-700 transition-colors"
                >
                  ← Go Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Where should we send your offer?
              </h1>
              <p className="text-navy-300 text-lg">
                We'll reach out within 24-48 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="space-y-4">
                {/* First Name / Last Name side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-navy-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      maxLength={50}
                      autoComplete="given-name"
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.firstName
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-navy-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      maxLength={50}
                      autoComplete="family-name"
                      className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.lastName
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
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
                    maxLength={14}
                    autoComplete="tel"
                    className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="email"
                    className={`w-full px-4 py-3.5 border rounded-xl text-navy-800 placeholder:text-navy-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-navy-200 focus:border-amber-500 focus:ring-amber-500/20'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* TCPA Consent */}
                <div className={`p-4 rounded-xl mt-2 ${errors.tcpaConsent ? 'bg-red-50 border border-red-200' : 'bg-navy-50'}`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="tcpaConsent"
                      name="tcpaConsent"
                      checked={formData.tcpaConsent}
                      onChange={handleChange}
                      className="mt-0.5 w-5 h-5 text-amber-500 border-navy-300 rounded focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="tcpaConsent" className="text-xs text-navy-600 leading-relaxed cursor-pointer">
                      By checking this box, I consent to receive calls, text messages (SMS), and emails from Release
                      Properties at the phone number and email address provided, including through automated technology.
                      Message and data rates may apply. Reply STOP to opt-out. I agree to the{' '}
                      <Link to="/terms" className="text-amber-600 hover:text-amber-700 underline" target="_blank">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-amber-600 hover:text-amber-700 underline" target="_blank">
                        Privacy Policy
                      </Link>.
                    </label>
                  </div>
                  {errors.tcpaConsent && <p className="text-red-500 text-xs mt-2 ml-8">{errors.tcpaConsent}</p>}
                </div>
              </div>

              {/* Error message */}
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-amber-500 text-navy-900 font-semibold rounded-full hover:bg-amber-400 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Get My Cash Offer →'
                  )}
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="w-full py-3 text-navy-500 font-medium hover:text-navy-700 transition-colors disabled:opacity-50"
                >
                  ← Go Back
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-navy-100 flex flex-wrap justify-center gap-6 text-xs text-navy-400">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24-48 Hour Response</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Obligation</span>
                </div>
              </div>
            </form>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Footer - below the fold */}
      <footer className="bg-navy-950 py-10">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="font-serif text-lg text-white">
              Release Properties
            </Link>
            <p className="text-navy-400 text-sm mt-2 mb-6">
              Fair cash offers on homes and land across USA & Canada
            </p>
            <div className="flex justify-center gap-6 text-sm text-navy-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p className="text-navy-600 text-xs mt-6">
              © {new Date().getFullYear()} Release Properties
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Quiz
