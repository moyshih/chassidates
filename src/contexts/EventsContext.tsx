import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DateInfo } from '@/types/eventTypes';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface EventsContextType {
  events: DateInfo[];
  addEvent: (eventData: any) => void;
  editEvent: (id: string, editedData: any) => void;
  deleteEvent: (id: string) => void;
  addChassidEvents: (chassidEvents: any[]) => void;
  removeChassidEvents: (eventIds: string[]) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<DateInfo[]>([
    {
      id: "1",
      title: "Yahrzeit of the Baal Shem Tov",
      hebrewDate: "ו' סיון",
      gregorianDate: "2024-06-12",
      category: "chassidic",
      eventType: "pass_away",
      description: "Founder of Chassidism",
      hasReminder: true,
      reminderDays: 7,
      date: new Date("2024-06-12")
    },
    {
      id: "2",
      title: "Rosh Hashanah",
      hebrewDate: "א' תשרי",
      gregorianDate: "2024-09-16",
      category: "chassidic",
      eventType: "event",
      description: "Jewish New Year",
      hasReminder: false,
      reminderDays: 7,
      date: new Date("2024-09-16")
    },
    {
      id: "3",
      title: "Family Anniversary",
      hebrewDate: "כ' אדר",
      gregorianDate: "2024-03-01",
      category: "personal",
      eventType: "married",
      description: "Wedding anniversary",
      hasReminder: true,
      reminderDays: 14,
      date: new Date("2024-03-01")
    }
  ]);

  const { toast } = useToast();
  const { user } = useAuth();

  const addEvent = (eventData: any) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add events to your collection.",
        variant: "destructive"
      });
      return;
    }

    const newEvent: DateInfo = {
      id: Date.now().toString(),
      ...eventData,
      date: new Date(eventData.gregorianDate)
    };
    setEvents(prev => [...prev, newEvent]);

    toast({
      title: "Event added successfully",
      description: `${eventData.title} has been added to your events.`
    });
  };

  const editEvent = (id: string, editedData: any) => {
    setEvents(prev => prev.map(event =>
      event.id === id
        ? {
          ...event,
          ...editedData,
          date: new Date(editedData.gregorianDate)
        }
        : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "Event removed",
      description: "The event has been removed from your collection."
    });
  };

  const addChassidEvents = (chassidEvents: any[]) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add events to your collection.",
        variant: "destructive"
      });
      return;
    }

    const newEvents: DateInfo[] = chassidEvents.map(event => {
      const demoDate = new Date();
      demoDate.setMonth(Math.floor(Math.random() * 12));
      demoDate.setDate(Math.floor(Math.random() * 28) + 1);

      return {
        id: `chassid-${Date.now()}-${Math.random()}`,
        title: event.title,
        hebrewDate: event.hebrewDate,
        gregorianDate: demoDate.toISOString().split('T')[0],
        category: event.category,
        eventType: "event",
        description: event.description,
        hasReminder: false,
        reminderDays: 7,
        date: demoDate
      };
    });

    setEvents(prev => [...prev, ...newEvents]);

    toast({
      title: "Events added successfully",
      description: `Added ${newEvents.length} chassidic events to your collection.`
    });
  };

  const removeChassidEvents = (eventIds: string[]) => {
    setEvents(prev => prev.filter(event => !eventIds.includes(event.id)));

    toast({
      title: "Events removed successfully",
      description: `Removed ${eventIds.length} chassidic events from your collection.`
    });
  };

  const value: EventsContextType = {
    events,
    addEvent,
    editEvent,
    deleteEvent,
    addChassidEvents,
    removeChassidEvents
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
} 