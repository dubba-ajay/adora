import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Upload,
  Phone,
  Mail,
  Clock,
  MapPin,
  Camera,
  Eye,
  Edit,
  X,
  BarChart3,
} from "lucide-react";

export default function BusinessProfile() {
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    services: "",
  });

  // Load business data from localStorage on component mount
  useEffect(() => {
    const savedBusinessData = localStorage.getItem("businessProfile");
    if (savedBusinessData) {
      const parsedData = JSON.parse(savedBusinessData);
      setBusinessData(parsedData.businessData || parsedData);
      if (parsedData.logoImage) {
        setLogoImage(parsedData.logoImage);
      }
      if (parsedData.galleryImages) {
        setGalleryImages(parsedData.galleryImages);
      }
    }
  }, []);

  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file under 5MB");
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      alert("Some files were too large. Please select images under 5MB each.");
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGalleryImages((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProfile = () => {
    const profileData = {
      businessData,
      logoImage,
      galleryImages,
    };

    localStorage.setItem("businessProfile", JSON.stringify(profileData));
    alert("Business profile updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Business Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your business profile page
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Globe className="w-4 h-4 mr-1" />
              Live Profile
            </Badge>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-orange-500 to-brand-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
                      {logoImage ? (
                        <img
                          src={logoImage}
                          alt="Business Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {businessData.name?.charAt(0) || "B"}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </label>
                      </Button>
                      {logoImage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLogoImage(null)}
                          className="ml-2 text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {logoImage
                      ? "Logo uploaded successfully"
                      : "PNG, JPG up to 5MB"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    placeholder="Enter your business name"
                    value={businessData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Description</Label>
                  <Textarea
                    placeholder="Tell customers about your business..."
                    rows={4}
                    value={businessData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <Textarea
                    placeholder="Enter your full business address"
                    rows={3}
                    value={businessData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="Enter your phone number"
                      value={businessData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      placeholder="Enter your email address"
                      value={businessData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Website (optional)</Label>
                  <Input
                    placeholder="www.yourbusiness.com (optional)"
                    value={businessData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Working Hours</Label>
                  <Input
                    placeholder="e.g., Mon-Sat: 9 AM - 8 PM"
                    value={businessData.hours}
                    onChange={(e) => handleInputChange("hours", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services/Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    rows={4}
                    placeholder="List your main services or products..."
                    value={businessData.services}
                    onChange={(e) =>
                      handleInputChange("services", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Images</CardTitle>
              </CardHeader>
              <CardContent>
                {galleryImages.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                        id="gallery-upload"
                      />
                      <Button variant="outline" asChild>
                        <label
                          htmlFor="gallery-upload"
                          className="cursor-pointer"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Add More Images
                        </label>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                      id="gallery-upload-initial"
                    />
                    <Button variant="outline" asChild>
                      <label
                        htmlFor="gallery-upload-initial"
                        className="cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </label>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload business photos
                    </p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG up to 5MB each. Multiple files supported.
                </p>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleUpdateProfile}>
              <Edit className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>

          {/* Live Preview */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your profile URL: yourbusiness.adora.ai
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-brand-blue-500 to-brand-orange-500 rounded-lg text-white p-6 mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {logoImage ? (
                        <img
                          src={logoImage}
                          alt="Business Logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {businessData.name?.charAt(0) || "B"}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {businessData.name || "Business Name"}
                      </h2>
                      <p className="text-white/90 text-sm">
                        {businessData.description ||
                          "Business description will appear here..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone number</p>
                      <p className="text-sm text-muted-foreground">
                        {businessData.phone || "Enter phone number"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email address</p>
                      <p className="text-sm text-muted-foreground">
                        {businessData.email || "Enter email address"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Working hours</p>
                      <p className="text-sm text-muted-foreground">
                        {businessData.hours || "Enter working hours"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {businessData.address || "Enter business address"}
                      </p>
                    </div>
                  </div>

                  {businessData.website && (
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-sm text-muted-foreground">
                          {businessData.website}
                        </p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Gallery</h3>
                    {galleryImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {galleryImages.slice(0, 4).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                        {galleryImages.length > 4 && (
                          <div className="w-full h-20 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                            +{galleryImages.length - 4} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-muted/50 rounded-lg p-8 text-center text-muted-foreground">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Upload images to see gallery</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Performance */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Profile Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track how customers interact with your business profile once it's
              published
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-400">--</div>
                <div className="text-sm text-gray-500">Profile Views</div>
                <div className="text-xs text-gray-400 mt-1">
                  Publish profile to see data
                </div>
              </div>
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-400">--</div>
                <div className="text-sm text-gray-500">Contact Clicks</div>
                <div className="text-xs text-gray-400 mt-1">
                  Publish profile to see data
                </div>
              </div>
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-400">--</div>
                <div className="text-sm text-gray-500">Direction Requests</div>
                <div className="text-xs text-gray-400 mt-1">
                  Publish profile to see data
                </div>
              </div>
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-400">--</div>
                <div className="text-sm text-gray-500">Average Rating</div>
                <div className="text-xs text-gray-400 mt-1">
                  Publish profile to see data
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Complete your profile and publish it to start tracking
                performance metrics
              </p>
              <Button className="bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                <Globe className="w-4 h-4 mr-2" />
                Publish Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
