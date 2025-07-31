import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Calendar, Users, BookOpen, HelpCircle, X, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignInButton } from "./SignInButton";
import { cn } from "@/lib/utils";

interface SidebarProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
  onSidebarToggle?: (open: boolean) => void;
  sidebarOpen?: boolean;
}

export function Sidebar({ settings, onSettingsChange, onSidebarToggle, sidebarOpen }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(sidebarOpen ?? true); // Use prop or default to true
  const navigate = useNavigate();
  const location = useLocation();

  // Sync with parent component
  useEffect(() => {
    if (onSidebarToggle) {
      onSidebarToggle(desktopOpen);
    }
  }, [desktopOpen, onSidebarToggle]);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: BookOpen, label: "Events", href: "/events" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: HelpCircle, label: "Help", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const renderMenu = () => (
    <>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300",
              "h-10 px-3",
              location.pathname === item.href && "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            )}
            onClick={() => {
              setMobileOpen(false);
              // setDesktopOpen(false);
              navigate(item.href);
            }}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}

      {/* Profile Section at Bottom - Only for Desktop */}
      <div className="p-4 border-t mt-auto hidden lg:block">
        <SignInButton />
      </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar - Hidden since we use bottom navigation on mobile */}
      {/* <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hidden border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              Chassidate
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {renderMenu()}
          </div>
        </SheetContent>
      </Sheet> */}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        {desktopOpen ? (
          <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl z-40">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chassidate</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDesktopOpen(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col h-full">
              {renderMenu()}
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            onClick={() => setDesktopOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
        )}
      </div>
    </>
  );
} 