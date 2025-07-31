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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDialog({ settings, onSettingsChange, open: externalOpen, onOpenChange: externalOnOpenChange }: SettingsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;
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
                  <Button size="icon" variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
            <Settings className="w-4 h-4" />
          </Button>
       </DialogTrigger>

      <DialogContent className="">
                 <DialogHeader>
                       <DialogTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Settings
            </DialogTitle>
         </DialogHeader>

        <div className="space-y-6 pb-4">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
                             <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                 <div className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                   {getThemeIcon()}
                 </div>
                 Appearance
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                                 <Select value={theme} onValueChange={setTheme}>
                   <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20">
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
                             <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                 <div className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                   <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                 </div>
                 Calendar & Display
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calendar-type">Primary Calendar</Label>
                                 <Select value={settings.calendarType} onValueChange={handleCalendarTypeChange}>
                   <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20">
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
                   <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20">
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
                             <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                 <div className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                   <Languages className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                 </div>
                 Account
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                             <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                 <div className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                   <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                 </div>
                 Contact Us
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Need help or have suggestions? We'd love to hear from you!
              </p>
              <div className="flex flex-col gap-2">
                                 <Button variant="outline" className="justify-start w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" asChild>
                   <a href="mailto:support@chassidicdates.com?subject=Contact%20About%20chassidicdates%20Support" className="flex items-center gap-2">
                     <Mail className="w-4 h-4" />
                     Email Support
                     <ExternalLink className="w-3 h-3 ml-auto" />
                   </a>
                 </Button>
                 <Button variant="outline" className="justify-start w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" asChild>
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
             <Button onClick={() => setOpen(false)} className="w-full sm:w-auto bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
               Done
             </Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}