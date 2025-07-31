import { Button } from "@/components/ui/button";
import { Home, Calendar, BookOpen, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/", action: () => navigate("/") },
    { icon: Calendar, label: "Calendar", href: "/calendar", action: () => navigate("/calendar") },
    { icon: BookOpen, label: "Events", href: "/events", action: () => navigate("/events") },
    { icon: Settings, label: "Settings", href: "/settings", action: () => navigate("/settings") },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-600 shadow-lg lg:hidden" style={{ height: '80px' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1",
              "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
              "hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
              location.pathname === item.href && "text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
            )}
            onClick={item.action}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
} 