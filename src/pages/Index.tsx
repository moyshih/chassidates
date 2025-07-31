import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EventCard } from "@/components/DateCard";
import { AddChassidicDatesDialog } from "@/components/ChassidDatesDialog";
import { SettingsState } from "@/components/SettingsDialog";
import { Calendar, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getTexts } from "@/lib/texts";
import FilterTabs from "@/components/FilterTabs";
import { useEvents } from "@/contexts/EventsContext";
import { DesktopAddEventButton } from "@/components/DesktopAddEventButton";
import { Layout } from "@/components/Layout";

const Index = () => {
  const { user } = useAuth();
  const { events, addEvent, editEvent, deleteEvent, addChassidEvents, removeChassidEvents } = useEvents();
  const [settings, setSettings] = useState<SettingsState>({
    calendarType: "gregorian",
    language: "english",
    isSignedIn: !!user
  });

  // Update settings when user authentication state changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      isSignedIn: !!user
    }));
  }, [user]);

  const texts = getTexts(settings.language);

  const [activeFilter, setActiveFilter] = useState<"all" | "personal" | "chassidic" | "community">("all");

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events
      .map(event => {
        const daysUntil = Math.ceil((event.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isMonthAway = daysUntil > 30;
        const hasPassed = daysUntil < 0;

        if (hasPassed) return null;
        if (isMonthAway) return null;

        return {
          ...event,
          daysUntil: daysUntil
        }
      })?.filter(Boolean) // Remove null values
      .sort((a, b) => Math.abs(a.daysUntil) - Math.abs(b.daysUntil))
      .slice(0, 10);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return upcomingEvents?.filter(event => activeFilter === "all" || event.category === activeFilter);
  }, [upcomingEvents, activeFilter]);

  const isRtl = settings.language === "hebrew";

  return (
    <Layout>
      {/* Main Content */}
        {/* <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/10 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <Sparkles className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ChassiDates
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep track of meaningful dates in your spiritual journey
            </p>
          </div>
        </div> */}

      {/* Desktop Add Event Button */}
      <DesktopAddEventButton />

      {/* Upcoming Events */}
      <div>
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
          <CardHeader className="pb-4">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700">
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              Upcoming Events
            </h3>
          </CardHeader>
          <CardContent>

            {/* Filter Bar */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              dates={upcomingEvents}
            />

            {filteredEvents.length === 0 ? (
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 shadow-lg rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700 w-fit mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
                    {activeFilter === "all"
                      ? "No upcoming dates in the next 30 days."
                      : `No ${activeFilter} dates in the next 30 days`
                    }
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {activeFilter === "all"
                      ? "Add a new date to get started."
                      : `Try a different filter or add a new date.`
                    }
                  </p>

                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((date) => (
                  <div key={date.id} className="space-y-2">
                    <EventCard
                      id={date.id}
                      title={date.title}
                      hebrewDate={date.hebrewDate}
                      gregorianDate={date.date}
                      category={date.category}
                      description={date.description}
                      daysUntil={date.daysUntil}
                      onEdit={editEvent} // Disable card edit button
                      onDelete={deleteEvent}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Index;
