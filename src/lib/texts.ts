export type Language = "english" | "hebrew";

export interface TextKeys {
  // App title and header
  appTitle: string;
  appSubtitle: string;
  
  // Navigation
  dashboard: string;
  calendar: string;
  
  // Buttons and actions
  addDate: string;
  addChassidDates: string;
  edit: string;
  delete: string;
  cancel: string;
  addSelected: string;
  clearFilter: string;
  
  // Filter and labels
  filter: string;
  totalDates: string;
  upcomingDates: string;
  noDatesFound: string;
  addFirstDate: string;
  
  // Calendar
  calendarView: string;
  clickDayToSeeEvents: string;
  eventsForDay: string;
  noEventsForDay: string;
  
  // Chassidic dates dialog
  selectChassidDates: string;
  chooseChassidDates: string;
  datesSelected: string;
  
  // Categories
  all: string;
  personal: string;
  chassidic: string;
  community: string;
  
  // Toast messages
  signInRequired: string;
  signInToAdd: string;
  datesAddedSuccess: string;
  datesRemovedSuccess: string;
  dateRemoved: string;
  dateRemovedDesc: string;
  noDatesSelectedTitle: string;
  noDatesSelectedDesc: string;
  
  // Days
  daysUntil: string;
  daysAgo: string;
  today: string;
  
  // Month names
  months: string[];
  
  // Day names
  dayNames: string[];
}

const englishTexts: TextKeys = {
  // App title and header
  appTitle: "Chassidic Dates Manager",
  appSubtitle: "Keep track of meaningful dates in your spiritual journey",
  
  // Navigation
  dashboard: "Dashboard",
  calendar: "Calendar",
  
  // Buttons and actions
  addDate: "Add Date",
  addChassidDates: "Add Chassidic Dates",
  edit: "Edit",
  delete: "Delete", 
  cancel: "Cancel",
  addSelected: "Add Selected",
  clearFilter: "Clear Filter",
  
  // Filter and labels
  filter: "Filter:",
  totalDates: "Total Dates",
  upcomingDates: "Upcoming Dates",
  noDatesFound: "No dates found",
  addFirstDate: "Add your first important date to get started.",
  
  // Calendar
  calendarView: "Calendar View",
  clickDayToSeeEvents: "Click on a day to see events",
  eventsForDay: "Events for",
  noEventsForDay: "No events for this day",
  
  // Chassidic dates dialog
  selectChassidDates: "Select Chassidic Dates",
  chooseChassidDates: "Choose from important Chassidic dates to add to your calendar:",
  datesSelected: "selected",
  
  // Categories
  all: "All",
  personal: "Personal",
  chassidic: "Chassidic",
  community: "Community",
  
  // Toast messages
  signInRequired: "Sign in required",
  signInToAdd: "Please sign in to add dates to your collection.",
  datesAddedSuccess: "Dates added successfully",
  datesRemovedSuccess: "Dates removed successfully",
  dateRemoved: "Date removed",
  dateRemovedDesc: "The date has been removed from your collection.",
  noDatesSelectedTitle: "No dates selected",
  noDatesSelectedDesc: "Please select at least one date to add.",
  
  // Days
  daysUntil: "days until",
  daysAgo: "days ago", 
  today: "Today",
  
  // Month names
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  
  // Day names
  dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};

const hebrewTexts: TextKeys = {
  // App title and header
  appTitle: "מנהל תאריכים חסידיים",
  appSubtitle: "עקבו אחר תאריכים משמעותיים במסע הרוחני שלכם",
  
  // Navigation
  dashboard: "לוח בקרה",
  calendar: "לוח שנה",
  
  // Buttons and actions
  addDate: "הוסף תאריך",
  addChassidDates: "הוסף תאריכים חסידיים",
  edit: "ערוך",
  delete: "מחק",
  cancel: "ביטול",
  addSelected: "הוסף נבחרים",
  clearFilter: "נקה מסנן",
  
  // Filter and labels
  filter: "מסנן:",
  totalDates: "סה״כ תאריכים",
  upcomingDates: "תאריכים קרובים",
  noDatesFound: "לא נמצאו תאריכים",
  addFirstDate: "הוסיפו את התאריך החשוב הראשון שלכם כדי להתחיל.",
  
  // Calendar
  calendarView: "תצוגת לוח שנה",
  clickDayToSeeEvents: "לחצו על יום כדי לראות אירועים",
  eventsForDay: "אירועים עבור",
  noEventsForDay: "אין אירועים ליום זה",
  
  // Chassidic dates dialog
  selectChassidDates: "בחרו תאריכים חסידיים",
  chooseChassidDates: "בחרו מתאריכים חסידיים חשובים להוספה ללוח השנה שלכם:",
  datesSelected: "נבחרו",
  
  // Categories
  all: "הכל",
  personal: "אישי",
  chassidic: "חסידי",
  community: "קהילתי",
  
  // Toast messages
  signInRequired: "נדרשת התחברות",
  signInToAdd: "אנא התחברו כדי להוסיף תאריכים לאוסף שלכם.",
  datesAddedSuccess: "התאריכים נוספו בהצלחה",
  datesRemovedSuccess: "התאריכים הוסרו בהצלחה",
  dateRemoved: "התאריך הוסר",
  dateRemovedDesc: "התאריך הוסר מהאוסף שלכם.",
  noDatesSelectedTitle: "לא נבחרו תאריכים",
  noDatesSelectedDesc: "אנא בחרו לפחות תאריך אחד להוספה.",
  
  // Days
  daysUntil: "ימים עד",
  daysAgo: "ימים עברו",
  today: "היום",
  
  // Month names
  months: [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ],
  
  // Day names
  dayNames: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"]
};

export const getTexts = (language: Language): TextKeys => {
  return language === "hebrew" ? hebrewTexts : englishTexts;
};