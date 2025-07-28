import { Heart, Calendar, Skull, PartyPopper, Star } from "lucide-react";

export type EventType = "birthday" | "married" | "pass_away" | "event" | "other";

export const eventTypeConfig = {
  birthday: {
    label: "Birthday",
    icon: PartyPopper,
    color: "bg-green-500 text-white"
  },
  married: {
    label: "Anniversary",
    icon: Heart,
    color: "bg-pink-500 text-white"
  },
  pass_away: {
    label: "Yahrzeit",
    icon: Skull,
    color: "bg-gray-500 text-white"
  },
  event: {
    label: "Event",
    icon: Calendar,
    color: "bg-blue-500 text-white"
  },
  other: {
    label: "Other",
    icon: Star,
    color: "bg-purple-500 text-white"
  }
};

export interface DateInfo {
  id: string;
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  eventType: EventType;
  description: string;
  hasReminder: boolean;
  reminderDays: number;
  date: Date;
}