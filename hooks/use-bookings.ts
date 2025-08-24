"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  requesterId: string
  providerId: string
  startTime: string
  date: string
  endTime: string | null
  category: string
  description: string
  location: string
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED"
  bookingType: "SITE_VISIT" | "EXPERT" | "CONSULTATION"
  requirements: any
  createdAt: string
  updatedAt: string
  provider: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatarUrl?: string
  }
  payment: {
    id: string
    bookingId: string
    amount: number
    currency: string
    status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED"
    transactionId: string | null
    createdAt: string
    updatedAt: string
  }
}

interface UseBookingsParams {
  page?: number
  limit?: number
  searchTerm?: string
  status?: string | "all"
  paymentStatus?: string | "all"
  category?: string | "all"
  bookingType?: string | "all"
}

export function useBookings(params: UseBookingsParams = {}) {
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingBooking, setUpdatingBooking] = useState<string | null>(null)
  const [deletingBooking, setDeletingBooking] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const { toast } = useToast()
  const { data: session } = useSession()

  // Filter and paginate bookings on frontend
  const filteredBookings = useMemo(() => {
    let filtered = allBookings

    // Apply search filter
    if (params.searchTerm) {
      const searchLower = params.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchLower) ||
          booking.provider.firstName.toLowerCase().includes(searchLower) ||
          booking.provider.lastName.toLowerCase().includes(searchLower) ||
          booking.provider.email.toLowerCase().includes(searchLower) ||
          booking.description.toLowerCase().includes(searchLower),
      )
    }

    // Apply status filter
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((booking) => booking.status === params.status)
    }

    // Apply payment status filter
    if (params.paymentStatus && params.paymentStatus !== "all") {
      filtered = filtered.filter((booking) => booking.payment.status === params.paymentStatus)
    }

    // Apply category filter
    if (params.category && params.category !== "all") {
      filtered = filtered.filter((booking) => booking.category === params.category)
    }

    // Apply booking type filter
    if (params.bookingType && params.bookingType !== "all") {
      filtered = filtered.filter((booking) => booking.bookingType === params.bookingType)
    }

    return filtered
  }, [allBookings, params.searchTerm, params.status, params.paymentStatus, params.category, params.bookingType])

  // Paginate filtered results
  const bookings = useMemo(() => {
    const page = params.page || 1
    const limit = params.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedData = filteredBookings.slice(startIndex, endIndex)

    // Update pagination state
    setPagination({
      total: filteredBookings.length,
      page,
      limit,
      totalPages: Math.ceil(filteredBookings.length / limit),
    })

    return paginatedData
  }, [filteredBookings, params.page, params.limit])

  // Get auth token from NextAuth session
  const getAuthHeaders = useCallback(() => {
    const sessionWithToken = session as any
    return {
      "Content-Type": "application/json",
      ...(sessionWithToken?.accessToken && { Authorization: `Bearer ${sessionWithToken.accessToken}` }),
    }
  }, [session])

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`)
      }

      const data: any = await response.json()

      const allBookings = data.data || []
      setAllBookings(allBookings)

      // Frontend pagination - we'll filter and paginate locally
      setPagination({
        total: allBookings.length,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: Math.ceil(allBookings.length / (params.limit || 10)),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch bookings"
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }, [getAuthHeaders, toast])

  const updateBooking = useCallback(
    async (id: string, data: { status?: string }) => {
      try {
        setUpdatingBooking(id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/status`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          if (errorResponse.message) {
            throw new Error(`${errorResponse.message}`)
          }
          throw new Error(`Internal Server Error`)
        }

        const responseData = await response.json()

        // Backend returns updated booking
        const updatedBooking = responseData.data?.booking

        if (updatedBooking) {
          setAllBookings((prev) => prev.map((booking) => (booking.id === id ? updatedBooking : booking)))
        }

        toast({
          title: "Booking Updated",
          description: `Booking updated successfully.`,
        })

        return updatedBooking
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update booking"
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        throw err
      } finally {
        setUpdatingBooking(null)
      }
    },
    [getAuthHeaders, toast],
  )

  const deleteBooking = useCallback(
    async (id: string) => {
      try {
        setDeletingBooking(id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error(`Failed to delete booking: ${response.statusText}`)
        }

        setAllBookings((prev) => prev.filter((booking) => booking.id !== id))

        toast({
          title: "Booking Deleted",
          description: "Booking has been deleted successfully.",
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to delete booking"
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        throw err
      } finally {
        setDeletingBooking(null)
      }
    },
    [getAuthHeaders, toast],
  )

  const getBookingById = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
          method: "GET",
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch booking: ${response.statusText}`)
        }

        const data = await response.json()
        return data.data?.booking || null
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch booking"
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        throw err
      }
    },
    [getAuthHeaders, toast],
  )

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return {
    bookings,
    filteredBookings,
    allBookings,
    loading,
    updatingBooking,
    deletingBooking,
    error,
    pagination,
    updateBooking,
    deleteBooking,
    getBookingById,
    refetch: fetchBookings,
  }
}
