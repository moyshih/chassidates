import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateCard } from "@/components/DateCard";
import { AddDateDialog } from "@/components/AddDateDialog";
import { AddChassidicDatesDialog } from "@/components/ChassidDatesDialog";
import { SettingsDialog, SettingsState } from "@/components/SettingsDialog";
import { FilterBar } from "@/components/FilterBar";
import { CalendarView } from "@/components/CalendarView";
import { Star, Calendar, Clock, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ChassidDate } from "@/data/chassidicDates";
import { getTexts } from "@/lib/texts";
import { AllDatesView } from "@/components/AllDatesView";
import FilterTabs from "@/components/FilterTabs";
import { SignInButton } from "@/components/SignInButton";
import { DateInfo, EventType } from "@/types/eventTypes";

const Index = () => {
  const { toast } = useToast();
  const { user } = useAuth();
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

  const [dates, setDates] = useState<DateInfo[]>([
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

  const [activeFilter, setActiveFilter] = useState<"all" | "personal" | "chassidic" | "community">("all");

  const upcomingDates = useMemo(() => {
    const now = new Date();
    return dates
      .map(date => {
        const daysUntil = Math.ceil((date.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isMonthAway = daysUntil > 30;
        const hasPassed = daysUntil < 0;

        if (hasPassed) return null;
        if (isMonthAway) return null;

        return {
          ...date,
          daysUntil: daysUntil
        }
      })?.filter(Boolean) // Remove null values
      .sort((a, b) => Math.abs(a.daysUntil) - Math.abs(b.daysUntil))
      .slice(0, 10);
  }, [dates]);

  const filteredDates = useMemo(() => {
    return upcomingDates?.filter(date => activeFilter === "all" || date.category === activeFilter);
  }, [upcomingDates, activeFilter]);

  const handleAddDate = (dateData: any) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add dates to your collection.",
        variant: "destructive"
      });
      return;
    }

    const newDate: DateInfo = {
      id: Date.now().toString(),
      ...dateData,
      date: new Date(dateData.gregorianDate)
    };
    setDates(prev => [...prev, newDate]);
  };

  const handleAddChassidDates = (chassidDates: ChassidDate[]) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add dates to your collection.",
        variant: "destructive"
      });
      return;
    }

    const newDates: DateInfo[] = chassidDates.map(date => {
      // For demo purposes, using current year. In real app, would convert Hebrew to Gregorian properly
      const demoDate = new Date();
      demoDate.setMonth(Math.floor(Math.random() * 12));
      demoDate.setDate(Math.floor(Math.random() * 28) + 1);

      return {
        id: `chassid-${Date.now()}-${Math.random()}`,
        title: date.title,
        hebrewDate: date.hebrewDate,
        gregorianDate: demoDate.toISOString().split('T')[0],
        category: date.category,
        eventType: "event" as EventType,
        description: date.description,
        hasReminder: false,
        reminderDays: 7,
        date: demoDate
      };
    });

    setDates(prev => [...prev, ...newDates]);

    toast({
      title: texts.datesAddedSuccess,
      description: `Added ${newDates.length} chassidic dates to your collection.`
    });
  };

  const handleRemoveChassidDates = (dateIds: string[]) => {
    setDates(prev => prev.filter(date => !dateIds.includes(date.id)));

    toast({
      title: texts.datesRemovedSuccess,
      description: `Removed ${dateIds.length} chassidic dates from your collection.`
    });
  };

  const handleEditDate = (id: string, editedData: any) => {
    setDates(prev => prev.map(date =>
      date.id === id
        ? {
          ...date,
          ...editedData,
          date: new Date(editedData.gregorianDate)
        }
        : date
    ));
  };

  const handleDeleteDate = (id: string) => {
    setDates(prev => prev.filter(date => date.id !== id));
    toast({
      title: "Date removed",
      description: "The date has been removed from your collection."
    });
  };

  const isRtl = settings.language === "hebrew";

  return (
    <div className={`min-h-screen bg-gradient-background ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="text-center flex-1 min-w-0">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              {settings.language === "hebrew" ? "מנהל תאריכים חסידיים" : "Chassidic Dates Manager"}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {settings.language === "hebrew"
                ? "עקבו אחר תאריכים משמעותיים במסע הרוחני שלכם"
                : "Keep track of meaningful dates in your spiritual journey"
              }
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <SignInButton />
            <SettingsDialog settings={settings} onSettingsChange={setSettings} />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[700px] lg:mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="dates" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Dates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Add Date and Stats */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex gap-2">
                <AddDateDialog onAddDate={handleAddDate} />
                <AddChassidicDatesDialog
                  onAddDates={handleAddChassidDates}
                  onRemoveDates={handleRemoveChassidDates}
                  existingDates={dates}
                  language={settings.language}
                />
              </div>

              {/* <div className="flex gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Dates</p>
                        <p className="text-2xl font-bold">{dates.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div> */}
            </div>

            {/* Upcoming Dates */}

            <div>
              <Card className="glass-effect shadow-lg">
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    Upcoming Dates
                  </h3>
                </CardHeader>
                <CardContent>

                  {/* Filter Bar */}
                  <FilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    dates={upcomingDates}
                  />

                  {/* <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    dateCount={filteredDates.length}
                  />
 */}
                  {filteredDates.length === 0 ? (
                    <Card className="shadow-card">
                      <CardContent className="p-8 text-center">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          {activeFilter === "all"
                            ? "No upcoming dates in the next 30 days."
                            : `No ${activeFilter} dates in the next 30 days`
                          }
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {activeFilter === "all"
                            ? "Add a new date to get started."
                            : `Try a different filter or add a new date.`
                          }
                        </p>
                        <AddDateDialog onAddDate={handleAddDate} />
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {upcomingDates.map((date) => (
                        <div key={date.id} className="space-y-2">
                          <DateCard
                            id={date.id}
                            title={date.title}
                            hebrewDate={date.hebrewDate}
                            gregorianDate={date.date}
                            category={date.category}
                            description={date.description}
                            daysUntil={date.daysUntil}
                            onEdit={handleEditDate} // Disable card edit button
                            onDelete={handleDeleteDate}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CalendarView
              dates={dates}
              language={settings.language}
              onEdit={handleEditDate}
              onDelete={handleDeleteDate}
              onAddDate={handleAddDate}
            />
          </TabsContent>

          <TabsContent value="dates" className="space-y-6">
            <AllDatesView
              allDates={dates}
              activeFilter={activeFilter}
              handleAddDate={handleAddDate}
              handleEditDate={handleEditDate}
              handleDeleteDate={handleDeleteDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
};

export default Index;
