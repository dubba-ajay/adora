import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  language: string;
  marketTier: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed" | "lost";
  source: string;
  score: number;
  lastContact: string;
  notes: string;
}

const mockLeads: Lead[] = [];

const leadStatuses = [
  { id: "new", name: "New", color: "bg-blue-500" },
  { id: "contacted", name: "Contacted", color: "bg-yellow-500" },
  { id: "qualified", name: "Qualified", color: "bg-orange-500" },
  { id: "proposal", name: "Proposal", color: "bg-purple-500" },
  { id: "closed", name: "Closed", color: "bg-green-500" },
  { id: "lost", name: "Lost", color: "bg-red-500" },
];

const campaignTemplates = [
  { id: "welcome", name: "Welcome Campaign", channels: ["WhatsApp", "Email"] },
  {
    id: "follow_up",
    name: "Follow-up Sequence",
    channels: ["WhatsApp", "Email", "SMS"],
  },
  { id: "nurture", name: "Lead Nurturing", channels: ["Email", "Ads"] },
  {
    id: "festival",
    name: "Festival Greetings",
    channels: ["WhatsApp", "Email"],
  },
];

export default function LeadManagement() {
  const { currentLanguage, selectedMarketTier } = useLanguage();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLanguage, setFilterLanguage] = useState("all");

  const oneClickCampaign = (leadId: number, campaignType: string) => {
    console.log(`Launching ${campaignType} campaign for lead ${leadId}`);
    // This would trigger automated campaign generation based on lead's language and preferences
  };

  const filteredLeads = mockLeads.filter((lead) => {
    if (filterStatus !== "all" && lead.status !== filterStatus) return false;
    if (filterLanguage !== "all" && lead.language !== filterLanguage)
      return false;
    return true;
  });

  const getLanguageName = (code: string) => {
    const langMap: Record<string, string> = {
      en: "English",
      hi: "हिंदी",
      te: "తెలుగు",
      gu: "ગુજરાતી",
      bn: "বাংলা",
      ta: "தமிழ்",
    };
    return langMap[code] || code;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Lead Management
            </h1>
            <p className="text-muted-foreground">
              Manage leads with regional context and 1-click campaign automation
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <Globe className="h-4 w-4" />
            {selectedMarketTier.name}
          </Badge>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">All Leads</TabsTrigger>
            <TabsTrigger value="campaigns">1-Click Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lead Database</CardTitle>
                    <CardDescription>
                      Manage leads with language preferences and regional
                      scoring
                    </CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Label>Filters:</Label>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
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
                  <Select
                    value={filterLanguage}
                    onValueChange={setFilterLanguage}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="te">తెలుగు</SelectItem>
                      <SelectItem value="gu">ગુજરાતી</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Market Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {lead.source}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getLanguageName(lead.language)}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.marketTier}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${leadStatuses.find((s) => s.id === lead.status)?.color}`}
                            />
                            {
                              leadStatuses.find((s) => s.id === lead.status)
                                ?.name
                            }
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">
                              {lead.score}
                            </div>
                            <div className="w-16 h-2 bg-muted rounded-full">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedLead(lead)}
                                >
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Lead Details - {lead.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete lead information and 1-click
                                    campaign options
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedLead && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Contact Information</Label>
                                        <div className="space-y-2 mt-2">
                                          <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {selectedLead.email}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {selectedLead.phone}
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Regional Information</Label>
                                        <div className="space-y-2 mt-2">
                                          <div>
                                            Language:{" "}
                                            {getLanguageName(
                                              selectedLead.language,
                                            )}
                                          </div>
                                          <div>
                                            Market Tier:{" "}
                                            {selectedLead.marketTier}
                                          </div>
                                          <div>
                                            Lead Score: {selectedLead.score}/100
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Label>Notes</Label>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {selectedLead.notes}
                                      </p>
                                    </div>

                                    <div>
                                      <Label>1-Click Campaigns</Label>
                                      <div className="grid grid-cols-2 gap-3 mt-2">
                                        {campaignTemplates.map((campaign) => (
                                          <Button
                                            key={campaign.id}
                                            variant="outline"
                                            onClick={() =>
                                              oneClickCampaign(
                                                selectedLead.id,
                                                campaign.id,
                                              )
                                            }
                                            className="justify-start gap-2"
                                          >
                                            <Zap className="h-4 w-4" />
                                            <div className="text-left">
                                              <div className="font-medium text-xs">
                                                {campaign.name}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                {campaign.channels.join(", ")}
                                              </div>
                                            </div>
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              onClick={() =>
                                oneClickCampaign(lead.id, "follow_up")
                              }
                              className="gap-1"
                            >
                              <Zap className="h-3 w-3" />
                              Quick Campaign
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {campaignTemplates.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      {campaign.name}
                    </CardTitle>
                    <CardDescription>
                      Instantly generate and send campaigns in lead's preferred
                      language
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Channels</Label>
                      <div className="flex gap-2 mt-2">
                        {campaign.channels.map((channel) => (
                          <Badge key={channel} variant="secondary">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Features</Label>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Auto-generated content in lead's language</li>
                        <li>• Regional business context</li>
                        <li>• Market tier appropriate messaging</li>
                        <li>• Cultural festival integration</li>
                      </ul>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => oneClickCampaign(0, campaign.id)}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Launch Campaign for All Qualified Leads
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Leads
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Start adding leads to see metrics
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0%</div>
                  <p className="text-xs text-muted-foreground">
                    Conversion rate will appear here
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Score
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Average score will appear here
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    1-Click Campaigns
                  </CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Campaign count will appear here
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leads by Language</CardTitle>
                  <CardDescription>
                    Distribution of leads across different regional languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { lang: "hi", name: "हिंदी", count: 0, percentage: 0 },
                      {
                        lang: "en",
                        name: "English",
                        count: 0,
                        percentage: 0,
                      },
                      {
                        lang: "te",
                        name: "తెలుగు",
                        count: 0,
                        percentage: 0,
                      },
                      {
                        lang: "gu",
                        name: "ગુજરાતી",
                        count: 0,
                        percentage: 0,
                      },
                      { lang: "ta", name: "தமிழ்", count: 0, percentage: 0 },
                    ].map((item) => (
                      <div
                        key={item.lang}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {item.lang.toUpperCase()}
                          </Badge>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Status Distribution</CardTitle>
                  <CardDescription>
                    Current status of all leads in the pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leadStatuses.map((status) => (
                      <div
                        key={status.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${status.color}`}
                          />
                          <span>{status.name}</span>
                        </div>
                        <span className="text-sm font-medium">0</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
