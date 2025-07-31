import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddEventForm } from "./AddEventForm";

export function DesktopAddEventButton() {
  return (
    <div className="hidden lg:flex justify-center mb-6">
      <AddEventForm
        trigger={
                     <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3">
             <Plus className="w-5 h-5 mr-2" />
             Add Event
           </Button>
        }
      />
    </div>
  );
} 