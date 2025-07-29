"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics & Insights
          </h1>
          <p className="text-gray-600 mt-1">
            Track platform performance and user engagement
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Page Views
                </p>
                <p className="text-2xl font-bold text-gray-900">125,847</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +15.2% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <BarChart3 className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  User Engagement
                </p>
                <p className="text-2xl font-bold text-gray-900">8.7min</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12% avg session time
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">3.4%</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  -2.1% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Countries Reached
                </p>
                <p className="text-2xl font-bold text-gray-900">54</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  All African countries
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sector Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  sector: "Tourism",
                  visitors: 45230,
                  growth: "+18%",
                  color: "bg-blue-600",
                },
                {
                  sector: "Investment",
                  visitors: 38920,
                  growth: "+22%",
                  color: "bg-green-600",
                },
                {
                  sector: "Culture",
                  visitors: 28540,
                  growth: "+12%",
                  color: "bg-purple-600",
                },
                {
                  sector: "Technology",
                  visitors: 24180,
                  growth: "+35%",
                  color: "bg-red-600",
                },
                {
                  sector: "Infrastructure",
                  visitors: 19870,
                  growth: "+8%",
                  color: "bg-orange-600",
                },
              ].map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${sector.color}`}></div>
                    <span className="font-medium text-gray-900">
                      {sector.sector}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">
                      {sector.visitors.toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600 ml-2">
                      {sector.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries by Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  country: "🇳🇬 Nigeria",
                  sessions: 28450,
                  duration: "9.2min",
                  bounce: "32%",
                },
                {
                  country: "🇰🇪 Kenya",
                  sessions: 24180,
                  duration: "8.7min",
                  bounce: "28%",
                },
                {
                  country: "🇿🇦 South Africa",
                  sessions: 21650,
                  duration: "8.1min",
                  bounce: "31%",
                },
                {
                  country: "🇬🇭 Ghana",
                  sessions: 18920,
                  duration: "7.9min",
                  bounce: "35%",
                },
                {
                  country: "🇷🇼 Rwanda",
                  sessions: 15680,
                  duration: "10.4min",
                  bounce: "22%",
                },
              ].map((country, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {country.country}
                    </h4>
                    <span className="text-sm font-semibold text-gray-900">
                      {country.sessions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Avg Duration: {country.duration}</span>
                    <span>Bounce Rate: {country.bounce}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Behavior Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Tourists", count: 4250, percentage: 34 },
                { type: "Investors", count: 2890, percentage: 23 },
                { type: "Students", count: 2120, percentage: 17 },
                { type: "Consultants", count: 1560, percentage: 13 },
                { type: "Gov Officials", count: 890, percentage: 7 },
                { type: "Others", count: 773, percentage: 6 },
              ].map((userType, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {userType.type}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {userType.count}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({userType.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Content Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Investment Guides", views: 45230, engagement: "87%" },
                { type: "Tourism Articles", views: 38920, engagement: "92%" },
                { type: "Cultural Stories", views: 28540, engagement: "78%" },
                {
                  type: "Infrastructure Reports",
                  views: 24180,
                  engagement: "65%",
                },
                { type: "Economic Analysis", views: 19870, engagement: "71%" },
              ].map((content, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {content.type}
                    </span>
                    <span className="text-xs text-green-600">
                      {content.engagement}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {content.views.toLocaleString()} views
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device & Platform Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Device Usage
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mobile</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Desktop</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tablet</span>
                    <span className="font-medium">8%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Top Browsers
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chrome</span>
                    <span className="font-medium">54%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Safari</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Firefox</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Edge</span>
                    <span className="font-medium">11%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
