import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import {
  SectionHeader,
  ModernCard,
  MetricCard,
  StatusBadge,
  ProgressRing,
  ActionButton,
  EmptyState,
  LoadingState,
} from "@/components/ModernDesignSystem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  IndianRupee,
  Calendar,
  Target,
  Zap,
  ArrowRight,
  PlayCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
  RefreshCw,
  MessageSquare,
  Share2,
  Heart,
  Phone,
  Mail,
  Globe,
  Map,
  Clock,
  Award,
  Filter,
  PieChart,
  LineChart,
  Activity,
  Smartphone,
  Monitor,
  Languages,
  Building,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react";

interface AnalyticsData {
  totalReach: number;
  totalEngagement: number;
  totalLeads: number;
  totalRevenue: number;
  campaignsActive: number;
  avgEngagementRate: number;
  conversionRate: number;
  roi: number;
}

interface ChannelPerformance {
  channel: string;
  icon: any;
  reach: number;
  engagement: number;
  leads: number;
  cost: number;
  roi: number;
  trend: "up" | "down" | "stable";
}

interface LanguagePerformance {
  language: string;
  nativeName: string;
  reach: number;
  engagement: number;
  conversionRate: number;
  revenue: number;
  campaigns: number;
}

interface CampaignData {
  id: number;
  name: string;
  channel: string;
  language: string;
  status: "active" | "completed" | "paused";
  reach: number;
  engagement: number;
  leads: number;
  cost: number;
  revenue: number;
  startDate: string;
}

const mockAnalytics: AnalyticsData = {
  totalReach: 0,
  totalEngagement: 0,
  totalLeads: 0,
  totalRevenue: 0,
  campaignsActive: 0,
  avgEngagementRate: 0,
  conversionRate: 0,
  roi: 0,
};

const mockChannelPerformance: ChannelPerformance[] = [];
const mockLanguagePerformance: LanguagePerformance[] = [];
const mockCampaigns: CampaignData[] = [];

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "12m", label: "Last 12 months" },
];

