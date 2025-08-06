import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Shirt,
  Utensils,
  Smartphone,
  Palette,
  Heart,
  Dumbbell,
  GraduationCap,
  Car,
  Home,
  Coffee,
  Gift,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Sparkles,
  Eye,
  Copy,
  Download,
  Share2,
  Settings,
  Wand2,
  BarChart3,
} from "lucide-react";
import {
  ModernCard,
  MetricCard,
  StatusBadge,
  ActionButton,
  SectionHeader,
} from "@/components/ModernDesignSystem";

interface ProductTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  targetAudience: string[];
  contentTypes: string[];
  platforms: string[];
  estimatedROI: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  templates: {
    socialPost: string;
    whatsapp: string;
    email: string;
    sms: string;
    adCopy: string;
  };
  customization: {
    productName: string;
    price: string;
    discount: string;
    features: string[];
    benefits: string[];
  };
}

const productTemplates: ProductTemplate[] = [
  {
    id: "fashion-clothing",
    name: "Fashion & Clothing",
    category: "Fashion",
    icon: Shirt,
    description: "Stylish campaigns for fashion retailers and clothing brands",
    targetAudience: ["young-adults", "fashion-conscious", "trendsetters"],
    contentTypes: ["social-posts", "stories", "reels", "ads"],
    platforms: ["instagram", "facebook", "pinterest"],
    estimatedROI: 380,
    difficulty: "intermediate",
    templates: {
      socialPost: "✨ New {productName} Collection Drop! ✨\n\nElevate your style this festive season with our latest {productName}!\n\n🔥 Special Festival Offer: {discount}% OFF\n💰 Starting at just ₹{price}\n\n✓ {feature1}\n✓ {feature2}\n✓ {feature3}\n\n👗 Shop now and turn heads at every celebration!\n\n#FestiveFashion #NewCollection #{productName}Style #FashionSale",
      whatsapp: "🎉 FESTIVAL FASHION ALERT! 🎉\n\nNew {productName} collection is here!\n\n✨ {discount}% OFF for limited time\n💫 Premium quality, latest trends\n🚚 Free delivery above ₹999\n\nShop now: [Link]\nCall: [Number]",
      email: "Subject: ✨ New {productName} Collection - Festival Special!\n\nDear Fashion Lover,\n\nGet ready to dazzle this festival season with our brand new {productName} collection!\n\nWhat makes it special:\n• {benefit1}\n• {benefit2}\n• {benefit3}\n\nLimited time offer: {discount}% OFF\nStarting from: ₹{price}\n\nShop now before stocks run out!",
      sms: "🎉 NEW {productName} collection! {discount}% OFF. Starting ₹{price}. Free delivery. Shop: [Link] Reply STOP to opt out",
      adCopy: "New {productName} Collection - Festival Special! {discount}% OFF | Premium Quality | Free Delivery | Shop Now!"
    },
    customization: {
      productName: "Ethnic Wear",
      price: "1299",
      discount: "30",
      features: ["Premium Fabric", "Latest Designs", "Perfect Fit"],
      benefits: ["Comfortable All-Day Wear", "Compliments Guaranteed", "Festival Ready Look"]
    }
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    category: "F&B",
    icon: Utensils,
    description: "Delicious campaigns for restaurants and food businesses",
    targetAudience: ["food-lovers", "families", "young-professionals"],
    contentTypes: ["social-posts", "stories", "videos", "ads"],
    platforms: ["instagram", "facebook", "zomato", "swiggy"],
    estimatedROI: 420,
    difficulty: "beginner",
    templates: {
      socialPost: "🍽️ Festival Feast at [Restaurant Name]! 🍽️\n\nIndulge in our special {productName} this festive season!\n\n🎊 Festival Special Menu:\n✓ {feature1}\n✓ {feature2}\n✓ {feature3}\n\n💰 Starting at ₹{price}\n🎁 {discount}% OFF on orders above ₹500\n\n📞 Book your table now!\n🚚 Home delivery available\n\n#FestivalFood #{productName} #FoodieParadise",
      whatsapp: "🍽️ Festival Special Menu!\n\n{productName} - Starting ₹{price}\n{discount}% OFF on orders above ₹500\n\n✨ Fresh ingredients, authentic taste\n🚚 Free delivery in 30 mins\n\nOrder now: [Link]\nCall: [Number]",
      email: "Subject: 🍽️ Festival Special Menu - {productName} Now Available!\n\nDear Food Lover,\n\nCelebrate this festival with authentic flavors!\n\nOur special {productName} menu includes:\n• {benefit1}\n• {benefit2}\n• {benefit3}\n\nSpecial offer: {discount}% OFF\nStarting from: ₹{price}\n\nOrder online or book your table!",
      sms: "🍽️ Festival special {productName}! {discount}% OFF above ₹500. Order: [Link] Call: [Number]",
      adCopy: "Festival Special {productName} | Authentic Taste | {discount}% OFF | Free Delivery | Order Now!"
    },
    customization: {
      productName: "Thali",
      price: "299",
      discount: "20",
      features: ["Authentic Recipes", "Fresh Ingredients", "Home-style Cooking"],
      benefits: ["Traditional Taste", "Healthy & Nutritious", "Family Portions"]
    }
  },
  {
    id: "electronics-gadgets",
    name: "Electronics & Gadgets",
    category: "Electronics",
    icon: Smartphone,
    description: "Tech-savvy campaigns for electronics and gadget stores",
    targetAudience: ["tech-enthusiasts", "professionals", "students"],
    contentTypes: ["social-posts", "videos", "demos", "reviews"],
    platforms: ["youtube", "instagram", "facebook", "linkedin"],
    estimatedROI: 350,
    difficulty: "advanced",
    templates: {
      socialPost: "⚡ Tech Up Your Festival Celebrations! ⚡\n\nIntroducing the new {productName} - where technology meets tradition!\n\n🔥 Festival Launch Offer:\n💰 Starting at ₹{price}\n🎊 {discount}% OFF + Extended Warranty\n\n✓ {feature1}\n✓ {feature2}\n✓ {feature3}\n\n🚀 {benefit1}\n💯 {benefit2}\n\n#TechFestival #{productName} #Innovation #TechDeals",
      whatsapp: "⚡ NEW {productName} Launch!\n\nFestival Special:\n💰 ₹{price} (was ₹{originalPrice})\n🎁 {discount}% OFF + Free accessories\n⚡ Latest features, best performance\n\n🛒 Limited stock - Order now!\nCall: [Number]",
      email: "Subject: ⚡ NEW {productName} - Festival Launch Special!\n\nDear Tech Enthusiast,\n\nUpgrade your tech game this festival season!\n\nWhy choose {productName}:\n• {benefit1}\n• {benefit2}\n• {benefit3}\n\nLaunch offer: {discount}% OFF\nPrice: ₹{price}\nFree installation & setup included!",
      sms: "⚡ NEW {productName} launch! {discount}% OFF. ₹{price}. Limited stock. Buy: [Link]",
      adCopy: "NEW {productName} - Festival Launch | {discount}% OFF | Latest Technology | Free Installation | Buy Now!"
    },
    customization: {
      productName: "Smartphone",
      price: "15999",
      discount: "15",
      features: ["48MP Camera", "6GB RAM", "Fast Charging"],
      benefits: ["All-Day Battery Life", "Professional Photography", "Smooth Performance"]
    }
  },
  {
    id: "beauty-wellness",
    name: "Beauty & Wellness",
    category: "Beauty",
    icon: Palette,
    description: "Glowing campaigns for beauty and wellness brands",
    targetAudience: ["beauty-conscious", "women", "self-care-enthusiasts"],
    contentTypes: ["tutorials", "before-after", "stories", "reels"],
    platforms: ["instagram", "youtube", "pinterest", "tiktok"],
    estimatedROI: 390,
    difficulty: "intermediate",
    templates: {
      socialPost: "✨ Glow This Festival Season! ✨\n\nDiscover the magic of {productName} - your festival beauty secret!\n\n🌟 Festival Glow Package:\n💄 {feature1}\n💋 {feature2}\n✨ {feature3}\n\n💰 Special Price: ₹{price}\n🎁 {discount}% OFF + Free beauty consultation\n\n👑 {benefit1}\n💫 {benefit2}\n\n#FestivalGlow #{productName} #BeautySecret #GlowUp",
      whatsapp: "✨ Festival Beauty Special!\n\n{productName} package - ₹{price}\n{discount}% OFF + Free consultation\n\n🌟 Professional results at home\n💄 Complete beauty solution\n✨ Instant glow guaranteed\n\nBook now: [Link]",
      email: "Subject: ✨ Festival Glow Special - {productName} Collection!\n\nDear Beauty Queen,\n\nGet festival-ready with our exclusive {productName} collection!\n\nWhat you get:\n• {benefit1}\n• {benefit2}\n• {benefit3}\n\nSpecial festival price: ₹{price}\nSave {discount}% + Free beauty tips guide!",
      sms: "✨ Festival glow special! {productName} {discount}% OFF. ₹{price}. Free consultation. Book: [Link]",
      adCopy: "Festival Glow Special - {productName} Collection | {discount}% OFF | Professional Results | Book Now!"
    },
    customization: {
      productName: "Facial Kit",
      price: "899",
      discount: "25",
      features: ["Natural Ingredients", "All Skin Types", "Professional Formula"],
      benefits: ["Instant Glow", "Long-lasting Results", "Salon-like Experience"]
    }
  },
  {
    id: "fitness-health",
    name: "Fitness & Health",
    category: "Health",
    icon: Dumbbell,
    description: "Energizing campaigns for fitness and health products",
    targetAudience: ["fitness-enthusiasts", "health-conscious", "athletes"],
    contentTypes: ["workout-videos", "testimonials", "tips", "challenges"],
    platforms: ["instagram", "youtube", "fitness-apps"],
    estimatedROI: 340,
    difficulty: "intermediate",
    templates: {
      socialPost: "💪 Festival Fitness Challenge! 💪\n\nStay fit while you celebrate with {productName}!\n\n🏆 Festival Fitness Package:\n✓ {feature1}\n✓ {feature2}\n✓ {feature3}\n\n💯 Results guaranteed in 30 days!\n💰 Special price: ₹{price}\n🎁 {discount}% OFF + Free diet plan\n\n🔥 {benefit1}\n⚡ {benefit2}\n\n#FestivalFitness #{productName} #HealthyFestival #FitnessGoals",
      whatsapp: "💪 Festival Fitness Special!\n\n{productName} - ₹{price}\n{discount}% OFF + Free diet plan\n\n🏆 Proven results\n📱 Expert guidance\n💪 Stay fit during festivals\n\nJoin now: [Link]",
      email: "Subject: 💪 Festival Fitness Challenge - {productName} Special!\n\nDear Fitness Enthusiast,\n\nDon't let festivals derail your fitness goals!\n\nOur {productName} includes:\n• {benefit1}\n• {benefit2}\n• {benefit3}\n\nFestival offer: {discount}% OFF\nPrice: ₹{price}\nStart your transformation today!",
      sms: "💪 Festival fitness! {productName} {discount}% OFF. ₹{price}. Free diet plan. Join: [Link]",
      adCopy: "Festival Fitness Challenge - {productName} | {discount}% OFF | Proven Results | Free Diet Plan | Join Now!"
    },
    customization: {
      productName: "Home Workout Plan",
      price: "1999",
      discount: "30",
      features: ["Personalized Workouts", "Diet Plans", "Expert Support"],
      benefits: ["No Gym Required", "Flexible Timing", "Quick Results"]
    }
  }
];

