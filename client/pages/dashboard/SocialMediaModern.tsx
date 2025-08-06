import { useState, useCallback, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Globe,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Repeat2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Eye,
  Target,
  Zap,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  Edit3,
  Send,
  Sparkles,
  BarChart3,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  Share2,
  Bookmark,
  Camera,
  Play,
  Hash,
  AtSign,
  Link,
  Palette,
  Settings,
  ExternalLink,
  Copy,
  X,
} from "lucide-react";
import {
  getContentTemplate,
  formatContent,
  getCTA,
  getHashtags,
} from "@/lib/regionalLanguage";

const socialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: false,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "bg-black",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Video,
    color: "bg-red-600",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: false,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: ImageIcon,
    color: "bg-red-500",
    textColor: "text-white",
    engagement: { avg: 0, trend: "0%" },
    followers: "0",
    connected: false,
  },
];

const contentTypes = [
  { id: "business_promotion", name: "Business Promotion", icon: TrendingUp },
  { id: "product_showcase", name: "Product Showcase", icon: Star },
  { id: "customer_testimonial", name: "Customer Stories", icon: Heart },
  { id: "behind_scenes", name: "Behind the Scenes", icon: Camera },
  { id: "educational", name: "Educational Content", icon: Sparkles },
  { id: "festival_greeting", name: "Festival Greetings", icon: Calendar },
  { id: "interactive_poll", name: "Interactive Polls", icon: BarChart3 },
  { id: "user_generated", name: "User Generated", icon: Users },
];

const postFormats = [
  { id: "image_single", name: "Single Image", icon: ImageIcon },
  { id: "image_carousel", name: "Image Carousel", icon: RefreshCw },
  { id: "video_short", name: "Short Video", icon: Video },
  { id: "story", name: "Story", icon: Play },
  { id: "text_only", name: "Text Only", icon: Hash },
  { id: "link_preview", name: "Link Preview", icon: Link },
];

interface ScheduledPost {
  id: number;
  platform: string;
  content: string;
  scheduledFor: string;
  status: "scheduled" | "published" | "failed" | "draft";
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  contentType: string;
  format: string;
  imageUrl?: string;
  hashtags: string[];
  mentions: string[];
  priority: "high" | "medium" | "low";
  aiGenerated: boolean;
  performance?: {
    reach: number;
    impressions: number;
    clickThroughRate: number;
  };
}

const mockPosts: ScheduledPost[] = [];

const bestPostingTimes = {
  instagram: ["9:00 AM", "1:00 PM", "5:00 PM"],
  facebook: ["10:00 AM", "2:00 PM", "6:00 PM"],
  linkedin: ["8:00 AM", "12:00 PM", "4:00 PM"],
  twitter: ["9:00 AM", "3:00 PM", "7:00 PM"],
};

