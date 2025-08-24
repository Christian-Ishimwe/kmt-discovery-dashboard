"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  RefreshCw,
  MoreHorizontal,
  Calendar,
  Download,
  Clock,
  CheckCircle,
  DollarSign,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useBookings } from "@/hooks/use-bookings";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  CONFIRMED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
};

const paymentStatusColors = {
  COMPLETED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

const categoryColors = {
  SPORTS: "bg-orange-100 text-orange-800",
  ENVIRONMENT: "bg-green-100 text-green-800",
  CULTURE: "bg-purple-100 text-purple-800",
  BUSINESS: "bg-blue-100 text-blue-800",
  EDUCATION: "bg-indigo-100 text-indigo-800",
};

const bookingTypeColors = {
  SITE_VISIT: "bg-cyan-100 text-cyan-800",
  EXPERT: "bg-violet-100 text-violet-800",
  CONSULTATION: "bg-pink-100 text-pink-800",
};

export default function BookingsPage() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBookingType, setSelectedBookingType] = useState("all");
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusNotes, setStatusNotes] = useState("");
  const [viewingBooking, setViewingBooking] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    bookings,
    allBookings,
    loading,
    error,
    pagination,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
    refetch,
    updatingBooking,
    deletingBooking,
  } = useBookings({
    page: currentPage,
    limit: 10,
    searchTerm,
    status: selectedStatus === "all" ? undefined : selectedStatus,
    paymentStatus:
      selectedPaymentStatus === "all" ? undefined : selectedPaymentStatus,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    bookingType:
      selectedBookingType === "all" ? undefined : selectedBookingType,
  });

  const handleEditBooking = (booking: any) => {
    setEditingBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleChangeStatus = (booking: any) => {
    setEditingBooking(booking);
    setStatusNotes("");
    setIsStatusDialogOpen(true);
  };

  const handleViewBooking = (booking: any) => {
    setViewingBooking(booking);
    setIsDetailsDialogOpen(true);
  };

  const handleSaveBooking = async () => {
    if (!editingBooking) return;

    try {
      await updateBooking(editingBooking.id, {
        description: editingBooking.description,
        location: editingBooking.location,
        requirements: editingBooking.requirements,
      });
      setIsEditDialogOpen(false);
      setEditingBooking(null);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleSaveStatus = async () => {
    if (!editingBooking) return;

    try {
      await updateBookingStatus(
        editingBooking.id,
        editingBooking.status,
        statusNotes || undefined
      );
      setIsStatusDialogOpen(false);
      setEditingBooking(null);
      setStatusNotes("");
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    setDeletingBookingId(bookingId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteBooking = async () => {
    if (!deletingBookingId) return;

    try {
      await deleteBooking(deletingBookingId);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingBookingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmedBookings = (allBookings || []).filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;
  const pendingBookings = (allBookings || []).filter(
    (booking) => booking.status === "PENDING"
  ).length;
  const totalBookings = (allBookings || []).length;
  const totalRevenue = (allBookings || [])
    .filter((b) => b.payment && b.payment.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.payment?.amount || 0), 0);

  const uniqueStatuses = [
    ...new Set((allBookings || []).map((booking) => booking.status)),
  ];
  const uniquePaymentStatuses = [
    ...new Set(
      (allBookings || [])
        .filter((booking) => booking.payment && booking.payment.status)
        .map((booking) => booking.payment.status)
    ),
  ];
  const uniqueCategories = [
    ...new Set((allBookings || []).map((booking) => booking.category)),
  ];
  const uniqueBookingTypes = [
    ...new Set((allBookings || []).map((booking) => booking.bookingType)),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage consultation bookings and appointments
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={refetch}
            disabled={loading}
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          {/* <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            New Booking
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="w-4 h-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-gray-600">All bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {confirmedBookings}
            </div>
            <p className="text-xs text-gray-600">Confirmed bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingBookings}
            </div>
            <p className="text-xs text-gray-600">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Total revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Bookings</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by ID, provider, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Payment Status</Label>
              <Select
                value={selectedPaymentStatus}
                onValueChange={setSelectedPaymentStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All payment statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Status</SelectItem>
                  {uniquePaymentStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Booking Type</Label>
              <Select
                value={selectedBookingType}
                onValueChange={setSelectedBookingType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueBookingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Bookings ({pagination.total || 0})
            {pagination.totalPages > 1 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="text-gray-600 mt-2">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading bookings: {error}</p>
              <Button onClick={refetch} className="mt-2">
                Try Again
              </Button>
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-gray-600 mt-2">No bookings found</p>
              {searchTerm && (
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filters
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-red-600">
                          {booking.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  booking.provider.avatarUrl ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                {booking.provider.firstName[0]}
                                {booking.provider.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">
                                {booking.provider.firstName}{" "}
                                {booking.provider.lastName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.provider.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.startTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              categoryColors[
                                booking.category as keyof typeof categoryColors
                              ] || "bg-gray-100 text-gray-800"
                            }
                          >
                            {booking.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              bookingTypeColors[
                                booking.bookingType as keyof typeof bookingTypeColors
                              ] || "bg-gray-100 text-gray-800"
                            }
                          >
                            {booking.bookingType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              statusColors[
                                booking.status as keyof typeof statusColors
                              ] || "bg-gray-100 text-gray-800"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.payment && booking.payment.status ? (
                            <Badge
                              className={
                                paymentStatusColors[
                                  booking.payment
                                    .status as keyof typeof paymentStatusColors
                                ] || "bg-gray-100 text-gray-800"
                              }
                            >
                              {booking.payment.status}
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              N/A
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${booking.payment?.amount || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditBooking(booking)}
                              disabled={updatingBooking === booking.id}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBooking(booking.id)}
                              disabled={deletingBooking === booking.id}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => handleViewBooking(booking)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleChangeStatus(booking)}
                                >
                                  Change Status
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem>
                                  Contact Provider
                                </DropdownMenuItem> */}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={()=> handleDeleteBooking(booking.id)}
                                className="text-red-600">
                                  Cancel Booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {pagination &&
                pagination.totalPages > 1 &&
                bookings &&
                bookings.length > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}{" "}
                      of {pagination.total} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, pagination.totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (pagination.totalPages <= 5) {
                              pageNum = i + 1;
                            } else {
                              const start = Math.max(1, pagination.page - 2);
                              const end = Math.min(
                                pagination.totalPages,
                                start + 4
                              );
                              pageNum = start + i;
                              if (pageNum > end) return null;
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  pagination.page === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className="w-8 h-8 p-0"
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        ).filter(Boolean)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>Update booking details</DialogDescription>
          </DialogHeader>
          {editingBooking && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Booking</Label>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        editingBooking.provider.avatarUrl || "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {editingBooking.provider.firstName[0]}
                      {editingBooking.provider.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {editingBooking.provider.firstName}{" "}
                      {editingBooking.provider.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {editingBooking.id.slice(0, 8)}... •{" "}
                      {editingBooking.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingBooking.description}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingBooking.location}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (JSON)</Label>
                <Textarea
                  id="requirements"
                  value={JSON.stringify(editingBooking.requirements, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingBooking({
                        ...editingBooking,
                        requirements: parsed,
                      });
                    } catch {
                      // Invalid JSON, keep the string value for editing
                    }
                  }}
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBooking}
              className="bg-red-600 hover:bg-red-700"
              disabled={updatingBooking === editingBooking?.id}
            >
              {updatingBooking === editingBooking?.id
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Booking Status</DialogTitle>
            <DialogDescription>
              Update the status of this booking
            </DialogDescription>
          </DialogHeader>
          {editingBooking && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Booking</Label>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        editingBooking.provider.avatarUrl || "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {editingBooking.provider.firstName[0]}
                      {editingBooking.provider.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {editingBooking.provider.firstName}{" "}
                      {editingBooking.provider.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {editingBooking.id.slice(0, 8)}... •{" "}
                      {editingBooking.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select
                  value={editingBooking.status}
                  onValueChange={(value) =>
                    setEditingBooking({ ...editingBooking, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this status change..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveStatus}
              className="bg-red-600 hover:bg-red-700"
              disabled={updatingBooking === editingBooking?.id}
            >
              {updatingBooking === editingBooking?.id
                ? "Updating..."
                : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          {viewingBooking && (
            <div className="space-y-6 py-4">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Booking ID
                  </Label>
                  <p className="font-mono text-sm">{viewingBooking.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <Badge
                    className={
                      statusColors[
                        viewingBooking.status as keyof typeof statusColors
                      ] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {viewingBooking.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Category
                  </Label>
                  <Badge
                    className={
                      categoryColors[
                        viewingBooking.category as keyof typeof categoryColors
                      ] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {viewingBooking.category}
                  </Badge>
                </div>
              </div>

              {/* Provider Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Provider
                </Label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        viewingBooking.provider.avatarUrl || "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {viewingBooking.provider.firstName[0]}
                      {viewingBooking.provider.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {viewingBooking.provider.firstName}{" "}
                      {viewingBooking.provider.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {viewingBooking.provider.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Date & Time
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {new Date(viewingBooking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(viewingBooking.startTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                      {viewingBooking.endTime &&
                        ` - ${new Date(
                          viewingBooking.endTime
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Location
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p>{viewingBooking.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Booking Type
                  </Label>
                  <Badge
                    className={
                      bookingTypeColors[
                        viewingBooking.bookingType as keyof typeof bookingTypeColors
                      ] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {viewingBooking.bookingType}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Description
                </Label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {viewingBooking.description}
                  </p>
                </div>
              </div>

              {/* Payment Info Grid */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Payment Information
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-lg font-bold text-green-600">
                      ${viewingBooking.payment?.amount || 0}{" "}
                      {viewingBooking.payment?.currency || "USD"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    {viewingBooking.payment && viewingBooking.payment.status ? (
                      <Badge
                        className={
                          paymentStatusColors[
                            viewingBooking.payment
                              .status as keyof typeof paymentStatusColors
                          ] || "bg-gray-100 text-gray-800"
                        }
                      >
                        {viewingBooking.payment.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">N/A</Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transaction ID</p>
                    <p className="text-sm font-mono">
                      {viewingBooking.payment?.transactionId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {viewingBooking.requirements && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Requirements
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {typeof viewingBooking.requirements === "object" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(viewingBooking.requirements).map(
                          ([key, value]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>
                              <p className="text-sm text-gray-600">
                                {typeof value === "object"
                                  ? JSON.stringify(value, null, 2)
                                  : String(value)}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <pre className="text-sm overflow-auto whitespace-pre-wrap">
                        {JSON.stringify(viewingBooking.requirements, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                <div className="space-y-1">
                  <p className="font-medium">Created</p>
                  <p>{new Date(viewingBooking.createdAt).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Last Updated</p>
                  <p>{new Date(viewingBooking.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailsDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsDetailsDialogOpen(false);
                handleChangeStatus(viewingBooking);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Change Status
            </Button>
            <Button
              onClick={() => {
                setIsDetailsDialogOpen(false);
                handleEditBooking(viewingBooking);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Edit Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone and will permanently remove the booking from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingBookingId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteBooking}
              className="bg-red-600 hover:bg-red-700"
              disabled={deletingBooking === deletingBookingId}
            >
              {deletingBooking === deletingBookingId
                ? "Deleting..."
                : "Delete Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
