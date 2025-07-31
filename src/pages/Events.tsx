import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddChassidicDatesDialog } from "@/components/ChassidDatesDialog";
import { useEvents } from "@/contexts/EventsContext";
import { BookOpen, Calendar } from "lucide-react";
import { EventCard } from "@/components/DateCard";
import { Layout } from "@/components/Layout";
import { useMemo, useState } from "react";

  const EventsPage = () => {
    const [activeFilter, setActiveFilter] = useState<"all" | "personal" | "chassidic" | "community">("all");
    const { events, addEvent, editEvent, deleteEvent, addChassidEvents, removeChassidEvents } = useEvents();

    const SortedEvents = useMemo(() => {
      const now = new Date();
      return events
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [events]);

    return (
      <Layout>
        {/* Add Chassidic Dates Button */}
        <div className="mb-6">
          <AddChassidicDatesDialog
            onAddDates={addChassidEvents}
            onRemoveDates={removeChassidEvents}
            existingDates={events}
            language="english"
          />
        </div>

        {/* Chassidic Dates Content */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Your Events ({events.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-8">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-fit mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
                  No Chassidic dates added yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add some Chassidic dates to get started
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <EventCard
                      id={event.id}
                      title={event.title}
                      hebrewDate={event.hebrewDate}
                      gregorianDate={event.date}
                      category={event.category}
                      description={event.description}
                      daysUntil={Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                      }
                      onEdit={editEvent} // Disable card edit button
                      onDelete={deleteEvent}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Layout>
    );
  };

  export default EventsPage; 