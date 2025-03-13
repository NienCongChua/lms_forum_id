
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Heart, MessageSquare, Share2, Bookmark, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample forum data (in a real app this would be fetched from an API)
const forums = [
  {
    id: "1",
    title: "Tips for effective online learning strategies",
    content: `
      <p>Hello everyone,</p>
      <p>I wanted to start a discussion about effective strategies for online learning. As more courses move to digital platforms, it's important to adapt our study habits.</p>
      <h3>Here are some techniques I've found helpful:</h3>
      <ul>
        <li>Creating a dedicated study space at home</li>
        <li>Using the Pomodoro technique (25 minutes of focused work, 5-minute break)</li>
        <li>Taking handwritten notes even when watching digital lectures</li>
        <li>Setting specific goals for each study session</li>
        <li>Using spaced repetition for memorization</li>
      </ul>
      <p>What strategies have worked well for you? I'm especially interested in how people manage to stay motivated without the classroom environment.</p>
    `,
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
    isHot: true,
    createdAt: new Date(2023, 5, 10)
  }
];

// Sample comments
const comments = [
  {
    id: "c1",
    content: "I've found that using a physical planner helps me stay organized even with online courses. Something about writing things down makes it stick better in my memory.",
    author: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    createdAt: new Date(2023, 5, 11),
    likes: 24
  },
  {
    id: "c2",
    content: "The Pomodoro technique has been a game-changer for me! I use the Forest app to stay focused during each session. It's amazing how much more I can accomplish when I break work into focused chunks.",
    author: {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    createdAt: new Date(2023, 5, 12),
    likes: 31
  },
  {
    id: "c3",
    content: "I think the hardest part of online learning is staying motivated without peers physically present. I've started joining virtual study groups, and it's helped tremendously with accountability.",
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
    },
    createdAt: new Date(2023, 5, 13),
    likes: 18
  }
];

const ForumDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  
  // Find the forum by ID (in a real app, this would be a data fetch)
  const forum = forums.find(f => f.id === id);
  
  if (!forum) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Forum not found</h1>
          <p className="mb-6">The forum you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/forums">Back to Forums</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AnimatedTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link to="/forums" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Forums</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{forum.title}</h1>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={forum.author.avatar} alt={forum.author.name} />
                  <AvatarFallback>{forum.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{forum.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Posted {formatDistanceToNow(forum.createdAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none mb-6" dangerouslySetInnerHTML={{ __html: forum.content }}></div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{forum.category}</Badge>
                {forum.tags.map(tag => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{forum.stats.likes}</span>
                  </Button>
                  <div className="flex items-center text-muted-foreground">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{forum.stats.views} views</span>
                  </div>
                </div>
                <Button>Reply</Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Replies ({comments.length})</h2>
              
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <p className="mb-4">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm">Reply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-medium mb-3">About this forum</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This discussion is part of the {forum.category} category and has been viewed {forum.stats.views} times.
              </p>
              <div className="flex flex-col gap-2">
                <Button className="w-full" variant="outline">Follow Discussion</Button>
                <Button className="w-full" variant="outline">Share</Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-3">Related discussions</h3>
              <ul className="space-y-3">
                <li className="text-sm">
                  <a href="#" className="hover:text-primary transition-colors">How to stay productive during long study sessions?</a>
                </li>
                <li className="text-sm">
                  <a href="#" className="hover:text-primary transition-colors">Best apps for organizing online course materials</a>
                </li>
                <li className="text-sm">
                  <a href="#" className="hover:text-primary transition-colors">Dealing with distractions in home learning environment</a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ForumDetail;
