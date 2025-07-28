import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Edit, Trash2, Plus, Bell } from "lucide-react";
import { getTexts, Language } from "@/lib/texts";
import { eventTypeConfig, DateInfo } from "@/types/eventTypes";
import { EditDateDialog } from "./EditDateDialog";
import { AddDateDialog } from "./AddDateDialog";

interface EnhancedDateInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  events: DateInfo[];
  language: Language;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onAddDate: (data: any) => void;
}

const categoryColors = {
  personal: "bg-primary text-primary-foreground",
  chassidic: "bg-accent text-accent-foreground", 
  community: "bg-secondary text-secondary-foreground"
};

export function EnhancedDateInfoDialog({ 
  open, 
  onOpenChange, 
  selectedDate, 
  events, 
  language,
  onEdit,
  onDelete,
  onAddDate
}: EnhancedDateInfoDialogProps) {
  const texts = getTexts(language);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "hebrew" ? "he-IL" : "en-US", {
      weekday: "long",
      year: "numeric", 
      month: "long",
      day: "numeric"
    });
  };

  const handleAddDateForDay = () => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      // Pre-fill the date in the add dialog
      onAddDate({
        title: "",
        hebrewDate: "",
        gregorianDate: dateString,
        category: "personal",
        eventType: "event",
        description: "",
        hasReminder: false,
        reminderDays: 7
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {selectedDate ? formatDate(selectedDate) : texts.clickDayToSeeEvents}
            </DialogTitle>
            {selectedDate && (
              <AddDateDialog 
                onAddDate={onAddDate}
                prefilledDate={selectedDate.toISOString().split('T')[0]}
              />
            )}
          </div>
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
              <p className="text-muted-foreground mb-4">
                {texts.noEventsForDay}
              </p>
              <AddDateDialog 
                onAddDate={onAddDate}
                prefilledDate={selectedDate.toISOString().split('T')[0]}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => {
                const EventIcon = eventTypeConfig[event.eventType].icon;
                return (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <EventIcon className="w-4 h-4 text-primary" />
                          <h3 className="font-medium">{event.title}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge className={categoryColors[event.category]} variant="secondary">
                            {texts[event.category]}
                          </Badge>
                          <Badge className={eventTypeConfig[event.eventType].color} variant="secondary">
                            {eventTypeConfig[event.eventType].label}
                          </Badge>
                        </div>
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          {event.hebrewDate && <span>{event.hebrewDate}</span>}
                          {event.hebrewDate && <span>•</span>}
                          <span>{new Date(event.gregorianDate).toLocaleDateString()}</span>
                          {event.hasReminder && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Bell className="w-3 h-3" />
                                <span>{event.reminderDays} days before</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          {event.category !== "chassidic" && (
                            <EditDateDialog
                              dateData={event}
                              onEditDate={onEdit}
                            />
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDelete(event.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}