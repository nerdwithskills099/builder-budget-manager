import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <AlertCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-md">
              Oops! Looks like you've wandered off the beaten path. The page
              you're looking for doesn't exist.
            </p>
          </div>

          <Link to="/">
            <Button size="lg" className="text-lg px-8 py-6">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
