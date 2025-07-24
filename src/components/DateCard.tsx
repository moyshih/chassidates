import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditDateDialog } from "./EditDateDialog";

interface DateCardProps {
  id: string;
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  description?: string;
  daysUntil: number;
  onEdit: (id: string, editedData: any) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  personal: "bg-primary text-primary-foreground",
  chassidic: "bg-accent text-accent-foreground",
  community: "bg-secondary text-secondary-foreground"
};

const categoryLabels = {
  personal: "Personal",
  chassidic: "Chassidic",
  community: "Community"
};

export function DateCard({
  id,
  title,
  hebrewDate,
  gregorianDate,
  category,
  description,
  daysUntil,
  onEdit,
  onDelete
}: DateCardProps) {
  const isToday = daysUntil === 0;
  const isPast = daysUntil < 0;

  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-elegant",
      isToday && "ring-2 ring-accent shadow-elegant"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{gregorianDate}</span>
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
              <span className="text-accent font-medium">Today!</span>
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

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {category !== "chassidic" && (
              <div className="flex justify-end">
                <EditDateDialog
                  dateData={{ id, title, hebrewDate, gregorianDate, category, description }}
                  onEditDate={onEdit}
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