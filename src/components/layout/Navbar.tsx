
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Book, MessageCircle, Search, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Temporary authentication state for demo purposes
// This should be replaced with a proper auth context/hook later
const useAuth = () => {
  // For demonstration, let's assume user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '',
    role: 'admin'
  });

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, user, logout };
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isLoggedIn, user, logout } = useAuth();

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
            <Link to="/teachers" className="text-foreground/80 hover:text-primary transition-colors">
              Teachers
            </Link>
            <Link to="/resources" className="text-foreground/80 hover:text-primary transition-colors">
              Resources
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <DropdownMenuItem key={i} className="cursor-pointer py-3">
                          <div className="flex space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <MessageCircle className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">New comment on your post</p>
                              <p className="text-xs text-muted-foreground">Alex commented on your forum post</p>
                              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <Link to="/notifications" className="w-full">
                      <Button variant="ghost" size="sm" className="w-full justify-center">
                        View All
                      </Button>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative flex items-center space-x-2 p-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/schedule">
                      <DropdownMenuItem className="cursor-pointer">
                        <Book className="h-4 w-4 mr-2" />
                        My Schedule
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <Link to="/admin">
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            Admin Panel
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
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
              </>
            )}
          </nav>
        )}

        {isMobile && (
          <div className="flex items-center space-x-2">
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <DropdownMenuItem key={i} className="cursor-pointer py-3">
                        <div className="flex space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New comment on your post</p>
                            <p className="text-xs text-muted-foreground">Alex commented on your forum post</p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/notifications" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      View All
                    </Button>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
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
              {isLoggedIn && (
                <div className="flex items-center space-x-3 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
              
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
                to="/teachers" 
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-primary" />
                <span>Teachers</span>
              </Link>
              <Link 
                to="/resources" 
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="h-5 w-5 text-primary" />
                <span>Resources</span>
              </Link>
              
              {isLoggedIn && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span>My Profile</span>
                  </Link>
                  <Link 
                    to="/notifications" 
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notifications</span>
                  </Link>
                  <Link 
                    to="/schedule" 
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Book className="h-5 w-5 text-primary" />
                    <span>My Schedule</span>
                  </Link>
                  
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="flex items-center p-2 space-x-3 rounded-md hover:bg-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                </>
              )}
            </nav>
            
            <div className="flex flex-col space-y-2 mt-auto">
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" className="w-full justify-center">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
