import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  IndianRupee,
  ArrowRight,
  Calendar,
  MessageSquare,
  Megaphone,
  Zap,
  Target,
} from "lucide-react";

export default function Dashboard() {
  const quickActions = [
    {
      title: "Generate AI Content",
      description: "Create posts and campaigns",
      icon: Zap,
      href: "/dashboard/ai-content",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Send WhatsApp Campaign",
      description: "Reach your customers",
      icon: MessageSquare,
      href: "/dashboard/whatsapp",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Create Ad Campaign",
      description: "Google & Facebook ads",
      icon: Megaphone,
      href: "/dashboard/ads",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Festival Campaigns",
      description: "Ready-made templates",
      icon: Calendar,
      href: "/dashboard/festivals",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const recentMetrics = [
    {
      title: "Total Reach",
      value: "--",
      change: "",
      icon: Eye,
    },
    {
      title: "Engagement",
      value: "--%",
      change: "",
      icon: MousePointer,
    },
    {
      title: "New Leads",
      value: "--",
      change: "",
      icon: Users,
    },
    {
      title: "Cost/Lead",
      value: "₹--",
      change: "",
      icon: IndianRupee,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-brand-blue-500 to-brand-orange-500 rounded-lg text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome! 👋
              </h1>
              <p className="text-white/90 mb-4">
                Ready to grow your business? Start by creating your first
                campaign or exploring AI-powered tools.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">AI-powered tools ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Start your marketing journey</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div
                            className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Metrics */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Today's Performance</CardTitle>
                  <Link to="/dashboard/analytics">
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.title} className="text-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.title}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {metric.change}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No tasks scheduled</p>
                <p className="text-sm text-gray-500 mb-4">
                  Create campaigns to see upcoming tasks here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-dashed border-2 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-500">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No activity yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Start creating campaigns to see your recent activity here
                </p>
                <Button className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  <Zap className="w-4 h-4 mr-2" />
                  Create First Campaign
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-500">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No progress data yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Set goals and start campaigns to track your monthly progress
                </p>
                <Button variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Set Monthly Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
