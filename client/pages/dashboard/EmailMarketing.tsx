import React, { useState, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Mail,
  Send,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  Zap,
  Target,
  Sparkles,
  RefreshCw,
  Download,
  Upload,
  Image as ImageIcon,
  Video,
  Camera,
  Palette,
  Settings,
  Copy,
  Edit3,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Globe,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Filter,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  type: string;
  status: "draft" | "scheduled" | "sent" | "paused";
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledAt?: string;
  mediaUrls: string[];
}

interface ProductInfo {
  name: string;
  description: string;
  price: string;
  features: string[];
  category: string;
  targetAudience: string;
  keyBenefits: string;
  specialOffer: string;
}

const emailTypes = [
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Greet new subscribers warmly",
    icon: Heart,
  },
  {
    id: "promotional",
    name: "Promotional Campaign",
    description: "Drive sales with special offers",
    icon: TrendingUp,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Share updates and valuable content",
    icon: Mail,
  },
  {
    id: "product_launch",
    name: "Product Launch",
    description: "Announce new products or services",
    icon: Star,
  },
  {
    id: "event_invitation",
    name: "Event Invitation",
    description: "Invite customers to events",
    icon: Calendar,
  },
  {
    id: "follow_up",
    name: "Follow-up Email",
    description: "Re-engage with customers",
    icon: RefreshCw,
  },
];

const recipientSegments = [
  { id: "all_customers", name: "All Customers", count: 0 },
  { id: "new_subscribers", name: "New Subscribers", count: 0 },
  { id: "active_buyers", name: "Active Buyers", count: 0 },
  { id: "loyal_customers", name: "Loyal Customers", count: 0 },
  { id: "inactive_users", name: "Inactive Users", count: 0 },
];

const mockCampaigns: EmailCampaign[] = [];

