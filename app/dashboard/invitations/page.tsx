"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Send,
  Trash2,
  Eye,
  EyeOff,
  Users,
  UserPlus,
  Filter,
  X,
  MoreHorizontal,
  RefreshCw,
  Copy,
} from "lucide-react";

interface Invitation {
  id: string;
  email: string;
  token: string;
  tokenHash: string;
  invitedBy: string;
  role: "STUDENT" | "TOURIST" | "ADMIN" | "TEACHER" | "RESEARCHER" | "INVESTOR" | "GUIDE" | "OTHER";
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    invitations: Invitation[];
  };
}


function getInvitationStatus(invitation: Invitation): "accepted" | "expired" | "pending" {
  if (invitation.acceptedAt) return "accepted";
  const now = new Date();
  const expiresAt = new Date(invitation.expiresAt);
  return expiresAt < now ? "expired" : "pending";
}



function getStatusBadge(status: string) {
  switch (status) {
    case "accepted":
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
          <CheckCircle className="w-3 h-3 mr-1" />
          Accepted
        </Badge>
      );
    case "expired":
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getRoleBadge(role: string) {
  const colors = {
    ADMIN: "bg-red-50 text-red-700 border-red-200",
    TEACHER: "bg-gray-50 text-gray-700 border-gray-200",
    STUDENT: "bg-gray-50 text-gray-700 border-gray-200",
    TOURIST: "bg-gray-50 text-gray-700 border-gray-200",
    INVESTOR: "bg-gray-50 text-gray-700 border-gray-200",
    GUIDE: "bg-gray-50 text-gray-700 border-gray-200",
    RESEARCHER: "bg-gray-50 text-gray-700 border-gray-200",
    OTHER: "bg-gray-50 text-gray-700 border-gray-200"
  };
  
  return (
    <Badge className={colors[role as keyof typeof colors] || "bg-gray-50 text-gray-700 border-gray-200"}>
      {role}
    </Badge>
  );
}



export default function InvitationManagement() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTokens, setShowTokens] = useState<{ [key: string]: boolean }>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invitationToDelete, setInvitationToDelete] =
    useState<Invitation | null>(null);

  // Search and filter state
  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const { data: session, status } = useSession();
  
  const [newInvitation, setNewInvitation] = useState({
    email: "",
    role: "STUDENT" as Invitation["role"],
  });

useEffect(() => {
  const fetchInvitations = async () => {
    if (status === "loading") return;
    // @ts-ignore
    if (!session?.accessToken) {
      setError("No authentication token available");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          "Authorization": `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch invitations: ${res.status}`);
      }

      const data: ApiResponse = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch invitations");
      }

      setInvitations(data.data.invitations);
      setFilteredInvitations(data.data.invitations);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch invitations");
    } finally {
      setLoading(false);
    }
  };

  fetchInvitations();
}, [session, status]); 

  useEffect(() => {
    let filtered = invitations;

    if (searchEmail.trim()) {
      filtered = filtered.filter((inv) =>
        inv.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (inv) => getInvitationStatus(inv) === statusFilter
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((inv) => inv.role === roleFilter);
    }

    setFilteredInvitations(filtered);
  }, [invitations, searchEmail, statusFilter, roleFilter]);

 const createInvitation = async () => {
  if (!newInvitation.email.trim()) {
    setError("Please enter a valid email address");
    return;
  }
  // @ts-ignore
  if (!session?.accessToken) {
    setError("No authentication token available");
    return;
  }

  setLoadingStates((prev) => ({ ...prev, create: true }));
  setError(null);
  setSuccess(null);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        email: newInvitation.email,
        role: newInvitation.role,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create invitation: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.message || "Failed to create invitation");
    }

    setInvitations((prev) => [data.data.invitation, ...prev]);
    setSuccess(`Invitation sent to ${newInvitation.email}`);
    setNewInvitation({ email: "", role: "STUDENT" });
    setShowCreateForm(false);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to create invitation");
  } finally {
    setLoadingStates((prev) => ({ ...prev, create: false }));
  }
};

