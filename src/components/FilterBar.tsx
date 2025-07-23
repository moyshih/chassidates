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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter)}
              className={cn(
                "transition-all",
                activeFilter === filter && "bg-gradient-primary text-primary-foreground shadow-elegant"
              )}
            >
              {filterLabels[filter]}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {activeFilter !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange("all")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filter
          </Button>
        )}
        <Badge variant="secondary" className="text-sm">
          {dateCount} date{dateCount !== 1 ? 's' : ''}
        </Badge>
      </div>
    </div>
  );
}