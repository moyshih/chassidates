import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { DateInfoDialog } from "./DateInfoDialog";
import { getTexts, Language } from "@/lib/texts";

interface CalendarDate {
  id: string;
  title: string;
  category: "personal" | "chassidic" | "community";
  date: Date;
  description?: string;
  hebrewDate?: string;
  gregorianDate?: string;
}

interface CalendarViewProps {
  dates: CalendarDate[];
  language: Language;
}

const categoryColors = {
  personal: "bg-primary text-primary-foreground",
  chassidic: "bg-accent text-accent-foreground",
  community: "bg-secondary text-secondary-foreground"
};

export function CalendarView({ dates, language }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDateInfo, setShowDateInfo] = useState(false);
  const texts = getTexts(language);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const weeks = [];
  const currentWeekDate = new Date(startDate);

  while (currentWeekDate <= lastDayOfMonth || currentWeekDate.getDay() !== 0) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentWeekDate));
      currentWeekDate.setDate(currentWeekDate.getDate() + 1);
    }
    weeks.push(week);
    if (currentWeekDate.getDay() === 0 && currentWeekDate > lastDayOfMonth) break;
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getDatesForDay = (date: Date) => {
    return dates.filter(d => {
      const dateString = date.toDateString();
      const eventDateString = new Date(d.date).toDateString();
      return dateString === eventDateString;
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowDateInfo(true);
  };

  const getSelectedDayEvents = () => {
    if (!selectedDate) return [];
    return getDatesForDay(selectedDate).map(date => ({
      id: date.id,
      title: date.title,
      category: date.category,
      description: date.description || "",
      hebrewDate: date.hebrewDate || "",
      gregorianDate: date.gregorianDate || date.date.toISOString().split('T')[0]
    }));
  };

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {/* {texts.calendarView} */}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold min-w-[140px] text-center">
                {texts.months[month]} {year}
              </h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                {texts.today}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {texts.dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weeks.map((week, weekIndex) =>
              week.map((date, dayIndex) => {
                const isCurrentMonth = date.getMonth() === month;
                const isToday = date.toDateString() === new Date().toDateString();
                const dayDates = getDatesForDay(date);

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => handleDayClick(date)}
                    className={`
                    min-h-[80px] p-1 border border-border rounded-md cursor-pointer
                    ${isCurrentMonth ? 'bg-background' : 'bg-muted/30'}
                    ${isToday ? 'ring-2 ring-accent shadow-card' : ''}
                    transition-all hover:bg-muted/50 hover:shadow-md
                  `}
                  >
                    <div className={`
                    text-sm font-medium mb-1
                    ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                    ${isToday ? 'text-accent font-bold' : ''}
                  `}>
                      {date.getDate()}
                    </div>

                    <div className="space-y-1">
                      {dayDates.slice(0, 2).map(event => (
                        <Badge
                          key={event.id}
                          className={`${categoryColors[event.category]} text-xs px-1 py-0 block truncate`}
                          title={event.title}
                        >
                          {event.title}
                        </Badge>
                      ))}
                      {dayDates.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayDates.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <DateInfoDialog
        open={showDateInfo}
        onOpenChange={setShowDateInfo}
        selectedDate={selectedDate}
        events={getSelectedDayEvents()}
        language={language}
      />
    </>
  );
}