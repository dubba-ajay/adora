import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-10 h-10 text-brand-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{description}</p>
            <p className="text-muted-foreground mb-8">
              This page is currently under development. Please continue the
              conversation to have me build out this section of the website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button>Request Page Development</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
