import React, { useState, useCallback, useMemo } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  UserPlus,
  Zap,
  Globe,
  Calendar,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Star,
  Clock,
  Target,
  Award,
  Eye,
  Edit3,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Settings,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Activity,
  DollarSign,
  Briefcase,
  MapPin,
  Smartphone,
  Building,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Heart,
  Share2,
  Copy,
  ExternalLink,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Camera,
  Mic,
  Video,
  Calendar as CalendarIcon,
  Clock3,
  Timer,
  Sparkles,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  source: "website" | "social_media" | "referral" | "advertising" | "cold_outreach" | "event";
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  priority: "low" | "medium" | "high" | "urgent";
  value: number;
  probability: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp?: string;
  notes: string[];
  tags: string[];
  location?: string;
  language: string;
  activities: Array<{
    id: string;
    type: "call" | "email" | "meeting" | "note" | "whatsapp" | "proposal";
    description: string;
    timestamp: string;
    outcome?: string;
  }>;
}

const leadSources = [
  { id: "website", name: "Website", icon: Globe, color: "bg-blue-500" },
  { id: "social_media", name: "Social Media", icon: Share2, color: "bg-purple-500" },
  { id: "referral", name: "Referral", icon: Users, color: "bg-green-500" },
  { id: "advertising", name: "Advertising", icon: Target, color: "bg-orange-500" },
  { id: "cold_outreach", name: "Cold Outreach", icon: Phone, color: "bg-red-500" },
  { id: "event", name: "Event", icon: Calendar, color: "bg-yellow-500" },
];

