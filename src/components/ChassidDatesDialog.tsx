import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Plus, Minus } from "lucide-react";
import { CHASSIDIC_DATES, ChassidDate } from "@/data/chassidicDates";
import { useToast } from "@/hooks/use-toast";
import { getTexts, Language } from "@/lib/texts";

interface StoredDate {
  id: string;
  title: string;
  category: "personal" | "chassidic" | "community";
}

interface ChassidDatesDialogProps {
  onAddDates: (dates: ChassidDate[]) => void;
  onRemoveDates: (dateIds: string[]) => void;
  existingDates: StoredDate[];
  language: Language;
}

export function ChassidDatesDialog({ 
  onAddDates, 
  onRemoveDates, 
  existingDates, 
  language 
}: ChassidDatesDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const texts = getTexts(language);

  // Sync selection with existing dates in the app
  useEffect(() => {
    const existingChassidicDates = existingDates
      .filter(date => date.category === "chassidic")
      .map(date => {
        // Find matching chassidic date by title
        const chassidDate = CHASSIDIC_DATES.find(cd => cd.title === date.title);
        return chassidDate?.id;
      })
      .filter(Boolean) as string[];
    
    setSelectedDates(new Set(existingChassidicDates));
  }, [existingDates, open]);

  const handleDateToggle = (dateId: string) => {
    const newSelected = new Set(selectedDates);
    if (newSelected.has(dateId)) {
      newSelected.delete(dateId);
    } else {
      newSelected.add(dateId);
    }
    setSelectedDates(newSelected);
  };

  const handleApplyChanges = () => {
    // Get current existing chassidic date IDs
    const currentChassidicIds = new Set(
      existingDates
        .filter(date => date.category === "chassidic")
        .map(date => {
          const chassidDate = CHASSIDIC_DATES.find(cd => cd.title === date.title);
          return chassidDate?.id;
        })
        .filter(Boolean) as string[]
    );

    // Find dates to add (selected but not existing)
    const datesToAdd = CHASSIDIC_DATES.filter(date => 
      selectedDates.has(date.id) && !currentChassidicIds.has(date.id)
    );

    // Find dates to remove (existing but not selected)
    const dateIdsToRemove = existingDates
      .filter(date => {
        if (date.category !== "chassidic") return false;
        const chassidDate = CHASSIDIC_DATES.find(cd => cd.title === date.title);
        return chassidDate && !selectedDates.has(chassidDate.id);
      })
      .map(date => date.id);

    // Apply changes
    if (datesToAdd.length > 0) {
      onAddDates(datesToAdd);
    }
    if (dateIdsToRemove.length > 0) {
      onRemoveDates(dateIdsToRemove);
    }

    setOpen(false);
    
    if (datesToAdd.length > 0 || dateIdsToRemove.length > 0) {
      toast({
        title: texts.datesAddedSuccess,
        description: `Updated ${datesToAdd.length + dateIdsToRemove.length} chassidic dates in your collection.`
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-accent hover:opacity-90">
          <BookOpen className="w-4 h-4 mr-2" />
          {texts.addChassidDates}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{texts.selectChassidDates}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {texts.chooseChassidDates}
          </p>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {CHASSIDIC_DATES.map((date) => (
              <div key={date.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={date.id}
                  checked={selectedDates.has(date.id)}
                  onCheckedChange={() => handleDateToggle(date.id)}
                />
                <label 
                  htmlFor={date.id}
                  className="flex-1 text-sm font-medium cursor-pointer"
                >
                  {date.title}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedDates.size} {texts.datesSelected}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                {texts.cancel}
              </Button>
              <Button onClick={handleApplyChanges} className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                {texts.addSelected} ({selectedDates.size})
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}