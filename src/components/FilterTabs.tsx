import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Users, User, Calendar } from "lucide-react";
import { DateInfo } from "@/types/eventTypes";

interface FilterTabsProps {
  activeFilter: "all" | "personal" | "chassidic" | "community";
  onFilterChange: (filter: "all" | "personal" | "chassidic" | "community") => void;
  dates: DateInfo[];
}

export default function FilterTabs({ activeFilter, onFilterChange, dates }: FilterTabsProps) {
  const counts = {
    all: dates.length,
    personal: dates.filter(d => d.category === 'personal').length,
    chassidic: dates.filter(d => d.category === 'chassidic').length,
    community: dates.filter(d => d.category === 'community').length,
  };

  const tabs = [
    { value: "all", label: "All", icon: Calendar, count: counts.all },
    { value: "personal", label: "Personal", icon: User, count: counts.personal },
    { value: "chassidic", label: "Chassidic", icon: Star, count: counts.chassidic },
    { value: "community", label: "Community", icon: Users, count: counts.community },
  ];

  return (
    <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 border p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-sm transition-all duration-200"
          >
            <tab.icon className="w-4 h-4" />
            <span className="sm:inline">{tab.label}</span>
            <Badge variant="secondary" className="ml-1 text-xs bg-amber-600 data-[state=active]:bg-amber-50">
              {tab.count}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}