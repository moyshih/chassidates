import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNavigation } from "./BottomNavigation";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SettingsState } from "./SettingsDialog";
import { FloatingActionButton } from "./FloatingActionButton";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsState>({
    calendarType: "gregorian",
    language: "english",
    isSignedIn: !!user
  });
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  const location = useLocation();
  const navigate = useNavigate();

  // Update settings when user authentication state changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      isSignedIn: !!user
    }));
  }, [user]);

  return (
    <>
      <div className="min-h-screen bg-gradient-background w-full">

        <div className="lg:hidden flex items-center gap-2 p-4 bg-white/10 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="p-2 rounded-full bg-white/10 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-400" onClick={() => location.pathname !== "/" && navigate("/")} />
            {/* <Logo /> */}
          </div>
          {/* <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ChassiDates
              </h1>
            </div> */}
        </div>

        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'} container mx-auto px-4 py-4 flex flex-col gap-2 pb-20 lg:pb-4`}>
          {/* Header */}
          <div className="hidden lg:block flex items-center space-x-3">
            <Sidebar
              settings={settings}
              onSettingsChange={setSettings}
              onSidebarToggle={setSidebarOpen}
              sidebarOpen={sidebarOpen}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
            {children}
          </div>

          <div className="relative">
            <FloatingActionButton />
          </div>

        </div>

        {/* Bottom Navigation for Mobile */}
        <BottomNavigation />
      </div>
    </>
  );
} 