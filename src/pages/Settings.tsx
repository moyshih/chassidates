import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Globe, Calendar, Moon, Sun, Languages } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";

export interface SettingsState {
  calendarType: "gregorian" | "hebrew";
  language: "english" | "hebrew";
  isSignedIn: boolean;
}

const SettingsPage = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsState>({
    calendarType: "gregorian",
    language: "english",
    isSignedIn: !!user
  });

  // Update settings when user authentication state changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      isSignedIn: !!user
    }));
  }, [user]);

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Settings
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize your ChassiDates experience
            </p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-6">
          {/* Language Settings */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-700">
                  <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Language & Localization</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language and date format</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-700 dark:text-gray-300">
                  Language
                </Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingChange("language", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hebrew">עברית (Hebrew)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar Type */}
              <div className="space-y-2">
                <Label htmlFor="calendarType" className="text-gray-700 dark:text-gray-300">
                  Calendar Type
                </Label>
                <Select
                  value={settings.calendarType}
                  onValueChange={(value) => handleSettingChange("calendarType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select calendar type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gregorian">Gregorian (Western)</SelectItem>
                    <SelectItem value="hebrew">Hebrew (Jewish)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-700">
                  <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Account</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sign In Status */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-700 dark:text-gray-300">Sign In Status</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {settings.isSignedIn ? "Signed in" : "Not signed in"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.isSignedIn}
                    disabled
                    className="data-[state=checked]:bg-green-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {settings.isSignedIn ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>

              {/* User Info */}
              {settings.isSignedIn && user && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-700">
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Appearance</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customize the app's appearance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Theme settings are automatically managed based on your system preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage; 