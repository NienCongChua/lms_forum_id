
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle, Home } from "lucide-react";
import AnimatedTransition from "@/components/ui/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AnimatedTransition className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-[20rem] font-bold text-primary">404</div>
          </div>
          <div className="relative z-10 py-16">
            <AlertCircle className="h-24 w-24 mx-auto text-primary mb-6" />
            <h1 className="text-6xl font-extrabold tracking-tight mb-2 text-foreground">404</h1>
            <div className="h-1 w-16 bg-primary mx-auto my-6 rounded-full" />
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} />
                  <span>Back to Home</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/courses" className="flex items-center gap-2">
                  <Search size={18} />
                  <span>Browse Courses</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default NotFound;
