import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddEventForm } from "./AddEventForm";

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-24 right-10 z-50 lg:hidden">
      <AddEventForm
        trigger={
          <div className="relative">
            {/* Floating Action Button */}
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
            </Button>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-amber-300 opacity-30 animate-ping"></div>
          </div>
        }
      />
    </div>
  );
} 