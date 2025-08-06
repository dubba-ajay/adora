import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  SectionHeader, 
  MetricCard, 
  ModernCard, 
  StatusBadge, 
  ProgressRing,
  ActionButton,
  EmptyState,
} from "@/components/ModernDesignSystem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  Target,
  Zap,
  Globe,
  Calendar,
  Clock,
  Star,
  Award,
  Smartphone,
  Monitor,
  Activity,
  DollarSign,
  Eye,
  MousePointer,
  Share2,
  Heart,
  Send,
  ArrowRight,
  Plus,
  Settings,
  Sparkles,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Search,
  ChevronRight,
  ExternalLink,
  Briefcase,
  ShoppingCart,
  PieChart,
  LineChart,
  Building,
  MapPin,
  Phone,
  Crown,
  Flame,
  Rocket,
  Megaphone,
  Coffee,
  Camera,
  Video,
  Image as ImageIcon,
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  href: string;
  isNew?: boolean;
  isPremium?: boolean;
}

interface RecentActivity {
  id: string;
  type: "email" | "whatsapp" | "social" | "ads" | "lead";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
  icon: any;
  color: string;
}

interface ServiceStats {
  service: string;
  icon: any;
  stats: {
    total: number;
    active: number;
    performance: number;
    trend: "up" | "down" | "neutral";
  };
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: "email",
    title: "Create Email Campaign",
    description: "Send personalized emails to your customers",
    icon: Mail,
    color: "from-blue-500 to-purple-500",
    href: "/dashboard/email-marketing",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Broadcast",
    description: "Send bulk messages on WhatsApp",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-500",
    href: "/dashboard/whatsapp",
  },
  {
    id: "social",
    title: "Social Media Post",
    description: "Create engaging social content",
    icon: Share2,
    color: "from-purple-500 to-pink-500",
    href: "/dashboard/social-media",
  },
  {
    id: "ads",
    title: "Run Advertisements",
    description: "Create Google & Facebook ads",
    icon: Target,
    color: "from-orange-500 to-red-500",
    href: "/dashboard/ads",
  },
  {
    id: "leads",
    title: "Manage Leads",
    description: "Track and convert leads",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
    href: "/dashboard/lead-management",
    isNew: true,
  },
  {
    id: "analytics",
    title: "View Analytics",
    description: "Track your marketing performance",
    icon: BarChart3,
    color: "from-teal-500 to-cyan-500",
    href: "/dashboard/analytics",
  },
];

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "email",
    title: "Email Campaign Sent",
    description: "Product promotion email sent to 1,250 subscribers",
    timestamp: "2 hours ago",
    status: "success",
    icon: Mail,
    color: "text-blue-600",
  },
  {
    id: "2",
    type: "whatsapp",
    title: "WhatsApp Broadcast",
    description: "Festival offer message sent to 500 customers",
    timestamp: "4 hours ago",
    status: "success",
    icon: MessageSquare,
    color: "text-green-600",
  },
  {
    id: "3",
    type: "social",
    title: "Instagram Post",
    description: "Product showcase post published",
    timestamp: "6 hours ago",
    status: "success",
    icon: Camera,
    color: "text-purple-600",
  },
  {
    id: "4",
    type: "lead",
    title: "New Lead Added",
    description: "Rajesh Kumar from Delhi - High priority",
    timestamp: "8 hours ago",
    status: "pending",
    icon: Users,
    color: "text-orange-600",
  },
  {
    id: "5",
    type: "ads",
    title: "Facebook Ad Campaign",
    description: "New campaign started with ₹5,000 budget",
    timestamp: "1 day ago",
    status: "success",
    icon: Target,
    color: "text-red-600",
  },
];

const serviceStats: ServiceStats[] = [
  {
    service: "Email Marketing",
    icon: Mail,
    stats: { total: 25, active: 12, performance: 85, trend: "up" },
    color: "blue",
  },
  {
    service: "WhatsApp Business",
    icon: MessageSquare,
    stats: { total: 18, active: 15, performance: 92, trend: "up" },
    color: "green",
  },
  {
    service: "Social Media",
    icon: Share2,
    stats: { total: 32, active: 8, performance: 78, trend: "neutral" },
    color: "purple",
  },
  {
    service: "Google & Facebook Ads",
    icon: Target,
    stats: { total: 15, active: 6, performance: 88, trend: "up" },
    color: "orange",
  },
  {
    service: "Lead Management",
    icon: Users,
    stats: { total: 45, active: 23, performance: 91, trend: "up" },
    color: "indigo",
  },
  {
    service: "Analytics & Reports",
    icon: BarChart3,
    stats: { total: 8, active: 8, performance: 95, trend: "up" },
    color: "teal",
  },
];

