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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
import { advancedAI, ContentRequest, AIContentResponse } from "@/lib/advancedAI";

const initialSocialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
    connected: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
    connected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
    connected: false,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "bg-black",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
    connected: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Video,
    color: "bg-red-600",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
    connected: false,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: ImageIcon,
    color: "bg-red-500",
    textColor: "text-white",
    engagement: { avg: null, trend: null },
    followers: null,
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
  instagram: [],
  facebook: [],
  linkedin: [],
  twitter: [],
};

export default function SocialMedia() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [socialPlatforms, setSocialPlatforms] = useState(initialSocialPlatforms);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
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
  const [aiResponse, setAiResponse] = useState<AIContentResponse | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

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
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [selectedMediaForPost, setSelectedMediaForPost] = useState<string[]>(
    [],
  );
  const [videoTrimming, setVideoTrimming] = useState({ start: 0, end: 30 });
  const [imageEditing, setImageEditing] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    filter: "none",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedPostsForBulk, setSelectedPostsForBulk] = useState<number[]>(
    [],
  );

  // Social Media Connection Functions
  const connectPlatform = useCallback(async (platformId: string) => {
    setIsConnecting(platformId);

    // Simulate API connection - in real app, this would redirect to OAuth
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock data for connected platforms
    const mockData = {
      instagram: {
        followers: "2.4K followers",
        engagement: { avg: 4.2, trend: "📈 +0.3%" }
      },
      facebook: {
        followers: "1.8K followers",
        engagement: { avg: 3.1, trend: "📈 +0.5%" }
      },
      linkedin: {
        followers: "892 connections",
        engagement: { avg: 5.7, trend: "📈 +1.2%" }
      },
      twitter: {
        followers: "3.2K followers",
        engagement: { avg: 2.8, trend: "📉 -0.2%" }
      },
      youtube: {
        followers: "1.1K subscribers",
        engagement: { avg: 6.4, trend: "📈 +2.1%" }
      },
      pinterest: {
        followers: "567 followers",
        engagement: { avg: 8.9, trend: "📈 +3.4%" }
      }
    };

    setSocialPlatforms(prev => prev.map(platform =>
      platform.id === platformId
        ? {
            ...platform,
            connected: true,
            followers: mockData[platformId as keyof typeof mockData]?.followers || "Connected",
            engagement: mockData[platformId as keyof typeof mockData]?.engagement || { avg: 5.0, trend: "📈" }
          }
        : platform
    ));

    setIsConnecting(null);

    // Show success message
    alert(`Successfully connected to ${socialPlatforms.find(p => p.id === platformId)?.name}!`);
  }, [socialPlatforms]);

  const disconnectPlatform = useCallback(async (platformId: string) => {
    if (confirm(`Are you sure you want to disconnect from ${socialPlatforms.find(p => p.id === platformId)?.name}?`)) {
      setSocialPlatforms(prev => prev.map(platform =>
        platform.id === platformId
          ? {
              ...platform,
              connected: false,
              followers: null,
              engagement: { avg: null, trend: null }
            }
          : platform
      ));

      // Remove from selected platforms if disconnected
      setSelectedPlatforms(prev => prev.filter(p => p !== platformId));
    }
  }, [socialPlatforms]);

  const connectAllPlatforms = useCallback(async () => {
    setIsConnecting('all');

    for (const platform of socialPlatforms.filter(p => !p.connected)) {
      await connectPlatform(platform.id);
      // Small delay between connections for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsConnecting(null);
    alert('All platforms connected successfully!');
  }, [socialPlatforms, connectPlatform]);

  const generateContent = useCallback(async () => {
    if (!contentType || selectedPlatforms.length === 0) return;

    setIsGenerating(true);

    // Simulate advanced AI content generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Get product information from the form
      const businessName = document.querySelector('#social-business-name')?.value || "Your Business";
      const productName = document.querySelector('#social-product-name')?.value || "";
      const productBenefits = document.querySelector('#social-product-benefits')?.value || "";
      const specialOffer = document.querySelector('#social-special-offer')?.value || "";
      const targetAudience = document.querySelector('#social-target-audience')?.value || "";

      // Create advanced AI request
      const aiRequest: ContentRequest = {
        businessName,
        productService: productName || "our services",
        benefits: productBenefits,
        offer: specialOffer,
        targetAudience,
        tone: aiTone > 70 ? 'friendly' : aiTone > 40 ? 'professional' : 'casual',
        platform: 'social',
        contentType: contentType === 'business_promotion' ? 'promotion' :
                    contentType === 'product_showcase' ? 'showcase' :
                    contentType === 'customer_testimonial' ? 'testimonial' :
                    contentType === 'behind_the_scenes' ? 'story' : 'announcement',
        language: currentLanguage.code,
        region: selectedMarketTier.name,
        goal: 'engagement'
      };

      // Generate advanced AI content with multiple variations
      const aiResult = await advancedAI.generateContent(aiRequest);
      setAiResponse(aiResult);

      // Use the top variation for immediate display
      const topVariation = aiResult.variations[0];
      let content = `${topVariation.hook}\n\n${topVariation.headline}\n\n${topVariation.description}\n\n${topVariation.cta}`;

      // Add hashtags if enabled
      if (includeHashtags && topVariation.hashtags.length > 0) {
        content += `\n\n${topVariation.hashtags.join(" ")}`;
      }

      // Generate content based on content type and product information
      switch (contentType) {
        case "business_promotion":
          if (currentLanguage.code === "hi") {
            content = `🌟 ${businessName} में आपका स्व���गत ��ै!\n\n`;

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
            content = `✨ नया ${productName || "प्���ोडक्ट"} लॉन्च!\n\n`;

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
              content += `��� Launch offer: ${specialOffer}\n\n`;
            }

            content += `Backed by ${businessName} guarantee! ✅\n\n#NewProduct #${selectedMarketTier.name}`;
          }
          break;

        case "customer_testimonial":
          if (currentLanguage.code === "hi") {
            content = `⭐⭐⭐⭐⭐ ग्राहक की राय\n\n`;
            content += `"${businessName} के ${productName || "प्रोडक्ट"} से मुझे ${productBenefits || "बहुत फायदा हु���"}।"\n\n`;
            content += `${targetAudience || "खुश ग्राहक"} - ${selectedMarketTier.name}\n\n`;
            content += `आप भी करें अनुभव! 🌟`;
          } else {
            content = `⭐⭐⭐⭐⭐ Customer Review\n\n`;
            content += `"${businessName}'s ${productName || "product"} gave me ${productBenefits || "amazing results"}!"\n\n`;
            content += `${targetAudience || "Happy Customer"} - ${selectedMarketTier.name}\n\n`;
            content += `Experience it yourself! 🌟`;
          }
          break;

        case "behind_the_scenes":
          if (currentLanguage.code === "hi") {
            content = `🎬 पर्दे के पीछे की कहा��ी\n\n`;
            content += `${businessName} में कैसे बनता है ${productName || "हमारा प्रोडक्ट"}?\n\n`;
            content += `${productBenefits || "गुणवत्ता और ��ेहनत"} का संगम! 💪\n\n`;
            content += `#BehindTheScenes #${selectedMarketTier.name}Business`;
          } else {
            content = `🎬 Behind the Scenes\n\n`;
            content += `How we create ${productName || "our products"} at ${businessName}?\n\n`;
            content += `${productBenefits || "Quality and dedication"} combined! 💪\n\n`;
            content += `#BehindTheScenes #${selectedMarketTier.name}Business`;
          }
          break;

        default:
          const defaultHooks = ["✨ Discover", "🌟 Experience", "🚀 Explore", "💎 Unlock", "🔥 Discover"];
          const randomDefaultHook = defaultHooks[Math.floor(Math.random() * defaultHooks.length)];
          content = `${randomDefaultHook} ${productName || "amazing products"} at ${businessName}!\n\n🎯 What makes us special: ${productBenefits || "Quality and excellence in every detail"}\n\n${specialOffer ? `🎁 Limited offer: ${specialOffer}\n\n` : ""}Available in ${selectedMarketTier.name} - Join thousands of satisfied customers! 🌟\n\n#Quality #${businessName.replace(/\s+/g, '')} #LocalBusiness`;
      }

      // AI Tone adjustment
      if (aiTone > 70) {
        content = content.replace(/\./g, "! 🎉").replace(/!/g, "!! 🚀");
      } else if (aiTone < 30) {
        content = content.replace(/!/g, ".").replace(/🎉/g, "").replace(/🚀/g, "");
      }

      // Add enhanced hashtags if enabled
      if (includeHashtags) {
        const baseHashtags = getHashtags(currentLanguage.code);
        const enhancedHashtags = [...baseHashtags];

        // Add business-specific hashtags
        if (productName) {
          enhancedHashtags.unshift(`#${productName.replace(/\s+/g, '')}`);
        }
        if (businessName && businessName !== "Your Business") {
          enhancedHashtags.unshift(`#${businessName.replace(/\s+/g, '')}`);
        }

        // Add content-type specific trending hashtags
        const trendingHashtags = {
          business_promotion: ['#LocalBusiness', '#Quality', '#TrustedBrand', '#CustomerFirst'],
          product_showcase: ['#NewLaunch', '#Innovation', '#MustHave', '#Trending'],
          customer_testimonial: ['#HappyCustomers', '#Testimonial', '#Satisfied', '#FiveStars'],
          behind_the_scenes: ['#BehindTheScenes', '#Process', '#Craftsmanship', '#TeamWork'],
          educational: ['#DidYouKnow', '#Tips', '#Learning', '#Knowledge'],
          festival_greeting: ['#Festival', '#Celebration', '#Joy', '#Tradition']
        };

        const contentTypeHashtags = trendingHashtags[contentType as keyof typeof trendingHashtags] || ['#LocalBusiness', '#Quality'];
        enhancedHashtags.push(...contentTypeHashtags);

        // Add market-specific hashtags
        enhancedHashtags.push(`#${selectedMarketTier.name.replace(/\s+/g, '')}`);

        // Add trending general hashtags
        const generalTrending = ['#SmallBusiness', '#Local', '#Support', '#Community', '#Excellence'];
        enhancedHashtags.push(...generalTrending);

        // Remove duplicates and limit to 8-10 hashtags
        const uniqueHashtags = [...new Set(enhancedHashtags)];
        content += `\n\n${uniqueHashtags.slice(0, 10).join(" ")}`;
      }

      // Add dynamic CTA if mentions enabled
      if (includeMentions) {
        const dynamicCTAs = {
          hi: [
            "📞 आज ही कॉल करें और विशेष छूट पाएं!",
            "💬 व्हाट्सऐप पर मैसेज करें तुरंत जवाब के लिए!",
            "🌐 हमारी वेबसाइट पर जाकर और जानकारी लें!",
            "📍 आज ही हमारे स्टोर पर आएं!",
            "📱 तुरंत बुकिंग के लिए कॉल करें!"
          ],
          en: [
            "📞 Call now for instant response & special discounts!",
            "💬 WhatsApp us for personalized assistance!",
            "🌐 Visit our website for more amazing deals!",
            "📍 Visit our store today for exclusive offers!",
            "📱 Book now - Limited slots available!",
            "✨ DM us for custom solutions!",
            "🎯 Click the link in bio for instant access!"
          ]
        };

        const ctas = dynamicCTAs[currentLanguage.code === "hi" ? "hi" : "en"];
        const randomCTA = ctas[Math.floor(Math.random() * ctas.length)];
        content += `\n\n${randomCTA}`;
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
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 bg-clip-text text-transparent">
              Social Media Automation
            </h1>
            <p className="text-muted-foreground">
              AI-powered content creation and scheduling across platforms in{" "}
              {currentLanguage.nativeName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              {selectedMarketTier.name}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white gap-2">
              <CheckCircle className="w-4 h-4" />
              {connectedPlatforms.length} Connected
            </Badge>
            <Badge variant="secondary" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              {totalEngagement} Total Engagement
            </Badge>
          </div>
        </div>

        {/* Social Media Connections Overview */}
        {connectedPlatforms.length === 0 && (
          <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <ExternalLink className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Connect Your Social Media Accounts</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your social media platforms to start creating and scheduling content automatically
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {socialPlatforms.slice(0, 4).map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <Button
                          key={platform.id}
                          size="sm"
                          variant="outline"
                          onClick={() => connectPlatform(platform.id)}
                          disabled={isConnecting === platform.id || isConnecting === 'all'}
                          className="gap-2"
                        >
                          {isConnecting === platform.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <IconComponent className="h-4 w-4" />
                          )}
                          {platform.name}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                    onClick={connectAllPlatforms}
                    disabled={isConnecting !== null}
                  >
                    {isConnecting === 'all' ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Connecting All Platforms...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Connect All Platforms
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Platform Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);

            return (
              <Card
                key={platform.id}
                className={`relative transition-all duration-200 hover:scale-105 ${
                  platform.connected ? "hover:shadow-lg cursor-pointer" : "opacity-60"
                } ${isSelected ? "ring-2 ring-primary" : ""}`}
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
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg ${platform.color} ${platform.textColor}`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {platform.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {platform.followers || "Not connected"}
                      </p>
                    </div>
                    {platform.connected ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>

                  {platform.connected ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Engagement</span>
                        <span className="text-muted-foreground">
                          {platform.engagement.avg ? `${platform.engagement.avg}% ${platform.engagement.trend}` : "No data"}
                        </span>
                      </div>
                      <Progress
                        value={platform.engagement.avg ? platform.engagement.avg * 20 : 0}
                        className="h-1"
                      />

                      {/* Disconnect Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          disconnectPlatform(platform.id);
                        }}
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Connect Button */}
                      <Button
                        size="sm"
                        className="w-full text-xs h-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          connectPlatform(platform.id);
                        }}
                        disabled={isConnecting === platform.id}
                      >
                        {isConnecting === platform.id ? (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
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
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-orange-500/10 to-brand-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand-orange-500" />
                      AI Content Generator
                    </CardTitle>
                    <CardDescription>
                      Generate engaging content in {currentLanguage.nativeName}{" "}
                      for {selectedMarketTier.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Product Information */}
                    <div className="space-y-4 p-4 border-2 border-dashed border-purple-200 bg-purple-50/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-600" />
                        <Label className="text-purple-800 font-medium">Product Information</Label>
                        <Badge variant="outline" className="text-xs">Better content</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-sm">Business Name</Label>
                          <Input
                            placeholder="Your Business Name"
                            className="bg-white"
                            id="social-business-name"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm">Product/Service</Label>
                          <Input
                            placeholder="Hair Oil, Restaurant, etc."
                            className="bg-white"
                            id="social-product-name"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm">What makes it special?</Label>
                        <Textarea
                          placeholder="Key benefits, unique features, what customers love..."
                          className="bg-white"
                          rows={2}
                          id="social-product-benefits"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-sm">Special Offer</Label>
                          <Input
                            placeholder="30% Off, Free Delivery, etc."
                            className="bg-white"
                            id="social-special-offer"
                          />
                        </div>
                        <div className="space-y-1">
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
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
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
                              className="justify-start gap-2 h-auto py-3"
                            >
                              <IconComponent className="h-4 w-4" />
                              <div className="text-left">
                                <div className="font-medium">
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
                            ? "अपने व्याप��र के बारे में बताएं..."
                            : "Describe your business topic..."
                        }
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    {/* AI Settings */}
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <Label className="text-sm font-medium">
                        AI Content Settings
                      </Label>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ai-tone" className="text-sm">
                            Tone (Casual ← → Professional)
                          </Label>
                          <span className="text-sm text-muted-foreground">
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

                    {/* Advanced Media Management */}
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-dashed border-2 border-blue-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <ImageIcon className="h-5 w-5 text-blue-500" />
                          Media Library & Upload
                        </CardTitle>
                        <CardDescription>
                          Add images, videos, and GIFs to make your posts more
                          engaging
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Quick Upload Area */}
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
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
                            className="cursor-pointer flex flex-col items-center gap-3 text-center hover:text-blue-600"
                          >
                            <div className="p-4 bg-blue-100 rounded-full">
                              <Upload className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Click to upload or drag & drop
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Images (JPG, PNG, GIF) • Videos (MP4, MOV) • Max
                                50MB each
                              </p>
                            </div>
                          </Label>
                        </div>

                        {/* Media Processing Status */}
                        {isUploadingMedia && (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                            <span className="text-sm font-medium">
                              Processing media files...
                            </span>
                          </div>
                        )}

                        {/* Uploaded Media Grid */}
                        {uploadedMedia.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="font-medium">
                                Your Media ({uploadedMedia.length})
                              </Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setMediaLibraryOpen(true)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View All
                              </Button>
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
                                        <Play className="h-6 w-6 text-white opacity-80" />
                                      </div>
                                      <div className="absolute bottom-1 left-1 right-1">
                                        <div className="bg-black/70 text-white text-xs px-1 py-0.5 rounded text-center">
                                          <p className="truncate">{media.name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : media.type === "gif" ? (
                                    <img
                                      src={media.url}
                                      alt={media.alt}
                                      className="w-full aspect-square object-cover"
                                    />
                                  ) : (
                                    <div className="relative w-full aspect-square">
                                      <img
                                        src={media.url}
                                        alt={media.alt}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          console.log('Image load error:', e);
                                          const target = e.currentTarget as HTMLImageElement;
                                          target.style.display = 'none';
                                          const fallback = target.nextElementSibling as HTMLElement;
                                          if (fallback) {
                                            fallback.style.display = 'flex';
                                          }
                                        }}
                                        onLoad={() => {
                                          console.log('Image loaded successfully');
                                        }}
                                      />
                                      <div className="hidden w-full h-full bg-gray-100 items-center justify-center">
                                        <div className="text-center">
                                          <ImageIcon className="h-6 w-6 mx-auto mb-1 text-gray-500" />
                                          <p className="text-xs text-gray-500">Preview unavailable</p>
                                        </div>
                                      </div>
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
                                        <CheckCircle className="h-4 w-4" />
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
                              <p className="text-sm text-muted-foreground text-center">
                                +{uploadedMedia.length - 6} more files • Click
                                "View All" to see more
                              </p>
                            )}
                          </div>
                        )}

                        {/* AI Media Generation */}
                        <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            <span className="font-medium text-sm">
                              AI Image Generator
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Coming Soon
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Generate custom images based on your content and
                            brand style
                          </p>
                          <Button variant="outline" size="sm" disabled>
                            <Zap className="h-4 w-4 mr-2" />
                            Generate AI Images
                          </Button>
                        </div>

                        {/* Media Selection Summary */}
                        {selectedMediaForPost.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium">
                                  {selectedMediaForPost.length} media file
                                  {selectedMediaForPost.length > 1
                                    ? "s"
                                    : ""}{" "}
                                  selected
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedMediaForPost([])}
                              >
                                Clear Selection
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

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
                        rows={8}
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
                        className="flex-1 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 hover:opacity-90"
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
                {generatedContent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Schedule Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                          <div className="text-sm text-muted-foreground space-y-1">
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
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Save Draft
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Real-time Preview & Insights */}
              <div className="lg:col-span-2 space-y-6">
                {/* Live Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                    <CardDescription>How your post will appear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedPlatforms.length > 0 ? (
                      <div className="space-y-4">
                        {selectedPlatforms.slice(0, 2).map((platformId) => {
                          const platform = socialPlatforms.find(
                            (p) => p.id === platformId,
                          );
                          if (!platform) return null;

                          const IconComponent = platform.icon;

                          return (
                            <div
                              key={platformId}
                              className="border rounded-lg p-4 bg-muted/20"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className={`p-2 rounded-full ${platform.color} ${platform.textColor}`}
                                >
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">
                                    Your Business
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {platform.name}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {/* Selected Media Display */}
                                {selectedMediaForPost.length > 0 && (
                                  <div className="mb-3">
                                    {postFormat === "image_carousel" &&
                                    selectedMediaForPost.length > 1 ? (
                                      <div className="flex gap-2 overflow-x-auto">
                                        {selectedMediaForPost
                                          .slice(0, 3)
                                          .map((mediaId) => {
                                            const media = uploadedMedia.find(
                                              (m) => m.id === mediaId,
                                            );
                                            if (!media) return null;
                                            return (
                                              <div
                                                key={mediaId}
                                                className="flex-shrink-0 w-24 h-24 rounded overflow-hidden"
                                              >
                                                {media.type === "video" ? (
                                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <Video className="h-6 w-6 text-gray-500" />
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
                                          })}
                                        {selectedMediaForPost.length > 3 && (
                                          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                                            <span className="text-xs text-gray-500">
                                              +{selectedMediaForPost.length - 3}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      (() => {
                                        const media = uploadedMedia.find(
                                          (m) =>
                                            m.id === selectedMediaForPost[0],
                                        );
                                        if (!media) return null;
                                        return (
                                          <div className="w-full h-32 rounded-lg overflow-hidden">
                                            {media.type === "video" ? (
                                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <div className="text-center">
                                                  <Video className="h-8 w-8 mx-auto mb-1 text-gray-500" />
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
                                      })()
                                    )}
                                  </div>
                                )}

                                {/* Enhanced placeholder when no media selected */}
                                {selectedMediaForPost.length === 0 &&
                                  (postFormat === "image_single" ||
                                    postFormat === "image_carousel") && (
                                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 border-2 border-dashed border-blue-300">
                                      <div className="text-center">
                                        <div className="p-3 bg-blue-500 rounded-full mx-auto mb-2 w-fit">
                                          <ImageIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-blue-700">
                                          Upload media for preview
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                          Images, videos, or GIFs
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

                                <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <Heart className="h-3 w-3" />
                                      <span>Like</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MessageCircle className="h-3 w-3" />
                                      <span>Comment</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Share2 className="h-3 w-3" />
                                      <span>Share</span>
                                    </div>
                                  </div>
                                  <Bookmark className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          Select platforms to see preview
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Performance Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Performance Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {generatedContent ? (generatedContent.length > 100 ? "85%" : "72%") : "--"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Engagement Score
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {generatedContent ? (selectedPlatforms.length * 150 + Math.floor(Math.random() * 200)) : "--"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Est. Reach
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Content Quality</span>
                        <span className="text-green-600">
                          {generatedContent ? (generatedContent.length > 150 ? "Excellent" : "Good") : "Pending"}
                        </span>
                      </div>
                      <Progress value={generatedContent ? (generatedContent.length > 150 ? 85 : 70) : 0} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Language Accuracy</span>
                        <span className="text-green-600">
                          {generatedContent ? "High" : "Pending"}
                        </span>
                      </div>
                      <Progress value={generatedContent ? 90 : 0} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Cultural Relevance</span>
                        <span className="text-orange-600">
                          {generatedContent ? (currentLanguage.code === "hi" ? "Excellent" : "Good") : "Pending"}
                        </span>
                      </div>
                      <Progress value={generatedContent ? (currentLanguage.code === "hi" ? 85 : 75) : 0} className="h-2" />
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>💡 AI-powered tips for better reach:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Post during peak hours (9 AM, 2 PM, 7 PM)</li>
                        <li>Use 5-10 relevant hashtags</li>
                        <li>Include strong call-to-action phrases</li>
                        <li>Add location tags for local reach</li>
                        <li>Use emojis to increase engagement</li>
                        <li>Ask questions to encourage comments</li>
                        <li>Share behind-the-scenes content</li>
                        <li>Post consistently 3-5 times per week</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            {/* Bulk Actions Bar */}
            <Card>
              <CardContent className="py-4">
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
                      <span className="text-sm text-muted-foreground">
                        {selectedPostsForBulk.length} selected
                      </span>
                      <Button size="sm" onClick={() => bulkAction("publish")}>
                        Publish All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => bulkAction("delete")}
                      >
                        Delete All
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Posts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const platform = socialPlatforms.find(
                  (p) => p.id === post.platform,
                );
                const IconComponent = platform?.icon || Globe;
                const isSelected = selectedPostsForBulk.includes(post.id);

                return (
                  <Card
                    key={post.id}
                    className={`transition-all duration-200 hover:shadow-lg ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
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
                            <p className="text-xs text-muted-foreground">
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

                          <Badge
                            variant={
                              post.status === "published"
                                ? "default"
                                : post.status === "scheduled"
                                  ? "secondary"
                                  : post.status === "failed"
                                    ? "destructive"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {post.status}
                          </Badge>

                          {post.aiGenerated && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Sparkles className="h-3 w-3" />
                              AI
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
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
                          <div className="p-2 bg-muted/30 rounded">
                            <p className="font-semibold">
                              {post.performance.reach}
                            </p>
                            <p className="text-muted-foreground">Reach</p>
                          </div>
                          <div className="p-2 bg-muted/30 rounded">
                            <p className="font-semibold">
                              {post.engagement.likes}
                            </p>
                            <p className="text-muted-foreground">Likes</p>
                          </div>
                          <div className="p-2 bg-muted/30 rounded">
                            <p className="font-semibold">
                              {post.performance.clickThroughRate}%
                            </p>
                            <p className="text-muted-foreground">CTR</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => duplicatePost(post.id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Reach
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Start posting to see reach data
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Engagement Rate
                  </CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    Track engagement metrics here
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Posts Published
                  </CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Posts published will show here
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    AI Generated
                  </CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    AI usage statistics
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance Comparison</CardTitle>
                <CardDescription>
                  Detailed analytics across all connected social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {connectedPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <div key={platform.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded ${platform.color} ${platform.textColor}`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-medium">
                                {platform.name}
                              </span>
                              <p className="text-sm text-muted-foreground">
                                {platform.followers} followers
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {platform.engagement.avg}% avg engagement
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">
                              Reach
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">
                              Likes
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">
                              Comments
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">
                              Shares
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content-ideas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Content Ideas for {currentLanguage.nativeName}
                </CardTitle>
                <CardDescription>
                  Trending content suggestions for {selectedMarketTier.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Card key={index} className="relative overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold">{idea.title}</h3>
                          {idea.trending && (
                            <Badge className="bg-orange-500 text-white">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {idea.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {idea.engagement} Engagement
                          </Badge>
                          <Button size="sm">
                            <Zap className="h-3 w-3 mr-1" />
                            Use Idea
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>
                  Configure automatic posting and content optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Auto-post Generation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate and schedule posts based on your
                        business
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Smart Timing</Label>
                      <p className="text-sm text-muted-foreground">
                        Optimize posting times based on audience activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Regional Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Adapt content for local market preferences
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Festival Integration</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create festival-specific content
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
