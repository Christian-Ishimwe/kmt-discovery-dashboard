"use client"

import { useState, useEffect, useCallback } from "react"
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
  const [bookings, setBookings] = useState<Booking[]>([])
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

      // Build query parameters for backend filtering and pagination
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 10).toString(),
      })

      if (params.status && params.status !== "all") {
        queryParams.append("status", params.status)
      }

      if (params.bookingType && params.bookingType !== "all") {
        queryParams.append("type", params.bookingType)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings?${queryParams.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`)
      }

      const data: any = await response.json()

      // Backend returns paginated data
      const paginatedBookings = data.data || []
      setBookings(paginatedBookings)

      // Update pagination from backend response
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        limit: data.limit || 10,
        totalPages: data.totalPages || 0,
      })

      // Also fetch all bookings for stats (without pagination)
      const allResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings?limit=1000`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (allResponse.ok) {
        const allData = await allResponse.json()
        setAllBookings(allData.data || [])
      }
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
  }, [getAuthHeaders, toast, params.page, params.limit, params.status, params.bookingType])

  const updateBookingStatus = useCallback(
    async (id: string, status: string, notes?: string) => {
      try {
        setUpdatingBooking(id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings/${id}/status`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status, notes }),
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          throw new Error(errorResponse.message || "Failed to update booking status")
        }

        const responseData = await response.json()
        const updatedBooking = responseData.data?.booking || responseData

        // Update both bookings arrays
        setBookings((prev) => prev.map((booking) => (booking.id === id ? updatedBooking : booking)))
        setAllBookings((prev) => prev.map((booking) => (booking.id === id ? updatedBooking : booking)))

        toast({
          title: "Status Updated",
          description: `Booking status changed to ${status}.`,
        })

        return updatedBooking
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update booking status"
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

  const updateBooking = useCallback(
    async (id: string, data: { description?: string; requirements?: any; location?: string }) => {
      try {
        setUpdatingBooking(id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings/${id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          throw new Error(errorResponse.message || "Failed to update booking")
        }

        const responseData = await response.json()
        const updatedBooking = responseData.data?.booking || responseData

        // Update both bookings arrays
        setBookings((prev) => prev.map((booking) => (booking.id === id ? updatedBooking : booking)))
        setAllBookings((prev) => prev.map((booking) => (booking.id === id ? updatedBooking : booking)))

        toast({
          title: "Booking Updated",
          description: "Booking has been updated successfully.",
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error(`Failed to delete booking: ${response.statusText}`)
        }

        // Update both bookings arrays
        setBookings((prev) => prev.filter((booking) => booking.id !== id))
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
    allBookings,
    loading,
    updatingBooking,
    deletingBooking,
    error,
    pagination,
    updateBooking,
    updateBookingStatus, // Added new function for status updates
    deleteBooking,
    getBookingById,
    refetch: fetchBookings,
  }
}
