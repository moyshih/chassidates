import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditDateData {
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  description: string;
}

interface EditDateDialogProps {
  dateData: EditDateData & { id: string };
  onEditDate: (id: string, data: EditDateData) => void;
}

export function EditDateDialog({ dateData, onEditDate }: EditDateDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EditDateData>({
    title: dateData.title,
    hebrewDate: dateData.hebrewDate,
    gregorianDate: dateData.gregorianDate,
    category: dateData.category,
    description: dateData.description
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

    onEditDate(dateData.id, formData);
    setOpen(false);
    toast({
      title: "Date updated",
      description: "Your date has been updated successfully."
    });
  };

  const handleInputChange = (field: keyof EditDateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Date</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter date title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-gregorian-date">Date</Label>
            <Input
              id="edit-gregorian-date"
              type="date"
              value={formData.gregorianDate}
              onChange={(e) => handleInputChange("gregorianDate", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-hebrew-date">Hebrew Date (Optional)</Label>
            <Input
              id="edit-hebrew-date"
              value={formData.hebrewDate}
              onChange={(e) => handleInputChange("hebrewDate", e.target.value)}
              placeholder="e.g., ח' חנוכה"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select value={formData.category} onValueChange={(value: "personal" | "chassidic" | "community") => handleInputChange("category", value)}>
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
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Date</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}