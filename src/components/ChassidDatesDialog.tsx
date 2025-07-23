import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Plus } from "lucide-react";
import { CHASSIDIC_DATES, ChassidDate } from "@/data/chassidicDates";
import { useToast } from "@/hooks/use-toast";

interface ChassidDatesDialogProps {
  onAddDates: (dates: ChassidDate[]) => void;
}

export function ChassidDatesDialog({ onAddDates }: ChassidDatesDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleDateToggle = (dateId: string) => {
    const newSelected = new Set(selectedDates);
    if (newSelected.has(dateId)) {
      newSelected.delete(dateId);
    } else {
      newSelected.add(dateId);
    }
    setSelectedDates(newSelected);
  };

  const handleAddSelected = () => {
    const datesToAdd = CHASSIDIC_DATES.filter(date => selectedDates.has(date.id));
    if (datesToAdd.length === 0) {
      toast({
        title: "No dates selected",
        description: "Please select at least one date to add.",
        variant: "destructive"
      });
      return;
    }

    onAddDates(datesToAdd);
    setSelectedDates(new Set());
    setOpen(false);
    
    toast({
      title: "Dates added successfully",
      description: `Added ${datesToAdd.length} chassidic date${datesToAdd.length > 1 ? 's' : ''} to your collection.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-accent hover:opacity-90">
          <BookOpen className="w-4 h-4 mr-2" />
          Add Chassidic Dates
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Select Chassidic Dates</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose from important Chassidic dates to add to your calendar:
          </p>
          
          <div className="space-y-3">
            {CHASSIDIC_DATES.map((date) => (
              <Card key={date.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={date.id}
                      checked={selectedDates.has(date.id)}
                      onCheckedChange={() => handleDateToggle(date.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <label 
                            htmlFor={date.id}
                            className="text-sm font-medium cursor-pointer block"
                          >
                            {date.title}
                          </label>
                          <p className="text-sm text-muted-foreground font-hebrew text-right" dir="rtl">
                            {date.hebrewTitle}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {date.hebrewDate}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {date.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedDates.size} date{selectedDates.size !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSelected} className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Add Selected ({selectedDates.size})
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}