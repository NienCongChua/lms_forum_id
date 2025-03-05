
import { MessageCircle, Eye, ThumbsUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ForumCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  stats: {
    views: number;
    replies: number;
    likes: number;
  };
  lastActivity: Date;
  isHot?: boolean;
}

const ForumCard = ({
  id,
  title,
  excerpt,
  author,
  category,
  tags,
  stats,
  lastActivity,
  isHot = false,
}: ForumCardProps) => {
  return (
    <Link 
      to={`/forums/${id}`}
      className="block group"
    >
      <div className="bg-card rounded-xl border border-border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          {isHot && (
            <Badge variant="destructive" className="ml-2">
              Hot
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{author.name}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {stats.views}
            </span>
            <span className="flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              {stats.replies}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1" />
              {stats.likes}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))}d
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ForumCard;
