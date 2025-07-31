import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { EventsProvider } from "@/contexts/EventsContext";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import Index from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import EventsPage from "./pages/Events";
import CommunityPage from "./pages/Community";
import HelpPage from "./pages/Help";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <EventsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </EventsProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
