import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditEventData {
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  description: string;
}

interface EditEventDialogProps {
  eventData: any & { id: string };
  onEditEvent: (id: string, data: EditEventData) => void;
}

export function EditEventDialog({ eventData: eventData, onEditEvent: onEditEvent }: EditEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EditEventData>({
    title: eventData.title,
    hebrewDate: eventData.hebrewDate,
    gregorianDate: typeof eventData.gregorianDate === 'string' ? eventData.gregorianDate : new Date(eventData.gregorianDate).toISOString().split('T')[0],
    category: eventData.category,
    description: eventData.description || ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.gregorianDate) {
      toast({
        title: "Missing information",
        description: "Please fill in the title and date fields.",
        variant: "destructive"
      });
      return;
    }

    onEditEvent(eventData.id, formData);
    setOpen(false);
    toast({
      title: "Event updated",
      description: "Your event has been updated successfully."
    });
  };

  const handleInputChange = (field: keyof EditEventData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateInputChange = (field: keyof EditEventData, event: string) => {
    setFormData(prev => ({ ...prev, [field]: event }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
                 <Button
           size="sm"
           variant="ghost"
           className="h-8 w-8 p-0 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
         >
           <Edit className="w-4 h-4" />
         </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
                     <DialogTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
               <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
             </div>
             Edit Event
           </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
                         <Input
               id="edit-title"
               value={formData.title}
               onChange={(e) => handleInputChange("title", e.target.value)}
               placeholder="Enter event title"
               className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
             />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-gregorian-date">Date</Label>
                         <Input
               id="edit-gregorian-date"
               type="date"
               value={formData.gregorianDate}
               onChange={(e) => handleDateInputChange("gregorianDate", e.target.value)}
               className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
             />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hebrew-date">Hebrew Date (Optional)</Label>
                         <Input
               id="edit-hebrew-date"
               value={formData.hebrewDate}
               onChange={(e) => handleInputChange("hebrewDate", e.target.value)}
               placeholder="e.g., ח' חנוכה"
               className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
             />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
                         <Select value={formData.category} onValueChange={(value: "personal" | "chassidic" | "community") => handleInputChange("category", value)}>
               <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20">
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
            <Label htmlFor="edit-description">Description (Optional)</Label>
                         <Textarea
               id="edit-description"
               value={formData.description}
               onChange={(e) => handleInputChange("description", e.target.value)}
               placeholder="Enter description"
               rows={3}
               className="border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:ring-gray-500/20"
             />
          </div>

          <div className="flex justify-end gap-3 pt-4">
                         <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
               Cancel
             </Button>
             <Button type="submit" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300">
               Update Event
             </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}