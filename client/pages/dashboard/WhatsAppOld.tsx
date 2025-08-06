import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Send,
  Users,
  CheckCircle,
  ImagePlus,
  X,
  Clock,
  BarChart3,
  Globe,
  Download,
  Upload,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  MoreVertical,
  Search,
  Filter,
  Star,
  Archive,
  Trash2,
  Copy,
  Forward,
  Reply,
  Edit3,
  Eye,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  Calendar,
  MapPin,
  Building,
  User,
  Heart,
  ThumbsUp,
  Share2,
  ExternalLink,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  FileText,
  Image as ImageIcon,
  Camera,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Wifi,
  WifiOff,
  Shield,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Info,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import {
  getContentTemplate,
  formatContent,
  getCTA,
} from "@/lib/regionalLanguage";
import { advancedAI, ContentRequest } from "@/lib/advancedAI";

const messageTypes = [
  {
    id: "welcome",
    name: "Welcome Message",
    description: "Greet new customers",
    icon: Heart,
    color: "bg-green-500",
    avgDeliveryRate: null,
    avgReadRate: null,
  },
  {
    id: "promotional",
    name: "Promotional",
    description: "Special offers and discounts",
    icon: Star,
    color: "bg-orange-500",
    avgDeliveryRate: null,
    avgReadRate: null,
  },
  {
    id: "festival",
    name: "Festival Greetings",
    description: "Regional festival wishes",
    icon: Calendar,
    color: "bg-purple-500",
    avgDeliveryRate: null,
    avgReadRate: null,
  },
  {
    id: "business_update",
    name: "Business Update",
    description: "Important announcements",
    icon: Building,
    color: "bg-blue-500",
    avgDeliveryRate: null,
    avgReadRate: null,
  },
  {
    id: "reminder",
    name: "Reminder",
    description: "Appointment or payment reminders",
    icon: Clock,
    color: "bg-red-500",
    avgDeliveryRate: 99.3,
    avgReadRate: 89.1,
  },
  {
    id: "follow_up",
    name: "Follow-up",
    description: "Post-purchase follow-up",
    icon: RefreshCw,
    color: "bg-teal-500",
    avgDeliveryRate: 98.7,
    avgReadRate: 83.4,
  },
  {
    id: "support",
    name: "Customer Support",
    description: "Help and assistance",
    icon: MessageSquare,
    color: "bg-indigo-500",
    avgDeliveryRate: 99.5,
    avgReadRate: 91.8,
  },
  {
    id: "survey",
    name: "Survey & Feedback",
    description: "Collect customer feedback",
    icon: BarChart3,
    color: "bg-pink-500",
    avgDeliveryRate: 97.2,
    avgReadRate: 76.5,
  },
];

const customerLists = [
  {
    id: "all",
    name: "All Customers",
    count: 0,
    icon: Users,
    color: "bg-gray-500",
  },
  {
    id: "vip",
    name: "VIP Customers",
    count: 0,
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    id: "regular",
    name: "Regular Customers",
    count: 0,
    icon: User,
    color: "bg-blue-500",
  },
  {
    id: "new",
    name: "New Customers",
    count: 0,
    icon: Sparkles,
    color: "bg-green-500",
  },
  {
    id: "inactive",
    name: "Inactive Customers",
    count: 0,
    icon: Clock,
    color: "bg-orange-500",
  },
  {
    id: "local",
    name: "Local Customers",
    count: 0,
    icon: MapPin,
    color: "bg-purple-500",
  },
];

interface WhatsAppCampaign {
  id: number;
  title: string;
  messageType: string;
  recipients: number;
  time: string;
  status: "sent" | "scheduled" | "draft" | "sending" | "failed";
  delivered: number;
  read: number;
  replied: number;
  language: string;
  content: string;
  mediaType?: "image" | "video" | "document" | "audio";
  mediaUrl?: string;
  aiGenerated: boolean;
  customerList: string;
  scheduledFor?: string;
  performance?: {
    clickThrough: number;
    conversions: number;
    revenue: number;
  };
}

interface ChatMessage {
  id: number;
  type: "sent" | "received";
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  mediaType?: "image" | "video" | "audio" | "document";
  mediaUrl?: string;
  isForwarded?: boolean;
  isStarred?: boolean;
}

const mockCampaigns: WhatsAppCampaign[] = [];

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    type: "sent",
    content:
      "नमस्ते! आपका स्वागत है हमारे व्यापार में। क्या ��प हमारे नए प्रोडक्ट्स के बारे में जानना चाहेंगे?",
    timestamp: "10:30 AM",
    status: "read",
  },
  {
    id: 2,
    type: "received",
    content: "हां, कृपया बताएं। मुझे आपके नए कलेक्शन में दिलचस्पी है।",
    timestamp: "10:32 AM",
    status: "read",
  },
  {
    id: 3,
    type: "sent",
    content: "बहुत बढ़िया! हमारे प���स इस सीजन के लिए बेहतरीन डिज़ाइन्स हैं।",
    timestamp: "10:33 AM",
    status: "read",
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    type: "received",
    content: "वाह! ये तो बहु�� खूबसूरत है। प्राइस क्या है?",
    timestamp: "10:35 AM",
    status: "read",
    isStarred: true,
  },
  {
    id: 5,
    type: "sent",
    content: "धन्यवाद! विशेष छूट के साथ ₹2,999 में। मुफ्त होम डिलीवरी भी ह��।",
    timestamp: "10:36 AM",
    status: "delivered",
  },
];

