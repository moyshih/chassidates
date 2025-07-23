import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DateData {
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  description: string;
}

interface AddDateDialogProps {
  onAddDate: (date: DateData) => void;
}

export function AddDateDialog({ onAddDate }: AddDateDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<DateData>({
    title: "",
    hebrewDate: "",
    gregorianDate: "",
    category: "personal",
    description: ""
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

    onAddDate(formData);
    setFormData({
      title: "",
      hebrewDate: "",
      gregorianDate: "",
      category: "personal",
      description: ""
    });
    setOpen(false);
    
    toast({
      title: "Date added successfully",
      description: `${formData.title} has been added to your dates.`
    });
  };

  const handleInputChange = (field: keyof DateData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Add Date
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Important Date</DialogTitle>
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

          <div className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Add any additional notes or significance..."
              rows={3}
            />
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