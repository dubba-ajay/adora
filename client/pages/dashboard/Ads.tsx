import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/hooks/useLanguage";
import {
  ModernCard,
  MetricCard,
  ActionButton,
  SectionHeader
} from "@/components/ModernDesignSystem";
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
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Megaphone,
  Eye,
  IndianRupee,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Search,
  PlusCircle,
  BarChart3,
  MousePointer,
  ThumbsUp,
  Instagram,
  Twitter,
  Globe2,
  Package,
  Percent,
  Building,
  Phone,
  Clock,
  MapPin,
  TrendingUp,
  Target,
  Zap,
  Star,
  Globe,
} from "lucide-react";
import { advancedAI, ContentRequest, AIContentResponse } from "@/lib/advancedAI";

export default function AdsModern() {
  const { t } = useLanguage();
  const [selectedPlatform, setSelectedPlatform] = useState("google");
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    headline: "",
    description: ""
  });
  const fileInputRef = useRef(null);

  // Business information form state
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    website: "",
    phoneNumber: "",
    businessHours: "",
    address: "",
    product: "",
    offers: "",
    targetAudience: "",
    dailyBudget: 0
  });

  // Auto-fill from business profile
  useEffect(() => {
    const savedBusinessProfile = localStorage.getItem("businessProfile");
    if (savedBusinessProfile) {
      try {
        const profileData = JSON.parse(savedBusinessProfile);
        const businessData = profileData.businessData || profileData;

        setBusinessInfo(prev => ({
          ...prev,
          businessName: businessData.name || prev.businessName,
          website: businessData.website || prev.website,
          phoneNumber: businessData.phone || prev.phoneNumber,
          businessHours: businessData.hours || prev.businessHours,
          address: businessData.address || prev.address,
          product: businessData.services || prev.product,
        }));
      } catch (error) {
        console.log("Error loading business profile:", error);
      }
    }
  }, []);

  // AI Image description state
  const [imageDescription, setImageDescription] = useState("");

  const platforms = [
    {
      id: "google",
      name: "Google Ads",
      icon: Search,
      color: "from-blue-500 to-blue-600",
      description: "Search & Display Advertising"
    },
    {
      id: "facebook",
      name: "Facebook Ads",
      icon: ThumbsUp,
      color: "from-blue-600 to-purple-600",
      description: "Facebook & Instagram Advertising"
    },
    {
      id: "instagram",
      name: "Instagram Ads",
      icon: Instagram,
      color: "from-pink-500 to-orange-500",
      description: "Visual Content & Stories"
    },
    {
      id: "twitter",
      name: "Twitter Ads",
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
      description: "Real-time Engagement"
    }
  ];

  const generateAIContent = async () => {
    // Only generate if user has provided actual business information
    if (!businessInfo.businessName) {
      alert("Please fill in Business Name to generate AI content");
      return;
    }

    setIsGeneratingContent(true);

    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create unique content every time based on current timestamp and user input
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substr(2, 9);

    // Dynamic content variations to ensure uniqueness
    const toneVariations = [
      { style: "professional", adjectives: ["exceptional", "professional", "premium", "expert"] },
      { style: "friendly", adjectives: ["amazing", "wonderful", "fantastic", "incredible"] },
      { style: "trendy", adjectives: ["stunning", "outstanding", "remarkable", "extraordinary"] },
      { style: "energetic", adjectives: ["exciting", "thrilling", "dynamic", "vibrant"] },
      { style: "luxurious", adjectives: ["luxurious", "elegant", "sophisticated", "premium"] }
    ];

    const currentTone = toneVariations[timestamp % toneVariations.length];
    const adjective = currentTone.adjectives[uniqueId.length % currentTone.adjectives.length];

    // Action words for different contexts
    const actionWords = ["discover", "experience", "enjoy", "book", "get", "find", "choose", "try"];
    const action = actionWords[timestamp % actionWords.length];

    // Platform-specific dynamic content generation
    let headline = "";
    let description = "";

    if (selectedPlatform === "google") {
      // Google Ads: Professional, search-focused, direct
      const headlineFormats = [
        () => `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "Services"} by ${businessInfo.businessName}${businessInfo.address ? ` - ${businessInfo.address.split(',')[0]}` : ""}`,
        () => `${businessInfo.businessName}: ${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "Professional Services"}${businessInfo.address ? ` in ${businessInfo.address.split(',')[0]}` : ""}`,
        () => `${action.charAt(0).toUpperCase() + action.slice(1)} ${adjective} ${businessInfo.product || "Services"} - ${businessInfo.businessName}`,
        () => `${businessInfo.businessName} | ${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "Service"} Provider${businessInfo.address ? ` - ${businessInfo.address.split(',')[0]}` : ""}`,
        () => `Best ${businessInfo.product || "Services"} ${businessInfo.address ? `in ${businessInfo.address.split(',')[0]}` : "Near You"} - ${businessInfo.businessName}`
      ];

      headline = headlineFormats[timestamp % headlineFormats.length]();

      const descFormats = [
        () => `${action.charAt(0).toUpperCase() + action.slice(1)} ${adjective} ${businessInfo.product || "professional services"} at ${businessInfo.businessName}. ${businessInfo.offers ? `${businessInfo.offers}. ` : ""}${businessInfo.address ? `Conveniently located in ${businessInfo.address.split(',')[0]}. ` : ""}${businessInfo.phoneNumber ? `Call ${businessInfo.phoneNumber} ` : "Contact us "}for immediate booking and consultation!`,
        () => `Looking for ${adjective} ${businessInfo.product || "service"}? ${businessInfo.businessName} delivers excellence every time. ${businessInfo.offers ? `Limited time: ${businessInfo.offers}. ` : ""}${businessInfo.businessHours ? `${businessInfo.businessHours}. ` : ""}${businessInfo.phoneNumber ? `Book now: ${businessInfo.phoneNumber}` : "Book your appointment today"}!`,
        () => `${businessInfo.businessName} provides ${adjective} ${businessInfo.product || "services"} that exceed expectations. ${businessInfo.offers ? `Special offer: ${businessInfo.offers}. ` : ""}${businessInfo.address ? `Visit us at ${businessInfo.address.split(',')[0]} ` : ""}${businessInfo.phoneNumber ? `or call ${businessInfo.phoneNumber} ` : ""}for instant booking and consultation.`
      ];

      description = descFormats[timestamp % descFormats.length]();

    } else if (selectedPlatform === "facebook") {
      // Facebook: Social, engaging, community-focused with emojis
      const emojiSets = [
        ["🎉", "✨", "💫"],
        ["🔥", "⚡", "💯"],
        ["🌟", "⭐", "💎"],
        ["🚀", "🔆", "🎊"],
        ["💝", "🎁", "🌈"]
      ];
      const emojis = emojiSets[timestamp % emojiSets.length];
      const emoji = emojis[uniqueId.length % emojis.length];

      const headlineFormats = [
        () => `${emoji} Just experienced ${adjective} ${businessInfo.product || "service"} at ${businessInfo.businessName}!`,
        () => `${emoji} Friends! You need to check out ${adjective} ${businessInfo.product || "services"} at ${businessInfo.businessName}!`,
        () => `${emoji} ${businessInfo.businessName} delivers ${adjective} ${businessInfo.product || "service"} every time!`,
        () => `${emoji} This is what ${adjective} ${businessInfo.product || "service"} looks like! Thanks ${businessInfo.businessName}!`,
        () => `${emoji} Obsessed with the ${adjective} ${businessInfo.product || "service"} at ${businessInfo.businessName}!`
      ];

      headline = headlineFormats[timestamp % headlineFormats.length]();

      const descFormats = [
        () => `Guys, I can't stop talking about my experience at ${businessInfo.businessName}! Their ${businessInfo.product || "service"} is absolutely ${adjective}! ${businessInfo.offers ? `${businessInfo.offers} 🎁 ` : ""}${businessInfo.address ? `📍 Located in ${businessInfo.address.split(',')[0]} - ` : ""}tag someone who needs this! ${businessInfo.phoneNumber ? `📞 ${businessInfo.phoneNumber}` : "DM them"} 💙 #${adjective} #local`,
        () => `PSA: ${businessInfo.businessName} has the most ${adjective} ${businessInfo.product || "service"} I've ever experienced! ${businessInfo.offers ? `And they have ${businessInfo.offers}! 🔥 ` : ""}${businessInfo.address ? `They're in ${businessInfo.address.split(',')[0]} ` : ""}Who's coming with me next time? ${businessInfo.phoneNumber ? `Book at ${businessInfo.phoneNumber}` : "Book through their page"} 😍`,
        () => `Okay but can we talk about how ${adjective} ${businessInfo.businessName} is?! ${businessInfo.product ? `Their ${businessInfo.product} service ` : "Their service "}is next level! ${businessInfo.offers ? `Plus ${businessInfo.offers} ✨ ` : ""}${businessInfo.address ? `Located in ${businessInfo.address.split(',')[0]} - ` : ""}seriously everyone needs to experience this! 🙌`
      ];

      description = descFormats[timestamp % descFormats.length]();

    } else if (selectedPlatform === "instagram") {
      // Instagram: Visual, trendy, hashtag-heavy
      const headlineFormats = [
        () => `${adjective} ${businessInfo.product || "vibes"} only ✨`,
        () => `This is what ${adjective} ${businessInfo.product || "service"} looks like 💫`,
        () => `${businessInfo.product || "Service"} goals achieved 🔥`,
        () => `When ${businessInfo.product || "service"} meets perfection 🌟`,
        () => `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "experience"} unlocked 💎`
      ];

      headline = headlineFormats[timestamp % headlineFormats.length]();

      // Generate relevant hashtags
      const productHash = businessInfo.product ? businessInfo.product.toLowerCase().replace(/\s+/g, '') : 'service';
      const cityHash = businessInfo.address ? businessInfo.address.split(',')[0].toLowerCase().replace(/\s+/g, '') : 'local';
      const businessHash = businessInfo.businessName ? businessInfo.businessName.toLowerCase().replace(/\s+/g, '') : 'business';

      const descFormats = [
        () => `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "service"} experience at ${businessInfo.businessName} ✨\n\n${businessInfo.offers ? `${businessInfo.offers} 🎊\n` : ""}${businessInfo.address ? `📍 ${businessInfo.address.split(',')[0]}\n` : ""}${businessInfo.phoneNumber ? `📞 ${businessInfo.phoneNumber}\n` : ""}${businessInfo.businessHours ? `⏰ ${businessInfo.businessHours}\n` : ""}\n#${productHash} #${adjective} #${cityHash} #${businessHash} #booktoday #quality #trending`,
        () => `POV: You found the most ${adjective} ${businessInfo.product || "service"} in town 💯\n\n${businessInfo.businessName} never disappoints ✨\n${businessInfo.offers ? `Current offer: ${businessInfo.offers} 🔥\n` : ""}\n${businessInfo.address ? `📍 ${businessInfo.address.split(',')[0]}\n` : ""}DM to book or save this post 📩\n\n#${businessHash} #${productHash} #${adjective} #${cityHash} #musttry #viral #bookings`,
        () => `Results speak louder than words 📸\n\n${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "service"} by ${businessInfo.businessName} ✨\n${businessInfo.offers ? `Special: ${businessInfo.offers} 💝\n` : ""}\n${businessInfo.address ? `Location: ${businessInfo.address.split(',')[0]} 📍\n` : ""}\n${businessInfo.phoneNumber ? `Book: ${businessInfo.phoneNumber} 📞\n` : ""}\nSwipe for more details ➡️\n\n#results #${productHash} #${adjective} #${businessHash} #${cityHash} #professional #recommended`
      ];

      description = descFormats[timestamp % descFormats.length]();

    } else if (selectedPlatform === "twitter") {
      // Twitter: Concise, trending, conversational
      const headlineFormats = [
        () => `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "service"} alert! 🚨`,
        () => `Just ${action}ed ${adjective} ${businessInfo.product || "service"} ${timestamp % 2 === 0 ? '🔥' : '⚡'}`,
        () => `${businessInfo.businessName}: ${adjective} ${businessInfo.product || "services"} that hit different ${timestamp % 2 === 0 ? '💯' : '✨'}`,
        () => `This is how ${adjective} ${businessInfo.product || "service"} should be ${timestamp % 2 === 0 ? '👌' : '🙌'}`,
        () => `Thread: Why ${businessInfo.businessName} has ${adjective} ${businessInfo.product || "service"} 🧵`
      ];

      headline = headlineFormats[timestamp % headlineFormats.length]();

      const productHash = businessInfo.product ? businessInfo.product.toLowerCase().replace(/\s+/g, '') : 'service';
      const cityHash = businessInfo.address ? businessInfo.address.split(',')[0].toLowerCase().replace(/\s+/g, '') : 'local';

      const descFormats = [
        () => `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${businessInfo.product || "service"} experience at ${businessInfo.businessName}! ${businessInfo.offers ? `${businessInfo.offers} 🎁 ` : ""}${businessInfo.address ? `📍 ${businessInfo.address.split(',')[0]} ` : ""}${businessInfo.phoneNumber ? `📞 ${businessInfo.phoneNumber} ` : ""}Highly recommend! #${productHash} #${adjective} #${cityHash}`,
        () => `Just booked with ${businessInfo.businessName} and their ${businessInfo.product || "service"} is ${adjective}! ${businessInfo.offers ? `Plus they offer ${businessInfo.offers} ✨ ` : ""}${businessInfo.address ? `Located in ${businessInfo.address.split(',')[0]} ` : ""}10/10 would recommend #${productHash} #recommended #${cityHash}`,
        () => `Real talk: ${businessInfo.businessName} delivers ${adjective} ${businessInfo.product || "service"} every single time ${businessInfo.offers ? `+ ${businessInfo.offers} ` : ""}${businessInfo.address ? `in ${businessInfo.address.split(',')[0]} ` : ""}${businessInfo.phoneNumber ? `Call ${businessInfo.phoneNumber}` : "Hit them up"} #${productHash} #quality #${cityHash} #authentic`
      ];

      description = descFormats[timestamp % descFormats.length]();
    }

    setGeneratedContent({
      headline,
      description
    });

    setIsGeneratingContent(false);
  };

  const generateAIImage = async () => {
    if (!imageDescription.trim()) {
      alert("Please describe your ad image to generate with AI");
      return;
    }

    setIsGeneratingContent(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingContent(false);
    
    alert(`AI Image generated for: "${imageDescription}"\n\nImage would show: Professional ${businessInfo.product || 'service'} setup with modern styling and satisfied customers.`);
  };

  const syncBusinessProfile = () => {
    const savedBusinessProfile = localStorage.getItem("businessProfile");
    if (savedBusinessProfile) {
      try {
        const profileData = JSON.parse(savedBusinessProfile);
        const businessData = profileData.businessData || profileData;

        setBusinessInfo(prev => ({
          ...prev,
          businessName: businessData.name || prev.businessName,
          website: businessData.website || prev.website,
          phoneNumber: businessData.phone || prev.phoneNumber,
          businessHours: businessData.hours || prev.businessHours,
          address: businessData.address || prev.address,
          product: businessData.services || prev.product,
        }));

        alert("Business profile synced successfully!");
      } catch (error) {
        alert("Error syncing business profile. Please check your business profile data.");
      }
    } else {
      alert("No business profile found. Please create your business profile first.");
    }
  };

  const createCampaign = async () => {
    // Basic validation - only required fields
    if (!businessInfo.businessName || !businessInfo.phoneNumber || !businessInfo.address || !businessInfo.targetAudience) {
      alert("Please fill in required fields: Business Name, Phone Number, Address, and Target Audience");
      return;
    }
    
    setIsCreatingCampaign(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsCreatingCampaign(false);
    
    const platformName = platforms.find(p => p.id === selectedPlatform)?.name || "Selected Platform";
    
    const campaignDetails = `
Campaign Created Successfully! 📈

Platform: ${platformName}
Business: ${businessInfo.businessName}
Product: ${businessInfo.product}
Budget: ₹${businessInfo.dailyBudget}/day
Target: ${businessInfo.targetAudience}
Location: ${businessInfo.address}

Your campaign will be reviewed and activated within 24 hours.
    `;
    alert(campaignDetails);
  };

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 lg:px-6 py-6 space-y-6 lg:space-y-8 max-w-7xl">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Advertising Hub
              </h1>
              <p className="text-gray-600 mt-2">Create, manage, and optimize your ad campaigns across multiple platforms</p>
            </div>
            <div className="flex items-center gap-4">
              <ActionButton
                icon={PlusCircle}
                onClick={() => setIsCreatingCampaign(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                New Campaign
              </ActionButton>
              <ActionButton
                icon={BarChart3}
                variant="outline"
              >
                Analytics
              </ActionButton>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Campaigns"
              value="0"
              subtitle="Start your first campaign"
              icon={Megaphone}
              trend={0}
              gradientFrom="from-blue-500"
              gradientTo="to-cyan-500"
            />
            <MetricCard
              title="Total Reach"
              value="0"
              subtitle="Launch campaigns to see growth"
              icon={Eye}
              trend={0}
              gradientFrom="from-green-500"
              gradientTo="to-emerald-500"
            />
            <MetricCard
              title="Total Clicks"
              value="0"
              subtitle="Generate clicks to track"
              icon={MousePointer}
              trend={0}
              gradientFrom="from-purple-500"
              gradientTo="to-pink-500"
            />
            <MetricCard
              title="Total Spent"
              value="₹0"
              subtitle="Start advertising to track spend"
              icon={IndianRupee}
              trend={0}
              gradientFrom="from-orange-500"
              gradientTo="to-red-500"
            />
          </div>

          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Advertising Platform</CardTitle>
              <CardDescription>Select the platform where you want to create your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlatform === platform.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center mb-3`}>
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg">{platform.name}</h4>
                    <p className="text-gray-600 text-sm">{platform.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Campaign Creation Interface */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Campaign Creation Form */}
            <div className="space-y-6">
              {/* Business Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Business Information
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={syncBusinessProfile}
                      className="text-xs"
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Sync Profile
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Enter your business details for the {currentPlatform?.name} campaign. Click "Sync Profile" to auto-fill from your business profile.
                    <br />
                    <span className="text-red-600 text-xs mt-1 block">* Required fields: Business Name, Phone Number, Address, Target Audience</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="business-name">Business Name *</Label>
                      <Input
                        id="business-name"
                        placeholder="Enter your business name"
                        value={businessInfo.businessName}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
                        className={!businessInfo.businessName ? "border-red-300" : ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://www.yourbusiness.com"
                        value={businessInfo.website}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={businessInfo.phoneNumber}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        className={!businessInfo.phoneNumber ? "border-red-300" : ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours">Business Hours</Label>
                      <Input
                        id="hours"
                        placeholder="Mon-Sat: 9 AM - 8 PM"
                        value={businessInfo.businessHours}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessHours: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product">Product/Service</Label>
                      <Input
                        id="product"
                        placeholder=""
                        value={businessInfo.product}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, product: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="offers">Special Offers</Label>
                      <Input
                        id="offers"
                        placeholder=""
                        value={businessInfo.offers}
                        onChange={(e) => setBusinessInfo(prev => ({ ...prev, offers: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Location/Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your location"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                      className={!businessInfo.address ? "border-red-300" : ""}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Daily Budget (₹): {businessInfo.dailyBudget}</Label>
                      <Slider
                        id="budget"
                        min={100}
                        max={5000}
                        step={100}
                        value={[businessInfo.dailyBudget]}
                        onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, dailyBudget: value[0] }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="audience">Target Audience *</Label>
                      <Select value={businessInfo.targetAudience} onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, targetAudience: value }))}>
                        <SelectTrigger className={!businessInfo.targetAudience ? "border-red-300" : ""}>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Community</SelectItem>
                          <SelectItem value="city">City Wide</SelectItem>
                          <SelectItem value="regional">Regional</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Content Generation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Content Generator
                  </CardTitle>
                  <CardDescription>
                    Generate compelling ad content for {currentPlatform?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={generateAIContent}
                    disabled={isGeneratingContent || !businessInfo.businessName}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGeneratingContent ? 'Generating Content...' : 'Generate AI Ad Content'}
                  </Button>

                  {generatedContent.headline && (
                    <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium text-blue-800">Generated Headline:</Label>
                        <p className="text-blue-900 font-semibold">{generatedContent.headline}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-blue-800">Generated Description:</Label>
                        <p className="text-blue-900">{generatedContent.description}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Image Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    AI Image Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="image-description">Describe your ad image</Label>
                    <Textarea
                      id="image-description"
                      placeholder="Describe the image you want to generate for your ad"
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={generateAIImage}
                      disabled={isGeneratingContent || !imageDescription.trim()}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGeneratingContent ? 'Generating...' : 'Generate AI Image'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => console.log("File selected:", e.target.files)}
                  />
                </CardContent>
              </Card>

              {/* Create Campaign Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 text-lg"
                  onClick={createCampaign}
                  disabled={isCreatingCampaign}
                >
                  {isCreatingCampaign ? 'Creating Campaign...' : `Create ${currentPlatform?.name} Campaign`}
                </Button>

                <div className="text-center text-gray-600">
                  <span className="text-sm">or</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-dashed border-blue-300 py-3 text-lg hover:bg-blue-50"
                  onClick={async () => {
                    if (!businessInfo.businessName || !businessInfo.phoneNumber || !businessInfo.address || !businessInfo.targetAudience) {
                      alert("Please fill in required fields: Business Name, Phone Number, Address, and Target Audience");
                      return;
                    }

                    setIsCreatingCampaign(true);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    setIsCreatingCampaign(false);

                    const campaignDetails = `
🚀 Multi-Platform Campaign Created Successfully!

✅ Google Ads - Search & Display
✅ Facebook Ads - Feed & Stories
✅ Instagram Ads - Posts & Reels
✅ Twitter Ads - Promoted Tweets

Business: ${businessInfo.businessName}
Product: ${businessInfo.product}
Budget: ₹${businessInfo.dailyBudget}/day per platform
Total Budget: ₹${businessInfo.dailyBudget * 4}/day
Target: ${businessInfo.targetAudience}
Location: ${businessInfo.address}

All campaigns will be reviewed and activated within 24 hours.
You'll receive platform-specific performance reports.
                    `;
                    alert(campaignDetails);
                  }}
                  disabled={isCreatingCampaign}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isCreatingCampaign ? 'Creating Multi-Platform Campaign...' : 'Create Multi-Platform Campaign'}
                </Button>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="space-y-6">
              {/* Platform-specific Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    {currentPlatform?.name} Preview
                    <Badge variant="outline" className="ml-2 text-xs">
                      {selectedPlatform}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedPlatform === "google" && (
                    <div className="bg-white border rounded-lg p-4 space-y-4">
                      {/* Google Search Results Preview */}
                      <div className="space-y-3">
                        <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 text-sm">{businessInfo.website || "www.yourbusiness.com"}</span>
                          </div>
                          <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                            {generatedContent.headline || `${businessInfo.businessName || "Your Business"}${businessInfo.product ? ` - ${businessInfo.product}` : " - Quality Services"}`}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {generatedContent.description || `${businessInfo.businessName ? `${businessInfo.businessName} provides ` : ""}professional ${businessInfo.product || "services"} in ${businessInfo.address?.split(',')[0] || "your area"}. ${businessInfo.offers ? businessInfo.offers + ". " : ""}${businessInfo.phoneNumber ? `Call ${businessInfo.phoneNumber}` : "Contact us"} today!`}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>4.8 (127 reviews)</span>
                            </div>
                            {businessInfo.businessHours && <span>{businessInfo.businessHours}</span>}
                            {businessInfo.phoneNumber && <span>{businessInfo.phoneNumber}</span>}
                            <span>Book Online</span>
                          </div>
                        </div>

                        {businessInfo.offers && (
                          <div className="p-4 border-l-4 border-green-500 bg-green-50">
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 text-sm">{businessInfo.website || "www.yourbusiness.com"} › offers</span>
                            </div>
                            <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                              {businessInfo.offers} - {businessInfo.businessName}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Limited time offer! Get {businessInfo.offers.toLowerCase()} on all {businessInfo.product} services. Book now and save!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPlatform === "facebook" && (
                    <div className="max-w-md mx-auto">
                      <div className="bg-white border rounded-lg p-4 shadow-sm">
                        {/* Facebook Post Preview */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{businessInfo.businessName?.charAt(0) || "B"}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{businessInfo.businessName || "Your Business"}</p>
                            <p className="text-xs text-gray-500">Sponsored • <span className="text-blue-600">Follow</span></p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-gray-900">
                            {generatedContent.description || `🎉 ${businessInfo.businessName ? `Amazing ${businessInfo.product || "services"} at ${businessInfo.businessName}!` : "Check out our amazing services!"} ${businessInfo.offers ? businessInfo.offers + " " : ""}${businessInfo.address ? `📍 ${businessInfo.address.split(',')[0]}` : ""} Join our happy customers! 💙`}
                          </p>

                          {imageDescription && (
                            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm">{imageDescription}</p>
                              </div>
                            </div>
                          )}

                          <div className="border-t pt-2">
                            <div className="flex items-center justify-between text-gray-500">
                              <div className="flex items-center gap-4">
                                <span className="text-sm cursor-pointer hover:text-blue-600">👍 Like</span>
                                <span className="text-sm cursor-pointer hover:text-blue-600">💬 Comment</span>
                                <span className="text-sm cursor-pointer hover:text-blue-600">📤 Share</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPlatform === "instagram" && (
                    <div className="max-w-sm mx-auto">
                      <div className="bg-white border-2 border-gray-200 rounded-lg">
                        {/* Instagram Post Preview */}
                        <div className="flex items-center justify-between p-3 border-b">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{businessInfo.businessName?.charAt(0) || "B"}</span>
                            </div>
                            <span className="font-semibold text-sm">{businessInfo.businessName?.toLowerCase().replace(/\s+/g, '_') || "your_business"}</span>
                          </div>
                          <span className="text-xs text-gray-500">•••</span>
                        </div>

                        {imageDescription ? (
                          <div className="bg-gradient-to-br from-pink-100 to-orange-100 aspect-square flex items-center justify-center">
                            <div className="text-center text-gray-600">
                              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                              <p className="text-sm px-4">{imageDescription}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-pink-100 to-orange-100 aspect-square flex items-center justify-center">
                            <div className="text-center text-gray-600">
                              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                              <p className="text-sm">{businessInfo.product || "Your amazing service"}</p>
                            </div>
                          </div>
                        )}

                        <div className="p-3 space-y-2">
                          <div className="flex items-center gap-4">
                            <span>♥️</span>
                            <span>💬</span>
                            <span>📤</span>
                          </div>
                          <p className="text-sm">
                            <span className="font-semibold">{businessInfo.businessName?.toLowerCase().replace(/\s+/g, '_') || "your_business"}</span> {generatedContent.description || `${businessInfo.product ? `Amazing ${businessInfo.product} experience!` : "Amazing service experience!"} ✨ ${businessInfo.offers ? businessInfo.offers + " " : ""}${businessInfo.address ? `📍 ${businessInfo.address.split(',')[0]} ` : ""}#quality ${businessInfo.product ? `#${businessInfo.product.toLowerCase().replace(/\s+/g, '')}` : "#service"} #local ${businessInfo.businessName ? `#${businessInfo.businessName.toLowerCase().replace(/\s+/g, '')}` : ""}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPlatform === "twitter" && (
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white border rounded-lg p-4">
                        {/* Twitter Tweet Preview */}
                        <div className="flex gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{businessInfo.businessName?.charAt(0) || "B"}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{businessInfo.businessName || "Your Business"}</span>
                              <span className="text-gray-500">@{businessInfo.businessName?.toLowerCase().replace(/\s+/g, '') || "yourbusiness"}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-500 text-sm">Promoted</span>
                            </div>

                            <p className="text-gray-900 mb-3">
                              {generatedContent.description || `🚀 ${businessInfo.product ? `Need ${businessInfo.product}?` : "Need quality service?"} ${businessInfo.businessName || "We"} deliver! ${businessInfo.offers ? businessInfo.offers + " " : ""}${businessInfo.phoneNumber ? `📞 ${businessInfo.phoneNumber}` : "Contact us"} ${businessInfo.product ? `#${businessInfo.product.toLowerCase().replace(/\s+/g, '')}` : "#service"} #quality ${businessInfo.address ? `#${businessInfo.address.split(',')[0].toLowerCase().replace(/\s+/g, '')}` : "#local"}`}
                            </p>

                            {businessInfo.website && (
                              <div className="border rounded-lg p-3 mb-3 bg-gray-50">
                                <div className="flex items-center gap-2">
                                  <Globe2 className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-blue-600">{businessInfo.website}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {businessInfo.businessName} - Professional {businessInfo.product} Services
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-gray-500 text-sm">
                              <span className="cursor-pointer hover:text-blue-600">💬 Reply</span>
                              <span className="cursor-pointer hover:text-green-600">🔄 Retweet</span>
                              <span className="cursor-pointer hover:text-red-600">♥️ Like</span>
                              <span className="cursor-pointer hover:text-blue-600">📤 Share</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Business Profile Display */}
              {(businessInfo.businessName || businessInfo.phoneNumber) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Business Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {businessInfo.businessName && (
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">{businessInfo.businessName}</span>
                        </div>
                      )}
                      {businessInfo.website && (
                        <div className="flex items-center gap-3">
                          <Globe2 className="w-4 h-4 text-purple-600" />
                          <span className="text-blue-600 underline">{businessInfo.website}</span>
                        </div>
                      )}
                      {businessInfo.phoneNumber && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{businessInfo.phoneNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{businessInfo.businessHours}</span>
                      </div>
                      {businessInfo.address && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>{businessInfo.address}</span>
                        </div>
                      )}
                      {businessInfo.product && (
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-orange-600" />
                          <span>{businessInfo.product}</span>
                        </div>
                      )}
                      {businessInfo.offers && (
                        <div className="flex items-center gap-3">
                          <Percent className="w-4 h-4 text-pink-600" />
                          <span className="text-green-600 font-medium">{businessInfo.offers}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span>Daily Budget: ₹{businessInfo.dailyBudget}</span>
                      </div>
                      {businessInfo.targetAudience && (
                        <div className="flex items-center gap-3">
                          <Eye className="w-4 h-4 text-purple-600" />
                          <span>Target: {businessInfo.targetAudience}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
