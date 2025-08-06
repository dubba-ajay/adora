import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Eye,
  Star,
  Target,
  Globe,
  Zap,
  BarChart3,
  RefreshCw,
  Download,
  Copy,
  ExternalLink,
  Clock,
  Users,
  MousePointer,
  Smartphone,
  Monitor,
  Gauge,
  Shield,
  FileText,
  Link,
  Image,
  Code,
  Settings,
  CheckCircle2,
  AlertTriangle,
  X,
  Crown,
  Award,
  Lightbulb,
  Map,
  Building,
  Phone,
  Calendar,
  Camera,
  MessageSquare,
  ThumbsUp,
  ArrowUp,
  ArrowDown,
  Hash,
  Languages,
} from "lucide-react";
import { getHashtags, SUPPORTED_LANGUAGES } from "@/lib/regionalLanguage";

interface SEOAnalysis {
  score: number;
  issues: {
    critical: number;
    warnings: number;
    passed: number;
  };
  metrics: {
    pageSpeed: number;
    mobileScore: number;
    accessibility: number;
    seo: number;
  };
}

interface KeywordData {
  keyword: string;
  language: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: "up" | "down" | "stable";
  position?: number;
}

interface LocalListing {
  name: string;
  status: "verified" | "pending" | "missing";
  category: string;
  authority: number;
}

const mockSEOAnalysis: SEOAnalysis = {
  score: 72,
  issues: {
    critical: 3,
    warnings: 8,
    passed: 24,
  },
  metrics: {
    pageSpeed: 68,
    mobileScore: 82,
    accessibility: 76,
    seo: 85,
  },
};

const mockKeywords: KeywordData[] = [];

const mockLocalListings: LocalListing[] = [];

const seoIssues = [
  {
    type: "critical",
    title: "Missing Meta Descriptions",
    count: 5,
    impact: "High SEO Impact",
  },
  {
    type: "critical",
    title: "Slow Page Load Speed",
    count: 3,
    impact: "User Experience",
  },
  {
    type: "critical",
    title: "Missing Alt Text",
    count: 12,
    impact: "Accessibility",
  },
  {
    type: "warning",
    title: "H1 Tag Issues",
    count: 2,
    impact: "Medium SEO Impact",
  },
  {
    type: "warning",
    title: "Internal Link Opportunities",
    count: 8,
    impact: "Link Building",
  },
  {
    type: "warning",
    title: "Image Optimization",
    count: 15,
    impact: "Page Speed",
  },
];

