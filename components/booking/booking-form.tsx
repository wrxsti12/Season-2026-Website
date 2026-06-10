'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, User, Mail, Phone, MessageSquare, Camera, Video, Film, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceTypes = [
  { id: 'static',    label: 'Static Frame 靜態攝影', icon: Camera },
  { id: 'motion',    label: 'Motion Frame 動態攝影', icon: Video },
  { id: 'cinematic', label: 'Cinematic Reels 短片',  icon: Film },
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
]

// Generate mock unavailable dates (weekends and some random dates)
const getUnavailableDates = (year: number, month: number) => {
  const unavailable: number[] = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    // Mark weekends as unavailable for demo
    if (date.getDay() === 0) {
      unavailable.push(day)
    }
    // Add some random unavailable days
    if (Math.random() < 0.15) {
      unavailable.push(day)
    }
  }
  return unavailable
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function BookingForm() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(searchParams.get('category') || '')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Use useMemo to generate unavailable dates only when month/year changes
  const unavailableDates = useMemo(() => {
    return getUnavailableDates(currentYear, currentMonth)
  }, [currentYear, currentMonth])

  // Calendar logic
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isDateUnavailable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return isPast || unavailableDates.includes(day)
  }

  const handleDateSelect = (day: number) => {
    if (!isDateUnavailable(day)) {
      setSelectedDate(new Date(currentYear, currentMonth, day))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== ''
      case 2:
        return selectedDate !== null && selectedTime !== ''
      case 3:
        return formData.name && formData.email && formData.phone
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for booking with ONE2FRAME. We&apos;ve sent a confirmation email to{' '}
              <span className="text-foreground">{formData.email}</span>. 
              We&apos;ll be in touch within 24 hours to discuss your session details.
            </p>
            <div className="p-6 bg-card border border-border rounded-lg text-left">
              <h3 className="font-medium mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><span className="text-foreground">Service:</span> {serviceTypes.find(s => s.id === selectedService)?.label}</p>
                <p><span className="text-foreground">Date:</span> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><span className="text-foreground">Time:</span> {selectedTime}</p>
                <p><span className="text-foreground">Name:</span> {formData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-4">
                <button
                  onClick={() => step < currentStep && setCurrentStep(step)}
                  disabled={step > currentStep}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    currentStep >= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {step}
                </button>
                {step < 3 && (
                  <div className={cn(
                    'w-12 md:w-20 h-0.5',
                    currentStep > step ? 'bg-primary' : 'bg-border'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-10">
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-2 text-center">
                  Select Your Service
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Choose the type of photography service you need
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={cn(
                        'flex flex-col items-center gap-4 p-6 rounded-lg border transition-all duration-300',
                        selectedService === service.id
                          ? 'bg-primary/10 border-primary'
                          : 'bg-background border-border hover:border-primary/50'
                      )}
                    >
                      <div className={cn(
                        'w-14 h-14 rounded-full flex items-center justify-center',
                        selectedService === service.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground'
                      )}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <span className={cn(
                        'font-medium',
                        selectedService === service.id ? 'text-primary' : 'text-foreground'
                      )}>
                        {service.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-2 text-center">
                  Choose Date & Time
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Select your preferred date and time slot
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="bg-background border border-border rounded-lg p-4">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={prevMonth}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="font-medium">
                          {MONTHS[currentMonth]} {currentYear}
                        </span>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {/* Day Headers */}
                        {DAYS.map((day) => (
                          <div key={day} className="text-center text-xs text-muted-foreground py-2">
                            {day}
                          </div>
                        ))}
                        
                        {/* Empty cells for days before first of month */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                          <div key={`empty-${i}`} className="p-2" />
                        ))}
                        
                        {/* Day cells */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1
                          const isUnavailable = isDateUnavailable(day)
                          const isSelected = selectedDate?.getDate() === day && 
                                           selectedDate?.getMonth() === currentMonth &&
                                           selectedDate?.getFullYear() === currentYear
                          
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateSelect(day)}
                              disabled={isUnavailable}
                              className={cn(
                                'p-2 text-sm rounded-lg transition-all',
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : isUnavailable
                                    ? 'text-muted-foreground/30 cursor-not-allowed'
                                    : 'hover:bg-secondary text-foreground'
                              )}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>

                      {/* Legend */}
                      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-primary" />
                          Selected
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                          Unavailable
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      Available Time Slots
                    </h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'py-3 px-4 text-sm rounded-lg border transition-all',
                              selectedTime === time
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background border-border hover:border-primary/50'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-12 bg-background border border-border rounded-lg">
                        Please select a date first
                      </p>
                    )}

                    {/* Selected Summary */}
                    {selectedDate && selectedTime && (
                      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Selected:</p>
                        <p className="font-medium text-foreground">
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-primary font-medium">{selectedTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl md:text-3xl font-light mb-2 text-center">
                  Your Information
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Tell us a bit about yourself and your project
                </p>

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <User size={16} className="text-primary" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Mail size={16} className="text-primary" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Phone size={16} className="text-primary" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <MessageSquare size={16} className="text-primary" />
                      Additional Details
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your event, vision, or any special requests..."
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="p-4 bg-secondary/50 border border-border rounded-lg">
                    <h4 className="font-medium mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="text-foreground">Service:</span> {serviceTypes.find(s => s.id === selectedService)?.label}</p>
                      <p><span className="text-foreground">Date:</span> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p><span className="text-foreground">Time:</span> {selectedTime}</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !canProceed()}
                    className="w-full py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wider transition-colors',
                  currentStep === 1
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              
              {currentStep < 3 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all',
                    !canProceed() && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
