import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, PiggyBank, TrendingUp, Shield } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Master Your
              <span className="text-primary"> Student Budget</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances with our simple, intuitive budget
              tracker designed specifically for students.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <PiggyBank className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Track Expenses</h3>
            <p className="text-muted-foreground">
              Easily log your daily expenses and categorize them to see where
              your money goes.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Visual Insights</h3>
            <p className="text-muted-foreground">
              Get clear insights with charts and graphs that make understanding
              your spending simple.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Stay on Budget</h3>
            <p className="text-muted-foreground">
              Set spending limits and get alerts to help you stick to your
              student budget.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Ready to take control of your finances?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of students who are already managing their money
            better.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Start Tracking Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
