import { useState, useCallback, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Mail,
  Send,
  Users,
  TrendingUp,
  Eye,
  MousePointer,
  Globe,
  Clock,
  Zap,
  Sparkles,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Upload,
  Copy,
  Edit3,
  Trash2,
  Play,
  Pause,
  Settings,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  PieChart,
  LineChart,
  User,
  Building,
  MapPin,
  Star,
  Heart,
  Share2,
  ExternalLink,
  Image as ImageIcon,
  Palette,
  Layout,
  Type,
  Link,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
} from "lucide-react";
import { getContentTemplate, formatContent } from "@/lib/regionalLanguage";

const emailTypes = [
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Greet new subscribers",
    icon: Heart,
    color: "bg-green-500",
    avgOpenRate: 28.5,
    avgClickRate: 4.2,
  },
  {
    id: "promotional",
    name: "Promotional Email",
    description: "Product/service promotion",
    icon: Star,
    color: "bg-orange-500",
    avgOpenRate: 22.3,
    avgClickRate: 3.8,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Regular updates",
    icon: Mail,
    color: "bg-blue-500",
    avgOpenRate: 24.7,
    avgClickRate: 2.9,
  },
  {
    id: "follow_up",
    name: "Follow-up Email",
    description: "Post-purchase or inquiry",
    icon: RefreshCw,
    color: "bg-purple-500",
    avgOpenRate: 31.2,
    avgClickRate: 5.1,
  },
  {
    id: "festival",
    name: "Festival Greetings",
    description: "Regional festival wishes",
    icon: Calendar,
    color: "bg-pink-500",
    avgOpenRate: 35.8,
    avgClickRate: 6.3,
  },
  {
    id: "reminder",
    name: "Reminder Email",
    description: "Cart abandonment, renewals",
    icon: Clock,
    color: "bg-red-500",
    avgOpenRate: 19.4,
    avgClickRate: 7.2,
  },
  {
    id: "survey",
    name: "Survey & Feedback",
    description: "Collect customer feedback",
    icon: BarChart3,
    color: "bg-teal-500",
    avgOpenRate: 26.1,
    avgClickRate: 8.9,
  },
  {
    id: "educational",
    name: "Educational Content",
    description: "Tips and tutorials",
    icon: Sparkles,
    color: "bg-indigo-500",
    avgOpenRate: 29.3,
    avgClickRate: 4.7,
  },
];

interface EmailCampaign {
  id: number;
  name: string;
  type: string;
  status: "draft" | "scheduled" | "sending" | "sent" | "paused";
  recipients: number;
  sent: number;
  opens: number;
  clicks: number;
  bounces: number;
  unsubscribes: number;
  language: string;
  scheduledFor?: string;
  createdAt: string;
  subject: string;
  previewText: string;
  template: string;
  aiGenerated: boolean;
  segmentation: string[];
  abTesting: boolean;
  revenue?: number;
}

const mockCampaigns: EmailCampaign[] = [];

const automationSequences = [];

const emailTemplates = [
  {
    id: "modern_newsletter",
    name: "Modern Newsletter",
    category: "Newsletter",
    preview: "Clean and professional design",
    responsive: true,
    aiOptimized: true,
  },
  {
    id: "promotional_sale",
    name: "Sale Promotion",
    category: "Promotional",
    preview: "Eye-catching sale template",
    responsive: true,
    aiOptimized: true,
  },
  {
    id: "welcome_onboarding",
    name: "Welcome Onboarding",
    category: "Welcome",
    preview: "Step-by-step onboarding flow",
    responsive: true,
    aiOptimized: false,
  },
  {
    id: "festival_greeting",
    name: "Festival Celebration",
    category: "Festival",
    preview: "Culturally rich festival design",
    responsive: true,
    aiOptimized: true,
  },
];

