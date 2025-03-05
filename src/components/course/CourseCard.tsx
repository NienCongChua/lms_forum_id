
import { Users, Clock, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  studentsCount: number;
  rating: number;
  progress?: number;
  tags: string[];
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  thumbnail,
  category,
  level,
  duration,
  studentsCount,
  rating,
  progress,
  tags,
}: CourseCardProps) => {
  // Helper function to determine color based on level
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link 
      to={`/courses/${id}`}
      className="block group"
    >
      <div className="rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            <Badge className={`${getLevelColor()}`}>
              {level}
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-2">
            <Badge variant="outline">
              {category}
            </Badge>
          </div>
          
          <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>{studentsCount} students</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
