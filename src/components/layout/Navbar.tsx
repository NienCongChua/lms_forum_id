
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Book, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gradient">EduForum</span>
        </Link>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search forums, courses..."
                className="pr-8 pl-10 py-2 w-full rounded-full bg-secondary/50"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/forums" className="text-foreground/80 hover:text-primary transition-colors">
              Forums
            </Link>
            <Link to="/courses" className="text-foreground/80 hover:text-primary transition-colors">
              Courses
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm" className="rounded-full">
                Register
              </Button>
            </Link>
          </nav>
        )}

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 animate-fade-in">
          <div className="container px-4 py-6 flex flex-col space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search forums, courses..."
                className="pr-8 pl-10 py-2 w-full rounded-full bg-secondary/50"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/forums" 
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Forums</span>
              </Link>
              <Link 
                to="/courses" 
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="h-5 w-5 text-primary" />
                <span>Courses</span>
              </Link>
              <Link 
                to="/dashboard" 
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-primary" />
                <span>Dashboard</span>
              </Link>
            </nav>
            
            <div className="flex flex-col space-y-2 mt-auto">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" className="w-full justify-center">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
