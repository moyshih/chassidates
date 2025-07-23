import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeFilter: "all" | "personal" | "chassidic" | "community";
  onFilterChange: (filter: "all" | "personal" | "chassidic" | "community") => void;
  dateCount: number;
}

const filterLabels = {
  all: "All Dates",
  personal: "Personal",
  chassidic: "Chassidic", 
  community: "Community"
};

export function FilterBar({ activeFilter, onFilterChange, dateCount }: FilterBarProps) {
  const filters = Object.keys(filterLabels) as Array<keyof typeof filterLabels>;
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground shrink-0">Filter:</span>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter)}
              className={cn(
                "transition-all shrink-0",
                activeFilter === filter && "bg-gradient-primary text-primary-foreground shadow-elegant"
              )}
            >
              {filterLabels[filter]}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        {activeFilter !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange("all")}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Clear Filter</span>
          </Button>
        )}
        <Badge variant="secondary" className="text-sm shrink-0">
          {dateCount} date{dateCount !== 1 ? 's' : ''}
        </Badge>
      </div>
    </div>
  );
}