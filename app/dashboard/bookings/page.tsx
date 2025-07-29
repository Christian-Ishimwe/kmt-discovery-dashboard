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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  User,
  MapPin,
} from "lucide-react";

// Mock booking data
const bookings = [
  {
    id: "BK001",
    clientName: "Kwame Asante",
    clientEmail: "kwame.asante@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Dr. Sarah Mbeki",
    consultantSpecialty: "Tourism Development",
    date: "2024-07-30",
    time: "10:00 AM",
    duration: "60 min",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: "$150",
    type: "Tourism Consultation",
    location: "Virtual",
    country: "Ghana",
  },
  {
    id: "BK002",
    clientName: "Amina Hassan",
    clientEmail: "amina.hassan@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Prof. James Okonkwo",
    consultantSpecialty: "Investment Strategy",
    date: "2024-07-30",
    time: "2:00 PM",
    duration: "90 min",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: "$300",
    type: "Investment Consultation",
    location: "Nairobi Office",
    country: "Kenya",
  },
  {
    id: "BK003",
    clientName: "Jean-Baptiste Mukama",
    clientEmail: "jb.mukama@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Dr. Fatima Al-Rashid",
    consultantSpecialty: "Cultural Heritage",
    date: "2024-07-31",
    time: "11:30 AM",
    duration: "45 min",
    status: "Pending",
    paymentStatus: "Pending",
    amount: "$120",
    type: "Cultural Consultation",
    location: "Virtual",
    country: "Rwanda",
  },
  {
    id: "BK004",
    clientName: "Michael Thompson",
    clientEmail: "michael.thompson@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Dr. Aisha Diallo",
    consultantSpecialty: "Infrastructure Development",
    date: "2024-08-01",
    time: "9:00 AM",
    duration: "120 min",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: "$450",
    type: "Infrastructure Consultation",
    location: "Cape Town Office",
    country: "South Africa",
  },
  {
    id: "BK005",
    clientName: "Mariam Kone",
    clientEmail: "mariam.kone@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Prof. David Okello",
    consultantSpecialty: "Economic Policy",
    date: "2024-08-02",
    time: "3:00 PM",
    duration: "60 min",
    status: "Cancelled",
    paymentStatus: "Refunded",
    amount: "$200",
    type: "Policy Consultation",
    location: "Virtual",
    country: "Mali",
  },
  {
    id: "BK006",
    clientName: "Fatima Al-Zahra",
    clientEmail: "fatima.alzahra@email.com",
    clientAvatar: "/placeholder-user.jpg",
    consultantName: "Dr. Samuel Nyong",
    consultantSpecialty: "Education Development",
    date: "2024-08-03",
    time: "1:00 PM",
    duration: "60 min",
    status: "Pending",
    paymentStatus: "Pending",
    amount: "$100",
    type: "Education Consultation",
    location: "Virtual",
    country: "Morocco",
  },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Completed: "bg-blue-100 text-blue-800",
};

const paymentStatusColors = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
  Refunded: "bg-gray-100 text-gray-800",
};

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.consultantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      booking.paymentStatus === selectedPaymentStatus;
    const matchesType = selectedType === "all" || booking.type === selectedType;

    return (
      matchesSearch && matchesStatus && matchesPaymentStatus && matchesType
    );
  });

  const uniqueStatuses = [
    ...new Set(bookings.map((booking) => booking.status)),
  ];
  const uniquePaymentStatuses = [
    ...new Set(bookings.map((booking) => booking.paymentStatus)),
  ];
  const uniqueTypes = [...new Set(bookings.map((booking) => booking.type))];

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + parseFloat(b.amount.replace("$", "")), 0);

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
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter((b) => b.status === "Confirmed").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter((b) => b.status === "Pending").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
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
            <Select
              value={selectedPaymentStatus}
              onValueChange={setSelectedPaymentStatus}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Payment status" />
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Consultant</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-red-600">
                      {booking.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.clientAvatar} />
                          <AvatarFallback>
                            {booking.clientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.clientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.country}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.consultantName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.consultantSpecialty}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.time} ({booking.duration})
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.type}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {booking.location}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[
                            booking.status as keyof typeof statusColors
                          ]
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          paymentStatusColors[
                            booking.paymentStatus as keyof typeof paymentStatusColors
                          ]
                        }
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {booking.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                          <DropdownMenuItem>Contact Client</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
