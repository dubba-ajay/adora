import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart3,
  MessageSquare,
  Megaphone,
  Calendar,
  Globe,
  Search,
  Menu,
  LogOut,
  Bell,
  ChevronLeft,
  Home,
  Zap,
  Share2,
  Mail,
  Users,
  Gift,
} from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Navigate to home page
    navigate("/");
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: Home,
      description: "Dashboard overview",
    },
    {
      href: "/dashboard/ai-content",
      label: "AI Content Studio",
      icon: Zap,
      description: "Generate regional content",
    },
    {
      href: "/dashboard/social-media",
      label: "Social Media",
      icon: Share2,
      description: "Automate social posts",
    },
    {
      href: "/dashboard/email-marketing",
      label: "Email Marketing",
      icon: Mail,
      description: "Email automation",
    },
    {
      href: "/dashboard/whatsapp",
      label: "WhatsApp Messages",
      icon: MessageSquare,
      description: "Send campaigns",
    },
    {
      href: "/dashboard/ads",
      label: "Google & Facebook Ads",
      icon: Megaphone,
      description: "Create ad campaigns",
    },

    {
      href: "/dashboard/analytics",
      label: "Advanced Analytics",
      icon: BarChart3,
      description: "Multi-channel insights",
    },
    {
      href: "/dashboard/lead-management",
      label: "Lead Management",
      icon: Users,
      description: "CRM with 1-click campaigns",
    },
    {
      href: "/dashboard/festivals",
      label: "Festival Campaigns",
      icon: Calendar,
      description: "Regional festival templates",
    },
    {
      href: "/dashboard/seo",
      label: "SEO Management",
      icon: Search,
      description: "Multi-language SEO",
    },
    {
      href: "/dashboard/referral-program",
      label: "Referral Program",
      icon: Gift,
      description: "Earn rewards",
    },
    {
      href: "/dashboard/business-profile",
      label: "Business Profile",
      icon: Globe,
      description: "Multi-language profile",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-orange-500 to-brand-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                Adora
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div
                      className={`text-xs ${
                        isActive(item.href)
                          ? "text-white/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button variant="outline" size="sm" className="w-full">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-foreground">
                    Ajju
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Business Owner
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
