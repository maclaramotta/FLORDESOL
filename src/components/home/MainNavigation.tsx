
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar, User, Heart, MessageSquare } from "lucide-react";

interface MainNavigationProps {
  className?: string;
  vertical?: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ className, vertical = false }) => {
  const navItems = [
    { icon: <Calendar className="h-4 w-4" />, label: "Agendar Sessão", path: "/appointments" },
    { icon: <User className="h-4 w-4" />, label: "Perfil", path: "/clients" },
    { icon: <Heart className="h-4 w-4" />, label: "Cuidados", path: "/features/security" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Chat / Suporte", path: "/support" },
  ];

  return (
    <nav className={cn(
      "flex items-center justify-center gap-6",
      vertical && "flex-col",
      className
    )}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="flex items-center gap-2 text-bronze-700 hover:text-bronze-500 transition-colors"
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MainNavigation;