const leadStatuses = [
  { id: "new", name: "New Lead", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" },
  { id: "contacted", name: "Contacted", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" },
  { id: "qualified", name: "Qualified", color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50" },
  { id: "proposal", name: "Proposal Sent", color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50" },
  { id: "negotiation", name: "Negotiation", color: "bg-indigo-500", textColor: "text-indigo-700", bgColor: "bg-indigo-50" },
  { id: "won", name: "Won", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
  { id: "lost", name: "Lost", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
];

const priorityLevels = [
  { id: "low", name: "Low", color: "bg-gray-500", textColor: "text-gray-700", bgColor: "bg-gray-50" },
  { id: "medium", name: "Medium", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" },
  { id: "high", name: "High", color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50" },
  { id: "urgent", name: "Urgent", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
];

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    company: "Kumar Enterprises",
    position: "Owner",
    source: "website",
    status: "qualified",
    priority: "high",
    value: 50000,
    probability: 80,
    assignedTo: "You",
    createdAt: "2024-01-15",
    lastContact: "2024-01-20",
    nextFollowUp: "2024-01-25",
    notes: ["Interested in bulk order", "Needs delivery within 2 weeks"],
    tags: ["bulk-order", "urgent", "high-value"],
    location: "Delhi",
    language: "hi",
    activities: [
      {
        id: "1",
        type: "call",
        description: "Initial call - discussed requirements",
        timestamp: "2024-01-20 10:30",
        outcome: "positive"
      },
      {
        id: "2",
        type: "email",
        description: "Sent product catalog and pricing",
        timestamp: "2024-01-20 14:15"
      }
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "+91 87654 32109",
    company: "Sharma Beauty Salon",
    position: "Manager",
    source: "social_media",
    status: "new",
    priority: "medium",
    value: 25000,
    probability: 40,
    assignedTo: "You",
    createdAt: "2024-01-22",
    lastContact: "2024-01-22",
    notes: ["Found us on Instagram", "Looking for salon equipment"],
    tags: ["salon", "instagram-lead"],
    location: "Mumbai",
    language: "hi",
    activities: [
      {
        id: "3",
        type: "whatsapp",
        description: "Initial contact via WhatsApp",
        timestamp: "2024-01-22 16:45"
      }
    ]
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    phone: "+91 76543 21098",
    company: "Patel Restaurant",
    position: "Owner",
    source: "referral",
    status: "proposal",
    priority: "high",
    value: 75000,
    probability: 90,
    assignedTo: "You",
    createdAt: "2024-01-10",
    lastContact: "2024-01-21",
    nextFollowUp: "2024-01-24",
    notes: ["Referred by existing customer", "Wants complete kitchen setup"],
    tags: ["referral", "restaurant", "high-value"],
    location: "Ahmedabad",
    language: "gu",
    activities: [
      {
        id: "4",
        type: "meeting",
        description: "Site visit and requirement analysis",
        timestamp: "2024-01-18 11:00",
        outcome: "positive"
      },
      {
        id: "5",
        type: "proposal",
        description: "Sent detailed proposal with timeline",
        timestamp: "2024-01-21 09:30"
      }
    ]
  }
];

export default function LeadManagementModern() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  
  // State management
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid");
  
  // New lead form
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "website",
    priority: "medium",
    value: "",
    notes: "",
    location: "",
  });

  // Filtered and sorted leads
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);
      
      const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
      const matchesSource = filterSource === "all" || lead.source === filterSource;
      const matchesPriority = filterPriority === "all" || lead.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesSource && matchesPriority;
    });

    // Sort leads
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "value":
          aValue = a.value;
          bValue = b.value;
          break;
        case "probability":
          aValue = a.probability;
          bValue = b.probability;
          break;
        case "lastContact":
          aValue = new Date(a.lastContact);
          bValue = new Date(b.lastContact);
          break;
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [leads, searchQuery, filterStatus, filterSource, filterPriority, sortBy, sortOrder]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
    const avgValue = totalLeads > 0 ? totalValue / totalLeads : 0;
    const conversionRate = totalLeads > 0 ? (leads.filter(l => l.status === "won").length / totalLeads) * 100 : 0;
    const hotLeads = leads.filter(l => l.priority === "high" || l.priority === "urgent").length;
    const todayFollowUps = leads.filter(l => 
      l.nextFollowUp && new Date(l.nextFollowUp).toDateString() === new Date().toDateString()
    ).length;

    return {
      totalLeads,
      totalValue,
      avgValue,
      conversionRate,
      hotLeads,
      todayFollowUps,
    };
  }, [leads]);

  // Add new lead
  const handleAddLead = useCallback(() => {
    if (!newLead.name || !newLead.email || !newLead.phone) {
      alert("Please fill in required fields: Name, Email, Phone");
      return;
    }

    const lead: Lead = {
      id: Date.now(),
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      company: newLead.company,
      position: newLead.position,
      source: newLead.source as any,
      status: "new",
      priority: newLead.priority as any,
      value: parseInt(newLead.value) || 0,
      probability: 20,
      assignedTo: "You",
      createdAt: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
      notes: newLead.notes ? [newLead.notes] : [],
      tags: [],
      location: newLead.location,
      language: currentLanguage.code,
      activities: [{
        id: Date.now().toString(),
        type: "note",
        description: "Lead created",
        timestamp: new Date().toISOString()
      }]
    };

    setLeads(prev => [lead, ...prev]);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      source: "website",
      priority: "medium",
      value: "",
      notes: "",
      location: "",
    });
    setIsAddingLead(false);
  }, [newLead, currentLanguage.code]);

  // Update lead status
  const updateLeadStatus = useCallback((leadId: number, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: newStatus as any,
            lastContact: new Date().toISOString().split("T")[0],
            activities: [
              ...lead.activities,
              {
                id: Date.now().toString(),
                type: "note",
                description: `Status updated to ${newStatus}`,
                timestamp: new Date().toISOString()
              }
            ]
          }
        : lead
    ));
  }, []);

  // Add activity to lead
  const addActivity = useCallback((leadId: number, activity: any) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            activities: [...lead.activities, activity],
            lastContact: new Date().toISOString().split("T")[0]
          }
        : lead
    ));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Modern Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Lead Management CRM
                </h1>
                <p className="text-lg text-muted-foreground">
                  Manage your leads efficiently with AI-powered insights for {selectedMarketTier.name}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Globe className="h-4 w-4" />
                  {selectedMarketTier.name}
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 px-4 py-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="gap-2 px-4 py-2">
                  <Users className="w-4 h-4" />
                  {metrics.totalLeads} Leads
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Leads</p>
                  <p className="text-3xl font-bold text-blue-900">{metrics.totalLeads}</p>
                </div>
                <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Value</p>
                  <p className="text-3xl font-bold text-green-900">₹{(metrics.totalValue / 1000).toFixed(0)}K</p>
                </div>
                <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+25% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Avg Value</p>
                  <p className="text-3xl font-bold text-purple-900">₹{(metrics.avgValue / 1000).toFixed(0)}K</p>
                </div>
                <div className="h-12 w-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+8% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Conversion</p>
                  <p className="text-3xl font-bold text-orange-900">{metrics.conversionRate.toFixed(1)}%</p>
                </div>
                <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">+5% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Hot Leads</p>
                  <p className="text-3xl font-bold text-red-900">{metrics.hotLeads}</p>
                </div>
                <div className="h-12 w-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">Action needed</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Today's Follow-ups</p>
                  <p className="text-3xl font-bold text-indigo-900">{metrics.todayFollowUps}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Due today</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Filters & Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                {/* Status Filter */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {leadStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Source Filter */}
                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {leadSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Priority Filter */}
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    {priorityLevels.map((priority) => (
                      <SelectItem key={priority.id} value={priority.id}>
                        {priority.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "kanban" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                  >
                    <Activity className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Created Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="probability">Probability</SelectItem>
                    <SelectItem value="lastContact">Last Contact</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>

                {/* Add Lead Button */}
                <Button
                  onClick={() => setIsAddingLead(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Display */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLeads.map((lead) => {
              const statusConfig = leadStatuses.find(s => s.id === lead.status);
              const priorityConfig = priorityLevels.find(p => p.id === lead.priority);
              const sourceConfig = leadSources.find(s => s.id === lead.source);

              return (
                <Card key={lead.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                              {lead.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{lead.name}</h3>
                            {lead.company && (
                              <p className="text-sm text-muted-foreground">{lead.position} at {lead.company}</p>
                            )}
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="text-muted-foreground truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{lead.phone}</span>
                        </div>
                        {lead.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="text-muted-foreground">{lead.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Status & Priority */}
                      <div className="flex items-center gap-2">
                        <Badge className={`${statusConfig?.bgColor} ${statusConfig?.textColor} border-0`}>
                          {statusConfig?.name}
                        </Badge>
                        <Badge variant="outline" className={`${priorityConfig?.bgColor} ${priorityConfig?.textColor}`}>
                          {priorityConfig?.name}
                        </Badge>
                      </div>

                      {/* Value & Probability */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Value:</span>
                          <span className="font-semibold text-green-600">₹{lead.value.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Probability:</span>
                            <span className="text-sm font-semibold">{lead.probability}%</span>
                          </div>
                          <Progress value={lead.probability} className="h-2" />
                        </div>
                      </div>

                      {/* Source & Last Contact */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {sourceConfig && <sourceConfig.icon className="h-3 w-3" />}
                          <span>{sourceConfig?.name}</span>
                        </div>
                        <span>Last: {new Date(lead.lastContact).toLocaleDateString()}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                          <Send className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Add Lead Dialog */}
        <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Lead
              </DialogTitle>
              <DialogDescription>
                Enter the lead information to add them to your CRM system.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newLead.name}
                    onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newLead.email}
                    onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={newLead.phone}
                    onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Enter company name"
                    value={newLead.company}
                    onChange={(e) => setNewLead(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source</Label>
                  <Select value={newLead.source} onValueChange={(value) => setNewLead(prev => ({ ...prev, source: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leadSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newLead.priority} onValueChange={(value) => setNewLead(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.id} value={priority.id}>
                          {priority.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value (₹)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="Enter estimated value"
                    value={newLead.value}
                    onChange={(e) => setNewLead(prev => ({ ...prev, value: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Initial Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any initial notes about this lead..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleAddLead}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
                <Button variant="outline" onClick={() => setIsAddingLead(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lead Detail Dialog */}
        {selectedLead && (
          <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedLead.name}
                </DialogTitle>
                <DialogDescription>
                  Lead details and activity history
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Lead Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span>{selectedLead.phone}</span>
                      </div>
                      {selectedLead.company && (
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-purple-500" />
                          <span>{selectedLead.company}</span>
                        </div>
                      )}
                      {selectedLead.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{selectedLead.location}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Lead Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <Select 
                          value={selectedLead.status} 
                          onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {leadStatuses.map((status) => (
                              <SelectItem key={status.id} value={status.id}>
                                {status.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Value:</span>
                        <span className="font-semibold text-green-600">₹{selectedLead.value.toLocaleString()}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Probability:</span>
                          <span className="text-sm font-semibold">{selectedLead.probability}%</span>
                        </div>
                        <Progress value={selectedLead.probability} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedLead.activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {activity.type === "call" && <Phone className="h-4 w-4 text-blue-600" />}
                            {activity.type === "email" && <Mail className="h-4 w-4 text-blue-600" />}
                            {activity.type === "meeting" && <Calendar className="h-4 w-4 text-blue-600" />}
                            {activity.type === "whatsapp" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                            {activity.type === "note" && <FileText className="h-4 w-4 text-blue-600" />}
                            {activity.type === "proposal" && <Send className="h-4 w-4 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                            {activity.outcome && (
                              <Badge variant="outline" className="mt-2">
                                {activity.outcome}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Lead
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
