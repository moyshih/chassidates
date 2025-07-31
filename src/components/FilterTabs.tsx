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
      <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
        {tabs.map((tab) => (
                     <TabsTrigger
             key={tab.value}
             value={tab.value}
             className="flex items-center gap-2 data-[state=active]:bg-amber-50 dark:data-[state=active]:bg-amber-950/30 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300 data-[state=active]:border-amber-200 dark:data-[state=active]:border-amber-700 rounded-lg transition-all duration-300"
           >
             <tab.icon className="w-4 h-4" />
             <span className="sm:inline">{tab.label}</span>
             <Badge variant="secondary" className="ml-1 text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 data-[state=active]:bg-amber-200 dark:data-[state=active]:bg-amber-800 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-200">
               {tab.count}
             </Badge>
           </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}