export default function EmailMarketing() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [emailType, setEmailType] = useState("welcome");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [recipientSegment, setRecipientSegment] = useState("all_customers");
  const [selectedTemplate, setSelectedTemplate] = useState("modern_newsletter");
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] =
    useState<EmailCampaign | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [personalizationLevel, setPersonalizationLevel] = useState(75);
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [devicePreview, setDevicePreview] = useState<
    "desktop" | "mobile" | "tablet"
  >("desktop");

  const generateEmailContent = useCallback(async () => {
    if (!emailType || !businessName) return;

    setIsGenerating(true);

    // Simulate advanced AI content generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const template = getContentTemplate(
        "email",
        currentLanguage.code,
        emailType,
      );
      const variables = {
        businessName: businessName || "Your Business",
        customerName: "[Customer Name]",
        productName: "[Product Name]",
        discountAmount: "Special Discount",
      };

      let generatedContent = formatContent(template, variables);

      // Add personalization based on level
      if (personalizationLevel > 50) {
        generatedContent = generatedContent.replace(
          /Dear Customer/g,
          "Dear {{firstName}}",
        );
      }
      if (personalizationLevel > 75) {
        generatedContent +=
          "\n\nBased on your recent interest in {{lastViewedCategory}}, we think you'll love this!";
      }

      // Generate subject line
      const subjectTemplates = {
        welcome: `Welcome to ${businessName}! Let's get started`,
        promotional: `🎉 Special offer just for you - ${businessName}`,
        newsletter: `Your ${businessName} newsletter is here!`,
        follow_up: `Thank you for choosing ${businessName}`,
        festival: `Festival greetings from ${businessName} 🪔`,
        reminder: `Don't miss out - ${businessName}`,
        survey: `We'd love your feedback - ${businessName}`,
        educational: `Pro tips from ${businessName}`,
      };

      setSubject(
        subjectTemplates[emailType as keyof typeof subjectTemplates] ||
          "Your email from " + businessName,
      );
      setPreviewText(generatedContent.split("\n")[0].substring(0, 100) + "...");
      setContent(generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      setContent("Error generating content. Please try again.");
    }

    setIsGenerating(false);
  }, [emailType, businessName, currentLanguage.code, personalizationLevel]);

  const sendCampaign = useCallback(() => {
    if (!content || !subject) return;

    const newCampaign: EmailCampaign = {
      id: Date.now(),
      name: `${emailType} Campaign - ${new Date().toLocaleDateString()}`,
      type: emailType,
      status: scheduleDateTime ? "scheduled" : "sending",
      recipients: 1000, // Mock recipient count
      sent: scheduleDateTime ? 0 : 1000,
      opens: 0,
      clicks: 0,
      bounces: 0,
      unsubscribes: 0,
      language: currentLanguage.code,
      scheduledFor: scheduleDateTime,
      createdAt: new Date().toISOString().split("T")[0],
      subject,
      previewText,
      template: selectedTemplate,
      aiGenerated: true,
      segmentation: [recipientSegment],
      abTesting: abTestEnabled,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Reset form
    setContent("");
    setSubject("");
    setPreviewText("");
    setScheduleDateTime("");

    alert(`Campaign ${scheduleDateTime ? "scheduled" : "sent"} successfully!`);
  }, [
    content,
    subject,
    previewText,
    emailType,
    scheduleDateTime,
    selectedTemplate,
    recipientSegment,
    abTestEnabled,
    currentLanguage.code,
  ]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      if (filterStatus !== "all" && campaign.status !== filterStatus)
        return false;
      if (filterType !== "all" && campaign.type !== filterType) return false;
      return true;
    });
  }, [campaigns, filterStatus, filterType]);

  const totalMetrics = useMemo(() => {
    return campaigns.reduce(
      (acc, campaign) => ({
        sent: acc.sent + campaign.sent,
        opens: acc.opens + campaign.opens,
        clicks: acc.clicks + campaign.clicks,
        revenue: acc.revenue + (campaign.revenue || 0),
      }),
      { sent: 0, opens: 0, clicks: 0, revenue: 0 },
    );
  }, [campaigns]);

  const duplicateCampaign = useCallback(
    (campaignId: number) => {
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (campaign) {
        const newCampaign = {
          ...campaign,
          id: Date.now(),
          name: `${campaign.name} (Copy)`,
          status: "draft" as const,
          sent: 0,
          opens: 0,
          clicks: 0,
          scheduledFor: undefined,
        };
        setCampaigns((prev) => [newCampaign, ...prev]);
      }
    },
    [campaigns],
  );

  const deleteCampaign = useCallback((campaignId: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
  }, []);

  const getOpenRate = (campaign: EmailCampaign) => {
    return campaign.sent > 0
      ? ((campaign.opens / campaign.sent) * 100).toFixed(1)
      : "0.0";
  };

  const getClickRate = (campaign: EmailCampaign) => {
    return campaign.opens > 0
      ? ((campaign.clicks / campaign.opens) * 100).toFixed(1)
      : "0.0";
  };

  const getDeviceIcon = () => {
    switch (devicePreview) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      default:
        return Monitor;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Marketing Automation
            </h1>
            <p className="text-muted-foreground">
              Create intelligent email campaigns with AI-powered personalization
              in {currentLanguage.nativeName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2">
              <Zap className="w-4 h-4" />
              AI Powered
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <Mail className="w-4 h-4" />
              {totalMetrics.sent.toLocaleString()} Sent
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Sent
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.sent.toLocaleString()}
                  </p>
                </div>
                <Send className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Start sending to see metrics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Open Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.sent > 0
                      ? (
                          (totalMetrics.opens / totalMetrics.sent) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Track engagement here
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Click Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.opens > 0
                      ? (
                          (totalMetrics.clicks / totalMetrics.opens) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <MousePointer className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Monitor click performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{totalMetrics.revenue.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Revenue will appear here
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Campaign Creator */}
              <div className="lg:col-span-3 space-y-6">
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-500" />
                      AI Email Generator
                    </CardTitle>
                    <CardDescription>
                      Create personalized email campaigns in{" "}
                      {currentLanguage.nativeName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Type Selection */}
                    <div className="space-y-3">
                      <Label>Email Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {emailTypes.slice(0, 4).map((type) => {
                          const IconComponent = type.icon;
                          const isSelected = emailType === type.id;
                          return (
                            <Button
                              key={type.id}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => setEmailType(type.id)}
                              className="justify-start gap-3 h-auto py-4"
                            >
                              <IconComponent className="h-4 w-4" />
                              <div className="text-left">
                                <div className="font-medium">{type.name}</div>
                                <div className="text-xs opacity-70">
                                  {type.avgOpenRate}% avg open
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                      <Select value={emailType} onValueChange={setEmailType}>
                        <SelectTrigger>
                          <SelectValue placeholder="More email types..." />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTypes.slice(4).map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center gap-2">
                                <type.icon className="h-4 w-4" />
                                {type.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          placeholder="Enter your business name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Recipient Segment</Label>
                        <Select
                          value={recipientSegment}
                          onValueChange={setRecipientSegment}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all_customers">
                              All Customers
                            </SelectItem>
                            <SelectItem value="new_customers">
                              New Customers
                            </SelectItem>
                            <SelectItem value="loyal_customers">
                              Loyal Customers
                            </SelectItem>
                            <SelectItem value="inactive_customers">
                              Inactive Customers
                            </SelectItem>
                            <SelectItem value="vip_customers">
                              VIP Customers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* AI Settings */}
                    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                      <Label className="text-sm font-medium">
                        AI Personalization Settings
                      </Label>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">
                            Personalization Level
                          </Label>
                          <span className="text-sm text-muted-foreground">
                            {personalizationLevel}%
                          </span>
                        </div>
                        <Slider
                          value={[personalizationLevel]}
                          onValueChange={(value) =>
                            setPersonalizationLevel(value[0])
                          }
                          max={100}
                          step={25}
                          className="w-full"
                        />
                        <div className="text-xs text-muted-foreground">
                          Higher levels include dynamic content, behavioral
                          triggers, and advanced segmentation
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="ab-testing"
                            checked={abTestEnabled}
                            onCheckedChange={setAbTestEnabled}
                          />
                          <Label htmlFor="ab-testing" className="text-sm">
                            A/B Testing
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="auto-optimize"
                            checked={autoOptimize}
                            onCheckedChange={setAutoOptimize}
                          />
                          <Label htmlFor="auto-optimize" className="text-sm">
                            Auto Optimize
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Template Selection */}
                    <div className="space-y-3">
                      <Label>Email Template</Label>
                      <Select
                        value={selectedTemplate}
                        onValueChange={setSelectedTemplate}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center justify-between w-full">
                                <div>
                                  <div className="font-medium">
                                    {template.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {template.preview}
                                  </div>
                                </div>
                                {template.aiOptimized && (
                                  <Badge variant="secondary" className="ml-2">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    AI
                                  </Badge>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Content Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject Line</Label>
                        <Input
                          id="subject"
                          placeholder="Email subject line..."
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={currentLanguage.rtl ? "text-right" : ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preview">Preview Text</Label>
                        <Input
                          id="preview"
                          placeholder="Preview text that appears in inbox..."
                          value={previewText}
                          onChange={(e) => setPreviewText(e.target.value)}
                          className={currentLanguage.rtl ? "text-right" : ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Email Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Email content will be generated here..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={12}
                          className={`resize-none ${currentLanguage.rtl ? "text-right" : ""}`}
                          style={{
                            direction: currentLanguage.rtl ? "rtl" : "ltr",
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={generateEmailContent}
                        disabled={isGenerating || !emailType || !businessName}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Content
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="lg">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Scheduling Section */}
                {content && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Schedule & Send
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Send Time</Label>
                          <Input
                            type="datetime-local"
                            value={scheduleDateTime}
                            onChange={(e) =>
                              setScheduleDateTime(e.target.value)
                            }
                            min={new Date().toISOString().slice(0, 16)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Estimated Recipients</Label>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>0 subscribers</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={sendCampaign}
                          disabled={!content || !subject}
                          className="flex-1"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {scheduleDateTime ? "Schedule Campaign" : "Send Now"}
                        </Button>
                        <Button variant="outline">
                          <Copy className="mr-2 h-4 w-4" />
                          Save Draft
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Email Preview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Email Preview</span>
                      <div className="flex items-center gap-2">
                        {[
                          { type: "desktop", icon: Monitor },
                          { type: "tablet", icon: Tablet },
                          { type: "mobile", icon: Smartphone },
                        ].map(({ type, icon: Icon }) => (
                          <Button
                            key={type}
                            variant={
                              devicePreview === type ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setDevicePreview(type as any)}
                          >
                            <Icon className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`mx-auto transition-all duration-300 ${
                        devicePreview === "mobile"
                          ? "max-w-sm"
                          : devicePreview === "tablet"
                            ? "max-w-md"
                            : "max-w-full"
                      }`}
                    >
                      <div className="border rounded-lg overflow-hidden bg-white">
                        {/* Email Header */}
                        <div className="bg-gray-50 p-3 border-b">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            <span className="font-medium">
                              {businessName || "Your Business"}
                            </span>
                          </div>
                          <div className="mt-1">
                            <p className="font-semibold text-sm">
                              {subject || "Your email subject"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {previewText ||
                                "Preview text will appear here..."}
                            </p>
                          </div>
                        </div>

                        {/* Email Content */}
                        <div className="p-4">
                          <div
                            className={`prose prose-sm max-w-none ${currentLanguage.rtl ? "text-right" : ""}`}
                          >
                            {content ? (
                              <div
                                style={{
                                  direction: currentLanguage.rtl
                                    ? "rtl"
                                    : "ltr",
                                }}
                              >
                                {content.split("\n").map((line, index) => (
                                  <p key={index} className="mb-2">
                                    {line || <br />}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">
                                  Email content preview will appear here
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Email Footer */}
                        <div className="bg-gray-50 p-3 border-t text-xs text-muted-foreground">
                          <p>
                            © 2024 {businessName || "Your Business"}. All
                            rights reserved.
                          </p>
                          <p className="mt-1">
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Unsubscribe
                            </a>{" "}
                            |
                            <a
                              href="#"
                              className="text-blue-600 hover:underline ml-1"
                            >
                              Update preferences
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Prediction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Performance Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">--</p>
                        <p className="text-xs text-muted-foreground">
                          Expected Open Rate
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-green-600">--</p>
                        <p className="text-xs text-muted-foreground">
                          Expected Click Rate
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subject Line Score</span>
                        <span className="text-green-600">--</span>
                      </div>
                      <Progress value={0} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Content Quality</span>
                        <span className="text-blue-600">--</span>
                      </div>
                      <Progress value={0} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Spam Score</span>
                        <span className="text-green-600">--</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>💡 Optimization tips:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Add personalization tokens</li>
                        <li>Include clear call-to-action</li>
                        <li>Optimize for mobile devices</li>
                        <li>Test send time</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Label>Filters:</Label>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="sending">Sending</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {emailTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Table */}
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  Manage and monitor your email marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Open Rate</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => {
                      const emailType = emailTypes.find(
                        (t) => t.id === campaign.type,
                      );
                      const IconComponent = emailType?.icon || Mail;

                      return (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded ${emailType?.color || "bg-gray-500"} text-white`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {campaign.subject}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {campaign.language.toUpperCase()}
                                  </Badge>
                                  {campaign.aiGenerated && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <Sparkles className="h-3 w-3 mr-1" />
                                      AI
                                    </Badge>
                                  )}
                                  {campaign.abTesting && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      A/B
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{emailType?.name}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                campaign.status === "sent"
                                  ? "default"
                                  : campaign.status === "sending"
                                    ? "secondary"
                                    : campaign.status === "scheduled"
                                      ? "outline"
                                      : "secondary"
                              }
                              className="flex items-center gap-1"
                            >
                              {campaign.status === "sent" && (
                                <CheckCircle className="h-3 w-3" />
                              )}
                              {campaign.status === "sending" && (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              )}
                              {campaign.status === "scheduled" && (
                                <Clock className="h-3 w-3" />
                              )}
                              {campaign.status === "paused" && (
                                <Pause className="h-3 w-3" />
                              )}
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {campaign.recipients.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {campaign.sent.toLocaleString()} sent
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {getOpenRate(campaign)}%
                              </span>
                              <Progress
                                value={parseFloat(getOpenRate(campaign))}
                                className="w-16 h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {getClickRate(campaign)}%
                              </span>
                              <Progress
                                value={parseFloat(getClickRate(campaign))}
                                className="w-16 h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {campaign.revenue ? (
                              <span className="font-medium text-green-600">
                                ₹{campaign.revenue.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedCampaign(campaign)
                                    }
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Campaign Details - {campaign.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detailed analytics and performance metrics
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedCampaign && (
                                    <div className="grid grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Campaign Information
                                          </h4>
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span>Subject:</span>
                                              <span className="font-medium">
                                                {selectedCampaign.subject}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Type:</span>
                                              <span>
                                                {
                                                  emailTypes.find(
                                                    (t) =>
                                                      t.id ===
                                                      selectedCampaign.type,
                                                  )?.name
                                                }
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Language:</span>
                                              <span>
                                                {selectedCampaign.language.toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Created:</span>
                                              <span>
                                                {selectedCampaign.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Segmentation
                                          </h4>
                                          <div className="flex flex-wrap gap-1">
                                            {selectedCampaign.segmentation.map(
                                              (segment, idx) => (
                                                <Badge
                                                  key={idx}
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  {segment}
                                                </Badge>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Performance Metrics
                                          </h4>
                                          <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.opens}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Opens
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.clicks}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Clicks
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.bounces}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Bounces
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.unsubscribes}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Unsubscribes
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => duplicateCampaign(campaign.id)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteCampaign(campaign.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <div className="grid gap-6">
              {automationSequences.map((sequence) => (
                <Card key={sequence.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          {sequence.name}
                        </CardTitle>
                        <CardDescription>
                          Trigger: {sequence.trigger} • {sequence.subscribers}{" "}
                          subscribers
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            sequence.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {sequence.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {sequence.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Email Sequence</span>
                        <span>Open Rate</span>
                      </div>

                      {sequence.emails.map((email, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{email.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                Day {email.day}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {email.openRate}%
                            </span>
                            <Progress
                              value={email.openRate}
                              className="w-16 h-2"
                            />
                          </div>
                          {index < sequence.emails.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {emailTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Layout className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.category}
                        </p>
                      </div>
                      {template.aiOptimized && (
                        <Badge variant="secondary" className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.preview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {template.responsive && (
                          <Badge variant="outline" className="text-xs">
                            <Smartphone className="h-3 w-3 mr-1" />
                            Responsive
                          </Badge>
                        )}
                      </div>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Advanced Analytics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance by Language</CardTitle>
                  <CardDescription>
                    Compare email performance across different regional
                    languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        lang: "hi",
                        name: "हिंदी",
                        campaigns: 15,
                        openRate: 28.5,
                        clickRate: 4.2,
                      },
                      {
                        lang: "en",
                        name: "English",
                        campaigns: 23,
                        openRate: 24.7,
                        clickRate: 3.8,
                      },
                      {
                        lang: "te",
                        name: "తెలుగు",
                        campaigns: 8,
                        openRate: 31.2,
                        clickRate: 5.1,
                      },
                      {
                        lang: "gu",
                        name: "ગુજરાતી",
                        campaigns: 12,
                        openRate: 26.8,
                        clickRate: 3.9,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.lang}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {stat.lang.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{stat.name}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>{stat.campaigns} campaigns</span>
                          <span>Open: {stat.openRate}%</span>
                          <span>Click: {stat.clickRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Type Performance</CardTitle>
                  <CardDescription>
                    Best performing email types by engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailTypes.slice(0, 5).map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded ${type.color} text-white`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{type.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Open: {type.avgOpenRate}%</span>
                            <span>Click: {type.avgClickRate}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Marketing Settings</CardTitle>
                <CardDescription>
                  Configure automation and optimization settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Auto-send Optimization
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically optimize send times based on recipient
                        behavior
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">A/B Testing</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automatic A/B testing for subject lines and
                        content
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Smart Segmentation</Label>
                      <p className="text-sm text-muted-foreground">
                        Use AI to automatically segment audiences for better
                        targeting
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Regional Personalization
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Adapt content for regional preferences and cultural
                        context
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