export default function DashboardModern() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  // Calculate overall metrics
  const overallMetrics = useMemo(() => {
    return {
      totalCampaigns: 42,
      totalReach: 125430,
      totalEngagement: 8945,
      totalLeads: 234,
      totalRevenue: 185600,
      conversionRate: 12.8,
      avgEngagement: 7.1,
      activeServices: 6,
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Modern Header */}
        <SectionHeader
          title="Marketing Dashboard"
          subtitle={`Welcome back! Here's your marketing overview for ${selectedMarketTier.name}`}
          badge="AI-Powered"
          icon={BarChart3}
          gradient
          actions={
            <>
              <Badge variant="outline" className="gap-2 px-4 py-2">
                <Globe className="h-4 w-4" />
                {selectedMarketTier.name}
              </Badge>
              <Badge variant="secondary" className="gap-2 px-4 py-2">
                <Activity className="w-4 h-4" />
                {overallMetrics.activeServices} Services Active
              </Badge>
              <ActionButton gradient icon={Settings}>
                Settings
              </ActionButton>
            </>
          }
        />

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Reach"
            value={overallMetrics.totalReach.toLocaleString()}
            subtitle="Across all channels"
            icon={Eye}
            gradient="blue"
            trend={{ value: 12.5, direction: "up", period: "this month" }}
          />
          
          <MetricCard
            title="Total Engagement"
            value={overallMetrics.totalEngagement.toLocaleString()}
            subtitle="Likes, comments, shares"
            icon={Heart}
            gradient="purple"
            trend={{ value: 8.3, direction: "up", period: "this month" }}
          />
          
          <MetricCard
            title="Total Leads"
            value={overallMetrics.totalLeads}
            subtitle="Quality prospects"
            icon={Users}
            gradient="green"
            trend={{ value: 15.2, direction: "up", period: "this month" }}
          />
          
          <MetricCard
            title="Revenue Generated"
            value={`₹${(overallMetrics.totalRevenue / 1000).toFixed(0)}K`}
            subtitle="From campaigns"
            icon={DollarSign}
            gradient="orange"
            trend={{ value: 22.1, direction: "up", period: "this month" }}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModernCard variant="gradient" gradient="indigo">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-indigo-900">{overallMetrics.conversionRate}%</p>
                </div>
                <ProgressRing value={overallMetrics.conversionRate * 7} size="md">
                  <span className="text-sm font-semibold text-indigo-600">
                    {overallMetrics.conversionRate}%
                  </span>
                </ProgressRing>
              </div>
            </CardContent>
          </ModernCard>

          <ModernCard variant="gradient" gradient="pink">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pink-600">Avg Engagement</p>
                  <p className="text-2xl font-bold text-pink-900">{overallMetrics.avgEngagement}%</p>
                </div>
                <ProgressRing value={overallMetrics.avgEngagement * 14} size="md">
                  <span className="text-sm font-semibold text-pink-600">
                    {overallMetrics.avgEngagement}%
                  </span>
                </ProgressRing>
              </div>
            </CardContent>
          </ModernCard>

          <ModernCard variant="gradient" gradient="green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-green-900">{overallMetrics.totalCampaigns}</p>
                </div>
                <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </ModernCard>

          <ModernCard variant="gradient" gradient="orange">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Services Used</p>
                  <p className="text-2xl font-bold text-orange-900">{overallMetrics.activeServices}/12</p>
                </div>
                <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </ModernCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg border-0 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="quick-actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Quick Actions
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <ModernCard variant="elevated">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Recent Activity
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {recentActivities.map((activity, index) => (
                        <div key={activity.id} className={`p-4 ${index !== recentActivities.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50 transition-colors`}>
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <activity.icon className={`h-5 w-5 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900">{activity.title}</p>
                                {getStatusIcon(activity.status)}
                              </div>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </ModernCard>
              </div>

              {/* Performance Summary */}
              <ModernCard variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Email Campaigns</span>
                        <span className="text-sm text-green-600 font-semibold">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">WhatsApp Marketing</span>
                        <span className="text-sm text-green-600 font-semibold">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Social Media</span>
                        <span className="text-sm text-yellow-600 font-semibold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Ad Campaigns</span>
                        <span className="text-sm text-green-600 font-semibold">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Overall Score</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">86%</div>
                    <p className="text-xs text-purple-700">Excellent performance!</p>
                  </div>
                </CardContent>
              </ModernCard>
            </div>
          </TabsContent>

          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <ModernCard key={action.id} variant="elevated" className="group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className={`h-12 w-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex gap-1">
                          {action.isNew && (
                            <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                          )}
                          {action.isPremium && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              PRO
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      
                      <ActionButton 
                        className="w-full group-hover:shadow-lg transition-all duration-300"
                        gradient
                        icon={ArrowRight}
                      >
                        Get Started
                      </ActionButton>
                    </div>
                  </CardContent>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceStats.map((service) => (
                <ModernCard key={service.service} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`h-10 w-10 bg-${service.color}-500 rounded-lg flex items-center justify-center`}>
                          <service.icon className="h-5 w-5 text-white" />
                        </div>
                        <StatusBadge 
                          status={service.stats.trend === "up" ? "Active" : service.stats.trend === "down" ? "Declining" : "Stable"}
                          variant={service.stats.trend === "up" ? "success" : service.stats.trend === "down" ? "error" : "warning"}
                          size="sm"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{service.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.stats.active} of {service.stats.total} campaigns active
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Performance</span>
                          <span className="text-sm font-semibold">{service.stats.performance}%</span>
                        </div>
                        <Progress value={service.stats.performance} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ModernCard variant="gradient" gradient="purple">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Sparkles className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-900">Optimize Email Timing</p>
                          <p className="text-xs text-purple-700">Send emails at 7-9 PM for 23% better open rates</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Target className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-900">Focus on WhatsApp</p>
                          <p className="text-xs text-purple-700">WhatsApp shows 40% higher engagement than other channels</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <Users className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-900">Target Local Audience</p>
                          <p className="text-xs text-purple-700">Local campaigns in {selectedMarketTier.name} show 65% better ROI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ModernCard>

              <ModernCard variant="gradient" gradient="blue">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Rocket className="h-5 w-5" />
                    Growth Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Flame className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">Video Content</p>
                          <p className="text-xs text-blue-700">Video posts get 3x more engagement. Try video campaigns!</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">Festival Marketing</p>
                          <p className="text-xs text-blue-700">Upcoming festivals show 85% higher search volume</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Crown className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">Premium Features</p>
                          <p className="text-xs text-blue-700">Unlock advanced automation and AI tools</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ModernCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
