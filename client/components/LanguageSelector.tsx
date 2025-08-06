import { Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/useLanguage";
import { SUPPORTED_LANGUAGES, MARKET_TIERS } from "@/lib/regionalLanguage";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const { currentLanguage, selectedMarketTier, setLanguage, setMarketTier } =
    useLanguage();

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentLanguage.nativeName}
            </span>
            <span className="sm:hidden">
              {currentLanguage.code.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {SUPPORTED_LANGUAGES.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                currentLanguage.code === language.code && "bg-accent",
              )}
            >
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">
                  {language.name}
                </span>
              </div>
              {currentLanguage.code === language.code && (
                <div className="h-2 w-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Market Tier Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">{selectedMarketTier.name}</span>
            <span className="sm:hidden">
              {selectedMarketTier.id.charAt(0).toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Select Target Market</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {MARKET_TIERS.map((tier) => (
            <DropdownMenuItem
              key={tier.id}
              onClick={() => setMarketTier(tier)}
              className={cn(
                "flex flex-col items-start cursor-pointer",
                selectedMarketTier.id === tier.id && "bg-accent",
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{tier.name}</span>
                {selectedMarketTier.id === tier.id && (
                  <div className="h-2 w-2 bg-primary rounded-full" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {tier.description}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {tier.cities.slice(0, 3).join(", ")}
                {tier.cities.length > 3 && ` +${tier.cities.length - 3} more`}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
