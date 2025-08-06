import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Sparkles,
  CheckCircle,
  Download,
  Share,
  Copy,
  TrendingUp,
  Eye,
  BarChart3,
  Users,
  Target,
  Palette,
  Brain,
  Zap,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Heart,
  MessageSquare,
  Share2,
  Globe,
  Smartphone,
  Monitor,
  PieChart,
  LineChart,
  Star,
  Award,
  Filter,
  Search,
  ArrowRight,
  Layers,
  Wand2,
  Lightbulb,
  Crown,
  Rocket,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  ShoppingCart,
  Package,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Bot,
  Megaphone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ModernCard,
  MetricCard,
  StatusBadge,
  ProgressRing,
  ModernAvatar,
  SectionHeader,
  ActionButton,
  DataRow,
  EmptyState,
  LoadingState,
} from "@/components/ModernDesignSystem";
import ProductCampaignTemplates from "@/components/ProductCampaignTemplates";

interface CampaignMetrics {
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
  roi: number;
}

interface BusinessProfile {
  name: string;
  industry: string;
  targetAudience: string;
  brandTone: string;
  logoUrl?: string;
  colors: string[];
}

interface AIContentSettings {
  contentType: string[];
  platforms: string[];
  languages: string[];
  tone: string;
  creativityLevel: number;
  includeEmojis: boolean;
  includeCTA: boolean;
  includeHashtags: boolean;
}

