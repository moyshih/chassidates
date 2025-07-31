import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarView } from "@/components/CalendarView";
import { useEvents } from "@/contexts/EventsContext";
import { Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";

const CalendarPage = () => {
  const { events, editEvent, deleteEvent, addEvent } = useEvents();

  return (
    <Layout>
      {/* Calendar Content */}
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            Your Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView
            dates={events}
            language="english"
            onEdit={editEvent}
            onDelete={deleteEvent}
            onAddDate={addEvent}
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CalendarPage; 