export default function WhatsApp() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [messageType, setMessageType] = useState("welcome");
  const [customerList, setCustomerList] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [productService, setProductService] = useState("");
  const [specialOffer, setSpecialOffer] = useState("");
  const [priceContact, setPriceContact] = useState("");
  const [location, setLocation] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [salesGoal, setSalesGoal] = useState<'sales' | 'engagement' | 'awareness' | 'leads'>('sales');
  const [aiVariations, setAiVariations] = useState<any[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [customVariables, setCustomVariables] = useState({
    discount: "20",
    date: "",
    phone: "+91 98765 43210",
    website: "www.yourbusiness.com",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [includeMedia, setIncludeMedia] = useState(false);
  const [mediaType, setMediaType] = useState<
    "image" | "video" | "audio" | "document"
  >("image");
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] =
    useState<WhatsAppCampaign | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedForBulk, setSelectedForBulk] = useState<number[]>([]);
  const [chatPreview, setChatPreview] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(true);
  const [emojiIntensity, setEmojiIntensity] = useState(50);
  const [personalizedMessages, setPersonalizedMessages] = useState(true);

  const generateMessage = useCallback(async () => {
    if (!messageType || !customerList) return;

    setIsGenerating(true);

    // Simulate AI content generation with enhanced features
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      // Get product information from the form
      const productName = document.querySelector('input[placeholder="Hair Oil, Restaurant, etc."]')?.value || "";
      const specialOffer = document.querySelector('input[placeholder="30% Off, Buy 1 Get 1 Free, etc."]')?.value || "";
      const priceContact = document.querySelector('input[placeholder="₹999 or +91 98765 43210"]')?.value || "";
      const location = document.querySelector('input[placeholder="Delhi, Mumbai, etc."]')?.value || "";

      let content = "";

      // Generate content based on message type and product info
      switch (messageType) {
        case "promotional":
          if (currentLanguage.code === "hi") {
            content = `🎉 *${businessName || "आपका व्यापार"}* में स्वागत है!

${productName ? `✨ *${productName}* - बेह��रीन गुणवत्ता के साथ` : "हमारे प्रोडक्ट्स देखें"}

${specialOffer ? `🎁 *विशेष ऑफर:* ${specialOffer}` : "🎁 *सीमित समय का ऑफर*"}

${location ? `📍 स्थान: ${location}` : ""}
${priceContact ? `💰 ${priceContact}` : ""}

अभी ऑर्डर करें और फायदा उठाएं!

*जल्दी करें - सीमित स्टॉक!* ⏰`;
          } else {
            content = `🎉 Welcome to *${businessName || "Your Business"}*!

${productName ? `✨ *${productName}* - Premium Quality` : "Check out our amazing products"}

${specialOffer ? `🎁 *Special Offer:* ${specialOffer}` : "🎁 *Limited Time Offer*"}

${location ? `📍 Location: ${location}` : ""}
${priceContact ? `💰 ${priceContact}` : ""}

Order now and save big!

*Hurry - Limited Stock!* ⏰`;
          }
          break;

        case "welcome":
          if (currentLanguage.code === "hi") {
            content = `🙏 नमस्कार और स्वागत है!

हमारे ${businessName || "व्यापार"} परिवार में शामिल होने के लिए धन्यवाद।

${productName ? `🌟 हमारे ${productName} के बारे में जानें` : "🌟 हमारे प्रोडक्ट्स देखें"}

${specialOffer ? `🎁 नए ग्राहकों के लिए: ${specialOffer}` : ""}

हमें खुशी होगी आपकी सेवा करने में! 😊

${priceContact ? `संपर्क: ${priceContact}` : "अधिक जानकारी के लिए संपर्क करें।"}`;
          } else {
            content = `🙏 Hello and Welcome!

Thank you for joining our ${businessName || "business"} family.

${productName ? `🌟 Discover our ${productName}` : "🌟 Explore our products"}

${specialOffer ? `🎁 New customer special: ${specialOffer}` : ""}

We're excited to serve you! 😊

${priceContact ? `Contact: ${priceContact}` : "Contact us for more information."}`;
          }
          break;

        case "follow_up":
          if (currentLanguage.code === "hi") {
            content = `👋 हैलो!

${businessName || "हमारी टीम"} की तरफ से धन्यवाद।

${productName ? `क्या आपको हमारे ${productName} के बारे में और जानकारी चाहिए?` : "क्या आपको हमारे प्रोडक्ट्स के बारे में कोई सवाल है?"}

${specialOffer ? `⚡ अभी भी उपलब्ध है: ${specialOffer}` : ""}

हम यहाँ हैं आपकी मदद के लिए! 🤝

${priceContact ? `संपर्क: ${priceContact}` : ""}`;
          } else {
            content = `👋 Hello there!

Thank you from the ${businessName || "our team"}.

${productName ? `Do you need more information about our ${productName}?` : "Do you have any questions about our products?"}

${specialOffer ? `⚡ Still available: ${specialOffer}` : ""}

We're here to help! 🤝

${priceContact ? `Contact: ${priceContact}` : ""}`;
          }
          break;

        case "order_confirmation":
          if (currentLanguage.code === "hi") {
            content = `✅ ऑर्डर कन्फर्म हो गया!

${businessName || "हमारी टीम"} का धन्यवाद आपके ऑ���्डर के लिए।

${productName ? `📦 प्रोडक्ट: ${productName}` : ""}
${priceContact ? `💰 कुल राशि: ${priceContact}` : ""}

${location ? `🚚 डिलीवरी लोकेशन: ${location}` : ""}

जल्द ही आपका ऑर्डर पहुंच जाएगा! 🎉`;
          } else {
            content = `✅ Order Confirmed!

Thank you for your order with ${businessName || "us"}.

${productName ? `📦 Product: ${productName}` : ""}
${priceContact ? `💰 Total Amount: ${priceContact}` : ""}

${location ? `🚚 Delivery to: ${location}` : ""}

Your order will be delivered soon! 🎉`;
          }
          break;

        default:
          content = `Hello from ${businessName || "Your Business"}! ${productName ? `Check out our ${productName}.` : ""} ${specialOffer || ""} ${priceContact || ""}`;
      }

      // Add emoji based on intensity
      if (emojiIntensity > 70) {
        content = content.replace(/!/g, "! 🔥").replace(/\?/g, "? 💭");
      }

      setMessageContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessageContent("Error generating content. Please try again.");
    }

    setIsGenerating(false);
  }, [
    messageType,
    customerList,
    currentLanguage.code,
    businessName,
    customVariables,
    emojiIntensity,
    personalizedMessages,
  ]);

  const sendMessage = useCallback(async () => {
    if (!messageContent || !customerList) return;

    setIsSending(true);

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const selectedList = customerLists.find((list) => list.id === customerList);
    const recipientCount = selectedList ? selectedList.count : 100;

    const newCampaign: WhatsAppCampaign = {
      id: Date.now(),
      title:
        messageTypes.find((t) => t.id === messageType)?.name ||
        "WhatsApp Campaign",
      messageType,
      recipients: recipientCount,
      time: new Date().toLocaleString(),
      status: scheduleDateTime ? "scheduled" : "sent",
      delivered: scheduleDateTime ? 0 : Math.floor(recipientCount * 0.95),
      read: scheduleDateTime ? 0 : Math.floor(recipientCount * 0.82),
      replied: scheduleDateTime ? 0 : Math.floor(recipientCount * 0.15),
      language: currentLanguage.code,
      content: messageContent,
      mediaType: includeMedia ? mediaType : undefined,
      mediaUrl: uploadedMedia || undefined,
      aiGenerated: true,
      customerList,
      scheduledFor: scheduleDateTime,
      performance: scheduleDateTime
        ? undefined
        : {
            clickThrough: Math.floor(recipientCount * 0.12),
            conversions: Math.floor(recipientCount * 0.03),
            revenue: Math.floor(recipientCount * 0.03 * 1500),
          },
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsSending(false);

    // Reset form
    setMessageContent("");
    setMessageType("welcome");
    setCustomerList("");
    setScheduleDateTime("");
    setUploadedMedia(null);
    setIncludeMedia(false);

    alert(
      `Campaign ${scheduleDateTime ? "scheduled" : "sent"} successfully to ${recipientCount} customers!`,
    );
  }, [
    messageContent,
    customerList,
    messageType,
    scheduleDateTime,
    includeMedia,
    mediaType,
    uploadedMedia,
    currentLanguage.code,
    campaigns,
  ]);

  const handleMediaUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.size <= 16 * 1024 * 1024) {
        // 16MB limit
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedMedia(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a file under 16MB");
      }
    },
    [],
  );

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      if (filterStatus !== "all" && campaign.status !== filterStatus)
        return false;
      return true;
    });
  }, [campaigns, filterStatus]);

  const totalMetrics = useMemo(() => {
    return campaigns.reduce(
      (acc, campaign) => ({
        sent: acc.sent + campaign.recipients,
        delivered: acc.delivered + campaign.delivered,
        read: acc.read + campaign.read,
        replied: acc.replied + campaign.replied,
        revenue: acc.revenue + (campaign.performance?.revenue || 0),
      }),
      { sent: 0, delivered: 0, read: 0, replied: 0, revenue: 0 },
    );
  }, [campaigns]);

  const getDeliveryRate = useCallback((campaign: WhatsAppCampaign) => {
    return campaign.recipients > 0
      ? ((campaign.delivered / campaign.recipients) * 100).toFixed(1)
      : "0.0";
  }, []);

  const getReadRate = useCallback((campaign: WhatsAppCampaign) => {
    return campaign.delivered > 0
      ? ((campaign.read / campaign.delivered) * 100).toFixed(1)
      : "0.0";
  }, []);

  const duplicateCampaign = useCallback(
    (campaignId: number) => {
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (campaign) {
        const newCampaign = {
          ...campaign,
          id: Date.now(),
          title: `${campaign.title} (Copy)`,
          status: "draft" as const,
          delivered: 0,
          read: 0,
          replied: 0,
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

  const suggestedMessages = useMemo(() => {
    const suggestions = [
      "Thank you for your interest! How can we help you today?",
      "Great choice! Would you like to know more details?",
      "We appreciate your business. Any questions?",
      "Perfect! Let me share some additional information.",
    ];

    if (currentLanguage.code === "hi") {
      return [
        "आपकी रुचि के लिए धन्यवाद! आज हम आपकी कैसे सहायता कर सकते हैं?",
        "बहुत बढ़िया विकल्प! क्या आप और विवरण जानना ��ाहे��गे?",
        "हम आपके व्यापार की सराहना ��रते हैं। कोई प्र��्न?",
        "परफेक्ट! मैं कुछ अतिरिक्त जानकारी साझा करता हूं��",
      ];
    }

    return suggestions;
  }, [currentLanguage.code]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              WhatsApp Business Messages
            </h1>
            <p className="text-muted-foreground">
              Create and send WhatsApp campaigns with realistic preview in{" "}
              {currentLanguage.nativeName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-2">
              <MessageSquare className="w-4 h-4" />
              WhatsApp Business
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              {totalMetrics.delivered.toLocaleString()} Delivered
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-5">
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
                <Send className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Start messaging to see metrics
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Delivery Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.sent > 0
                      ? (
                          (totalMetrics.delivered / totalMetrics.sent) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Send campaigns to track opens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Read Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.delivered > 0
                      ? (
                          (totalMetrics.read / totalMetrics.delivered) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <Eye className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Build engagement through messaging
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Reply Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {totalMetrics.read > 0
                      ? (
                          (totalMetrics.replied / totalMetrics.read) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
                <Reply className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Convert leads through WhatsApp
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
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Start campaigns to track performance
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign History</TabsTrigger>
            <TabsTrigger value="contacts">Contact Management</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            <TabsTrigger value="settings">Automation Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Message Creator */}
              <div className="lg:col-span-3 space-y-6">
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      AI Message Generator
                    </CardTitle>
                    <CardDescription>
                      Create intelligent WhatsApp campaigns in{" "}
                      {currentLanguage.nativeName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Product Information */}
                    <div className="space-y-4 p-4 border-2 border-dashed border-green-200 bg-green-50/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <Label className="text-green-800 font-medium">Product Information</Label>
                        <Badge variant="outline" className="text-xs">Required for smart content</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-sm">Business Name</Label>
                          <Input
                            placeholder="Your Business Name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm">Product/Service</Label>
                          <Input
                            placeholder="Hair Oil, Restaurant, Mobile Repair, etc."
                            value={productService}
                            onChange={(e) => setProductService(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm">Special Offer</Label>
                        <Input
                          placeholder="30% Off, Buy 1 Get 1 Free, Festival Special, etc."
                          value={specialOffer}
                          onChange={(e) => setSpecialOffer(e.target.value)}
                          className="bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-sm">Price/Contact</Label>
                          <Input
                            placeholder="₹999 or +91 98765 43210"
                            value={priceContact}
                            onChange={(e) => setPriceContact(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm">Location</Label>
                          <Input
                            placeholder="Delhi, Mumbai, etc."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-sm">Target Audience</Label>
                          <Input
                            placeholder="Young professionals, families, etc."
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm">Sales Goal</Label>
                          <Select value={salesGoal} onValueChange={(value: any) => setSalesGoal(value)}>
                            <SelectTrigger className="bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Direct Sales</SelectItem>
                              <SelectItem value="leads">Generate Leads</SelectItem>
                              <SelectItem value="engagement">Build Engagement</SelectItem>
                              <SelectItem value="awareness">Brand Awareness</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Message Type Selection */}
                    <div className="space-y-3">
                      <Label>Message Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {messageTypes.slice(0, 4).map((type) => {
                          const IconComponent = type.icon;
                          const isSelected = messageType === type.id;
                          return (
                            <Button
                              key={type.id}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => setMessageType(type.id)}
                              className="justify-start gap-3 h-auto py-4"
                            >
                              <IconComponent className="h-4 w-4" />
                              <div className="text-left">
                                <div className="font-medium">{type.name}</div>
                                <div className="text-xs opacity-70">
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                      <Select
                        value={messageType}
                        onValueChange={setMessageType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="More message types..." />
                        </SelectTrigger>
                        <SelectContent>
                          {messageTypes.slice(4).map((type) => (
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

                    {/* Customer List Selection */}
                    <div className="space-y-3">
                      <Label>Target Audience</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {customerLists.slice(0, 4).map((list) => {
                          const IconComponent = list.icon;
                          const isSelected = customerList === list.id;
                          return (
                            <Button
                              key={list.id}
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => setCustomerList(list.id)}
                              className="justify-start gap-3 h-auto py-4"
                            >
                              <div
                                className={`p-2 rounded ${list.color} text-white`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium">{list.name}</div>
                                <div className="text-xs opacity-70">
                                  {list.count.toLocaleString()} contacts
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                      <Select
                        value={customerList}
                        onValueChange={setCustomerList}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="More customer lists..." />
                        </SelectTrigger>
                        <SelectContent>
                          {customerLists.slice(4).map((list) => (
                            <SelectItem key={list.id} value={list.id}>
                              <div className="flex items-center gap-2">
                                <list.icon className="h-4 w-4" />
                                {list.name} ({list.count.toLocaleString()})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Business Information */}
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
                        <Label htmlFor="phone">Contact Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          onChange={(e) =>
                            setCustomVariables((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* AI Settings */}
                    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                      <Label className="text-sm font-medium">
                        AI Message Settings
                      </Label>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Emoji Intensity</Label>
                          <span className="text-sm text-muted-foreground">
                            {emojiIntensity}%
                          </span>
                        </div>
                        <Slider
                          value={[emojiIntensity]}
                          onValueChange={(value) => setEmojiIntensity(value[0])}
                          max={100}
                          step={25}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="personalized"
                            checked={personalizedMessages}
                            onCheckedChange={setPersonalizedMessages}
                          />
                          <Label htmlFor="personalized" className="text-sm">
                            Personalized
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="auto-translate"
                            checked={autoTranslate}
                            onCheckedChange={setAutoTranslate}
                          />
                          <Label htmlFor="auto-translate" className="text-sm">
                            Auto Translate
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Media Upload */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="include-media"
                          checked={includeMedia}
                          onCheckedChange={(checked) => {
                            setIncludeMedia(checked);
                            if (!checked) setUploadedMedia(null);
                          }}
                        />
                        <Label
                          htmlFor="include-media"
                          className="text-sm font-medium"
                        >
                          Include Media (Images, Videos, Documents)
                        </Label>
                      </div>

                      {includeMedia && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 gap-2">
                            {(
                              ["image", "video", "audio", "document"] as const
                            ).map((type) => (
                              <Button
                                key={type}
                                variant={
                                  mediaType === type ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setMediaType(type)}
                                className="capitalize"
                              >
                                {type === "image" && (
                                  <ImageIcon className="h-4 w-4 mr-1" />
                                )}
                                {type === "video" && (
                                  <Video className="h-4 w-4 mr-1" />
                                )}
                                {type === "audio" && (
                                  <Mic className="h-4 w-4 mr-1" />
                                )}
                                {type === "document" && (
                                  <FileText className="h-4 w-4 mr-1" />
                                )}
                                {type}
                              </Button>
                            ))}
                          </div>

                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            {!uploadedMedia ? (
                              <div className="text-center">
                                <div className="flex justify-center mb-3">
                                  {mediaType === "image" && (
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                  )}
                                  {mediaType === "video" && (
                                    <Video className="w-8 h-8 text-gray-400" />
                                  )}
                                  {mediaType === "audio" && (
                                    <Mic className="w-8 h-8 text-gray-400" />
                                  )}
                                  {mediaType === "document" && (
                                    <FileText className="w-8 h-8 text-gray-400" />
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept={
                                    mediaType === "image"
                                      ? "image/*"
                                      : mediaType === "video"
                                        ? "video/*"
                                        : mediaType === "audio"
                                          ? "audio/*"
                                          : "*"
                                  }
                                  onChange={handleMediaUpload}
                                  className="hidden"
                                  id="media-upload"
                                />
                                <Label
                                  htmlFor="media-upload"
                                  className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  Click to upload {mediaType}
                                </Label>
                                <p className="text-xs text-gray-500 mt-2">
                                  Max size: 16MB •{" "}
                                  {mediaType === "image"
                                    ? "JPG, PNG, GIF"
                                    : mediaType === "video"
                                      ? "MP4, AVI, MOV"
                                      : mediaType === "audio"
                                        ? "MP3, WAV, OGG"
                                        : "PDF, DOC, TXT"}
                                </p>
                              </div>
                            ) : (
                              <div className="relative">
                                {mediaType === "image" ? (
                                  <img
                                    src={uploadedMedia}
                                    alt="Uploaded"
                                    className="max-w-full h-32 object-cover rounded mx-auto"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-32 bg-gray-100 rounded">
                                    <div className="text-center">
                                      {mediaType === "video" && (
                                        <Video className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                      )}
                                      {mediaType === "audio" && (
                                        <Volume2 className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                      )}
                                      {mediaType === "document" && (
                                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                      )}
                                      <p className="text-sm text-gray-600">
                                        {mediaType.charAt(0).toUpperCase() +
                                          mediaType.slice(1)}{" "}
                                        uploaded
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <button
                                  onClick={() => setUploadedMedia(null)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="space-y-3">
                      <Label htmlFor="message-content">Message Content</Label>
                      <Textarea
                        id="message-content"
                        placeholder="Your WhatsApp message will be generated here..."
                        rows={8}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        className={`resize-none ${currentLanguage.rtl ? "text-right" : ""}`}
                        style={{
                          direction: currentLanguage.rtl ? "rtl" : "ltr",
                        }}
                      />
                    </div>

                    {/* Smart Suggestions */}
                    {smartSuggestions && messageContent && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">
                          Smart Reply Suggestions
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {suggestedMessages.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setMessageContent(
                                  (prev) => prev + "\n\n" + suggestion,
                                )
                              }
                              className="text-xs h-auto py-2 px-3 text-left"
                            >
                              {suggestion.length > 40
                                ? suggestion.substring(0, 40) + "..."
                                : suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={generateMessage}
                        disabled={isGenerating || !messageType || !customerList}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
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
                            Generate Message
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
                {messageContent && (
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
                          <Label>Recipients</Label>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>
                              {(customerList &&
                                customerLists
                                  .find((l) => l.id === customerList)
                                  ?.count.toLocaleString()) ||
                                0}{" "}
                              contacts
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={sendMessage}
                          disabled={
                            !messageContent || !customerList || isSending
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {isSending
                            ? "Sending..."
                            : scheduleDateTime
                              ? "Schedule Campaign"
                              : "Send Now"}
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

              {/* WhatsApp Chat Preview */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="h-fit">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        WhatsApp Preview
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="chat-preview"
                          checked={chatPreview}
                          onCheckedChange={setChatPreview}
                        />
                        <Label htmlFor="chat-preview" className="text-sm">
                          Live Chat
                        </Label>
                      </div>
                    </div>
                    <CardDescription>
                      Real-time preview of how your message will appear
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {chatPreview ? (
                      <div className="bg-[#0a1014] rounded-lg overflow-hidden">
                        {/* WhatsApp Header */}
                        <div className="bg-[#202c33] px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/api/placeholder/32/32" />
                              <AvatarFallback className="bg-green-500 text-white text-xs">
                                {businessName?.charAt(0)?.toUpperCase() || "B"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">
                                {businessName || "Your Business"}
                              </p>
                              <p className="text-[#8696a0] text-xs flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Online
                              </p>
                            </div>
                            <div className="flex items-center gap-3 text-[#8696a0]">
                              <Video className="h-5 w-5" />
                              <Phone className="h-5 w-5" />
                              <MoreVertical className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="bg-[#0b141a] p-4 space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto">
                          {/* Sample conversation */}

                          {/* Generated Message Preview */}
                          {messageContent && (
                            <div className="flex justify-end">
                              <div className="max-w-xs px-3 py-2 rounded-lg bg-[#005c4b] text-white">
                                {uploadedMedia && includeMedia && (
                                  <div className="mb-2">
                                    {mediaType === "image" ? (
                                      <img
                                        src={uploadedMedia}
                                        alt="Media preview"
                                        className="w-full h-32 object-cover rounded"
                                      />
                                    ) : (
                                      <div className="flex items-center gap-2 p-2 bg-[#025144] rounded">
                                        {mediaType === "video" && (
                                          <Video className="h-4 w-4" />
                                        )}
                                        {mediaType === "audio" && (
                                          <Volume2 className="h-4 w-4" />
                                        )}
                                        {mediaType === "document" && (
                                          <FileText className="h-4 w-4" />
                                        )}
                                        <span className="text-xs">
                                          {mediaType} file
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}
                                <p
                                  className={`text-sm ${currentLanguage.rtl ? "text-right" : ""}`}
                                >
                                  {messageContent}
                                </p>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                  <span className="text-xs text-[#8696a0]">
                                    now
                                  </span>
                                  <Clock className="h-3 w-3 text-[#8696a0]" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp Input */}
                        <div className="bg-[#202c33] p-3 flex items-center gap-3">
                          <div className="flex items-center gap-2 text-[#8696a0]">
                            <Smile className="h-5 w-5" />
                            <Paperclip className="h-5 w-5" />
                          </div>
                          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
                            <p className="text-[#8696a0] text-sm">
                              Type a message
                            </p>
                          </div>
                          <div className="text-[#8696a0]">
                            <Mic className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6">
                        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-green-500 text-white">
                                  {businessName?.charAt(0)?.toUpperCase() ||
                                    "B"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">
                                  {businessName || "Your Business"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Business Account
                                </p>
                              </div>
                            </div>

                            <div className="bg-green-100 rounded-lg p-3">
                              {uploadedMedia && includeMedia && (
                                <div className="mb-3">
                                  {mediaType === "image" ? (
                                    <img
                                      src={uploadedMedia}
                                      alt="Message media"
                                      className="max-w-full h-32 object-cover rounded"
                                    />
                                  ) : (
                                    <div className="flex items-center gap-2 p-2 bg-green-200 rounded">
                                      {mediaType === "video" && (
                                        <Video className="h-4 w-4" />
                                      )}
                                      {mediaType === "audio" && (
                                        <Volume2 className="h-4 w-4" />
                                      )}
                                      {mediaType === "document" && (
                                        <FileText className="h-4 w-4" />
                                      )}
                                      <span className="text-sm font-medium">
                                        {mediaType} file
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                              {messageContent ? (
                                <p
                                  className={`text-sm text-gray-800 ${currentLanguage.rtl ? "text-right" : ""}`}
                                >
                                  {messageContent}
                                </p>
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  {currentLanguage.code === "hi"
                                    ? "संदेश सामग्री यहाँ दिखाई जाएगी..."
                                    : "Message content will appear here..."}
                                </p>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-2 text-right flex items-center justify-end gap-1">
                              <span>Just now</span>
                              <CheckCheck className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Insights */}
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
                        <p className="text-xl font-bold text-green-600">
0%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expected Delivery Rate
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">0%</p>
                        <p className="text-xs text-muted-foreground">
                          Expected Read Rate
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Message Quality</span>
                        <span className="text-green-600">Excellent</span>
                      </div>
                      <Progress value={94} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Language Accuracy</span>
                        <span className="text-blue-600">High</span>
                      </div>
                      <Progress value={91} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Spam Risk</span>
                        <span className="text-green-600">Very Low</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>💡 Optimization tips:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Include clear call-to-action</li>
                        <li>Keep messages under 160 characters</li>
                        <li>Use customer's name for personalization</li>
                        <li>Send during business hours</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Filters and Actions */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <Label>Filters:</Label>
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sending">Sending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="bulk-mode"
                        checked={bulkMode}
                        onCheckedChange={setBulkMode}
                      />
                      <Label htmlFor="bulk-mode">Bulk Actions</Label>
                    </div>
                  </div>

                  {bulkMode && selectedForBulk.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedForBulk.length} selected
                      </span>
                      <Button size="sm">Resend All</Button>
                      <Button size="sm" variant="outline">
                        Delete All
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Table */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign History</CardTitle>
                <CardDescription>
                  Track your WhatsApp campaign performance across all languages
                  and customer segments
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
                      <TableHead>Delivery Rate</TableHead>
                      <TableHead>Read Rate</TableHead>
                      <TableHead>Reply Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => {
                      const messageType = messageTypes.find(
                        (t) => t.id === campaign.messageType,
                      );
                      const IconComponent = messageType?.icon || MessageSquare;
                      const isSelected = selectedForBulk.includes(campaign.id);

                      return (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {bulkMode && (
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedForBulk((prev) => [
                                        ...prev,
                                        campaign.id,
                                      ]);
                                    } else {
                                      setSelectedForBulk((prev) =>
                                        prev.filter((id) => id !== campaign.id),
                                      );
                                    }
                                  }}
                                  className="rounded"
                                />
                              )}
                              <div
                                className={`p-2 rounded ${messageType?.color || "bg-gray-500"} text-white`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{campaign.title}</p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {campaign.content.substring(0, 40)}...
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
                                  {campaign.mediaType && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {campaign.mediaType}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{messageType?.name}</Badge>
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
                                      : campaign.status === "failed"
                                        ? "destructive"
                                        : "secondary"
                              }
                              className="flex items-center gap-1 w-fit"
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
                              {campaign.status === "failed" && (
                                <AlertCircle className="h-3 w-3" />
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
                                to{" "}
                                {
                                  customerLists.find(
                                    (l) => l.id === campaign.customerList,
                                  )?.name
                                }
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {getDeliveryRate(campaign)}%
                              </span>
                              <Progress
                                value={parseFloat(getDeliveryRate(campaign))}
                                className="w-16 h-2"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {campaign.delivered.toLocaleString()} delivered
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {getReadRate(campaign)}%
                              </span>
                              <Progress
                                value={parseFloat(getReadRate(campaign))}
                                className="w-16 h-2"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {campaign.read.toLocaleString()} read
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {campaign.read > 0
                                  ? (
                                      (campaign.replied / campaign.read) *
                                      100
                                    ).toFixed(1)
                                  : 0}
                                %
                              </span>
                              <Progress
                                value={
                                  campaign.read > 0
                                    ? (campaign.replied / campaign.read) * 100
                                    : 0
                                }
                                className="w-16 h-2"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {campaign.replied} replies
                            </p>
                          </TableCell>
                          <TableCell>
                            {campaign.performance?.revenue ? (
                              <div>
                                <span className="font-medium text-green-600">
                                  ₹
                                  {campaign.performance.revenue.toLocaleString()}
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  {campaign.performance.conversions} conversions
                                </p>
                              </div>
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
                                      Campaign Details - {campaign.title}
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
                                              <span>Type:</span>
                                              <span>
                                                {
                                                  messageTypes.find(
                                                    (t) =>
                                                      t.id ===
                                                      selectedCampaign.messageType,
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
                                              <span>Customer List:</span>
                                              <span>
                                                {
                                                  customerLists.find(
                                                    (l) =>
                                                      l.id ===
                                                      selectedCampaign.customerList,
                                                  )?.name
                                                }
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Media Type:</span>
                                              <span>
                                                {selectedCampaign.mediaType ||
                                                  "Text only"}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold mb-2">
                                            Message Content
                                          </h4>
                                          <div className="p-3 bg-muted/30 rounded text-sm">
                                            {selectedCampaign.content}
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
                                                {selectedCampaign.delivered}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Delivered
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.read}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Read
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.replied}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Replied
                                              </p>
                                            </div>
                                            <div className="p-3 bg-muted/30 rounded text-center">
                                              <p className="text-lg font-bold">
                                                {selectedCampaign.performance
                                                  ?.conversions || 0}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                Conversions
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {selectedCampaign.performance && (
                                          <div>
                                            <h4 className="font-semibold mb-2">
                                              Revenue Impact
                                            </h4>
                                            <div className="p-4 bg-green-50 rounded-lg">
                                              <p className="text-2xl font-bold text-green-600">
                                                ₹
                                                {selectedCampaign.performance.revenue.toLocaleString()}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                Generated from{" "}
                                                {
                                                  selectedCampaign.performance
                                                    .conversions
                                                }{" "}
                                                conversions
                                              </p>
                                            </div>
                                          </div>
                                        )}
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

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {customerLists.map((list) => {
                const IconComponent = list.icon;
                return (
                  <Card
                    key={list.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-lg ${list.color} text-white`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {list.name}
                            </CardTitle>
                            <CardDescription>
                              {list.count.toLocaleString()} contacts
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Active contacts</span>
                          <span className="font-medium">
                            {Math.floor(list.count * 0.85).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={85} className="h-2" />

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {messageTypes.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-lg ${template.color} text-white`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Avg. Delivery Rate:</span>
                          <span className="font-medium">
                            {template.avgDeliveryRate}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg. Read Rate:</span>
                          <span className="font-medium">
                            {template.avgReadRate}%
                          </span>
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => setMessageType(template.id)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Performance by Language */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Language</CardTitle>
                <CardDescription>
                  Compare WhatsApp campaign performance across different
                  regional languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      lang: "hi",
                      name: "हिंदी",
                      campaigns: 23,
                      deliveryRate: 97.8,
                      readRate: 86.2,
                      replyRate: 12.5,
                    },
                    {
                      lang: "en",
                      name: "English",
                      campaigns: 18,
                      deliveryRate: 96.5,
                      readRate: 82.1,
                      replyRate: 9.8,
                    },
                    {
                      lang: "te",
                      name: "తెలుగు",
                      campaigns: 12,
                      deliveryRate: 98.2,
                      readRate: 88.7,
                      replyRate: 15.2,
                    },
                    {
                      lang: "gu",
                      name: "ગ��જરાતી",
                      campaigns: 8,
                      deliveryRate: 97.1,
                      readRate: 84.3,
                      replyRate: 11.7,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.lang}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {stat.lang.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{stat.name}</span>
                        <Badge variant="secondary">
                          {stat.campaigns} campaigns
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="text-center">
                          <p className="font-medium text-foreground">
                            {stat.deliveryRate}%
                          </p>
                          <p className="text-xs">Delivery</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">
                            {stat.readRate}%
                          </p>
                          <p className="text-xs">Read</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-foreground">
                            {stat.replyRate}%
                          </p>
                          <p className="text-xs">Reply</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Type Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Message Type Performance</CardTitle>
                <CardDescription>
                  Best performing message types by engagement and conversion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messageTypes.slice(0, 6).map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded ${type.color} text-white`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{type.name}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="text-center">
                            <p className="font-medium text-foreground">
                              {type.avgDeliveryRate}%
                            </p>
                            <p className="text-xs">Delivery</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-foreground">
                              {type.avgReadRate}%
                            </p>
                            <p className="text-xs">Read</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-foreground">
                              {(Math.random() * 20 + 5).toFixed(1)}%
                            </p>
                            <p className="text-xs">Reply</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Automation Settings</CardTitle>
                <CardDescription>
                  Configure automation, personalization, and optimization
                  settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Smart Message Generation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Use AI to automatically generate contextual messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Auto-Translate Messages
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically translate messages to customer's preferred
                        language
                      </p>
                    </div>
                    <Switch
                      checked={autoTranslate}
                      onCheckedChange={setAutoTranslate}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Smart Reply Suggestions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Show AI-powered reply suggestions for customer messages
                      </p>
                    </div>
                    <Switch
                      checked={smartSuggestions}
                      onCheckedChange={setSmartSuggestions}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Delivery Time Optimization
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Optimize send times based on customer activity patterns
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Regional Content Adaptation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Adapt content for regional preferences and cultural
                        context
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">
                        Festival Campaign Automation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create and schedule festival-specific
                        campaigns
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
