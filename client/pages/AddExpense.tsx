import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus, DollarSign } from "lucide-react";
import { useCurrency, currencies, Currency } from "@/hooks/useCurrency";
import CurrencyConverter from "@/components/CurrencyConverter";

const categories = [
  "Food & Dining",
  "Transportation",
  "Education",
  "Entertainment",
  "Shopping",
  "Health & Fitness",
  "Bills & Utilities",
  "Other",
];

export default function AddExpense() {
  const { selectedCurrency, formatAmount } = useCurrency();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    currency: selectedCurrency,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add expense logic here
    console.log("Adding expense:", formData);
    // Reset form
    setFormData({ name: "", amount: "", category: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Expense
          </h1>
          <p className="text-muted-foreground">
            Track your spending by adding a new expense to your budget.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Expense Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Expense Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Lunch at campus cafe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {formData.currency.symbol}
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency.code}
                    onValueChange={(code) => {
                      const currency = currencies.find(c => c.code === code);
                      if (currency) {
                        setFormData(prev => ({ ...prev, currency }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <CurrencyConverter />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your expenses are automatically saved and added to your dashboard.
          </p>
        </div>
      </div>
    </Layout>
  );
}