export default function SocialMediaModern() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "instagram",
  ]);
  const [contentType, setContentType] = useState("business_promotion");
  const [postFormat, setPostFormat] = useState("image_single");
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTone, setAiTone] = useState(50);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeMentions, setIncludeMentions] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState("");
  const [posts, setPosts] = useState<ScheduledPost[]>(mockPosts);

  // Enhanced Media Management State
  const [uploadedMedia, setUploadedMedia] = useState<
    Array<{
      id: string;
      type: "image" | "video" | "gif";
      url: string;
      thumbnail?: string;
      name: string;
      size: number;
      duration?: number;
      alt?: string;
    }>
  >([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [selectedMediaForPost, setSelectedMediaForPost] = useState<string[]>(
    [],
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedPostsForBulk, setSelectedPostsForBulk] = useState<number[]>(
    [],
  );

  const generateContent = useCallback(async () => {
    if (!contentType || selectedPlatforms.length === 0) return;

    setIsGenerating(true);

    // Simulate advanced AI content generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      // Get product information from the form
      const businessName = document.querySelector('#social-business-name')?.value || "Your Business";
      const productName = document.querySelector('#social-product-name')?.value || "";
      const productBenefits = document.querySelector('#social-product-benefits')?.value || "";
      const specialOffer = document.querySelector('#social-special-offer')?.value || "";
      const targetAudience = document.querySelector('#social-target-audience')?.value || "";

      let content = "";

      // Generate content based on content type and product information
      switch (contentType) {
        case "business_promotion":
          if (currentLanguage.code === "hi") {
            content = `🌟 ${businessName} में आपका स्वागत है!\n\n`;

            if (productName) {
              content += `हमारे ${productName} के साथ ${productBenefits || "बेहतरीन अनुभव"} पाएं।\n\n`;
            }

            if (specialOffer) {
              content += `🎁 आज ही मिले: ${specialOffer}\n\n`;
            }

            if (targetAudience) {
              content += `${targetAudience} के लिए खासकर तैयार! 💫\n\n`;
            }

            content += `${selectedMarketTier.name} में सबसे भरोसेमंद! 🏆\n\nअभी संपर्क करें! 📞`;
          } else {
            content = `🌟 Welcome to ${businessName}!\n\n`;

            if (productName) {
              content += `Experience ${productBenefits || "amazing quality"} with our ${productName}.\n\n`;
            }

            if (specialOffer) {
              content += `🎁 Today's Special: ${specialOffer}\n\n`;
            }

            if (targetAudience) {
              content += `Perfect for ${targetAudience}! 💫\n\n`;
            }

            content += `Most trusted in ${selectedMarketTier.name}! 🏆\n\nContact us now! 📞`;
          }
          break;

        case "product_showcase":
          if (currentLanguage.code === "hi") {
            content = `✨ नया ${productName || "प्रोडक्ट"} लॉन्च!\n\n`;

            if (productBenefits) {
              content += `🎯 क्यों चुनें:\n${productBenefits}\n\n`;
            }

            if (specialOffer) {
              content += `🔥 लॉन्च ऑफर: ${specialOffer}\n\n`;
            }

            content += `${businessName} की गारंटी के साथ! ✅\n\n#नयाप्रोडक्ट #${selectedMarketTier.name}`;
          } else {
            content = `✨ Introducing our new ${productName || "product"}!\n\n`;

            if (productBenefits) {
              content += `🎯 Why choose us:\n${productBenefits}\n\n`;
            }

            if (specialOffer) {
              content += `🔥 Launch offer: ${specialOffer}\n\n`;
            }

            content += `Backed by ${businessName} guarantee! ✅\n\n#NewProduct #${selectedMarketTier.name}`;
          }
          break;

        case "customer_testimonial":
          if (currentLanguage.code === "hi") {
            content = `⭐⭐⭐⭐⭐ ग्राहक की राय\n\n`;
            content += `"${businessName} के ${productName || "प्रोडक्ट"} से मुझे ${productBenefits || "बहुत फायदा हुआ"}।"\n\n`;
            content += `${targetAudience || "खुश ग्राहक"} - ${selectedMarketTier.name}\n\n`;
            content += `आप भी करें अनुभव! 🌟`;
          } else {
            content = `⭐⭐⭐⭐⭐ Customer Review\n\n`;
            content += `"${businessName}'s ${productName || "product"} gave me ${productBenefits || "amazing results"}!"\n\n`;
            content += `${targetAudience || "Happy Customer"} - ${selectedMarketTier.name}\n\n`;
            content += `Experience it yourself! 🌟`;
          }
          break;

        default:
          content = `${businessName} - ${productName || "Quality products"} in ${selectedMarketTier.name}! ${specialOffer || ""}`;
      }

      // AI Tone adjustment
      if (aiTone > 70) {
        content = content.replace(/\./g, "! 🎉").replace(/!/g, "!! 🚀");
      } else if (aiTone < 30) {
        content = content.replace(/!/g, ".").replace(/🎉/g, "").replace(/🚀/g, "");
      }

      // Add hashtags if enabled
      if (includeHashtags) {
        const hashtags = getHashtags(currentLanguage.code);
        if (productName) {
          hashtags.unshift(`#${productName.replace(/\s+/g, '')}`);
        }
        if (businessName && businessName !== "Your Business") {
          hashtags.unshift(`#${businessName.replace(/\s+/g, '')}`);
        }
        content += `\n\n${hashtags.slice(0, 8).join(" ")}`;
      }

      // Add CTA if mentions enabled
      if (includeMentions) {
        const cta = getCTA(currentLanguage.code, "contact");
        content += `\n\n${cta}`;
      }

      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedContent("Error generating content. Please try again.");
    }

    setIsGenerating(false);
  }, [
    contentType,
    selectedPlatforms,
    currentLanguage.code,
    topic,
    aiTone,
    includeHashtags,
    includeMentions,
  ]);

  // Enhanced Media Upload Functions
  const handleMediaUpload = useCallback(async (files: FileList) => {
    setIsUploadingMedia(true);

    const newMedia = Array.from(files).map((file, index) => {
      const id = `media_${Date.now()}_${index}`;
      const url = URL.createObjectURL(file);

      return {
        id,
        type: file.type.startsWith("video/")
          ? ("video" as const)
          : file.type === "image/gif"
            ? ("gif" as const)
            : ("image" as const),
        url,
        name: file.name,
        size: file.size,
        thumbnail: file.type.startsWith("video/") ? url : undefined,
        alt: `Media ${index + 1}`,
      };
    });

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setUploadedMedia((prev) => [...prev, ...newMedia]);
    setIsUploadingMedia(false);
  }, []);

  const removeMedia = useCallback((mediaId: string) => {
    setUploadedMedia((prev) => prev.filter((m) => m.id !== mediaId));
    setSelectedMediaForPost((prev) => prev.filter((id) => id !== mediaId));
  }, []);

  const schedulePost = useCallback(() => {
    if (!generatedContent || selectedPlatforms.length === 0) return;

    const newPosts = selectedPlatforms.map((platform) => ({
      id: Date.now() + Math.random(),
      platform,
      content: generatedContent,
      scheduledFor:
        scheduleDateTime ||
        new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      status: "scheduled" as const,
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      contentType,
      format: postFormat,
      hashtags: includeHashtags
        ? getHashtags(currentLanguage.code).slice(0, 5)
        : [],
      mentions: includeMentions ? ["@yourbusiness"] : [],
      priority: "medium" as const,
      aiGenerated: true,
      imageUrl:
        selectedMediaForPost.length > 0
          ? uploadedMedia.find((m) => m.id === selectedMediaForPost[0])?.url
          : undefined,
    }));

    setPosts((prev) => [...newPosts, ...prev]);

    // Reset form
    setGeneratedContent("");
    setTopic("");
    setScheduleDateTime("");
    setSelectedMediaForPost([]);

    alert(
      `Post scheduled successfully for ${selectedPlatforms.length} platform(s)!`,
    );
  }, [
    generatedContent,
    selectedPlatforms,
    scheduleDateTime,
    contentType,
    postFormat,
    includeHashtags,
    includeMentions,
    currentLanguage.code,
    selectedMediaForPost,
    uploadedMedia,
  ]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (filterStatus !== "all" && post.status !== filterStatus) return false;
      return true;
    });
  }, [posts, filterStatus]);

  const connectedPlatforms = useMemo(() => {
    return socialPlatforms.filter((p) => p.connected);
  }, []);

  const totalEngagement = useMemo(() => {
    return posts.reduce((total, post) => {
      return (
        total +
        post.engagement.likes +
        post.engagement.comments +
        post.engagement.shares
      );
    }, 0);
  }, [posts]);

  const duplicatePost = useCallback(
    (postId: number) => {
      const post = posts.find((p) => p.id === postId);
      if (post) {
        const newPost = {
          ...post,
          id: Date.now() + Math.random(),
          status: "draft" as const,
          scheduledFor: "",
        };
        setPosts((prev) => [newPost, ...prev]);
      }
    },
    [posts],
  );

  const deletePost = useCallback((postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const bulkAction = useCallback(
    (action: string) => {
      if (selectedPostsForBulk.length === 0) return;

      setPosts(
        (prev) =>
          prev
            .map((post) => {
              if (selectedPostsForBulk.includes(post.id)) {
                switch (action) {
                  case "publish":
                    return { ...post, status: "published" as const };
                  case "schedule":
                    return { ...post, status: "scheduled" as const };
                  case "delete":
                    return null;
                  default:
                    return post;
                }
              }
              return post;
            })
            .filter(Boolean) as ScheduledPost[],
      );

      setSelectedPostsForBulk([]);
    },
    [selectedPostsForBulk],
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Modern Header */}
        <SectionHeader
          title="Social Media Automation"
          subtitle={`AI-powered content creation and scheduling across platforms in ${currentLanguage.nativeName}`}
          gradientFrom="from-purple-600"
          gradientTo="to-pink-600"
        >
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2 bg-white/90 backdrop-blur-sm">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-2">
              <CheckCircle className="w-4 h-4" />
              {connectedPlatforms.length} Connected
            </Badge>
            <Badge variant="secondary" className="gap-2 bg-white/90 backdrop-blur-sm">
              <BarChart3 className="w-4 h-4" />
              {totalEngagement} Total Engagement
            </Badge>
          </div>
        </SectionHeader>

        {/* Platform Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);

            return (
              <ModernCard
                key={platform.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  platform.connected ? "hover:shadow-xl" : "opacity-60"
                } ${isSelected ? "ring-2 ring-purple-500 shadow-lg" : ""}`}
                onClick={() => {
                  if (!platform.connected) return;
                  if (isSelected) {
                    setSelectedPlatforms((prev) =>
                      prev.filter((p) => p !== platform.id),
                    );
                  } else {
                    setSelectedPlatforms((prev) => [...prev, platform.id]);
                  }
                }}
                gradientFrom="from-white"
                gradientTo="to-gray-50"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-3 rounded-xl ${platform.color} ${platform.textColor} shadow-lg`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{platform.name}</p>
                      <p className="text-xs text-gray-500">
                        {platform.followers}
                      </p>
                    </div>
                    {platform.connected ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>

                  {platform.connected && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span>Engagement</span>
                        <span
                          className={
                            platform.engagement.trend.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {platform.engagement.avg}% {platform.engagement.trend}
                        </span>
                      </div>
                      <Progress
                        value={platform.engagement.avg * 20}
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              </ModernCard>
            );
          })}
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="create">Create Content</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Posts</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            <TabsTrigger value="content-ideas">Content Ideas</TabsTrigger>
            <TabsTrigger value="settings">Automation Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Advanced Content Generator */}
              <div className="lg:col-span-3 space-y-6">
                <ModernCard
                  title="AI Content Generator"
                  subtitle={`Generate engaging content in ${currentLanguage.nativeName} for ${selectedMarketTier.name}`}
                  gradientFrom="from-purple-50"
                  gradientTo="to-pink-50"
                  className="relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  
                  <div className="space-y-6 relative z-10">
                    {/* Product Information */}
                    <div className="space-y-4 p-6 border-2 border-dashed border-purple-200 bg-purple-50/50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-purple-600" />
                        <Label className="text-purple-800 font-semibold">Product Information</Label>
                        <Badge variant="outline" className="text-xs">Better content</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Business Name</Label>
                          <Input
                            placeholder="Your Business Name"
                            className="bg-white"
                            id="social-business-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Product/Service</Label>
                          <Input
                            placeholder="Hair Oil, Restaurant, etc."
                            className="bg-white"
                            id="social-product-name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">What makes it special?</Label>
                        <Textarea
                          placeholder="Key benefits, unique features, what customers love..."
                          className="bg-white"
                          rows={2}
                          id="social-product-benefits"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Special Offer</Label>
                          <Input
                            placeholder="30% Off, Free Delivery, etc."
                            className="bg-white"
                            id="social-special-offer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Target Audience</Label>
                          <Input
                            placeholder="Working professionals, Families"
                            className="bg-white"
                            id="social-target-audience"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Platform Selection */}
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold">
                        Select Platforms
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {connectedPlatforms.map((platform) => {
                          const IconComponent = platform.icon;
                          const isSelected = selectedPlatforms.includes(
                            platform.id,
                          );
                          return (
                            <Button
                              key={platform.id}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedPlatforms((prev) =>
                                    prev.filter((p) => p !== platform.id),
                                  );
                                } else {
                                  setSelectedPlatforms((prev) => [
                                    ...prev,
                                    platform.id,
                                  ]);
                                }
                              }}
                              className="justify-start gap-2 h-auto py-4 px-4"
                            >
                              <IconComponent className="h-4 w-4" />
                              <div className="text-left">
                                <div className="font-medium text-sm">
                                  {platform.name}
                                </div>
                                <div className="text-xs opacity-70">
                                  {platform.followers}
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    {/* Content Type & Format */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="content-type">Content Type</Label>
                        <Select
                          value={contentType}
                          onValueChange={setContentType}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {contentTypes.map((type) => {
                              const IconComponent = type.icon;
                              return (
                                <SelectItem key={type.id} value={type.id}>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    {type.name}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="post-format">Post Format</Label>
                        <Select
                          value={postFormat}
                          onValueChange={setPostFormat}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {postFormats.map((format) => {
                              const IconComponent = format.icon;
                              return (
                                <SelectItem key={format.id} value={format.id}>
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    {format.name}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Topic Input */}
                    <div className="space-y-3">
                      <Label htmlFor="topic">Topic/Description</Label>
                      <Input
                        id="topic"
                        placeholder={
                          currentLanguage.code === "hi"
                            ? "अपने व्यापार के बारे में बताएं..."
                            : "Describe your business topic..."
                        }
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    {/* AI Settings */}
                    <div className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                      <Label className="text-sm font-semibold">
                        AI Content Settings
                      </Label>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ai-tone" className="text-sm">
                            Tone (Casual ← → Professional)
                          </Label>
                          <span className="text-sm text-gray-600 font-medium">
                            {aiTone}%
                          </span>
                        </div>
                        <Slider
                          id="ai-tone"
                          value={[aiTone]}
                          onValueChange={(value) => setAiTone(value[0])}
                          max={100}
                          step={10}
                          className="w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="include-hashtags"
                            checked={includeHashtags}
                            onCheckedChange={setIncludeHashtags}
                          />
                          <Label htmlFor="include-hashtags" className="text-sm">
                            Include Hashtags
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="include-mentions"
                            checked={includeMentions}
                            onCheckedChange={setIncludeMentions}
                          />
                          <Label htmlFor="include-mentions" className="text-sm">
                            Include Mentions
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-optimize"
                          checked={autoOptimize}
                          onCheckedChange={setAutoOptimize}
                        />
                        <Label htmlFor="auto-optimize" className="text-sm">
                          Auto-optimize for best posting times
                        </Label>
                      </div>
                    </div>

                    {/* Enhanced Media Management */}
                    <ModernCard
                      title="Media Library & Upload"
                      subtitle="Add images, videos, and GIFs to make your posts more engaging"
                      gradientFrom="from-blue-50"
                      gradientTo="to-purple-50"
                      className="border-dashed border-2 border-blue-200"
                    >
                      {/* Quick Upload Area */}
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*,video/*,.gif"
                          multiple
                          onChange={(e) =>
                            e.target.files &&
                            handleMediaUpload(e.target.files)
                          }
                          className="hidden"
                          id="media-upload"
                        />
                        <Label
                          htmlFor="media-upload"
                          className="cursor-pointer flex flex-col items-center gap-4 text-center hover:text-blue-600"
                        >
                          <div className="p-6 bg-blue-100 rounded-full">
                            <Upload className="h-10 w-10 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              Click to upload or drag & drop
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              Images (JPG, PNG, GIF) • Videos (MP4, MOV) • Max
                              50MB each
                            </p>
                          </div>
                        </Label>
                      </div>

                      {/* Media Processing Status */}
                      {isUploadingMedia && (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                          <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                          <span className="text-sm font-medium">
                            Processing media files...
                          </span>
                        </div>
                      )}

                      {/* Uploaded Media Grid */}
                      {uploadedMedia.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="font-semibold">
                              Your Media ({uploadedMedia.length})
                            </Label>
                            <ActionButton
                              variant="outline"
                              size="sm"
                              icon={Eye}
                            >
                              View All
                            </ActionButton>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {uploadedMedia.slice(0, 6).map((media) => (
                              <div
                                key={media.id}
                                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                  selectedMediaForPost.includes(media.id)
                                    ? "border-blue-500 shadow-lg"
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                                onClick={() => {
                                  if (
                                    selectedMediaForPost.includes(media.id)
                                  ) {
                                    setSelectedMediaForPost((prev) =>
                                      prev.filter((id) => id !== media.id),
                                    );
                                  } else {
                                    setSelectedMediaForPost((prev) =>
                                      postFormat === "image_carousel"
                                        ? [...prev, media.id]
                                        : [media.id],
                                    );
                                  }
                                }}
                              >
                                {media.type === "video" ? (
                                  <div className="relative aspect-square bg-black">
                                    <video
                                      src={media.url}
                                      className="w-full h-full object-cover"
                                      muted
                                      loop
                                      onMouseEnter={(e) => e.currentTarget.play()}
                                      onMouseLeave={(e) => e.currentTarget.pause()}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                      <Play className="h-8 w-8 text-white opacity-80" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="relative w-full aspect-square">
                                    <img
                                      src={media.url}
                                      alt={media.alt}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                {/* Media Type Badge */}
                                <div className="absolute top-2 left-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {media.type === "video" && (
                                      <Video className="h-3 w-3 mr-1" />
                                    )}
                                    {media.type === "gif" && (
                                      <Play className="h-3 w-3 mr-1" />
                                    )}
                                    {media.type === "image" && (
                                      <ImageIcon className="h-3 w-3 mr-1" />
                                    )}
                                    {media.type.toUpperCase()}
                                  </Badge>
                                </div>

                                {/* Selection Indicator */}
                                {selectedMediaForPost.includes(media.id) && (
                                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                    <div className="bg-blue-500 text-white rounded-full p-1">
                                      <CheckCircle className="h-5 w-5" />
                                    </div>
                                  </div>
                                )}

                                {/* Remove Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMedia(media.id);
                                  }}
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {uploadedMedia.length > 6 && (
                            <p className="text-sm text-gray-600 text-center">
                              +{uploadedMedia.length - 6} more files • Click
                              "View All" to see more
                            </p>
                          )}
                        </div>
                      )}

                      {/* Media Selection Summary */}
                      {selectedMediaForPost.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-blue-500" />
                              <span className="text-sm font-medium">
                                {selectedMediaForPost.length} media file
                                {selectedMediaForPost.length > 1
                                  ? "s"
                                  : ""}{" "}
                                selected
                              </span>
                            </div>
                            <ActionButton
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMediaForPost([])}
                            >
                              Clear Selection
                            </ActionButton>
                          </div>
                        </div>
                      )}
                    </ModernCard>

                    {/* Generated Content */}
                    <div className="space-y-3">
                      <Label htmlFor="generated-content">
                        Generated Content
                      </Label>
                      <Textarea
                        id="generated-content"
                        placeholder="AI-generated content will appear here..."
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        rows={10}
                        className={`resize-none ${currentLanguage.rtl ? "text-right" : ""}`}
                        style={{
                          direction: currentLanguage.rtl ? "rtl" : "ltr",
                        }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={generateContent}
                        disabled={
                          isGenerating || selectedPlatforms.length === 0
                        }
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
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
                      <ActionButton variant="outline" size="lg" icon={Settings} />
                    </div>
                  </div>
                </ModernCard>

                {/* Scheduling Section */}
                {generatedContent && (
                  <ModernCard
                    title="Schedule Post"
                    subtitle="Choose when to publish your content"
                    gradientFrom="from-green-50"
                    gradientTo="to-emerald-50"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Schedule for</Label>
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
                          <Label>Best times for selected platforms</Label>
                          <div className="text-sm text-gray-600 space-y-1">
                            {selectedPlatforms.map((platform) => {
                              const times =
                                bestPostingTimes[
                                  platform as keyof typeof bestPostingTimes
                                ];
                              return (
                                <div
                                  key={platform}
                                  className="flex justify-between"
                                >
                                  <span className="capitalize">
                                    {platform}:
                                  </span>
                                  <span>{times?.[0] || "10:00 AM"}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={schedulePost}
                          disabled={
                            !generatedContent || selectedPlatforms.length === 0
                          }
                          className="flex-1"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Schedule Post
                        </Button>
                        <ActionButton variant="outline" icon={Download}>
                          Save Draft
                        </ActionButton>
                      </div>
                    </div>
                  </ModernCard>
                )}
              </div>

              {/* Real-time Preview & Insights */}
              <div className="lg:col-span-2 space-y-6">
                {/* Live Preview */}
                <ModernCard
                  title="Live Preview"
                  subtitle="How your post will appear"
                  gradientFrom="from-gray-50"
                  gradientTo="to-white"
                >
                  {selectedPlatforms.length > 0 ? (
                    <div className="space-y-6">
                      {selectedPlatforms.slice(0, 2).map((platformId) => {
                        const platform = socialPlatforms.find(
                          (p) => p.id === platformId,
                        );
                        if (!platform) return null;

                        const IconComponent = platform.icon;

                        return (
                          <div
                            key={platformId}
                            className="border rounded-xl p-4 bg-white shadow-sm"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className={`p-2 rounded-full ${platform.color} ${platform.textColor}`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">
                                  Your Business
                                </p>
                                <p className="text-xs text-gray-500">
                                  {platform.name} • Sponsored
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {/* Selected Media Display */}
                              {selectedMediaForPost.length > 0 && (
                                <div className="mb-3">
                                  {(() => {
                                    const media = uploadedMedia.find(
                                      (m) =>
                                        m.id === selectedMediaForPost[0],
                                    );
                                    if (!media) return null;
                                    return (
                                      <div className="w-full h-40 rounded-lg overflow-hidden">
                                        {media.type === "video" ? (
                                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <div className="text-center">
                                              <Video className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                                              <p className="text-xs text-gray-500">
                                                Video Preview
                                              </p>
                                            </div>
                                          </div>
                                        ) : (
                                          <img
                                            src={media.url}
                                            alt={media.alt}
                                            className="w-full h-full object-cover"
                                          />
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}

                              {/* Default placeholder when no media selected */}
                              {selectedMediaForPost.length === 0 &&
                                (postFormat === "image_single" ||
                                  postFormat === "image_carousel") && (
                                  <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
                                    <div className="text-center">
                                      <ImageIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                                      <p className="text-xs text-gray-500">
                                        Add media to see preview
                                      </p>
                                    </div>
                                  </div>
                                )}

                              <p
                                className={`text-sm ${currentLanguage.rtl ? "text-right" : ""}`}
                              >
                                {generatedContent ||
                                  "Your generated content will appear here..."}
                              </p>

                              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    <span>Like</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>Comment</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Share2 className="h-4 w-4" />
                                    <span>Share</span>
                                  </div>
                                </div>
                                <Bookmark className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyState
                      icon={Target}
                      title="Select platforms to see preview"
                      subtitle="Choose social media platforms to preview your content"
                    />
                  )}
                </ModernCard>

                {/* Performance Insights */}
                <ModernCard
                  title="Performance Insights"
                  subtitle="Optimize your content for better engagement"
                  gradientFrom="from-blue-50"
                  gradientTo="to-purple-50"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/70 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">--</p>
                        <p className="text-xs text-gray-500">
                          Engagement Score
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white/70 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">--</p>
                        <p className="text-xs text-gray-500">
                          Est. Reach
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Content Quality", value: 0, status: "Excellent", color: "text-green-600" },
                        { label: "Language Accuracy", value: 0, status: "High", color: "text-green-600" },
                        { label: "Cultural Relevance", value: 0, status: "Good", color: "text-orange-600" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.label}</span>
                            <span className={item.color}>{item.status}</span>
                          </div>
                          <Progress value={item.value} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-600 space-y-2">
                      <p className="font-medium">💡 Tips for better reach:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Post during peak hours</li>
                        <li>Use trending hashtags</li>
                        <li>Include call-to-action</li>
                        <li>Add location tags</li>
                      </ul>
                    </div>
                  </div>
                </ModernCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            {/* Bulk Actions Bar */}
            <ModernCard
              gradientFrom="from-white"
              gradientTo="to-gray-50"
            >
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="bulk-mode"
                        checked={bulkMode}
                        onCheckedChange={setBulkMode}
                      />
                      <Label htmlFor="bulk-mode">Bulk Actions</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Posts</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Drafts</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {bulkMode && selectedPostsForBulk.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {selectedPostsForBulk.length} selected
                      </span>
                      <ActionButton size="sm" onClick={() => bulkAction("publish")}>
                        Publish All
                      </ActionButton>
                      <ActionButton
                        size="sm"
                        variant="outline"
                        onClick={() => bulkAction("delete")}
                      >
                        Delete All
                      </ActionButton>
                    </div>
                  )}
                </div>
              </div>
            </ModernCard>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => {
                  const platform = socialPlatforms.find(
                    (p) => p.id === post.platform,
                  );
                  const IconComponent = platform?.icon || Globe;
                  const isSelected = selectedPostsForBulk.includes(post.id);

                  return (
                    <ModernCard
                      key={post.id}
                      className={`transition-all duration-200 hover:shadow-xl ${
                        isSelected ? "ring-2 ring-purple-500" : ""
                      }`}
                      gradientFrom="from-white"
                      gradientTo="to-gray-50"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${platform?.color} ${platform?.textColor}`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {platform?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(post.scheduledFor).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {bulkMode && (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedPostsForBulk((prev) => [
                                      ...prev,
                                      post.id,
                                    ]);
                                  } else {
                                    setSelectedPostsForBulk((prev) =>
                                      prev.filter((id) => id !== post.id),
                                    );
                                  }
                                }}
                                className="rounded"
                              />
                            )}

                            <StatusBadge
                              status={post.status}
                              variant={
                                post.status === "published"
                                  ? "success"
                                  : post.status === "scheduled"
                                    ? "info"
                                    : post.status === "failed"
                                      ? "error"
                                      : "warning"
                              }
                            />

                            {post.aiGenerated && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <Sparkles className="h-3 w-3" />
                                AI
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p
                          className={`text-sm line-clamp-3 ${currentLanguage.rtl ? "text-right" : ""}`}
                        >
                          {post.content}
                        </p>

                        {post.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.hashtags.slice(0, 3).map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.hashtags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.hashtags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {post.status === "published" && post.performance && (
                          <div className="grid grid-cols-3 gap-2 text-xs text-center">
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="font-semibold">
                                {post.performance.reach}
                              </p>
                              <p className="text-gray-500">Reach</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="font-semibold">
                                {post.engagement.likes}
                              </p>
                              <p className="text-gray-500">Likes</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <p className="font-semibold">
                                {post.performance.clickThroughRate}%
                              </p>
                              <p className="text-gray-500">CTR</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <ActionButton
                              size="sm"
                              variant="outline"
                              icon={Copy}
                              onClick={() => duplicatePost(post.id)}
                            />
                            <ActionButton 
                              size="sm" 
                              variant="outline"
                              icon={Edit3}
                            />
                            <ActionButton 
                              size="sm" 
                              variant="outline"
                              icon={ExternalLink}
                            />
                          </div>

                          <ActionButton
                            size="sm"
                            variant="destructive"
                            icon={Trash2}
                            onClick={() => deletePost(post.id)}
                          />
                        </div>
                      </div>
                    </ModernCard>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No scheduled posts"
                subtitle="Create and schedule your first social media post"
                actionText="Create Post"
                onAction={() => {}}
              />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid gap-6 md:grid-cols-4">
              <MetricCard
                title="Total Reach"
                value="0"
                subtitle="Start posting to see reach data"
                icon={Users}
                gradientFrom="from-blue-500"
                gradientTo="to-cyan-500"
              />
              <MetricCard
                title="Engagement Rate"
                value="0%"
                subtitle="Track engagement metrics here"
                icon={Heart}
                gradientFrom="from-pink-500"
                gradientTo="to-rose-500"
              />
              <MetricCard
                title="Posts Published"
                value="0"
                subtitle="Posts published will show here"
                icon={Send}
                gradientFrom="from-green-500"
                gradientTo="to-emerald-500"
              />
              <MetricCard
                title="AI Generated"
                value="0%"
                subtitle="AI usage statistics"
                icon={Sparkles}
                gradientFrom="from-purple-500"
                gradientTo="to-pink-500"
              />
            </div>

            {/* Platform Performance Comparison */}
            <ModernCard
              title="Platform Performance Comparison"
              subtitle="Detailed analytics across all connected social media platforms"
              gradientFrom="from-blue-50"
              gradientTo="to-purple-50"
            >
              <div className="space-y-6">
                {connectedPlatforms.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <div key={platform.id} className="p-6 border rounded-xl bg-white/70">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl ${platform.color} ${platform.textColor}`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold text-lg">
                              {platform.name}
                            </span>
                            <p className="text-sm text-gray-600">
                              {platform.followers} followers
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {platform.engagement.avg}% avg engagement
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-6 text-center">
                        {[
                          { label: "Reach", value: "0" },
                          { label: "Likes", value: "0" },
                          { label: "Comments", value: "0" },
                          { label: "Shares", value: "0" },
                        ].map((metric, index) => (
                          <div key={index}>
                            <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
                            <p className="text-sm text-gray-600">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="content-ideas" className="space-y-6">
            <ModernCard
              title={`AI Content Ideas for ${currentLanguage.nativeName}`}
              subtitle={`Trending content suggestions for ${selectedMarketTier.name}`}
              gradientFrom="from-purple-50"
              gradientTo="to-pink-50"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Festival Marketing Campaign",
                    description:
                      "Create festive content for upcoming regional celebrations",
                    trending: true,
                    engagement: "High",
                  },
                  {
                    title: "Customer Success Stories",
                    description:
                      "Share testimonials and case studies in local language",
                    trending: false,
                    engagement: "Medium",
                  },
                  {
                    title: "Behind the Scenes Content",
                    description:
                      "Show your business processes and team culture",
                    trending: true,
                    engagement: "High",
                  },
                  {
                    title: "Educational Series",
                    description:
                      "Share industry knowledge and tips with your audience",
                    trending: false,
                    engagement: "Medium",
                  },
                ].map((idea, index) => (
                  <ModernCard key={index} className="relative overflow-hidden" gradientFrom="from-white" gradientTo="to-gray-50">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-lg">{idea.title}</h3>
                        {idea.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        {idea.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-sm">
                          {idea.engagement} Engagement
                        </Badge>
                        <ActionButton size="sm" icon={Zap}>
                          Use Idea
                        </ActionButton>
                      </div>
                    </div>
                  </ModernCard>
                ))}
              </div>
            </ModernCard>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <ModernCard
              title="Automation Settings"
              subtitle="Configure automatic posting and content optimization"
              gradientFrom="from-gray-50"
              gradientTo="to-white"
            >
              <div className="space-y-6">
                {[
                  {
                    title: "Auto-post Generation",
                    description: "Automatically generate and schedule posts based on your business",
                    defaultChecked: false,
                  },
                  {
                    title: "Smart Timing",
                    description: "Optimize posting times based on audience activity",
                    defaultChecked: true,
                  },
                  {
                    title: "Regional Optimization",
                    description: "Adapt content for local market preferences",
                    defaultChecked: true,
                  },
                  {
                    title: "Festival Integration",
                    description: "Automatically create festival-specific content",
                    defaultChecked: true,
                  },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-gray-100">
                    <div>
                      <Label className="text-base font-medium">{setting.title}</Label>
                      <p className="text-sm text-gray-600">
                        {setting.description}
                      </p>
                    </div>
                    <Switch defaultChecked={setting.defaultChecked} />
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
