import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEvents } from "@/contexts/EventsContext";
import { EventType, eventTypeConfig } from "@/types/eventTypes";
import { ReactNode } from "react";

interface DateData {
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  eventType: EventType;
  description: string;
  hasReminder: boolean;
  reminderDays: number;
}

interface AddEventFormProps {
  trigger: ReactNode;
  className?: string;
}

export function AddEventForm({ trigger, className = "" }: AddEventFormProps) {
  const { addEvent } = useEvents();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<DateData>({
    title: "",
    hebrewDate: "",
    gregorianDate: "",
    category: "personal",
    eventType: "event",
    description: "",
    hasReminder: false,
    reminderDays: 7
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.gregorianDate) {
      return;
    }

    addEvent(formData);
    setFormData({
      title: "",
      hebrewDate: "",
      gregorianDate: "",
      category: "personal",
      eventType: "event",
      description: "",
      hasReminder: false,
      reminderDays: 7
    });
    setOpen(false);
  };

  const handleInputChange = (field: keyof DateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-900 dark:text-gray-100">Add Important Event</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Name</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Yahrzeit of Rabbi Nachman"
                required
                className="border-amber-200 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gregorianDate">Gregorian Date</Label>
                <Input
                  id="gregorianDate"
                  type="date"
                  value={formData.gregorianDate}
                  onChange={(e) => handleInputChange("gregorianDate", e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hebrewDate">Hebrew Date (Optional)</Label>
                <Input
                  id="hebrewDate"
                  value={formData.hebrewDate}
                  onChange={(e) => handleInputChange("hebrewDate", e.target.value)}
                  placeholder="e.g., יח אלול"
                                     className="text-right border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: any) => handleInputChange("category", value)}>
                  <SelectTrigger className="border-amber-200 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="chassidic">Chassidic</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select value={formData.eventType} onValueChange={(value: EventType) => handleInputChange("eventType", value)}>
                  <SelectTrigger className="border-amber-200 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(eventTypeConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <config.icon className="w-4 h-4" />
                          {config.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add any additional notes or significance..."
                rows={3}
                className="border-amber-200 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20"
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reminder</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified before this date
                  </p>
                </div>
                <Switch
                  checked={formData.hasReminder}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasReminder: checked }))}
                />
              </div>

              {formData.hasReminder && (
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Remind me (days before)</Label>
                  <Select 
                    value={formData.reminderDays.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, reminderDays: parseInt(value) }))}
                  >
                    <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                      <SelectItem value="14">2 weeks before</SelectItem>
                      <SelectItem value="30">1 month before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                             <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                 Cancel
               </Button>
                              <Button type="submit" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
                 Add Date
               </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 