export default function EmailMarketingEnhanced() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  
  // Enhanced state for product-based generation
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    description: "",
    price: "",
    features: [],
    category: "",
    targetAudience: "",
    keyBenefits: "",
    specialOffer: "",
  });

  const [emailType, setEmailType] = useState("promotional");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [content, setContent] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [recipientSegment, setRecipientSegment] = useState("all_customers");
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile" | "tablet">("desktop");
  
  // Media upload state
  const [uploadedMedia, setUploadedMedia] = useState<Array<{
    id: string;
    type: "image" | "video";
    url: string;
    name: string;
    size: number;
  }>>([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Enhanced content generation with product information
  const generateSmartEmailContent = useCallback(async () => {
    if (!emailType || !businessName || !productInfo.name) {
      alert("Please fill in business name and product information to generate content.");
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing with product context
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      // Generate content based on product information and email type
      let generatedContent = "";
      let generatedSubject = "";
      let generatedPreview = "";

      switch (emailType) {
        case "promotional":
          generatedSubject = `🎉 ${productInfo.specialOffer || "Special Offer"} on ${productInfo.name}!`;
          generatedPreview = `Don't miss out - ${productInfo.keyBenefits || "Amazing benefits"} awaits you`;
          generatedContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">${productInfo.specialOffer || "Special Offer"}</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Exclusively for ${selectedMarketTier.name}</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #333; margin-bottom: 20px;">Hi there! 👋</h2>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                  We're excited to introduce you to <strong>${productInfo.name}</strong> - ${productInfo.description}
                </p>
                
                ${productInfo.features.length > 0 ? `
                <div style="background: #f8f9ff; padding: 25px; border-radius: 8px; margin: 25px 0;">
                  <h3 style="color: #333; margin-bottom: 15px;">✨ Key Features:</h3>
                  <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                    ${productInfo.features.map(feature => `<li>${feature}</li>`).join("")}
                  </ul>
                </div>
                ` : ""}
                
                ${productInfo.keyBenefits ? `
                <p style="color: #666; line-height: 1.6; margin: 20px 0;">
                  <strong>Why choose ${productInfo.name}?</strong><br>
                  ${productInfo.keyBenefits}
                </p>
                ` : ""}
                
                ${productInfo.price ? `
                <div style="text-align: center; margin: 30px 0;">
                  <div style="background: #e8f5e8; display: inline-block; padding: 20px 30px; border-radius: 8px;">
                    <p style="margin: 0; color: #2d7d2d; font-size: 18px; font-weight: bold;">
                      Starting at ${productInfo.price}
                    </p>
                  </div>
                </div>
                ` : ""}
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="#" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Shop Now 🛒
                  </a>
                </div>
                
                <p style="color: #666; line-height: 1.6; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  Perfect for ${productInfo.targetAudience || "everyone"} in ${selectedMarketTier.name}.<br>
                  Questions? Reply to this email - we're here to help!
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                <p style="margin: 0; color: #999; font-size: 12px;">
                  © ${new Date().getFullYear()} ${businessName}. All rights reserved.
                </p>
              </div>
            </div>
          `;
          break;

        case "welcome":
          generatedSubject = `Welcome to ${businessName}! 🎉`;
          generatedPreview = `Get started with ${productInfo.name} and discover amazing benefits`;
          generatedContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ${businessName}! 🎉</h1>
                <p style="color: #e8f5e9; margin: 15px 0 0 0; font-size: 16px;">We're thrilled to have you join our community</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #333; margin-bottom: 20px;">Hello and welcome! 👋</h2>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                  Thank you for joining ${businessName}! We're excited to help you discover <strong>${productInfo.name}</strong>.
                </p>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                  ${productInfo.description}
                </p>
                
                <div style="background: #f0f8ff; padding: 25px; border-radius: 8px; margin: 25px 0;">
                  <h3 style="color: #333; margin-bottom: 15px;">🚀 What's next?</h3>
                  <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li>Explore our ${productInfo.category || "products"}</li>
                    <li>Learn about ${productInfo.keyBenefits || "our benefits"}</li>
                    <li>Connect with our ${selectedMarketTier.name} community</li>
                    <li>Get personalized recommendations</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="#" style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Get Started Now ✨
                  </a>
                </div>
                
                <p style="color: #666; line-height: 1.6; text-align: center; margin-top: 30px;">
                  Need help? We're here for you! Just reply to this email.
                </p>
              </div>
            </div>
          `;
          break;

        case "product_launch":
          generatedSubject = `🚀 Introducing ${productInfo.name} - Now Available!`;
          generatedPreview = `Be the first to experience ${productInfo.keyBenefits || "something amazing"}`;
          generatedContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🚀 Product Launch</h1>
                <p style="color: #ffe0e0; margin: 15px 0 0 0; font-size: 18px;">${productInfo.name} is Here!</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <h2 style="color: #333; margin-bottom: 20px;">The wait is over! 🎉</h2>
                
                <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                  We're proud to introduce <strong>${productInfo.name}</strong> - ${productInfo.description}
                </p>
                
                ${productInfo.features.length > 0 ? `
                <div style="background: #fff5f5; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #FF6B6B;">
                  <h3 style="color: #333; margin-bottom: 15px;">✨ What makes it special:</h3>
                  <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                    ${productInfo.features.map(feature => `<li>${feature}</li>`).join("")}
                  </ul>
                </div>
                ` : ""}
                
                <div style="text-align: center; margin: 40px 0;">
                  <div style="background: #f0f8ff; display: inline-block; padding: 20px 30px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #333; font-size: 16px;">
                      <strong>Launch Special:</strong> ${productInfo.specialOffer || "Limited time offer"}
                    </p>
                  </div>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="#" style="background: #FF6B6B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    Order Now - Launch Special! 🎯
                  </a>
                </div>
                
                <p style="color: #666; line-height: 1.6; text-align: center; font-size: 14px;">
                  Perfect for ${productInfo.targetAudience || "everyone"} in ${selectedMarketTier.name}
                </p>
              </div>
            </div>
          `;
          break;

        default:
          generatedSubject = `Update from ${businessName}`;
          generatedPreview = `Stay updated with ${productInfo.name}`;
          generatedContent = `<p>Thank you for being a valued customer of ${businessName}!</p>`;
      }

      setSubject(generatedSubject);
      setPreviewText(generatedPreview);
      setContent(generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Error generating content. Please try again.");
    }

    setIsGenerating(false);
  }, [emailType, businessName, productInfo, currentLanguage.code, selectedMarketTier]);

  // Media upload handler
  const handleMediaUpload = useCallback(async (files: FileList) => {
    setIsUploadingMedia(true);

    const newMedia = Array.from(files).map((file, index) => {
      const id = `media_${Date.now()}_${index}`;
      const url = URL.createObjectURL(file);

      return {
        id,
        type: file.type.startsWith("video/") ? ("video" as const) : ("image" as const),
        url,
        name: file.name,
        size: file.size,
      };
    });

    // Simulate upload processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUploadedMedia((prev) => [...prev, ...newMedia]);
    setIsUploadingMedia(false);
  }, []);

  const removeMedia = useCallback((mediaId: string) => {
    setUploadedMedia((prev) => prev.filter((m) => m.id !== mediaId));
  }, []);

  const sendCampaign = useCallback(() => {
    if (!content || !subject) {
      alert("Please generate content and add a subject before sending.");
      return;
    }

    const newCampaign: EmailCampaign = {
      id: Date.now(),
      name: `${productInfo.name || "Product"} Campaign - ${new Date().toLocaleDateString()}`,
      subject,
      type: emailType,
      status: "sent",
      recipients: recipientSegments.find(s => s.id === recipientSegment)?.count || 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toISOString().split("T")[0],
      mediaUrls: uploadedMedia.map(m => m.url),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    alert("Email campaign sent successfully! 📧");

    // Reset form
    setSubject("");
    setPreviewText("");
    setContent("");
    setUploadedMedia([]);
  }, [content, subject, emailType, productInfo.name, recipientSegment, uploadedMedia]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Smart Email Marketing
            </h1>
            <p className="text-muted-foreground">
              Create product-focused email campaigns with AI-powered content generation for {selectedMarketTier.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <Mail className="w-4 h-4" />
              {campaigns.filter((c) => c.status === "sent").length} Sent
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Enhanced Campaign Creator */}
              <div className="lg:col-span-3 space-y-6">
                {/* Product Information Section */}
                <Card className="border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-500" />
                      Product Information
                    </CardTitle>
                    <CardDescription>
                      Tell us about your product to generate personalized, compelling email content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name *</Label>
                        <Input
                          id="business-name"
                          placeholder="Your Business Name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Product/Service Name *</Label>
                        <Input
                          id="product-name"
                          placeholder="Enter your product or service name"
                          value={productInfo.name}
                          onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-description">Product Description *</Label>
                      <Textarea
                        id="product-description"
                        placeholder="Describe your product or service in detail..."
                        value={productInfo.description}
                        onChange={(e) => setProductInfo(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price/Starting Price</Label>
                        <Input
                          id="price"
                          placeholder="₹999, Starting at ₹500"
                          value={productInfo.price}
                          onChange={(e) => setProductInfo(prev => ({ ...prev, price: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          placeholder="Beauty, Food, Services, etc."
                          value={productInfo.category}
                          onChange={(e) => setProductInfo(prev => ({ ...prev, category: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="features">Key Features (comma separated)</Label>
                      <Input
                        id="features"
                        placeholder="Natural ingredients, Fast delivery, 24/7 support"
                        value={productInfo.features.join(", ")}
                        onChange={(e) => setProductInfo(prev => ({ 
                          ...prev, 
                          features: e.target.value.split(",").map(f => f.trim()).filter(f => f) 
                        }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target-audience">Target Audience</Label>
                        <Input
                          id="target-audience"
                          placeholder="Working professionals, Families, etc."
                          value={productInfo.targetAudience}
                          onChange={(e) => setProductInfo(prev => ({ ...prev, targetAudience: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="special-offer">Special Offer</Label>
                        <Input
                          id="special-offer"
                          placeholder="30% Off, Buy 1 Get 1 Free"
                          value={productInfo.specialOffer}
                          onChange={(e) => setProductInfo(prev => ({ ...prev, specialOffer: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="key-benefits">Key Benefits</Label>
                      <Textarea
                        id="key-benefits"
                        placeholder="Why should customers choose your product?"
                        value={productInfo.keyBenefits}
                        onChange={(e) => setProductInfo(prev => ({ ...prev, keyBenefits: e.target.value }))}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      Campaign Type
                    </CardTitle>
                    <CardDescription>
                      Choose the type of email campaign you want to create
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {emailTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isSelected = emailType === type.id;

                        return (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all ${
                              isSelected
                                ? "ring-2 ring-primary bg-primary/5"
                                : "hover:shadow-md"
                            }`}
                            onClick={() => setEmailType(type.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <IconComponent className="h-5 w-5 text-primary mt-1" />
                                <div>
                                  <p className="font-medium text-sm">{type.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {type.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Content Generation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI Content Generator
                    </CardTitle>
                    <CardDescription>
                      Generate personalized email content based on your product information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={generateSmartEmailContent}
                      disabled={isGenerating || !businessName || !productInfo.name}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating Smart Content...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Smart Email Content
                        </>
                      )}
                    </Button>

                    {!businessName || !productInfo.name ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <p className="text-sm text-amber-800">
                            Please fill in business name and product information above to generate content.
                          </p>
                        </div>
                      </div>
                    ) : null}

                    {/* Generated Content Preview */}
                    {content && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email-subject">Email Subject</Label>
                            <Input
                              id="email-subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="Enter email subject"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="preview-text">Preview Text</Label>
                            <Input
                              id="preview-text"
                              value={previewText}
                              onChange={(e) => setPreviewText(e.target.value)}
                              placeholder="Preview text shown in inbox"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email-content">Email Content</Label>
                          <Textarea
                            id="email-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            placeholder="Email content will appear here"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(content);
                              alert("Content copied to clipboard!");
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Content
                          </Button>
                          <Button onClick={sendCampaign} className="flex-1">
                            <Send className="h-4 w-4 mr-2" />
                            Send Campaign
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Email Preview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Email Preview</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={devicePreview === "desktop" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDevicePreview("desktop")}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={devicePreview === "tablet" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDevicePreview("tablet")}
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={devicePreview === "mobile" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDevicePreview("mobile")}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`mx-auto transition-all duration-300 ${
                      devicePreview === "mobile" ? "max-w-sm" : 
                      devicePreview === "tablet" ? "max-w-md" : "max-w-full"
                    }`}>
                      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                        {subject && (
                          <div className="bg-gray-50 p-3 border-b">
                            <p className="font-semibold text-sm truncate">{subject}</p>
                            {previewText && (
                              <p className="text-xs text-gray-600 truncate">{previewText}</p>
                            )}
                          </div>
                        )}
                        
                        <div className="p-4">
                          {content ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                              <p>Generate content to see preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Media Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-green-500" />
                      Media Library
                    </CardTitle>
                    <CardDescription>
                      Upload images and videos for your email campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => e.target.files && handleMediaUpload(e.target.files)}
                        className="hidden"
                        id="media-upload"
                      />
                      <Label
                        htmlFor="media-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 text-center hover:text-primary"
                      >
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Upload className="h-8 w-8 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Upload Media Files</p>
                          <p className="text-sm text-muted-foreground">
                            Images and videos • Max 10MB each
                          </p>
                        </div>
                      </Label>
                    </div>

                    {isUploadingMedia && (
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                        <p className="text-sm text-blue-700">Uploading media...</p>
                      </div>
                    )}

                    {uploadedMedia.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Uploaded Media ({uploadedMedia.length})</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {uploadedMedia.map((media) => (
                            <div key={media.id} className="relative group border rounded-lg overflow-hidden">
                              {media.type === "video" ? (
                                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                  <Video className="h-8 w-8 text-gray-500" />
                                </div>
                              ) : (
                                <img
                                  src={media.url}
                                  alt={media.name}
                                  className="w-full aspect-square object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeMedia(media.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                                <p className="text-xs truncate">{media.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Manage all your uploaded images and videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedMedia.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No media uploaded yet</p>
                    <p className="text-sm text-muted-foreground">Upload media in the Create Campaign tab</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {uploadedMedia.map((media) => (
                      <div key={media.id} className="relative group border rounded-lg overflow-hidden">
                        {media.type === "video" ? (
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <Video className="h-8 w-8 text-gray-500" />
                          </div>
                        ) : (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full aspect-square object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="secondary" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeMedia(media.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  View and manage your email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                {campaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No campaigns created yet</p>
                    <p className="text-sm text-muted-foreground">Create your first campaign to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline">{campaign.type}</Badge>
                              <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>
                                {campaign.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Created: {campaign.createdAt}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>
                  Track performance of your email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Analytics will appear here</p>
                  <p className="text-sm text-muted-foreground">Send campaigns to see performance metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
