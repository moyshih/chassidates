import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EventType, eventTypeConfig } from "@/types/eventTypes";

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

interface AddEventDialogProps {
  onAddEvent: (date: DateData) => void;
  prefilledDate?: string;
  iconOnly?: boolean;
}

export function AddEventDialog({ onAddEvent: onAddEvent, prefilledDate, iconOnly = false }: AddEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<DateData>({
    title: "",
    hebrewDate: "",
    gregorianDate: prefilledDate || "",
    category: "personal",
    eventType: "event",
    description: "",
    hasReminder: false,
    reminderDays: 7
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.gregorianDate) {
      toast({
        title: "Missing information",
        description: "Please fill in the title and date.",
        variant: "destructive"
      });
      return;
    }

    onAddEvent(formData);
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

    toast({
      title: "Event added successfully",
      description: `${formData.title} has been added to your events.`
    });
  };

  const handleInputChange = (field: keyof DateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-5 h-5" />
          {!iconOnly && "Add Event"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Important Event</DialogTitle>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hebrewDate">Hebrew Date (Optional)</Label>
              <Input
                id="hebrewDate"
                value={formData.hebrewDate}
                onChange={(e) => handleInputChange("hebrewDate", e.target.value)}
                placeholder="e.g., יח אלול"
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value: any) => handleInputChange("category", value)}>
                <SelectTrigger>
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
                <SelectTrigger>
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
                  <SelectTrigger>
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Add Date
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}