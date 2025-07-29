"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  FileText,
  DollarSign,
  ArrowUpRight,
  Globe,
  Building,
  Target,
  Eye,
  MessageSquare,
  Bell,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,483",
    change: "+18%",
    icon: Users,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Active platform users",
  },
  {
    title: "Consultation Bookings",
    value: "1,247",
    change: "+12%",
    icon: Calendar,
    color: "text-black",
    bgColor: "bg-gray-50",
    description: "This month",
  },
  {
    title: "Published Articles",
    value: "892",
    change: "+8%",
    icon: FileText,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Across all sectors",
  },
  {
    title: "Revenue",
    value: "$84,320",
    change: "+23%",
    icon: DollarSign,
    color: "text-black",
    bgColor: "bg-gray-50",
    description: "Monthly revenue",
  },
];

const usersByRole = [
  { role: "Tourists", count: 4250, percentage: 34, color: "bg-red-600" },
  { role: "Investors", count: 2890, percentage: 23, color: "bg-black" },
  { role: "Consultants", count: 1560, percentage: 13, color: "bg-red-400" },
  { role: "Students", count: 2120, percentage: 17, color: "bg-gray-600" },
  { role: "Gov Officials", count: 890, percentage: 7, color: "bg-gray-400" },
  { role: "Others", count: 773, percentage: 6, color: "bg-gray-300" },
];

const recentActivities = [
  {
    title: "New Tourism Investment Opportunity",
    sector: "Tourism",
    location: "Rwanda",
    status: "Published",
    time: "2 hours ago",
    author: "Content Admin",
  },
  {
    title: "Economic Policy Update",
    sector: "Economy",
    location: "Kenya",
    status: "Draft",
    time: "4 hours ago",
    author: "Policy Expert",
  },
  {
    title: "Cultural Heritage Documentation",
    sector: "Culture",
    location: "Ghana",
    status: "Under Review",
    time: "6 hours ago",
    author: "Cultural Specialist",
  },
  {
    title: "Infrastructure Development Report",
    sector: "Infrastructure",
    location: "Nigeria",
    status: "Published",
    time: "1 day ago",
    author: "Infrastructure Analyst",
  },
];

const countries = [
  { name: "Rwanda", users: 2450, growth: 15, flag: "🇷🇼" },
  { name: "Kenya", users: 2100, growth: 12, flag: "🇰🇪" },
  { name: "Nigeria", users: 1890, growth: 18, flag: "🇳🇬" },
  { name: "Ghana", users: 1650, growth: 10, flag: "🇬🇭" },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="opacity-90">
          Here's what's happening with your KMT Discovery platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                  <p className={`text-sm ${stat.color} flex items-center mt-2`}>
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users by Role Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Users by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersByRole.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${user.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.role}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {user.count.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({user.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Content Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">
                Recent Content Activities
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {activity.sector}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {activity.location}
                      </span>
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      by {activity.author}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "Published"
                          ? "default"
                          : activity.status === "Draft"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        activity.status === "Published"
                          ? "bg-red-600 hover:bg-red-700"
                          : activity.status === "Draft"
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "border-red-200 text-red-600"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Country Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              Top Performing Countries
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              View Analytics
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {countries.map((country, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{country.flag}</div>
                <h4 className="font-medium text-gray-900">{country.name}</h4>
                <p className="text-sm text-gray-600">
                  {country.users.toLocaleString()} users
                </p>
                <p className="text-xs text-red-600 font-medium mt-1">
                  +{country.growth}% growth
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 bg-red-600 hover:bg-red-700 text-white flex-col space-y-2">
              <Users className="w-5 h-5" />
              <span>Manage Users</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 border-red-200 text-red-600 hover:bg-red-50 flex-col space-y-2"
            >
              <FileText className="w-5 h-5" />
              <span>Create Article</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 border-gray-200 text-gray-600 hover:bg-gray-50 flex-col space-y-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View Bookings</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 border-gray-200 text-gray-600 hover:bg-gray-50 flex-col space-y-2"
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
