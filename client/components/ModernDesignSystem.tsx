import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Zap,
  Star,
  Crown,
  Award,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

// Modern Gradient Card Component
interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "glass" | "elevated";
  gradient?: "blue" | "purple" | "green" | "orange" | "pink" | "indigo";
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  variant = "default",
  gradient = "blue",
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case "gradient":
        const gradientColors = {
          blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
          purple:
            "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
          green:
            "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
          orange:
            "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
          pink: "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
          indigo:
            "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
        };
        return `${gradientColors[gradient]} shadow-lg border-0`;
      case "glass":
        return "bg-white/60 backdrop-blur-md border border-white/20 shadow-xl";
      case "elevated":
        return "bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300";
      default:
        return "border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50";
    }
  };

  return <Card className={cn(getCardStyles(), className)}>{children}</Card>;
};

// Modern Metric Card with Icon
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
    period?: string;
  };
  gradient?: "blue" | "purple" | "green" | "orange" | "pink" | "indigo";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  gradient = "blue",
  className,
}) => {
  const gradientConfig = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      text: "text-blue-600",
      iconBg: "bg-blue-500",
      trendColor: "text-blue-600",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100",
      text: "text-purple-600",
      iconBg: "bg-purple-500",
      trendColor: "text-purple-600",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      text: "text-green-600",
      iconBg: "bg-green-500",
      trendColor: "text-green-600",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-orange-100",
      text: "text-orange-600",
      iconBg: "bg-orange-500",
      trendColor: "text-orange-600",
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-50 to-pink-100",
      text: "text-pink-600",
      iconBg: "bg-pink-500",
      trendColor: "text-pink-600",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      text: "text-indigo-600",
      iconBg: "bg-indigo-500",
      trendColor: "text-indigo-600",
    },
  };

  const config = gradientConfig[gradient];

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "";
    switch (trend.direction) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card
      className={cn(
        `relative overflow-hidden border-0 shadow-lg ${config.bg}`,
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${config.text}`}>{title}</p>
            <p
              className={`text-3xl font-bold ${config.text.replace("600", "900")}`}
            >
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={`h-12 w-12 ${config.iconBg} rounded-xl flex items-center justify-center`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trend.direction === "up"
                ? "+"
                : trend.direction === "down"
                  ? "-"
                  : ""}
              {Math.abs(trend.value)}%
            </span>
            {trend.period && (
              <span className="text-sm text-muted-foreground">
                {trend.period}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Modern Status Badge
interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = "neutral",
  size = "md",
  className,
}) => {
  const variants = {
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      className={cn(
        `border ${variants[variant]} ${sizes[size]} font-medium`,
        className,
      )}
    >
      {status}
    </Badge>
  );
};

// Modern Progress Ring
interface ProgressRingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = "md",
  strokeWidth = 4,
  className,
  children,
}) => {
  const sizes = {
    sm: { width: 60, height: 60 },
    md: { width: 80, height: 80 },
    lg: { width: 120, height: 120 },
  };

  const { width, height } = sizes[size];
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg width={width} height={height} className="transform -rotate-90">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-blue-500 transition-all duration-300"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

// Modern Avatar with Status
interface ModernAvatarProps {
  src?: string;
  name: string;
  status?: "online" | "offline" | "busy" | "away";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const ModernAvatar: React.FC<ModernAvatarProps> = ({
  src,
  name,
  status,
  size = "md",
  className,
}) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  const statusSizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-3 w-3",
    xl: "h-4 w-4",
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={`${sizes[size]} border-2 border-white shadow-md`}>
        <AvatarImage src={src} />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {status && (
        <div
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
};

// Modern Section Header
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  icon: Icon,
  actions,
  gradient = false,
  className,
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl"></div>
      )}
      <div className={cn("relative", gradient ? "p-8" : "")}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {Icon && <Icon className="h-8 w-8 text-blue-600" />}
              <h1
                className={cn(
                  "text-4xl font-bold",
                  gradient
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    : "text-foreground",
                )}
              >
                {title}
              </h1>
              {badge && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 px-4 py-2">
                  <Sparkles className="w-4 h-4" />
                  {badge}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Modern Action Button
interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  gradient?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  gradient = false,
  className,
  onClick,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    if (gradient) {
      return "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white";
    }

    switch (variant) {
      case "secondary":
        return "bg-gray-100 hover:bg-gray-200 text-gray-900";
      case "success":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <Button
      className={cn(getVariantStyles(), className)}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {children}
    </Button>
  );
};

// Modern Data Table Row
interface DataRowProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const DataRow: React.FC<DataRowProps> = ({
  children,
  className,
  hover = true,
  selected = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg transition-all duration-200",
        hover && "hover:shadow-md hover:scale-[1.02]",
        selected && "ring-2 ring-blue-500 bg-blue-50",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Modern Empty State
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <ActionButton onClick={action.onClick} gradient>
          {action.label}
        </ActionButton>
      )}
    </div>
  );
};

// Modern Loading State
interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className,
      )}
    >
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

// All components are already exported with their definitions
