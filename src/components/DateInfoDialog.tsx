import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { getTexts, Language } from "@/lib/texts";

interface DateInfo {
  id: string;
  title: string;
  category: "personal" | "chassidic" | "community";
  description: string;
  hebrewDate: string;
  gregorianDate: string;
}

interface DateInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  events: DateInfo[];
  language: Language;
}

const categoryColors = {
  personal: "bg-primary text-primary-foreground",
  chassidic: "bg-accent text-accent-foreground", 
  community: "bg-secondary text-secondary-foreground"
};

export function DateInfoDialog({ 
  open, 
  onOpenChange, 
  selectedDate, 
  events, 
  language 
}: DateInfoDialogProps) {
  const texts = getTexts(language);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "hebrew" ? "he-IL" : "en-US", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {selectedDate ? `${texts.eventsForDay} ${formatDate(selectedDate)}` : texts.clickDayToSeeEvents}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!selectedDate ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {texts.clickDayToSeeEvents}
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {texts.noEventsForDay}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge className={categoryColors[event.category]}>
                      {texts[event.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{event.hebrewDate}</span>
                    <span>•</span>
                    <span>{new Date(event.gregorianDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}