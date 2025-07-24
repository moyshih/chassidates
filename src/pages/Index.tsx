import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateCard } from "@/components/DateCard";
import { AddDateDialog } from "@/components/AddDateDialog";
import { ChassidDatesDialog } from "@/components/ChassidDatesDialog";
import { EditDateDialog } from "@/components/EditDateDialog";
import { SettingsDialog, SettingsState } from "@/components/SettingsDialog";
import { FilterBar } from "@/components/FilterBar";
import { CalendarView } from "@/components/CalendarView";
import { Star, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChassidDate } from "@/data/chassidicDates";
import { getTexts } from "@/lib/texts";

interface StoredDate {
  id: string;
  title: string;
  hebrewDate: string;
  gregorianDate: string;
  category: "personal" | "chassidic" | "community";
  description: string;
  dateObject: Date;
}

const Index = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsState>({
    calendarType: "gregorian",
    language: "english",
    isSignedIn: false
  });
  
  const texts = getTexts(settings.language);
  
  const [dates, setDates] = useState<StoredDate[]>([
    {
      id: "1",
      title: "Yahrzeit of the Baal Shem Tov",
      hebrewDate: "ו' סיון",
      gregorianDate: "2024-06-12",
      category: "chassidic",
      description: "Founder of Chassidism",
      dateObject: new Date("2024-06-12")
    },
    {
      id: "2", 
      title: "Rosh Hashanah",
      hebrewDate: "א' תשרי",
      gregorianDate: "2024-09-16",
      category: "chassidic",
      description: "Jewish New Year",
      dateObject: new Date("2024-09-16")
    },
    {
      id: "3",
      title: "Family Yahrzeit",
      hebrewDate: "כ' אדר",
      gregorianDate: "2024-03-01",
      category: "personal", 
      description: "In loving memory",
      dateObject: new Date("2024-03-01")
    }
  ]);
  
  const [activeFilter, setActiveFilter] = useState<"all" | "personal" | "chassidic" | "community">("all");

  const filteredDates = useMemo(() => {
    return dates.filter(date => activeFilter === "all" || date.category === activeFilter);
  }, [dates, activeFilter]);

  const upcomingDates = useMemo(() => {
    const now = new Date();
    return filteredDates
      .map(date => ({
        ...date,
        daysUntil: Math.ceil((date.dateObject.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      }))
      .sort((a, b) => Math.abs(a.daysUntil) - Math.abs(b.daysUntil))
      .slice(0, 6);
  }, [filteredDates]);

  const handleAddDate = (dateData: any) => {
    if (!settings.isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add dates to your collection.",
        variant: "destructive"
      });
      return;
    }
    
    const newDate: StoredDate = {
      id: Date.now().toString(),
      ...dateData,
      dateObject: new Date(dateData.gregorianDate)
    };
    setDates(prev => [...prev, newDate]);
  };

  const handleAddChassidDates = (chassidDates: ChassidDate[]) => {
    if (!settings.isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add dates to your collection.",
        variant: "destructive"
      });
      return;
    }

    const newDates: StoredDate[] = chassidDates.map(date => {
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
        description: date.description,
        dateObject: demoDate
      };
    });
    
    setDates(prev => [...prev, ...newDates]);
  };

  const handleRemoveChassidDates = (dateIds: string[]) => {
    setDates(prev => prev.filter(date => !dateIds.includes(date.id)));
  };

  const handleEditDate = (id: string, editedData: any) => {
    setDates(prev => prev.map(date => 
      date.id === id 
        ? { 
            ...date, 
            ...editedData,
            dateObject: new Date(editedData.gregorianDate)
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
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              {settings.language === "hebrew" ? "מנהל תאריכים חסידיים" : "Chassidic Dates Manager"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {settings.language === "hebrew" 
                ? "עקבו אחר תאריכים משמעותיים במסע הרוחני שלכם"
                : "Keep track of meaningful dates in your spiritual journey"
              }
            </p>
          </div>
          <SettingsDialog settings={settings} onSettingsChange={setSettings} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] lg:mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Add Date and Stats */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex gap-2">
                <AddDateDialog onAddDate={handleAddDate} />
                <ChassidDatesDialog 
                  onAddDates={handleAddChassidDates}
                  onRemoveDates={handleRemoveChassidDates}
                  existingDates={dates}
                  language={settings.language}
                />
              </div>
              
              <div className="flex gap-4">
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
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              dateCount={filteredDates.length}
            />

            {/* Upcoming Dates */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Dates</h2>
              {upcomingDates.length === 0 ? (
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
                  {upcomingDates.map((date) => (
                    <div key={date.id} className="space-y-2">
                      <DateCard
                        id={date.id}
                        title={date.title}
                        hebrewDate={date.hebrewDate}
                        gregorianDate={new Date(date.gregorianDate).toLocaleDateString()}
                        category={date.category}
                        description={date.description}
                        daysUntil={date.daysUntil}
                        onEdit={() => {}} // Disable card edit button
                        onDelete={handleDeleteDate}
                      />
                      {date.category === "personal" && (
                        <div className="flex justify-end">
                          <EditDateDialog
                            dateData={date}
                            onEditDate={handleEditDate}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CalendarView 
              dates={filteredDates.map(date => ({
                id: date.id,
                title: date.title,
                category: date.category,
                date: date.dateObject,
                description: date.description,
                hebrewDate: date.hebrewDate,
                gregorianDate: date.gregorianDate
              }))}
              language={settings.language}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
