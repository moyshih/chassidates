import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTexts, Language } from "@/lib/texts";
import { Calendar } from "lucide-react";
import { AddDateDialog } from "./AddDateDialog";
import { DateCard } from "./DateCard";

interface DateData {
  id: string;
  title: string;
  category: "personal" | "chassidic" | "community";
  date: Date;
  description?: string;
  hebrewDate?: string;
  gregorianDate?: string;
}

interface AllDatesViewProps {
  allDates: DateData[];
  activeFilter: "all" | "personal" | "chassidic" | "community";
  handleAddDate: (dateData: any) => void;
  handleEditDate: (id: string, editedData: any) => void;
  handleDeleteDate: (id: string) => void;
}

export function AllDatesView({ allDates, activeFilter, handleAddDate, handleEditDate, handleDeleteDate }: AllDatesViewProps) {
  const SortedDates = useMemo(() => {
    const now = new Date();
    return allDates
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [allDates]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Dates</h2>
        {allDates.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No dates found</h3>
              <p className="text-muted-foreground mb-4">
                {activeFilter === "all"
                  ? "Add your first important date to get started."
                  : `No ${activeFilter} dates found. Try a different filter or add a new date.`
                }
              </p>
              <AddDateDialog onAddDate={handleAddDate} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SortedDates.map((date) => (
              <div key={date.id} className="space-y-2">
                <DateCard
                  id={date.id}
                  title={date.title}
                  hebrewDate={date.hebrewDate}
                  gregorianDate={date.date}
                  category={date.category}
                  description={date.description}
                  daysUntil={Math.ceil((date.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  }
                  onEdit={handleEditDate} // Disable card edit button
                  onDelete={handleDeleteDate}
                />
              </div>
            ))}
          </div>
        )}
      </div>    </>
  );
}