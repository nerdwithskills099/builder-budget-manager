import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  PieChart as PieChartIcon,
} from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import UPIPayment from "@/components/UPIPayment";

// Mock data - in a real app this would come from your state management/API
const mockExpenses = [
  {
    id: 1,
    name: "Campus Lunch",
    amount: 12.5,
    category: "Food & Dining",
    date: "2024-01-15",
    currency: "USD",
  },
  {
    id: 2,
    name: "Bus Ticket",
    amount: 270,
    category: "Transportation",
    date: "2024-01-15",
    currency: "INR",
  },
  {
    id: 3,
    name: "Textbook",
    amount: 89.99,
    category: "Education",
    date: "2024-01-14",
    currency: "USD",
  },
  {
    id: 4,
    name: "Movie Night",
    amount: 1250,
    category: "Entertainment",
    date: "2024-01-13",
    currency: "INR",
  },
  {
    id: 5,
    name: "Coffee",
    amount: 375,
    category: "Food & Dining",
    date: "2024-01-13",
    currency: "INR",
  },
  {
    id: 6,
    name: "Gym Membership",
    amount: 25.0,
    category: "Health & Fitness",
    date: "2024-01-12",
    currency: "USD",
  },
  {
    id: 7,
    name: "Uber",
    amount: 1560,
    category: "Transportation",
    date: "2024-01-12",
    currency: "INR",
  },
  {
    id: 8,
    name: "Groceries",
    amount: 3600,
    category: "Food & Dining",
    date: "2024-01-11",
    currency: "INR",
  },
];

const COLORS = [
  "#8b5cf6", // primary purple
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#6366f1", // indigo
  "#ec4899", // pink
];

export default function Dashboard() {
  const { formatAmount } = useCurrency();

  // Calculate totals by category
  const categoryTotals = mockExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  const totalSpent = mockExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const avgDaily = totalSpent / 7; // assuming 7 days of data

  // Recent expenses for the list
  const recentExpenses = [...mockExpenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Dashboard
          </h1>
          <p className="text-muted-foreground">
            Get insights into your spending patterns and stay on budget.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Daily Average
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgDaily.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockExpenses.length}</div>
              <p className="text-xs text-muted-foreground">Total expenses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{expense.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {expense.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      ${expense.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* UPI Payment */}
          <UPIPayment />
        </div>
      </div>
    </Layout>
  );
}