interface ProductCampaignTemplatesProps {
  onTemplateSelect?: (template: ProductTemplate) => void;
}

export default function ProductCampaignTemplates({ onTemplateSelect }: ProductCampaignTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  const [customization, setCustomization] = useState<any>({});
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("socialPost");

  const handleTemplateSelect = (template: ProductTemplate) => {
    setSelectedTemplate(template);
    setCustomization(template.customization);
    onTemplateSelect?.(template);
  };

  const generateCustomizedContent = () => {
    if (!selectedTemplate) return;

    const template = selectedTemplate.templates[selectedContentType as keyof typeof selectedTemplate.templates];
    let content = template;

    // Replace placeholders with customization values
    Object.entries(customization).forEach(([key, value]) => {
      if (typeof value === 'string') {
        content = content.replace(new RegExp(`{${key}}`, 'g'), value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          content = content.replace(new RegExp(`{${key.slice(0, -1)}${index + 1}}`, 'g'), item);
        });
      }
    });

    // Replace business-specific placeholders
    content = content.replace(/\[Restaurant Name\]/g, customization.businessName || 'Your Business');
    content = content.replace(/\[Link\]/g, 'your-website.com');
    content = content.replace(/\[Number\]/g, '+91 98765 43210');

    setGeneratedContent(content);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Product Campaign Templates"
        subtitle="Industry-specific templates optimized for different product categories"
        icon={Package}
        gradient={true}
      />

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Browse Templates</TabsTrigger>
          <TabsTrigger value="customize">Customize Content</TabsTrigger>
          <TabsTrigger value="analytics">Performance Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Template Categories Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Fashion", "F&B", "Electronics", "Beauty", "Health", "Education", "Automotive", "Services"].map((category) => (
              <ModernCard key={category} variant="gradient" className="text-center p-4 cursor-pointer hover:scale-105 transition-all">
                <div className="text-2xl mb-2">
                  {category === "Fashion" && <Shirt className="w-8 h-8 mx-auto" />}
                  {category === "F&B" && <Utensils className="w-8 h-8 mx-auto" />}
                  {category === "Electronics" && <Smartphone className="w-8 h-8 mx-auto" />}
                  {category === "Beauty" && <Palette className="w-8 h-8 mx-auto" />}
                  {category === "Health" && <Dumbbell className="w-8 h-8 mx-auto" />}
                  {category === "Education" && <GraduationCap className="w-8 h-8 mx-auto" />}
                  {category === "Automotive" && <Car className="w-8 h-8 mx-auto" />}
                  {category === "Services" && <Home className="w-8 h-8 mx-auto" />}
                </div>
                <div className="font-medium text-sm">{category}</div>
              </ModernCard>
            ))}
          </div>

          {/* Product Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <ModernCard
                  key={template.id}
                  variant="elevated"
                  className="group hover:scale-105 transition-all cursor-pointer"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex gap-2">
                        <StatusBadge 
                          status={template.difficulty} 
                          variant={
                            template.difficulty === "beginner" ? "success" :
                            template.difficulty === "intermediate" ? "warning" : "error"
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                        <div className="font-bold text-green-600">{template.estimatedROI}%</div>
                        <div className="text-xs text-green-600">Est. ROI</div>
                      </div>
                      <div className="text-center p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                        <div className="font-bold text-purple-600">{template.contentTypes.length}</div>
                        <div className="text-xs text-purple-600">Content Types</div>
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <div className="text-sm font-medium mb-2">Target Audience:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.targetAudience.slice(0, 2).map((audience) => (
                          <Badge key={audience} variant="outline" className="text-xs">
                            {audience.replace('-', ' ')}
                          </Badge>
                        ))}
                        {template.targetAudience.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.targetAudience.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                      <div className="text-sm font-medium mb-2">Platforms:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.platforms.slice(0, 3).map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs capitalize">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <ActionButton 
                      size="sm" 
                      gradient 
                      className="w-full"
                      icon={Wand2}
                    >
                      Use Template
                    </ActionButton>
                  </CardContent>
                </ModernCard>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          {selectedTemplate ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customization Panel */}
              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Customize {selectedTemplate.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      value={customization.productName || ''}
                      onChange={(e) => setCustomization(prev => ({...prev, productName: e.target.value}))}
                      placeholder="Enter your product name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        value={customization.price || ''}
                        onChange={(e) => setCustomization(prev => ({...prev, price: e.target.value}))}
                        placeholder="999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        value={customization.discount || ''}
                        onChange={(e) => setCustomization(prev => ({...prev, discount: e.target.value}))}
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Key Features (3 max)</Label>
                    {[0, 1, 2].map((index) => (
                      <Input
                        key={index}
                        className="mt-2"
                        value={customization.features?.[index] || ''}
                        onChange={(e) => {
                          const newFeatures = [...(customization.features || [])];
                          newFeatures[index] = e.target.value;
                          setCustomization(prev => ({...prev, features: newFeatures}));
                        }}
                        placeholder={`Feature ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div>
                    <Label>Key Benefits (3 max)</Label>
                    {[0, 1, 2].map((index) => (
                      <Input
                        key={index}
                        className="mt-2"
                        value={customization.benefits?.[index] || ''}
                        onChange={(e) => {
                          const newBenefits = [...(customization.benefits || [])];
                          newBenefits[index] = e.target.value;
                          setCustomization(prev => ({...prev, benefits: newBenefits}));
                        }}
                        placeholder={`Benefit ${index + 1}`}
                      />
                    ))}
                  </div>

                  <div>
                    <Label>Content Type</Label>
                    <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="socialPost">Social Media Post</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Message</SelectItem>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="sms">SMS Message</SelectItem>
                        <SelectItem value="adCopy">Ad Copy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ActionButton 
                    className="w-full" 
                    gradient 
                    icon={Sparkles}
                    onClick={generateCustomizedContent}
                  >
                    Generate Content
                  </ActionButton>
                </CardContent>
              </ModernCard>

              {/* Preview Panel */}
              <ModernCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Content Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border">
                        <pre className="whitespace-pre-wrap text-sm font-mono">
                          {generatedContent}
                        </pre>
                      </div>
                      
                      <div className="flex gap-2">
                        <ActionButton 
                          size="sm" 
                          variant="secondary" 
                          icon={Copy}
                          onClick={() => navigator.clipboard.writeText(generatedContent)}
                        >
                          Copy
                        </ActionButton>
                        <ActionButton size="sm" variant="secondary" icon={Download}>
                          Download
                        </ActionButton>
                        <ActionButton size="sm" variant="secondary" icon={Share2}>
                          Share
                        </ActionButton>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Customize the template and click "Generate Content" to see your personalized content</p>
                    </div>
                  )}
                </CardContent>
              </ModernCard>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Select a Template First</h3>
              <p className="text-muted-foreground mb-6">
                Choose a product template from the browse section to start customizing
              </p>
              <ActionButton onClick={() => setSelectedTemplate(productTemplates[0])}>
                Browse Templates
              </ActionButton>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard
              title="Templates Used"
              value="2.4K"
              icon={Package}
              gradient="blue"
              trend={{ value: 18, direction: "up", period: "this month" }}
            />
            <MetricCard
              title="Avg. ROI"
              value="375%"
              icon={TrendingUp}
              gradient="green"
              trend={{ value: 12, direction: "up", period: "vs industry avg" }}
            />
            <MetricCard
              title="Success Rate"
              value="94%"
              icon={Target}
              gradient="purple"
              trend={{ value: 5, direction: "up", period: "this quarter" }}
            />
            <MetricCard
              title="User Satisfaction"
              value="4.8/5"
              icon={Star}
              gradient="orange"
              trend={{ value: 0.3, direction: "up", period: "user rating" }}
            />
          </div>

          {/* Top Performing Templates */}
          <ModernCard>
            <CardHeader>
              <CardTitle>Top Performing Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productTemplates.slice(0, 5).map((template, index) => {
                  const IconComponent = template.icon;
                  return (
                    <div key={template.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">{template.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{template.estimatedROI}%</div>
                        <div className="text-sm text-muted-foreground">ROI</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </ModernCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
