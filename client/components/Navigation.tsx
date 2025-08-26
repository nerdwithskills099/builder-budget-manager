import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { WalletCards, Plus, BarChart3 } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: WalletCards },
    { name: "Add Expense", path: "/add-expense", icon: Plus },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <WalletCards className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              BudgetBuddy
            </span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
