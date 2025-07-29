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
  UserPlus,
  Download,
  Mail,
  Eye,
  Edit,
  Trash2,
  Users,
} from "lucide-react";

// Mock user data - replace with real API data
const users = [
  {
    id: "1",
    name: "Kwame Asante",
    email: "kwame.asante@email.com",
    role: "Tourist",
    country: "Ghana",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2024-07-28",
    avatar: "/placeholder-user.jpg",
    phone: "+233 24 123 4567",
    bookings: 12,
    spent: "$2,450",
  },
  {
    id: "2",
    name: "Amina Hassan",
    email: "amina.hassan@email.com",
    role: "Investor",
    country: "Kenya",
    status: "Active",
    joinDate: "2024-02-20",
    lastLogin: "2024-07-29",
    avatar: "/placeholder-user.jpg",
    phone: "+254 70 123 4567",
    bookings: 8,
    spent: "$15,000",
  },
  {
    id: "3",
    name: "Jean-Baptiste Mukama",
    email: "jb.mukama@email.com",
    role: "Consultant",
    country: "Rwanda",
    status: "Active",
    joinDate: "2024-01-10",
    lastLogin: "2024-07-29",
    avatar: "/placeholder-user.jpg",
    phone: "+250 78 123 4567",
    bookings: 25,
    spent: "$5,200",
  },
  {
    id: "4",
    name: "Fatima Al-Zahra",
    email: "fatima.alzahra@email.com",
    role: "Student",
    country: "Morocco",
    status: "Inactive",
    joinDate: "2024-03-05",
    lastLogin: "2024-07-20",
    avatar: "/placeholder-user.jpg",
    phone: "+212 6 123 4567",
    bookings: 3,
    spent: "$180",
  },
  {
    id: "5",
    name: "Michael Thompson",
    email: "michael.thompson@email.com",
    role: "Government Official",
    country: "South Africa",
    status: "Active",
    joinDate: "2024-02-15",
    lastLogin: "2024-07-28",
    avatar: "/placeholder-user.jpg",
    phone: "+27 82 123 4567",
    bookings: 15,
    spent: "$3,800",
  },
  {
    id: "6",
    name: "Aisha Diallo",
    email: "aisha.diallo@email.com",
    role: "Tourist",
    country: "Senegal",
    status: "Active",
    joinDate: "2024-04-01",
    lastLogin: "2024-07-29",
    avatar: "/placeholder-user.jpg",
    phone: "+221 77 123 4567",
    bookings: 7,
    spent: "$1,200",
  },
  {
    id: "7",
    name: "David Ochieng",
    email: "david.ochieng@email.com",
    role: "Consultant",
    country: "Uganda",
    status: "Pending",
    joinDate: "2024-07-25",
    lastLogin: "Never",
    avatar: "/placeholder-user.jpg",
    phone: "+256 77 123 4567",
    bookings: 0,
    spent: "$0",
  },
  {
    id: "8",
    name: "Mariam Kone",
    email: "mariam.kone@email.com",
    role: "Investor",
    country: "Mali",
    status: "Active",
    joinDate: "2024-01-30",
    lastLogin: "2024-07-27",
    avatar: "/placeholder-user.jpg",
    phone: "+223 70 123 4567",
    bookings: 20,
    spent: "$25,600",
  },
];

const roleColors = {
  Tourist: "bg-blue-100 text-blue-800",
  Investor: "bg-green-100 text-green-800",
  Consultant: "bg-purple-100 text-purple-800",
  Student: "bg-yellow-100 text-yellow-800",
  "Government Official": "bg-red-100 text-red-800",
  Admin: "bg-gray-100 text-gray-800",
};

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Suspended: "bg-red-100 text-red-800",
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    const matchesCountry =
      selectedCountry === "all" || user.country === selectedCountry;

    return matchesSearch && matchesRole && matchesStatus && matchesCountry;
  });

  const uniqueRoles = [...new Set(users.map((user) => user.role))];
  const uniqueCountries = [...new Set(users.map((user) => user.country))];
  const uniqueStatuses = [...new Set(users.map((user) => user.status))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all platform users
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
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <Users className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.status === "Active").length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    users.filter((u) => new Date(u.joinDate).getMonth() === 6)
                      .length
                  }
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {uniqueCountries.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {uniqueCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          roleColors[user.role as keyof typeof roleColors]
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.country}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusColors[user.status as keyof typeof statusColors]
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.joinDate}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="font-medium">
                      {user.bookings}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {user.spent}
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
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