const resendInvitation = async (invitation: Invitation) => {
  setLoadingStates((prev) => ({
    ...prev,
    [`resend-${invitation.id}`]: true,
  }));
  setError(null);
  setSuccess(null);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitation.id}/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to resend invitation: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.message || "Failed to resend invitation");
    }

    setSuccess(`Invitation resent to ${invitation.email}`);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to resend invitation");
  } finally {
    setLoadingStates((prev) => ({
      ...prev,
      [`resend-${invitation.id}`]: false,
    }));
  }
};

  const confirmDelete = (invitation: Invitation) => {
    setInvitationToDelete(invitation);
    setDeleteModalOpen(true);
  };

  const deleteInvitation = async () => {
  if (!invitationToDelete) return;


  setLoadingStates((prev) => ({ ...prev, delete: true }));
  setError(null);
  setSuccess(null);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationToDelete.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete invitation: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.message || "Failed to delete invitation");
    }

    setInvitations((prev) =>
      prev.filter((inv) => inv.id !== invitationToDelete.id)
    );
    setSuccess(
      `Invitation for ${invitationToDelete.email} deleted successfully`
    );
    setDeleteModalOpen(false);
    setInvitationToDelete(null);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to delete invitation");
  } finally {
    setLoadingStates((prev) => ({ ...prev, delete: false }));
  }
};

  const toggleTokenVisibility = (invitationId: string) => {
    setShowTokens((prev) => ({
      ...prev,
      [invitationId]: !prev[invitationId],
    }));
  };

  const copyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setSuccess("Token copied to clipboard");
    } catch (err) {
      setError("Failed to copy token");
    }
  };

  const clearFilters = () => {
    setSearchEmail("");
    setStatusFilter("all");
    setRoleFilter("all");
  };

  // Calculate statistics
  const stats = {
    total: invitations.length,
    accepted: invitations.filter(
      (inv) => getInvitationStatus(inv) === "accepted"
    ).length,
    pending: invitations.filter((inv) => getInvitationStatus(inv) === "pending")
      .length,
    expired: invitations.filter((inv) => getInvitationStatus(inv) === "expired")
      .length,
  };

  const hasActiveFilters =
    searchEmail.trim() || statusFilter !== "all" || roleFilter !== "all";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading invitations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Invitation Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage platform invitations and user access
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Invitation
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <p className="text-green-800 font-medium">{success}</p>
            </div>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-600 hover:text-green-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Create Invitation Form */}
        {showCreateForm && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <UserPlus className="w-5 h-5 mr-2 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Invitation
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newInvitation.email}
                    onChange={(e) =>
                      setNewInvitation((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                    value={newInvitation.role}
                    onChange={(e) =>
                      setNewInvitation((prev) => ({
                        ...prev,
                        role: e.target.value as Invitation["role"],
                      }))
                    }
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="TOURIST">Tourist</option>
                    <option value="ADMIN">Admin</option>
                    <option value="RESEARCHER">Researcher</option>
                    <option value="INVESTOR">Investor</option>
                    <option value="GUIDE">Guide</option>
                    <option value="OTHER">Other</option>
                    
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={createInvitation}
                  disabled={loadingStates.create}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {loadingStates.create ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Invitation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.accepted}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.expired}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by email address..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="accepted">Accepted</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="TOURIST">Tourist</option>
                  <option value="ADMIN">Admin</option>
                  <option value="RESEARCHER">Researcher</option>
                  <option value="INVESTOR">Investor</option>
                  <option value="GUIDE">Guide</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            {hasActiveFilters && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredInvitations.length} of {invitations.length}{" "}
                  invitations
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredInvitations.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {hasActiveFilters
                  ? "No matching invitations"
                  : "No invitations found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters
                  ? "Try adjusting your search criteria or filters"
                  : "Create your first invitation to get started"}
              </p>
              {hasActiveFilters ? (
                <Button
                  onClick={clearFilters}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Clear filters
                </Button>
              ) : (
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create invitation
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Invitations List */}
        {filteredInvitations.length > 0 && (
          <div className="space-y-4">
            {filteredInvitations.map((invitation) => {
              const status = getInvitationStatus(invitation);
              const isTokenVisible = showTokens[invitation.id];
              const isResending = loadingStates[`resend-${invitation.id}`];

              return (
                <div
                  key={invitation.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {invitation.email}
                          </h3>
                          <div className="flex gap-2 mt-1 sm:mt-0">
                            {getRoleBadge(invitation.role)}
                            {getStatusBadge(status)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Invited on{" "}
                          {new Date(invitation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => resendInvitation(invitation)}
                                disabled={isResending}
                                className="cursor-pointer"
                              >
                                {isResending ? (
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                )}
                                Resend Invitation
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => copyToken(invitation.token)}
                              className="cursor-pointer"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Token
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => confirmDelete(invitation)}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Invitation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Expires:</span>
                        <span className="font-medium text-gray-900 ml-2">
                          {new Date(invitation.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                      {invitation.acceptedAt && (
                        <div>
                          <span className="text-gray-600">Accepted:</span>
                          <span className="font-medium text-green-600 ml-2">
                            {new Date(
                              invitation.acceptedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="sm:col-span-2 lg:col-span-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Token:</span>
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-3 py-1 rounded-md text-xs font-mono max-w-xs truncate">
                              {isTokenVisible
                                ? invitation.token
                                : "••••••••-••••-••••-••••-••••••••••••"}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                toggleTokenVisibility(invitation.id)
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {isTokenVisible ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Invitation</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the invitation for{" "}
                <span className="font-semibold">
                  {invitationToDelete?.email}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={deleteInvitation}
                disabled={loadingStates.delete}
                className="flex-1 sm:flex-none"
              >
                {loadingStates.delete ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}