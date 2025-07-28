import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Moon, Sun, Monitor, Calendar, Languages, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export interface SettingsState {
  calendarType: "gregorian" | "hebrew";
  language: "english" | "hebrew";
  isSignedIn: boolean;
}

interface SettingsDialogProps {
  settings: SettingsState;
  onSettingsChange: (settings: SettingsState) => void;
}

export function SettingsDialog({ settings, onSettingsChange }: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleCalendarTypeChange = (value: "gregorian" | "hebrew") => {
    onSettingsChange({ ...settings, calendarType: value });
  };

  const handleLanguageChange = (value: "english" | "hebrew") => {
    onSettingsChange({ ...settings, language: value });
  };

  const handleSignInToggle = (checked: boolean) => {
    onSettingsChange({ ...settings, isSignedIn: checked });
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {getThemeIcon()}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Calendar & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calendar-type">Primary Calendar</Label>
                <Select value={settings.calendarType} onValueChange={handleCalendarTypeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gregorian">Gregorian Calendar</SelectItem>
                    <SelectItem value="hebrew">Hebrew Calendar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hebrew">עברית</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="signed-in" className="font-medium">
                    Sign In Status
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {settings.isSignedIn ? "You are signed in" : "Sign in to add dates"}
                  </p>
                </div>
                <Switch
                  id="signed-in"
                  checked={settings.isSignedIn}
                  onCheckedChange={handleSignInToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Us Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Need help or have suggestions? We'd love to hear from you!
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" asChild>
                  <a href="mailto:support@chassidicdates.com" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Support
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="https://discord.gg/chassidic-community" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Join Community
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>We typically respond within 24 hours.</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}