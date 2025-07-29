"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Payments & Revenue
          </h1>
          <p className="text-gray-600 mt-1">
            Track payments, subscriptions, and revenue analytics
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
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">$84,320</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +23% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-50">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Subscription Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">$52,140</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +18% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Consultation Fees
                </p>
                <p className="text-2xl font-bold text-gray-900">$32,180</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +15% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Paying Users
                </p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  plan: "Basic Plan",
                  price: "$9.99/month",
                  subscribers: 1250,
                  revenue: "$12,487",
                  growth: "+15%",
                },
                {
                  plan: "Pro Plan",
                  price: "$29.99/month",
                  subscribers: 890,
                  revenue: "$26,691",
                  growth: "+22%",
                },
                {
                  plan: "Enterprise Plan",
                  price: "$99.99/month",
                  subscribers: 156,
                  revenue: "$15,598",
                  growth: "+8%",
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.plan}</h4>
                    <p className="text-sm text-gray-500">
                      {plan.price} • {plan.subscribers} subscribers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {plan.revenue}
                    </p>
                    <p className="text-sm text-green-600">{plan.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: "Kwame Asante",
                  amount: "$150",
                  type: "Consultation",
                  status: "Completed",
                  time: "2 hours ago",
                },
                {
                  user: "Amina Hassan",
                  amount: "$29.99",
                  type: "Pro Subscription",
                  status: "Completed",
                  time: "4 hours ago",
                },
                {
                  user: "Jean-Baptiste",
                  amount: "$120",
                  type: "Consultation",
                  status: "Pending",
                  time: "6 hours ago",
                },
                {
                  user: "Michael Thompson",
                  amount: "$99.99",
                  type: "Enterprise Sub",
                  status: "Completed",
                  time: "1 day ago",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {transaction.user}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {transaction.type} • {transaction.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {transaction.amount}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        transaction.status === "Completed" ? "bg-green-600" : ""
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                method: "Credit/Debit Cards",
                percentage: 65,
                amount: "$54,808",
                color: "bg-red-600",
              },
              {
                method: "Mobile Money",
                percentage: 25,
                amount: "$21,080",
                color: "bg-blue-600",
              },
              {
                method: "Bank Transfer",
                percentage: 10,
                amount: "$8,432",
                color: "bg-green-600",
              },
            ].map((method, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <CreditCard className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{method.method}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Share</span>
                    <span className="font-medium">{method.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${method.color} h-2 rounded-full transition-all duration-300`}
                      data-percentage={method.percentage}
                    ></div>
                  </div>
                  <p className="font-semibold text-gray-900">{method.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