export default function SEO() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [website, setWebsite] = useState("");
  const [keyword, setKeyword] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Google My Business data
  const [gmbData, setGmbData] = useState({
    businessName: "",
    address: "",
    phone: "",
    hours: "",
    description: "",
    categories: [] as string[],
  });

  const analyzeWebsite = async () => {
    if (!website.trim()) return;

    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnalysisComplete(true);
    setIsAnalyzing(false);
  };

  const searchKeywords = async () => {
    if (!keyword.trim()) return;
    // Keyword research functionality would be implemented here
    console.log(
      `Researching keywords for: ${keyword} in ${currentLanguage.code}`,
    );
  };

  const optimizeForLanguage = (content: string) => {
    // This would integrate with translation services and regional SEO optimization
    return content;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getLanguageName = (code: string) => {
    const language = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
    return language ? language.nativeName : code;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              SEO Management
            </h1>
            <p className="text-muted-foreground">
              Multi-language SEO optimization for {selectedMarketTier.name}{" "}
              markets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <Languages className="h-4 w-4" />
              {currentLanguage.nativeName}
            </Badge>
            <Badge className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 text-white gap-2">
              <Search className="w-4 h-4" />
              SEO Ready
            </Badge>
          </div>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Site Analysis</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="local">Local SEO</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* SEO Score Dashboard */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overall SEO Score
                  </CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(mockSEOAnalysis.score)}`}
                  >
                    {analysisComplete ? mockSEOAnalysis.score : "--"}/100
                  </div>
                  {analysisComplete && (
                    <div className="mt-2">
                      <Progress value={mockSEOAnalysis.score} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {mockSEOAnalysis.score >= 80
                          ? "Excellent"
                          : mockSEOAnalysis.score >= 60
                            ? "Good"
                            : "Needs Work"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Page Speed
                  </CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(mockSEOAnalysis.metrics.pageSpeed)}`}
                  >
                    {analysisComplete
                      ? mockSEOAnalysis.metrics.pageSpeed
                      : "--"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Core Web Vitals
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Mobile Score
                  </CardTitle>
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(mockSEOAnalysis.metrics.mobileScore)}`}
                  >
                    {analysisComplete
                      ? mockSEOAnalysis.metrics.mobileScore
                      : "--"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mobile Optimization
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Local Rankings
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analysisComplete ? "8.5" : "--"}/10
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedMarketTier.name}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick SEO Analysis</CardTitle>
                <CardDescription>
                  Enter your website URL to get a comprehensive SEO audit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      placeholder="https://www.yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={analyzeWebsite}
                      disabled={!website.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Analyze Website
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {analysisComplete && (
                  <div className="grid gap-4 md:grid-cols-3 mt-6">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div>
                        <div className="font-semibold text-red-900">
                          {mockSEOAnalysis.issues.critical} Critical Issues
                        </div>
                        <div className="text-sm text-red-700">
                          Need immediate attention
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      <div>
                        <div className="font-semibold text-yellow-900">
                          {mockSEOAnalysis.issues.warnings} Warnings
                        </div>
                        <div className="text-sm text-yellow-700">
                          Optimization opportunities
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-900">
                          {mockSEOAnalysis.issues.passed} Passed
                        </div>
                        <div className="text-sm text-green-700">
                          Working correctly
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>SEO Issues Found</CardTitle>
                  <CardDescription>
                    Priority issues affecting your search rankings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seoIssues.slice(0, 4).map((issue, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {issue.type === "critical" ? (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          )}
                          <div>
                            <div className="font-medium">{issue.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {issue.impact}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              issue.type === "critical"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {issue.count} issues
                          </Badge>
                          <Button size="sm" variant="outline">
                            Fix Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Technical SEO Audit</CardTitle>
                  <CardDescription>
                    Comprehensive technical analysis of your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisComplete ? (
                    <div className="space-y-4">
                      {[
                        {
                          name: "Page Speed (Desktop)",
                          score: 68,
                          icon: Monitor,
                        },
                        {
                          name: "Page Speed (Mobile)",
                          score: 45,
                          icon: Smartphone,
                        },
                        { name: "Core Web Vitals", score: 72, icon: Gauge },
                        { name: "HTTPS Security", score: 100, icon: Shield },
                        {
                          name: "Mobile Responsiveness",
                          score: 89,
                          icon: Smartphone,
                        },
                        { name: "Structured Data", score: 34, icon: Code },
                      ].map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {metric.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${
                                    metric.score >= 80
                                      ? "bg-green-500"
                                      : metric.score >= 60
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${metric.score}%` }}
                                />
                              </div>
                              <span
                                className={`text-sm font-medium ${getScoreColor(metric.score)}`}
                              >
                                {metric.score}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Run website analysis to see technical audit results</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                  <CardDescription>
                    SEO content optimization for {currentLanguage.nativeName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisComplete ? (
                    <div className="space-y-4">
                      {[
                        { name: "Title Tags", status: "warning", count: 3 },
                        {
                          name: "Meta Descriptions",
                          status: "critical",
                          count: 8,
                        },
                        { name: "H1 Tags", status: "good", count: 0 },
                        { name: "Alt Text", status: "critical", count: 12 },
                        { name: "Internal Links", status: "warning", count: 5 },
                        { name: "Content Length", status: "good", count: 0 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {item.status === "good" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : item.status === "warning" ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.count > 0 && (
                              <Badge
                                variant={
                                  item.status === "critical"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {item.count} issues
                              </Badge>
                            )}
                            <Button size="sm" variant="outline">
                              {item.status === "good" ? "View" : "Fix"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Run website analysis to see content audit results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Research</CardTitle>
                  <CardDescription>
                    Find the best keywords for {currentLanguage.nativeName} and{" "}
                    {selectedMarketTier.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="keyword-search">Keyword or Topic</Label>
                      <Input
                        id="keyword-search"
                        placeholder={
                          currentLanguage.code === "hi"
                            ? "जैसे: सबसे अच्छा र���स्टोरेंट"
                            : currentLanguage.code === "te"
                              ? "ఉదా: మంచి రెస్టారెంట్"
                              : "e.g., best restaurant near me"
                        }
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location-search">Location</Label>
                      <Input
                        id="location-search"
                        placeholder={
                          currentLanguage.code === "hi"
                            ? "जैसे: दिल्ली, मुंबई"
                            : currentLanguage.code === "te"
                              ? "ఉదా: హైదరాబాద్, చెన్నై"
                              : "e.g., Delhi, Mumbai"
                        }
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={searchKeywords} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Research Keywords
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Hashtags</CardTitle>
                  <CardDescription>
                    Popular hashtags for {currentLanguage.nativeName} content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {getHashtags(currentLanguage.code).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Tags
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Keyword Performance</CardTitle>
                <CardDescription>
                  Track your keyword rankings across different languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>CPC</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockKeywords.map((kw, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {kw.keyword}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getLanguageName(kw.language)}
                          </Badge>
                        </TableCell>
                        <TableCell>{kw.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-full rounded-full ${
                                  kw.difficulty >= 70
                                    ? "bg-red-500"
                                    : kw.difficulty >= 40
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${kw.difficulty}%` }}
                              />
                            </div>
                            <span className="text-sm">{kw.difficulty}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{kw.cpc}</TableCell>
                        <TableCell>
                          {kw.position ? (
                            <Badge
                              variant={
                                kw.position <= 3
                                  ? "default"
                                  : kw.position <= 10
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              #{kw.position}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">
                              Not tracking
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {kw.trend === "up" ? (
                            <ArrowUp className="h-4 w-4 text-green-600" />
                          ) : kw.trend === "down" ? (
                            <ArrowDown className="h-4 w-4 text-red-600" />
                          ) : (
                            <div className="h-4 w-4 bg-gray-400 rounded-full" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="local" className="space-y-6">
            {/* Google My Business Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Google My Business Optimization
                </CardTitle>
                <CardDescription>
                  Optimize your Google Business Profile for local search in{" "}
                  {currentLanguage.nativeName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input
                      placeholder={
                        currentLanguage.code === "hi"
                          ? "आपका व्यापार नाम"
                          : currentLanguage.code === "te"
                            ? "మీ వ్యాపార పేరు"
                            : "Your business name"
                      }
                      value={gmbData.businessName}
                      onChange={(e) =>
                        setGmbData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={gmbData.phone}
                      onChange={(e) =>
                        setGmbData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <Input
                    placeholder={
                      currentLanguage.code === "hi"
                        ? "पूरा पता यहाँ ल���खें"
                        : currentLanguage.code === "te"
                          ? "పూర్తి చిరునామా రాయండి"
                          : "Complete business address"
                    }
                    value={gmbData.address}
                    onChange={(e) =>
                      setGmbData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Business Description ({currentLanguage.nativeName})
                  </Label>
                  <Textarea
                    placeholder={
                      currentLanguage.code === "hi"
                        ? "अपने व्यापार के बारे में बताएं..."
                        : currentLanguage.code === "te"
                          ? "మీ వ్యాపారం గురించి వివరించండి..."
                          : "Describe your business..."
                    }
                    value={gmbData.description}
                    onChange={(e) =>
                      setGmbData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className={currentLanguage.rtl ? "text-right" : ""}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <Input
                      placeholder="Mon-Sat: 9 AM - 8 PM"
                      value={gmbData.hours}
                      onChange={(e) =>
                        setGmbData((prev) => ({
                          ...prev,
                          hours: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={businessCategory}
                      onValueChange={setBusinessCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="salon">Hair Salon</SelectItem>
                        <SelectItem value="gym">Fitness Center</SelectItem>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="service">
                          Service Business
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Optimize Google My Business
                </Button>
              </CardContent>
            </Card>

            {/* Local Directory Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Local Directory Listings</CardTitle>
                <CardDescription>
                  Manage your presence across Indian business directories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockLocalListings.map((listing, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            listing.status === "verified"
                              ? "bg-green-500"
                              : listing.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{listing.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {listing.category}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            DA: {listing.authority}
                          </div>
                          <Badge
                            variant={
                              listing.status === "verified"
                                ? "default"
                                : listing.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          {listing.status === "missing" ? "Submit" : "Manage"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Review Management
                </CardTitle>
                <CardDescription>
                  Monitor and respond to customer reviews across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      4.6
                    </div>
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Rating
                    </div>
                    <div className="text-xs text-muted-foreground">
                      127 reviews
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">0%</div>
                    <div className="text-sm text-muted-foreground">
                      Response Rate
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Response time: 2h
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-muted-foreground">
                      New Reviews
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This week
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  {[
                    {
                      platform: "Google",
                      rating: 5,
                      text: "Excellent service! Highly recommended.",
                      time: "2 hours ago",
                      responded: false,
                    },
                    {
                      platform: "JustDial",
                      rating: 4,
                      text: "Good quality and fast delivery.",
                      time: "1 day ago",
                      responded: true,
                    },
                    {
                      platform: "Zomato",
                      rating: 5,
                      text: "Amazing food and great ambiance.",
                      time: "2 days ago",
                      responded: true,
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{review.platform}</Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.time}
                          </span>
                        </div>
                        <p className="text-sm">{review.text}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={review.responded ? "outline" : "default"}
                      >
                        {review.responded ? "View Response" : "Respond"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Site Performance</CardTitle>
                  <CardDescription>
                    Core Web Vitals and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Largest Contentful Paint",
                      value: "2.3s",
                      status: "warning",
                      description: "Loading performance",
                    },
                    {
                      name: "First Input Delay",
                      value: "0ms",
                      status: "good",
                      description: "Interactivity",
                    },
                    {
                      name: "Cumulative Layout Shift",
                      value: "0.08",
                      status: "warning",
                      description: "Visual stability",
                    },
                    {
                      name: "Time to First Byte",
                      value: "0ms",
                      status: "good",
                      description: "Server response",
                    },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm">{metric.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {metric.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {metric.value}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            metric.status === "good"
                              ? "bg-green-500"
                              : metric.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Accessibility</CardTitle>
                  <CardDescription>
                    Security and accessibility audit results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "HTTPS Enabled",
                      status: "good",
                      description: "SSL certificate active",
                    },
                    {
                      name: "Mixed Content",
                      status: "good",
                      description: "No insecure resources",
                    },
                    {
                      name: "Alt Text Coverage",
                      status: "critical",
                      description: "0% images missing alt text",
                    },
                    {
                      name: "Color Contrast",
                      status: "warning",
                      description: "3 contrast issues found",
                    },
                    {
                      name: "Keyboard Navigation",
                      status: "good",
                      description: "All elements accessible",
                    },
                    {
                      name: "Screen Reader Support",
                      status: "warning",
                      description: "Missing ARIA labels",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "good"
                            ? "bg-green-500"
                            : item.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Schema Markup */}
            <Card>
              <CardHeader>
                <CardTitle>Structured Data</CardTitle>
                <CardDescription>
                  Schema markup for better search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      type: "Local Business",
                      status: "missing",
                      description: "Business information schema",
                    },
                    {
                      type: "Opening Hours",
                      status: "present",
                      description: "Business hours markup",
                    },
                    {
                      type: "Reviews",
                      status: "missing",
                      description: "Customer reviews schema",
                    },
                    {
                      type: "Products",
                      status: "partial",
                      description: "Product information markup",
                    },
                    {
                      type: "FAQ",
                      status: "missing",
                      description: "Frequently asked questions",
                    },
                    {
                      type: "Breadcrumbs",
                      status: "present",
                      description: "Navigation breadcrumbs",
                    },
                  ].map((schema, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{schema.type}</div>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            schema.status === "present"
                              ? "bg-green-500"
                              : schema.status === "partial"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {schema.description}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        {schema.status === "missing"
                          ? "Add Schema"
                          : "View Details"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Reports</CardTitle>
                <CardDescription>
                  Download comprehensive SEO reports and track progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Weekly SEO Report",
                      description: "Complete SEO analysis with recommendations",
                      date: "Generated: Jan 15, 2024",
                      status: "ready",
                    },
                    {
                      title: "Keyword Rankings Report",
                      description:
                        "Track keyword positions across search engines",
                      date: "Generated: Jan 12, 2024",
                      status: "ready",
                    },
                    {
                      title: "Local SEO Performance",
                      description: "Local search visibility and GMB insights",
                      date: "Generating...",
                      status: "processing",
                    },
                    {
                      title: "Competitor Analysis",
                      description:
                        "Compare your SEO performance with competitors",
                      date: "Scheduled: Jan 20, 2024",
                      status: "scheduled",
                    },
                  ].map((report, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.description}
                          </div>
                        </div>
                        <Badge
                          variant={
                            report.status === "ready"
                              ? "default"
                              : report.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {report.date}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={report.status !== "ready"}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={report.status !== "ready"}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Custom Report Builder</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label>Report Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comprehensive">
                              Comprehensive SEO Audit
                            </SelectItem>
                            <SelectItem value="keywords">
                              Keyword Performance
                            </SelectItem>
                            <SelectItem value="local">
                              Local SEO Analysis
                            </SelectItem>
                            <SelectItem value="technical">
                              Technical SEO Report
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date Range</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="week">Last 7 days</SelectItem>
                            <SelectItem value="month">Last 30 days</SelectItem>
                            <SelectItem value="quarter">
                              Last 90 days
                            </SelectItem>
                            <SelectItem value="year">Last 12 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Format</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                            <SelectItem value="excel">
                              Excel Spreadsheet
                            </SelectItem>
                            <SelectItem value="csv">CSV Data</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Language</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Report language" />
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPORTED_LANGUAGES.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.nativeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
