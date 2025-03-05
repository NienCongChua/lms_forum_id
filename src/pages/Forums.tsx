
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, MessageSquarePlus, Search } from 'lucide-react';
import ForumCard from '@/components/forum/ForumCard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

// Sample forum data
const forums = [
  {
    id: "1",
    title: "Tips for effective online learning strategies",
    excerpt: "Share your experiences and techniques for making the most of online education platforms.",
    author: {
      name: "Elena Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "Study Skills",
    tags: ["online-learning", "productivity", "time-management"],
    stats: {
      views: 1243,
      replies: 38,
      likes: 106
    },
    lastActivity: new Date(2023, 5, 15),
    isHot: true
  },
  {
    id: "2",
    title: "Programming fundamentals discussion group",
    excerpt: "A space for beginners to ask questions and get help with programming basics.",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "Programming",
    tags: ["coding", "beginners", "help"],
    stats: {
      views: 985,
      replies: 52,
      likes: 87
    },
    lastActivity: new Date(2023, 5, 20)
  },
  {
    id: "3",
    title: "Discussion on advanced mathematics topics",
    excerpt: "For students and enthusiasts interested in calculus, linear algebra, and beyond.",
    author: {
      name: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "Mathematics",
    tags: ["calculus", "linear-algebra", "advanced"],
    stats: {
      views: 756,
      replies: 29,
      likes: 62
    },
    lastActivity: new Date(2023, 5, 18)
  },
  {
    id: "4",
    title: "Language learning exchange and practice",
    excerpt: "Find language partners and share learning resources for various languages.",
    author: {
      name: "Sofia Garcia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "Languages",
    tags: ["language-exchange", "practice", "resources"],
    stats: {
      views: 1432,
      replies: 87,
      likes: 124
    },
    lastActivity: new Date(2023, 5, 19),
    isHot: true
  },
  {
    id: "5",
    title: "Science project ideas and guidance",
    excerpt: "Share your science project ideas and get feedback from peers and educators.",
    author: {
      name: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "Science",
    tags: ["projects", "ideas", "experiments"],
    stats: {
      views: 894,
      replies: 45,
      likes: 78
    },
    lastActivity: new Date(2023, 5, 17)
  },
  {
    id: "6",
    title: "History discussion group - Ancient civilizations",
    excerpt: "Deep dive into ancient civilizations, their cultures, and historical significance.",
    author: {
      name: "Emily Taylor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    category: "History",
    tags: ["ancient-history", "civilizations", "archaeology"],
    stats: {
      views: 675,
      replies: 32,
      likes: 59
    },
    lastActivity: new Date(2023, 5, 16)
  }
];

// Categories for filter
const categories = [
  "All Categories",
  "Programming",
  "Mathematics",
  "Science",
  "Languages",
  "Study Skills",
  "History",
  "Arts",
  "Business"
];

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('recent');

  // Filter functions
  const filteredForums = forums.filter(forum => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All Categories' || forum.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort function
  const sortedForums = [...filteredForums].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.lastActivity.getTime() - a.lastActivity.getTime();
    } else if (sortBy === 'popular') {
      return b.stats.views - a.stats.views;
    } else if (sortBy === 'mostReplies') {
      return b.stats.replies - a.stats.replies;
    }
    return 0;
  });

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Forums</h1>
            <p className="text-muted-foreground">Explore discussions and share your knowledge</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/forums/new">
              <Button className="rounded-full">
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search discussions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Viewed</SelectItem>
                <SelectItem value="mostReplies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="all">All Discussions</TabsTrigger>
            <TabsTrigger value="hot">Hot Topics</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="my">My Discussions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {sortedForums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedForums.map((forum) => (
                  <ForumCard key={forum.id} {...forum} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <MessageSquarePlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hot" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forums.filter(forum => forum.isHot).map((forum) => (
                <ForumCard key={forum.id} {...forum} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="following" className="mt-6">
            <div className="text-center py-16">
              <MessageSquarePlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">You're not following any discussions yet</h3>
              <p className="text-muted-foreground mb-4">
                When you follow a discussion, it will appear here for easy access.
              </p>
              <Button asChild>
                <Link to="/forums">Browse Discussions</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="my" className="mt-6">
            <div className="text-center py-16">
              <MessageSquarePlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">You haven't started any discussions yet</h3>
              <p className="text-muted-foreground mb-4">
                When you create a discussion, it will appear here.
              </p>
              <Button asChild>
                <Link to="/forums/new">Start a Discussion</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Forums;
