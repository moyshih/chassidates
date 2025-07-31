import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditEventDialog } from "./EditDateDialog";

interface EventCardProps {
  id: string;
  title: string;
  hebrewDate: string;
  gregorianDate: Date;
  category: "personal" | "chassidic" | "community";
  description?: string;
  daysUntil: number;
  onEdit: (id: string, editedData: any) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  personal: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
  chassidic: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700",
  community: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700"
};

const categoryLabels = {
  personal: "Personal",
  chassidic: "Chassidic",
  community: "Community"
};

export function EventCard({
  id,
  title,
  hebrewDate,
  gregorianDate,
  category,
  description,
  daysUntil,
  onEdit,
  onDelete
}: EventCardProps) {
  const isToday = daysUntil === 0;
  const isPast = daysUntil < 0;

  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl",
      isToday && "ring-2 ring-amber-300 dark:ring-amber-600 shadow-xl"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{gregorianDate.toLocaleDateString()}</span>
              {hebrewDate && (
                <>
                  <span>•</span>
                  <span className="font-hebrew">{hebrewDate}</span>
                </>
              )}
            </div>
          </div>
          <Badge className={categoryColors[category]} variant="secondary">
            {categoryLabels[category]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm">
            {isToday && (
              <span className="text-amber-600 dark:text-amber-400 font-medium">Today!</span>
            )}
            {daysUntil > 0 && (
              <span className="text-muted-foreground">
                In {daysUntil} day{daysUntil !== 1 ? 's' : ''}
              </span>
            )}
            {isPast && (
              <span className="text-muted-foreground">
                {Math.abs(daysUntil)} day{Math.abs(daysUntil) !== 1 ? 's' : ''} ago
              </span>
            )}
          </div>

          <div className="flex gap-1">
            {category !== "chassidic" && (
              <div className="flex justify-end">
                <EditEventDialog
                  eventData={{ id, title, hebrewDate, gregorianDate: gregorianDate.toISOString().split('T')[0], category, description }}
                  onEditEvent={onEdit}
                />
              </div>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}