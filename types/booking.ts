export interface BookingRequirements {
  groupSize?: number
  equipmentNeeded?: string
  transportRequired?: boolean
  followUp?: {
    format: string
    timeline: string
  }
  expertise?: string
  preparation?: {
    materials: string[]
    preMeetingQuestions: string[]
  }
  sessionType?: string
  deliverables?: string[]
}

export interface Provider {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  currency: string
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  requesterId: string
  providerId: string
  startTime: string
  date: string
  endTime?: string
  category: "SPORTS" | "ENVIRONMENT" | "CULTURE" | "BUSINESS" | "EDUCATION"
  description: string
  location: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  bookingType: "SITE_VISIT" | "EXPERT" | "CONSULTATION" | "TOUR"
  requirements: BookingRequirements
  createdAt: string
  updatedAt: string
  provider: Provider
  payment: Payment
}

export interface BookingsResponse {
  success: boolean
  message: string
  data: Booking[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface BookingFilters {
  searchTerm?: string
  status?: string
  paymentStatus?: string
  category?: string
  bookingType?: string
  page?: number
  limit?: number
}
