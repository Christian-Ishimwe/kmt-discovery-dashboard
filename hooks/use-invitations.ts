"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import {
  type Invitation,
  type InvitationResponse,
  type CreateInvitationRequest,
  UserRoleType,
} from "@/types/invitation"
import { useToast } from "@/hooks/use-toast"

interface UseInvitationsParams {
  page?: number
  limit?: number
  search?: string
  status?: "all" | "pending" | "accepted" | "expired"
  role?: UserRoleType | "all"
}

export function useInvitations(params: UseInvitationsParams = {}) {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
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
      'Content-Type': 'application/json',
      ...(sessionWithToken?.accessToken && { 'Authorization': `Bearer ${sessionWithToken.accessToken}` })
    }
  }, [session])

  const fetchInvitations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const searchParams = new URLSearchParams()
      if (params.page) searchParams.append('page', params.page.toString())
      if (params.limit) searchParams.append('limit', params.limit.toString())
      if (params.search) searchParams.append('search', params.search)
      if (params.status && params.status !== 'all') searchParams.append('status', params.status)
      if (params.role && params.role !== 'all') searchParams.append('role', params.role)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations?${searchParams.toString()}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch invitations: ${response.statusText}`)
      }

      const data: InvitationResponse = await response.json()
      
      setInvitations(data.invitations)
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch invitations"
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }, [
    params.page, 
    params.limit, 
    params.search, 
    params.status, 
    params.role, 
    getAuthHeaders, 
    toast
  ])

  const sendInvitation = useCallback(async (data: CreateInvitationRequest) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Failed to send invitation: ${response.statusText}`)
      }

      const newInvitation: Invitation = await response.json()

      setInvitations((prev) => [newInvitation, ...prev])

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${data.email} successfully.`,
      })

      return newInvitation
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send invitation"
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
      throw err
    }
  }, [getAuthHeaders, toast])

  const revokeInvitation = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to revoke invitation: ${response.statusText}`)
      }

      setInvitations((prev) => prev.filter((inv) => inv.id !== id))

      toast({
        title: "Invitation Revoked",
        description: "Invitation has been revoked successfully.",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to revoke invitation"
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
      throw err
    }
  }, [getAuthHeaders, toast])

  useEffect(() => {
    fetchInvitations()
  }, [fetchInvitations])

  return {
    invitations,
    loading,
    error,
    pagination,
    sendInvitation,
    revokeInvitation,
    refetch: fetchInvitations,
  }
}