export default function AnalyticsModern() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Modern Header */}
        <SectionHeader
          title="Advanced Analytics"
          subtitle={`Multi-channel insights for ${selectedMarketTier.name} in ${currentLanguage.nativeName}`}
          gradientFrom="from-blue-600"
          gradientTo="to-purple-600"
        >
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-white/90 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ActionButton 
              variant="outline" 
              icon={RefreshCw}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              Refresh
            </ActionButton>
            <ActionButton 
              variant="outline" 
              icon={Download}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              Export
            </ActionButton>
          </div>
        </SectionHeader>

        {/* Modern Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Reach"
            value={formatNumber(mockAnalytics.totalReach)}
            subtitle="Start campaigns to see growth"
            icon={Eye}
            trend={0}
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${mockAnalytics.avgEngagementRate}%`}
            subtitle="Launch campaigns to track engagement"
            icon={MousePointer}
            trend={0}
            gradientFrom="from-green-500"
            gradientTo="to-emerald-500"
          />
          <MetricCard
            title="Total Leads"
            value={mockAnalytics.totalLeads.toString()}
            subtitle="Generate leads to see progress"
            icon={Users}
            trend={0}
            gradientFrom="from-purple-500"
            gradientTo="to-pink-500"
          />
          <MetricCard
            title="Revenue Generated"
            value={formatCurrency(mockAnalytics.totalRevenue)}
            subtitle="Start selling to track revenue"
            icon={IndianRupee}
            trend={0}
            gradientFrom="from-orange-500"
            gradientTo="to-red-500"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Summary */}
              <ModernCard
                title="Performance Summary"
                subtitle="Key metrics for your marketing performance"
                gradientFrom="from-blue-50"
                gradientTo="to-purple-50"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${mockAnalytics.conversionRate * 10}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold min-w-[40px]">
                        {mockAnalytics.conversionRate}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">ROI</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min(mockAnalytics.roi * 20, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold min-w-[40px]">
                        {mockAnalytics.roi}x
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {mockAnalytics.campaignsActive}
                      </div>
                      <div className="text-xs text-gray-500">Active Campaigns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{Math.round(25100 / (mockAnalytics.totalLeads || 1))}
                      </div>
                      <div className="text-xs text-gray-500">Cost per Lead</div>
                    </div>
                  </div>
                </div>
              </ModernCard>

              {/* Market Tier Performance */}
              <ModernCard
                title="Market Tier Performance"
                subtitle="Performance breakdown by Indian market segments"
                gradientFrom="from-green-50"
                gradientTo="to-blue-50"
              >
                <div className="space-y-4">
                  {[
                    {
                      tier: "Metro Cities",
                      reach: 45200,
                      engagement: 8.2,
                      revenue: 34500,
                      color: "from-blue-500 to-blue-600",
                    },
                    {
                      tier: "Tier 1 Cities",
                      reach: 38400,
                      engagement: 7.8,
                      revenue: 28900,
                      color: "from-green-500 to-green-600",
                    },
                    {
                      tier: "Tier 2 Cities",
                      reach: 28700,
                      engagement: 6.9,
                      revenue: 18200,
                      color: "from-yellow-500 to-yellow-600",
                    },
                    {
                      tier: "Tier 3 Cities",
                      reach: 13130,
                      engagement: 5.4,
                      revenue: 4000,
                      color: "from-purple-500 to-purple-600",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}
                        />
                        <span className="font-medium text-gray-800">
                          {item.tier}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="text-center">
                          <div className="font-semibold">{formatNumber(item.reach)}</div>
                          <div className="text-xs">Reach</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{item.engagement}%</div>
                          <div className="text-xs">Eng</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{formatCurrency(item.revenue)}</div>
                          <div className="text-xs">Rev</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Top Performing Content */}
            <ModernCard
              title="Top Performing Content"
              subtitle="Your best performing campaigns and content across all channels"
              gradientFrom="from-purple-50"
              gradientTo="to-pink-50"
            >
              <EmptyState
                icon={Star}
                title="No campaigns yet"
                subtitle="Create your first campaign to see top performing content"
                actionText="Create Campaign"
                onAction={() => {}}
              />
            </ModernCard>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <ModernCard
              title="Channel Performance Comparison"
              subtitle="Compare performance across all marketing channels"
              gradientFrom="from-blue-50"
              gradientTo="to-cyan-50"
            >
              <EmptyState
                icon={BarChart3}
                title="No channel data available"
                subtitle="Start campaigns across different channels to see performance comparison"
                actionText="Launch Campaigns"
                onAction={() => {}}
              />
            </ModernCard>

            {/* Channel Deep Dive */}
            <div className="grid gap-6 md:grid-cols-2">
              <ModernCard
                title="WhatsApp Performance"
                subtitle="Detailed WhatsApp marketing metrics"
                gradientFrom="from-green-50"
                gradientTo="to-emerald-50"
              >
                <div className="space-y-4">
                  {[
                    { label: "Message Delivery Rate", value: "0%" },
                    { label: "Read Rate", value: "0%" },
                    { label: "Response Rate", value: "0%" },
                    { label: "Average Response Time", value: "2.3 hours" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </ModernCard>

              <ModernCard
                title="Social Media Insights"
                subtitle="Facebook & Instagram performance metrics"
                gradientFrom="from-pink-50"
                gradientTo="to-purple-50"
              >
                <div className="space-y-4">
                  {[
                    { label: "Post Reach Rate", value: "0%" },
                    { label: "Story Completion Rate", value: "0%" },
                    { label: "Share Rate", value: "0%" },
                    { label: "Follower Growth", value: "+156 this month", color: "text-green-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className={`font-semibold ${item.color || 'text-gray-900'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <ModernCard
              title="Language Performance Analysis"
              subtitle="Compare marketing performance across different regional languages"
              gradientFrom="from-orange-50"
              gradientTo="to-red-50"
            >
              <EmptyState
                icon={Languages}
                title="No language data available"
                subtitle="Create campaigns in different languages to see performance analysis"
                actionText="Create Multi-language Campaign"
                onAction={() => {}}
              />
            </ModernCard>

            {/* Language Insights */}
            <div className="grid gap-6 md:grid-cols-2">
              <ModernCard
                title="Regional Preferences"
                subtitle="Content preferences by language and region"
                gradientFrom="from-yellow-50"
                gradientTo="to-orange-50"
              >
                <div className="space-y-4">
                  {[
                    {
                      language: "हिंदी",
                      preference: "Festival campaigns",
                      performance: "0%",
                    },
                    {
                      language: "English",
                      preference: "Professional content",
                      performance: "0%",
                    },
                    {
                      language: "తెలుగు",
                      preference: "Local business stories",
                      performance: "0%",
                    },
                    {
                      language: "ગુજરાતી",
                      preference: "Business offers",
                      performance: "0%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-gray-100"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{item.language}</div>
                        <div className="text-sm text-gray-600">
                          {item.preference}
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">
                        {item.performance}
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>

              <ModernCard
                title="Optimal Posting Times"
                subtitle="Best times to post for each language audience"
                gradientFrom="from-indigo-50"
                gradientTo="to-blue-50"
              >
                <div className="space-y-4">
                  {[
                    {
                      language: "हिंदी",
                      time: "7:00 PM - 9:00 PM",
                      day: "Weekdays",
                    },
                    {
                      language: "English",
                      time: "8:00 AM - 10:00 AM",
                      day: "Monday-Friday",
                    },
                    {
                      language: "తెలుగు",
                      time: "6:00 PM - 8:00 PM",
                      day: "Weekends",
                    },
                    {
                      language: "ગુજરાત���",
                      time: "12:00 PM - 2:00 PM",
                      day: "All days",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/70 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{item.language}</div>
                        <div className="text-sm text-gray-600">
                          {item.day}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm text-gray-800">{item.time}</div>
                        <div className="text-xs text-gray-500">
                          Peak hours
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <ModernCard
              title="Campaign Performance"
              subtitle="Track individual campaign metrics and ROI"
              gradientFrom="from-green-50"
              gradientTo="to-teal-50"
            >
              <EmptyState
                icon={Target}
                title="No campaigns running"
                subtitle="Launch your first campaign to track performance metrics and ROI"
                actionText="Create Campaign"
                onAction={() => {}}
              />
            </ModernCard>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ModernCard
                title="AI Insights & Recommendations"
                subtitle="Data-driven suggestions to improve your marketing performance"
                gradientFrom="from-purple-50"
                gradientTo="to-pink-50"
              >
                <div className="space-y-4">
                  {[
                    {
                      type: "optimization",
                      title: "Increase Hindi Content",
                      description: "Start campaigns to get language insights.",
                      impact: "High",
                      action: "Create Campaign",
                      icon: TrendingUp,
                    },
                    {
                      type: "timing",
                      title: "Optimize Posting Schedule",
                      description: "Run campaigns to discover optimal timing.",
                      impact: "Medium",
                      action: "Update Schedule",
                      icon: Clock,
                    },
                    {
                      type: "budget",
                      title: "Reallocate Budget",
                      description: "Launch campaigns to compare channel performance.",
                      impact: "High",
                      action: "Adjust Budget",
                      icon: IndianRupee,
                    },
                  ].map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <div key={index} className="p-6 bg-white/70 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-800">{insight.title}</span>
                          </div>
                          <StatusBadge
                            status={insight.impact}
                            variant={insight.impact === "High" ? "success" : "warning"}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {insight.description}
                        </p>
                        <ActionButton size="sm" variant="outline">
                          {insight.action}
                        </ActionButton>
                      </div>
                    );
                  })}
                </div>
              </ModernCard>

              <ModernCard
                title="Growth Opportunities"
                subtitle="Identify new markets and optimization areas"
                gradientFrom="from-emerald-50"
                gradientTo="to-green-50"
              >
                <div className="space-y-4">
                  {[
                    {
                      market: "Tier 3 Cities",
                      opportunity: "Underexplored market with high potential",
                      growth: "0% potential",
                      languages: ["hi", "te"],
                    },
                    {
                      market: "Instagram Reels",
                      opportunity: "Video content shows 3x higher engagement",
                      growth: "0% engagement",
                      languages: ["en", "hi"],
                    },
                    {
                      market: "Festival Campaigns",
                      opportunity: "Upcoming festivals show high search volume",
                      growth: "0% seasonal lift",
                      languages: ["hi", "gu", "te"],
                    },
                  ].map((opportunity, index) => (
                    <div key={index} className="p-6 bg-white/70 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-800">
                          {opportunity.market}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {opportunity.growth}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {opportunity.opportunity}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-500">
                          Best languages:
                        </span>
                        {opportunity.languages.map((lang) => (
                          <Badge
                            key={lang}
                            variant="outline"
                            className="text-xs bg-white/80"
                          >
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Competitive Analysis */}
            <ModernCard
              title="Market Position"
              subtitle="How you compare to similar businesses in your market"
              gradientFrom="from-blue-50"
              gradientTo="to-indigo-50"
            >
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    metric: "Engagement Rate",
                    value: "0%",
                    status: "Above industry average",
                    color: "text-green-600",
                  },
                  {
                    metric: "Conversion Rate",
                    value: "0%",
                    status: "Good performance",
                    color: "text-blue-600",
                  },
                  {
                    metric: "Market Reach",
                    value: "0%",
                    status: "Room for growth",
                    color: "text-orange-600",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 bg-white/70 rounded-xl">
                    <div className={`text-4xl font-bold ${item.color} mb-2`}>
                      {item.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {item.metric}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