export default function FestivalsModern() {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: "Your Business",
    industry: "retail",
    targetAudience: "young-adults",
    brandTone: "friendly",
    colors: ["#FF6B35", "#4ECDC4"],
  });
  const [aiSettings, setAiSettings] = useState<AIContentSettings>({
    contentType: ["social-posts", "whatsapp", "ads"],
    platforms: ["instagram", "facebook", "whatsapp"],
    languages: ["english", "hindi"],
    tone: "enthusiastic",
    creativityLevel: 7,
    includeEmojis: true,
    includeCTA: true,
    includeHashtags: true,
  });
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const festivalCampaigns = [
    {
      id: "diwali",
      title: "Diwali Special",
      subtitle: "Light up sales with AI-powered Diwali campaigns",
      icon: "🪔",
      color: "from-orange-400 to-red-500",
      features: [
        "✓ 15 AI Social Posts",
        "✓ WhatsApp Templates",
        "✓ Video Content Ideas",
        "✓ Email Templates",
        "✓ SMS Campaigns",
        "✓ Influencer Scripts",
      ],
      status: "trending",
      difficulty: "beginner",
      estimatedReach: "50K+",
      avgROI: "340%",
      popularity: 95,
      metrics: {
        reach: 52000,
        engagement: 12.5,
        clicks: 2800,
        conversions: 420,
        roi: 340,
      },
      tags: ["trending", "high-roi", "seasonal"],
      industry: ["retail", "food", "fashion", "electronics"],
    },
    {
      id: "holi",
      title: "Holi Colors",
      subtitle: "Vibrant AI campaigns for the festival of colors",
      icon: "🎨",
      color: "from-pink-400 to-purple-500",
      features: [
        "✓ 12 Colorful Posts",
        "✓ Video Content",
        "✓ AR Filter Ideas",
        "✓ Interactive Content",
        "✓ Community Contests",
        "✓ UGC Templates",
      ],
      status: "premium",
      difficulty: "intermediate",
      estimatedReach: "35K+",
      avgROI: "280%",
      popularity: 88,
      metrics: {
        reach: 35000,
        engagement: 15.8,
        clicks: 2100,
        conversions: 290,
        roi: 280,
      },
      tags: ["creative", "interactive", "community"],
      industry: ["fashion", "beauty", "entertainment", "photography"],
    },
    {
      id: "eid",
      title: "Eid Mubarak",
      subtitle: "Blessed AI campaigns for Eid celebrations",
      icon: "🌙",
      color: "from-green-400 to-teal-500",
      features: [
        "✓ 10 Spiritual Posts",
        "✓ Community Focus",
        "✓ Charity Integration",
        "✓ Family Content",
        "✓ Gift Recommendations",
        "✓ Cultural Respect",
      ],
      status: "available",
      difficulty: "beginner",
      estimatedReach: "25K+",
      avgROI: "220%",
      popularity: 82,
      metrics: {
        reach: 25000,
        engagement: 18.2,
        clicks: 1800,
        conversions: 180,
        roi: 220,
      },
      tags: ["community", "respectful", "family"],
      industry: ["retail", "food", "services", "gifts"],
    },
    {
      id: "christmas",
      title: "Christmas Magic",
      subtitle: "Magical AI campaigns for Christmas season",
      icon: "🎄",
      color: "from-red-400 to-green-500",
      features: [
        "✓ 18 Festive Posts",
        "✓ Gift Guides",
        "✓ Video Content",
        "✓ Stories Templates",
        "✓ Advent Calendar",
        "✓ Santa Integration",
      ],
      status: "seasonal",
      difficulty: "advanced",
      estimatedReach: "75K+",
      avgROI: "450%",
      popularity: 92,
      metrics: {
        reach: 75000,
        engagement: 22.3,
        clicks: 4200,
        conversions: 680,
        roi: 450,
      },
      tags: ["high-roi", "global", "gift-focused"],
      industry: ["retail", "gifts", "food", "toys", "fashion"],
    },
    {
      id: "newyear",
      title: "New Year Goals",
      subtitle: "Motivational AI campaigns for fresh starts",
      icon: "🎊",
      color: "from-blue-400 to-indigo-500",
      features: [
        "✓ 20 Motivational Posts",
        "✓ Resolution Content",
        "✓ Progress Tracking",
        "✓ Goal-setting Tools",
        "✓ Countdown Content",
        "✓ Success Stories",
      ],
      status: "premium",
      difficulty: "intermediate",
      estimatedReach: "60K+",
      avgROI: "380%",
      popularity: 89,
      metrics: {
        reach: 60000,
        engagement: 16.7,
        clicks: 3600,
        conversions: 540,
        roi: 380,
      },
      tags: ["motivational", "goal-oriented", "wellness"],
      industry: ["fitness", "education", "wellness", "coaching"],
    },
    {
      id: "valentine",
      title: "Valentine's Love",
      subtitle: "Romantic AI campaigns for love season",
      icon: "❤️",
      color: "from-pink-400 to-red-400",
      features: [
        "✓ 14 Romantic Posts",
        "✓ Couple Content",
        "✓ Gift Suggestions",
        "✓ Date Ideas",
        "✓ Love Stories",
        "✓ Partner Appreciation",
      ],
      status: "coming-soon",
      difficulty: "beginner",
      estimatedReach: "40K+",
      avgROI: "260%",
      popularity: 85,
      metrics: {
        reach: 40000,
        engagement: 14.2,
        clicks: 2200,
        conversions: 320,
        roi: 260,
      },
      tags: ["romantic", "gift-focused", "couples"],
      industry: ["gifts", "restaurants", "jewelry", "fashion"],
    },
  ];

  const industryTemplates = {
    retail: "Shop smart, celebrate better!",
    food: "Taste the festival flavors!",
    fashion: "Style meets tradition!",
    electronics: "Tech up your celebrations!",
    beauty: "Glow this festive season!",
    fitness: "Celebrate healthy!",
    education: "Learn while you celebrate!",
    services: "Your festival partner!",
  };

  const filteredCampaigns = festivalCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === "all" || campaign.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalMetrics = {
    totalCampaigns: festivalCampaigns.length,
    avgEngagement: festivalCampaigns.reduce((acc, camp) => acc + (camp.metrics?.engagement || 0), 0) / festivalCampaigns.length,
    totalReach: festivalCampaigns.reduce((acc, camp) => acc + (camp.metrics?.reach || 0), 0),
    avgROI: festivalCampaigns.reduce((acc, camp) => acc + (camp.metrics?.roi || 0), 0) / festivalCampaigns.length,
  };

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      // Update metrics here if needed
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUseCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setGeneratedContent("");
    setActiveTab("ai-generator");
  };

  const generateAdvancedContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 200);

    setTimeout(() => {
      const aiContent = generateAIContent(selectedCampaign, businessProfile, aiSettings);
      setGeneratedContent(aiContent);
      setIsGenerating(false);
    }, 3000);
  };

  const generateAIContent = (campaign: any, profile: BusinessProfile, settings: AIContentSettings) => {
    const industryContext = industryTemplates[profile.industry as keyof typeof industryTemplates] || "Celebrate in style!";
    
    return `🤖 **AI-GENERATED ${campaign.title.toUpperCase()} CAMPAIGN**

**🏢 BUSINESS:** ${profile.name}
**🎯 INDUSTRY:** ${profile.industry.charAt(0).toUpperCase() + profile.industry.slice(1)}
**👥 AUDIENCE:** ${profile.targetAudience.replace('-', ' ').toUpperCase()}

---

**📱 SOCIAL MEDIA POSTS:**

1. ${campaign.icon} **Main Announcement**
   "${industryContext} Join us for an amazing ${campaign.title} celebration! ${settings.includeEmojis ? '✨🎉' : ''}"
   ${settings.includeHashtags ? `#${campaign.title.replace(' ', '')} #${profile.name.replace(' ', '')} #Festival` : ''}

2. 🎁 **Special Offer Post**
   "Limited time ${campaign.title} offers just for you! Don't miss out on incredible savings!"
   ${settings.includeCTA ? 'Shop Now 👆' : ''}

3. 📸 **Behind the Scenes**
   "Getting ready for ${campaign.title}! Here's how we're preparing something special for you..."

4. 🤝 **Community Engagement**
   "How are you celebrating ${campaign.title}? Share your moments with us!"

5. 🎊 **Countdown Post**
   "Only [X] days left until ${campaign.title}! Are you ready to celebrate with us?"

---

**💬 WHATSAPP MESSAGES:**

**Template 1 - Announcement:**
${campaign.icon} ${campaign.title} Special at ${profile.name}!

${industryContext}
Special offers available now!

Order: [Your Number]
Visit: [Your Address]

**Template 2 - Personalized:**
Hi [Name]! 
Exclusive ${campaign.title} offers just for you at ${profile.name}!
${settings.includeCTA ? 'Reply to claim your discount!' : ''}

---

**📧 EMAIL CAMPAIGNS:**

**Subject:** ${campaign.icon} Special ${campaign.title} Offers Inside!

Dear Valued Customer,

${campaign.title} is here, and we're excited to celebrate with you!

As a ${profile.industry} business, we understand what makes this festival special...

[EMAIL CONTENT CONTINUES...]

---

**📱 SMS CAMPAIGNS:**

"${campaign.icon} ${campaign.title} Sale at ${profile.name}! Special discounts + free delivery. Limited time. Order now: [Link]"

---

**🎥 VIDEO CONTENT IDEAS:**

1. ${campaign.title} preparation behind-the-scenes
2. Product showcase with festival theme
3. Customer testimonials and celebrations
4. Quick tutorial or tips related to festival
5. Team wishes and greetings

---

**📊 PERFORMANCE PREDICTIONS:**
• Estimated Reach: ${campaign.estimatedReach}
• Expected Engagement: ${campaign.metrics.engagement.toFixed(1)}%
• Projected ROI: ${campaign.avgROI}%

---

**🎨 VISUAL GUIDELINES:**
• Primary Colors: ${profile.colors.join(', ')}
• Tone: ${settings.tone.charAt(0).toUpperCase() + settings.tone.slice(1)}
• Style: Modern, festive, ${profile.brandTone}

---

**⚡ QUICK ACTIONS:**
${settings.includeCTA ? '• Call-to-Action: "Celebrate with us today!"' : ''}
• Hashtags: #${campaign.title.replace(' ', '')} #LocalBusiness #Festival
• Best posting time: 6-8 PM for maximum engagement

*Generated by Vyapari.AI - Smart Marketing for Smart Businesses*`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Advanced Header with Metrics */}
        <SectionHeader
          title="AI Festival Campaigns"
          subtitle="Advanced AI-powered marketing campaigns for Indian festivals"
          icon={Sparkles}
          gradient={true}
          badge="AI Powered"
          actions={
            <div className="flex flex-wrap gap-3">
              <ActionButton variant="secondary" icon={Settings} onClick={() => setActiveTab("settings")}>
                Campaign Settings
              </ActionButton>
              <ActionButton gradient icon={Rocket}>
                Upgrade to Pro
              </ActionButton>
            </div>
          }
        />

        {/* Real-time Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Campaigns"
            value={totalMetrics.totalCampaigns}
            icon={Package}
            gradient="blue"
            trend={{ value: 12, direction: "up", period: "this month" }}
          />
          <MetricCard
            title="Avg. Engagement"
            value={`${totalMetrics.avgEngagement.toFixed(1)}%`}
            icon={Heart}
            gradient="purple"
            trend={{ value: 8.5, direction: "up", period: "vs last month" }}
          />
          <MetricCard
            title="Total Reach"
            value={`${Math.round(totalMetrics.totalReach / 1000)}K`}
            icon={Users}
            gradient="green"
            trend={{ value: 15.2, direction: "up", period: "this quarter" }}
          />
          <MetricCard
            title="Avg. ROI"
            value={`${Math.round(totalMetrics.avgROI)}%`}
            icon={TrendingUp}
            gradient="orange"
            trend={{ value: 23, direction: "up", period: "YoY" }}
          />
        </div>

        {/* Advanced Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-6">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="ai-generator" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="product-templates" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Templates
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            {/* Search and Filter */}
            <ModernCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns, tags, or festivals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {filteredCampaigns.length} campaigns found
                  </Badge>
                </div>
              </div>
            </ModernCard>

            {/* Enhanced Festival Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <ModernCard
                  key={campaign.id}
                  variant="elevated"
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => handleUseCampaign(campaign)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-3xl">{campaign.icon}</div>
                      <div className="flex gap-2">
                        <StatusBadge 
                          status={campaign.status} 
                          variant={
                            campaign.status === "trending" ? "success" :
                            campaign.status === "premium" ? "warning" :
                            campaign.status === "coming-soon" ? "info" : "neutral"
                          }
                          size="sm"
                        />
                        <Badge variant="outline" className="text-xs">
                          {campaign.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {campaign.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{campaign.subtitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                        <div className="font-bold text-blue-600">{campaign.estimatedReach}</div>
                        <div className="text-xs text-blue-600">Est. Reach</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                        <div className="font-bold text-green-600">{campaign.avgROI}%</div>
                        <div className="text-xs text-green-600">Avg. ROI</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {campaign.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                      {campaign.features.length > 4 && (
                        <div className="text-xs text-muted-foreground">
                          +{campaign.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    {/* Popularity Ring */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ProgressRing value={campaign.popularity} size="sm">
                          <span className="text-xs font-bold">{campaign.popularity}%</span>
                        </ProgressRing>
                        <span className="text-sm text-muted-foreground">Popularity</span>
                      </div>
                      <ActionButton
                        size="sm"
                        gradient
                        icon={campaign.status === "coming-soon" ? Clock : Sparkles}
                        disabled={campaign.status === "coming-soon"}
                      >
                        {campaign.status === "coming-soon" ? "Coming Soon" : "Use Campaign"}
                      </ActionButton>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-2 border-t">
                      {campaign.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          {/* AI Generator Tab */}
          <TabsContent value="ai-generator" className="space-y-6">
            {selectedCampaign ? (
              <>
                {/* Campaign Header */}
                <ModernCard gradient="blue" variant="gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{selectedCampaign.icon}</div>
                        <div>
                          <h2 className="text-2xl font-bold text-blue-900">
                            {selectedCampaign.title} AI Generator
                          </h2>
                          <p className="text-blue-700">
                            Advanced AI content creation powered by your business profile
                          </p>
                        </div>
                      </div>
                      <ActionButton
                        variant="secondary"
                        icon={RotateCcw}
                        onClick={() => setSelectedCampaign(null)}
                      >
                        Back to Campaigns
                      </ActionButton>
                    </div>
                  </CardContent>
                </ModernCard>

                {/* AI Content Generation */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Settings Panel */}
                  <ModernCard className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        AI Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Content Type</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {["Social Posts", "WhatsApp", "Email", "SMS", "Video Scripts", "Ads"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Switch
                                id={type}
                                checked={aiSettings.contentType.includes(type.toLowerCase().replace(' ', '-'))}
                                onCheckedChange={(checked) => {
                                  const typeKey = type.toLowerCase().replace(' ', '-');
                                  setAiSettings(prev => ({
                                    ...prev,
                                    contentType: checked 
                                      ? [...prev.contentType, typeKey]
                                      : prev.contentType.filter(t => t !== typeKey)
                                  }));
                                }}
                              />
                              <Label htmlFor={type} className="text-sm">{type}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Creativity Level</Label>
                        <div className="mt-2">
                          <Progress value={aiSettings.creativityLevel * 10} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Conservative</span>
                            <span>Creative</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Language</Label>
                        <Select 
                          value={aiSettings.languages[0]} 
                          onValueChange={(value) => setAiSettings(prev => ({...prev, languages: [value]}))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="both">English + Hindi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Include Emojis</Label>
                          <Switch
                            checked={aiSettings.includeEmojis}
                            onCheckedChange={(checked) => setAiSettings(prev => ({...prev, includeEmojis: checked}))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Include CTAs</Label>
                          <Switch
                            checked={aiSettings.includeCTA}
                            onCheckedChange={(checked) => setAiSettings(prev => ({...prev, includeCTA: checked}))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Include Hashtags</Label>
                          <Switch
                            checked={aiSettings.includeHashtags}
                            onCheckedChange={(checked) => setAiSettings(prev => ({...prev, includeHashtags: checked}))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </ModernCard>

                  {/* Content Generation Area */}
                  <ModernCard className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-purple-600" />
                        Generated Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!generatedContent ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bot className="w-10 h-10 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Ready to Generate AI Content</h3>
                          <p className="text-muted-foreground mb-6">
                            Click below to generate personalized {selectedCampaign.title} content
                          </p>
                          <ActionButton
                            size="lg"
                            gradient
                            icon={isGenerating ? undefined : Sparkles}
                            onClick={generateAdvancedContent}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating Content...
                              </div>
                            ) : (
                              "Generate AI Content"
                            )}
                          </ActionButton>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border">
                            <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-96">
                              {generatedContent}
                            </pre>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <ActionButton icon={Copy} variant="secondary" onClick={() => navigator.clipboard.writeText(generatedContent)}>
                              Copy All
                            </ActionButton>
                            <ActionButton icon={Download} variant="secondary">
                              Download PDF
                            </ActionButton>
                            <ActionButton icon={Share2} variant="secondary">
                              Share Link
                            </ActionButton>
                            <ActionButton icon={Megaphone} onClick={() => navigate("/dashboard/social-media")}>
                              Publish Now
                            </ActionButton>
                            <ActionButton icon={RotateCcw} variant="outline" onClick={() => setGeneratedContent("")}>
                              Generate New
                            </ActionButton>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </ModernCard>
                </div>
              </>
            ) : (
              <EmptyState
                icon={Bot}
                title="Select a Campaign to Begin"
                description="Choose a festival campaign from the campaigns tab to start generating AI content"
                action={{
                  label: "Browse Campaigns",
                  onClick: () => setActiveTab("campaigns")
                }}
              />
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Real-time Performance Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Active Campaigns"
                value="24"
                icon={Rocket}
                gradient="blue"
                trend={{ value: 8, direction: "up", period: "this week" }}
              />
              <MetricCard
                title="Total Reach"
                value="2.4M"
                icon={Users}
                gradient="green"
                trend={{ value: 23, direction: "up", period: "this month" }}
              />
              <MetricCard
                title="Engagement Rate"
                value="18.5%"
                icon={Heart}
                gradient="purple"
                trend={{ value: 12, direction: "up", period: "vs last month" }}
              />
              <MetricCard
                title="Revenue Generated"
                value="₹4.8L"
                icon={DollarSign}
                gradient="orange"
                trend={{ value: 34, direction: "up", period: "this quarter" }}
              />
            </div>

            {/* Campaign Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ModernCard className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Campaign Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {festivalCampaigns.slice(0, 6).map((campaign, index) => (
                      <DataRow key={campaign.id} className="p-4 hover:bg-blue-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{campaign.icon}</span>
                            <div>
                              <div className="font-semibold text-lg">{campaign.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {campaign.metrics.reach.toLocaleString()} reach • {campaign.metrics.engagement}% engagement
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {campaign.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {campaign.industry.join(", ")}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-3">
                              <ProgressRing value={campaign.popularity} size="sm">
                                <span className="text-xs font-bold">{campaign.popularity}%</span>
                              </ProgressRing>
                              <div>
                                <div className="font-bold text-green-600 text-lg">{campaign.avgROI}%</div>
                                <div className="text-sm text-muted-foreground">ROI</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DataRow>
                    ))}
                  </div>
                </CardContent>
              </ModernCard>

              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Industry Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Retail", "Food & Beverage", "Fashion", "Electronics", "Beauty", "Health & Fitness"].map((industry, index) => {
                      const performance = [95, 88, 82, 76, 70, 65][index];
                      const growth = [12, 8, 15, 5, 18, 22][index];
                      return (
                        <div key={industry} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="font-medium text-sm">{industry}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-green-600">+{growth}%</div>
                              <div className="text-xs text-muted-foreground">growth</div>
                            </div>
                          </div>
                          <Progress value={performance} className="h-2" />
                          <div className="text-xs text-muted-foreground text-right">{performance}% success rate</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </ModernCard>
            </div>

            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Conversion Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Campaign Views", value: 100000, percentage: 100 },
                      { stage: "Content Engagement", value: 25000, percentage: 25 },
                      { stage: "Link Clicks", value: 8500, percentage: 8.5 },
                      { stage: "Website Visits", value: 6200, percentage: 6.2 },
                      { stage: "Conversions", value: 1850, percentage: 1.85 },
                    ].map((stage, index) => (
                      <div key={stage.stage} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-yellow-500' :
                            index === 3 ? 'bg-orange-500' : 'bg-red-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{stage.stage}</div>
                            <div className="text-xs text-muted-foreground">{stage.value.toLocaleString()} users</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{stage.percentage}%</div>
                          <Progress value={stage.percentage} className="w-16 h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernCard>

              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Peak Performance Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: "6:00 PM - 8:00 PM", engagement: 85, day: "Weekdays" },
                      { time: "10:00 AM - 12:00 PM", engagement: 78, day: "Weekends" },
                      { time: "8:00 PM - 10:00 PM", engagement: 72, day: "Weekdays" },
                      { time: "2:00 PM - 4:00 PM", engagement: 65, day: "Weekends" },
                      { time: "12:00 PM - 2:00 PM", engagement: 58, day: "Weekdays" },
                    ].map((slot, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{slot.time}</span>
                          <span className="text-muted-foreground">{slot.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={slot.engagement} className="flex-1 h-2" />
                          <span className="text-sm font-bold text-green-600">{slot.engagement}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernCard>

              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Performing Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Video Posts", performance: 92, icon: Video },
                      { type: "Image Carousels", performance: 88, icon: ImageIcon },
                      { type: "Stories", performance: 85, icon: Smartphone },
                      { type: "Reels", performance: 82, icon: Play },
                      { type: "Text Posts", performance: 65, icon: FileText },
                    ].map((content, index) => {
                      const IconComponent = content.icon;
                      return (
                        <div key={content.type} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                              <IconComponent className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="font-medium text-sm">{content.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={content.performance} className="w-16 h-2" />
                            <span className="text-sm font-bold">{content.performance}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </ModernCard>
            </div>

            {/* AI Performance Insights */}
            <ModernCard variant="gradient" gradient="purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Bot className="w-6 h-6" />
                  AI Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-3xl mb-3">🎯</div>
                    <div className="font-bold text-purple-900 text-lg">95%</div>
                    <div className="text-sm text-purple-700">Content Accuracy</div>
                    <div className="text-xs text-purple-600 mt-1">AI-generated content quality</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-3xl mb-3">⚡</div>
                    <div className="font-bold text-purple-900 text-lg">2.3x</div>
                    <div className="text-sm text-purple-700">Faster Creation</div>
                    <div className="text-xs text-purple-600 mt-1">vs manual content creation</div>
                  </div>
                  <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-3xl mb-3">📈</div>
                    <div className="font-bold text-purple-900 text-lg">40%</div>
                    <div className="text-sm text-purple-700">Better Performance</div>
                    <div className="text-xs text-purple-600 mt-1">AI content vs traditional</div>
                  </div>
                </div>
              </CardContent>
            </ModernCard>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Social Media Post", "WhatsApp Message", "Email Campaign", "SMS Template", "Video Script", "Ad Copy"].map((template) => (
                <ModernCard key={template} variant="elevated" className="group hover:scale-105 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{template}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Pre-built {template.toLowerCase()} templates optimized for festival campaigns
                      </div>
                      <ActionButton size="sm" variant="outline" className="w-full">
                        View Templates
                      </ActionButton>
                    </div>
                  </CardContent>
                </ModernCard>
              ))}
            </div>
          </TabsContent>

          {/* Product Templates Tab */}
          <TabsContent value="product-templates" className="space-y-6">
            <ProductCampaignTemplates />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Profile */}
              <ModernCard>
                <CardHeader>
                  <CardTitle>Business Profile</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customize your business information for better AI content
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={businessProfile.name}
                      onChange={(e) => setBusinessProfile(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={businessProfile.industry} 
                      onValueChange={(value) => setBusinessProfile(prev => ({...prev, industry: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Select 
                      value={businessProfile.targetAudience} 
                      onValueChange={(value) => setBusinessProfile(prev => ({...prev, targetAudience: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="young-adults">Young Adults (18-30)</SelectItem>
                        <SelectItem value="middle-age">Middle Age (30-50)</SelectItem>
                        <SelectItem value="seniors">Seniors (50+)</SelectItem>
                        <SelectItem value="families">Families</SelectItem>
                        <SelectItem value="professionals">Professionals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brandTone">Brand Tone</Label>
                    <Select 
                      value={businessProfile.brandTone} 
                      onValueChange={(value) => setBusinessProfile(prev => ({...prev, brandTone: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="playful">Playful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </ModernCard>

              {/* AI Preferences */}
              <ModernCard>
                <CardHeader>
                  <CardTitle>AI Preferences</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure how AI generates content for your campaigns
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Default Content Types</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["social-posts", "whatsapp", "email", "sms", "video", "ads"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Switch
                            id={type}
                            checked={aiSettings.contentType.includes(type)}
                            onCheckedChange={(checked) => {
                              setAiSettings(prev => ({
                                ...prev,
                                contentType: checked 
                                  ? [...prev.contentType, type]
                                  : prev.contentType.filter(t => t !== type)
                              }));
                            }}
                          />
                          <Label htmlFor={type} className="text-sm capitalize">
                            {type.replace('-', ' ')}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Default Platforms</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["instagram", "facebook", "whatsapp", "twitter", "linkedin", "youtube"].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Switch
                            id={platform}
                            checked={aiSettings.platforms.includes(platform)}
                            onCheckedChange={(checked) => {
                              setAiSettings(prev => ({
                                ...prev,
                                platforms: checked 
                                  ? [...prev.platforms, platform]
                                  : prev.platforms.filter(p => p !== platform)
                              }));
                            }}
                          />
                          <Label htmlFor={platform} className="text-sm capitalize">
                            {platform}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <ActionButton className="w-full" gradient>
                      Save Preferences
                    </ActionButton>
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
