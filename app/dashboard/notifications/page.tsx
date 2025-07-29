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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  UserPlus,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Trash2,
  Filter,
  Download,
  XCircle,
  Clock,
} from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: "1",
    type: "user_signup",
    title: "New User Registration",
    message: "Kwame Asante from Ghana has joined as a Tourist",
    timestamp: "2 minutes ago",
    isRead: false,
    severity: "info",
    avatar: "/placeholder-user.jpg",
    actionable: true,
  },
  {
    id: "2",
    type: "booking",
    title: "New Consultation Booking",
    message:
      "Amina Hassan booked a consultation with Dr. Sarah Mbeki for Tourism Development",
    timestamp: "15 minutes ago",
    isRead: false,
    severity: "success",
    avatar: "/placeholder-user.jpg",
    actionable: true,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $300 received for Investment Consultation booking",
    timestamp: "1 hour ago",
    isRead: true,
    severity: "success",
    avatar: null,
    actionable: false,
  },
  {
    id: "4",
    type: "feedback",
    title: "New Feedback Submitted",
    message:
      "Jean-Baptiste left 5-star feedback for Cultural Heritage consultation",
    timestamp: "2 hours ago",
    isRead: true,
    severity: "info",
    avatar: "/placeholder-user.jpg",
    actionable: true,
  },
  {
    id: "5",
    type: "content",
    title: "Article Published",
    message:
      "New article 'Sustainable Tourism in Rwanda' has been published by Dr. Sarah Mbeki",
    timestamp: "4 hours ago",
    isRead: true,
    severity: "info",
    avatar: "/placeholder-user.jpg",
    actionable: false,
  },
  {
    id: "6",
    type: "error",
    title: "Payment Failed",
    message:
      "Payment attempt failed for user Fatima Al-Zahra - requires attention",
    timestamp: "6 hours ago",
    isRead: false,
    severity: "error",
    avatar: "/placeholder-user.jpg",
    actionable: true,
  },
  {
    id: "7",
    type: "system",
    title: "System Maintenance",
    message:
      "Scheduled maintenance completed successfully - all services are operational",
    timestamp: "1 day ago",
    isRead: true,
    severity: "info",
    avatar: null,
    actionable: false,
  },
  {
    id: "8",
    type: "subscription",
    title: "New Enterprise Subscription",
    message: "Michael Thompson upgraded to Enterprise plan - $99.99/month",
    timestamp: "2 days ago",
    isRead: true,
    severity: "success",
    avatar: "/placeholder-user.jpg",
    actionable: false,
  },
];

const typeIcons = {
  user_signup: UserPlus,
  booking: Calendar,
  payment: CheckCircle,
  feedback: MessageSquare,
  content: Bell,
  error: AlertTriangle,
  system: Bell,
  subscription: CheckCircle,
};

const severityColors = {
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
};

const typeColors = {
  user_signup: "bg-purple-50 text-purple-600",
  booking: "bg-blue-50 text-blue-600",
  payment: "bg-green-50 text-green-600",
  feedback: "bg-orange-50 text-orange-600",
  content: "bg-indigo-50 text-indigo-600",
  error: "bg-red-50 text-red-600",
  system: "bg-gray-50 text-gray-600",
  subscription: "bg-emerald-50 text-emerald-600",
};

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || notification.type === selectedType;
    const matchesSeverity =
      selectedSeverity === "all" || notification.severity === selectedSeverity;
    const matchesReadStatus = !showUnreadOnly || !notification.isRead;

    return matchesSearch && matchesType && matchesSeverity && matchesReadStatus;
  });

  const uniqueTypes = [...new Set(notifications.map((n) => n.type))];
  const uniqueSeverities = [...new Set(notifications.map((n) => n.severity))];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with platform activities and system alerts
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
            <Bell className="w-4 h-4 mr-2" />
            Mark All Read
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
                  Total Notifications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {unreadCount}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  User Actions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    notifications.filter(
                      (n) => n.type === "user_signup" || n.type === "booking"
                    ).length
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
                <p className="text-sm font-medium text-gray-600">Actionable</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter((n) => n.actionable).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                {uniqueSeverities.map((severity) => (
                  <SelectItem key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={showUnreadOnly ? "default" : "outline"}
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={
                showUnreadOnly
                  ? "bg-red-600 hover:bg-red-700"
                  : "border-red-200 text-red-600 hover:bg-red-50"
              }
            >
              <Filter className="w-4 h-4 mr-2" />
              Unread Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent =
                typeIcons[notification.type as keyof typeof typeIcons];
              return (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      typeColors[notification.type as keyof typeof typeColors]
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {notification.avatar && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            severityColors[
                              notification.severity as keyof typeof severityColors
                            ]
                          }
                        >
                          {notification.severity}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {notification.timestamp}
                      </span>
                      <div className="flex items-center space-x-2">
                        {notification.actionable && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
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
                              Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
