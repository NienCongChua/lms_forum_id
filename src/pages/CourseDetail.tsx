import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Clock,
  Play,
  FileText,
  MessageSquare,
  Award,
  CheckCircle,
  Star,
  Users,
  Download,
  Share2,
  Bookmark,
} from 'lucide-react';

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed?: boolean;
    type: 'video' | 'quiz' | 'reading';
  }[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  totalLessons: number;
  studentsCount: number;
  rating: number;
  ratingCount: number;
  progress?: number;
  tags: string[];
  price: string;
  features: string[];
  requirements: string[];
  objectives: string[];
  modules: CourseModule[];
}

const mockCourseData: Record<string, CourseData> = {
  'course-1': {
    id: 'course-1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with JavaScript',
    longDescription: 'This comprehensive course will take you from absolute beginner to programming proficient. Starting with the fundamentals, you will learn the core concepts of programming using JavaScript, one of the most popular programming languages in the world. By the end of this course, you will have built several projects that demonstrate your understanding of programming principles.',
    instructor: {
      name: 'Jane Smith',
      role: 'Senior Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Jane has over 10 years of experience in web development and has taught programming to thousands of students worldwide.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    totalLessons: 32,
    studentsCount: 12543,
    rating: 4.8,
    ratingCount: 2453,
    progress: 35,
    tags: ['JavaScript', 'Programming', 'Web Development'],
    price: '$49.99',
    features: [
      'Lifetime access to 32 lessons',
      'Access on mobile and desktop',
      'Certificate of completion',
      '24/7 support'
    ],
    requirements: [
      'No prior programming experience required',
      'Basic computer skills',
      'A computer with internet access'
    ],
    objectives: [
      'Understand programming fundamentals',
      'Write JavaScript code confidently',
      'Build interactive web applications',
      'Debug and solve programming problems'
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Getting Started with Programming',
        duration: '2 hours',
        lessons: [
          { id: 'lesson-1-1', title: 'Introduction to Programming', duration: '15 min', completed: true, type: 'video' },
          { id: 'lesson-1-2', title: 'Setting Up Your Environment', duration: '20 min', completed: true, type: 'video' },
          { id: 'lesson-1-3', title: 'Your First Program', duration: '25 min', completed: true, type: 'video' },
          { id: 'lesson-1-4', title: 'Programming Concepts Quiz', duration: '10 min', completed: false, type: 'quiz' }
        ]
      },
      {
        id: 'module-2',
        title: 'JavaScript Basics',
        duration: '3 hours',
        lessons: [
          { id: 'lesson-2-1', title: 'Variables and Data Types', duration: '30 min', completed: false, type: 'video' },
          { id: 'lesson-2-2', title: 'Operators and Expressions', duration: '25 min', completed: false, type: 'video' },
          { id: 'lesson-2-3', title: 'Control Flow', duration: '35 min', completed: false, type: 'video' },
          { id: 'lesson-2-4', title: 'Functions', duration: '40 min', completed: false, type: 'video' },
          { id: 'lesson-2-5', title: 'JavaScript Basics Reading Material', duration: '20 min', completed: false, type: 'reading' }
        ]
      },
      {
        id: 'module-3',
        title: 'Working with Data',
        duration: '4 hours',
        lessons: [
          { id: 'lesson-3-1', title: 'Arrays', duration: '30 min', completed: false, type: 'video' },
          { id: 'lesson-3-2', title: 'Objects', duration: '35 min', completed: false, type: 'video' },
          { id: 'lesson-3-3', title: 'Working with JSON', duration: '25 min', completed: false, type: 'video' },
          { id: 'lesson-3-4', title: 'Data Manipulation Project', duration: '50 min', completed: false, type: 'video' }
        ]
      }
    ]
  },
  'course-2': {
    id: 'course-2',
    title: 'Advanced Web Development',
    description: 'Master modern web development techniques and frameworks',
    longDescription: 'Take your web development skills to the next level with this advanced course covering modern frameworks, tools, and best practices. You will learn how to build complex, responsive, and performant web applications using the latest techniques in the industry.',
    instructor: {
      name: 'Michael Johnson',
      role: 'Principal Engineer',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Michael is a principal engineer with 15+ years of experience building large-scale web applications for Fortune 500 companies.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Web Development',
    level: 'Advanced',
    duration: '10 weeks',
    totalLessons: 45,
    studentsCount: 8432,
    rating: 4.9,
    ratingCount: 1832,
    progress: 0,
    tags: ['React', 'Node.js', 'GraphQL', 'TypeScript'],
    price: '$79.99',
    features: [
      'Lifetime access to 45 lessons',
      'Access on mobile and desktop',
      'Certificate of completion',
      '24/7 support',
      'Real-world projects'
    ],
    requirements: [
      'Basic understanding of HTML, CSS, and JavaScript',
      'Some experience with web development',
      'Familiarity with the command line'
    ],
    objectives: [
      'Build complex web applications with React',
      'Create APIs with Node.js and GraphQL',
      'Work with databases and authentication',
      'Deploy and scale web applications',
      'Implement best practices for performance and security'
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Modern JavaScript',
        duration: '3.5 hours',
        lessons: [
          { id: 'lesson-1-1', title: 'ES6+ Features', duration: '30 min', completed: false, type: 'video' },
          { id: 'lesson-1-2', title: 'Promises and Async/Await', duration: '40 min', completed: false, type: 'video' },
          { id: 'lesson-1-3', title: 'Modules and Build Tools', duration: '35 min', completed: false, type: 'video' },
          { id: 'lesson-1-4', title: 'TypeScript Fundamentals', duration: '45 min', completed: false, type: 'video' }
        ]
      },
      {
        id: 'module-2',
        title: 'React Development',
        duration: '5 hours',
        lessons: [
          { id: 'lesson-2-1', title: 'React Fundamentals', duration: '40 min', completed: false, type: 'video' },
          { id: 'lesson-2-2', title: 'Hooks and Context API', duration: '50 min', completed: false, type: 'video' },
          { id: 'lesson-2-3', title: 'State Management with Redux', duration: '60 min', completed: false, type: 'video' },
          { id: 'lesson-2-4', title: 'Performance Optimization', duration: '45 min', completed: false, type: 'video' },
          { id: 'lesson-2-5', title: 'Testing React Applications', duration: '55 min', completed: false, type: 'video' }
        ]
      }
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id && mockCourseData[id]) {
        setCourse(mockCourseData[id]);
        setIsEnrolled(mockCourseData[id].progress !== undefined && mockCourseData[id].progress > 0);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Successfully enrolled!",
      description: `You are now enrolled in "${course?.title}". Start learning now!`,
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Course bookmarked",
      description: "You can find this course in your bookmarks.",
    });
  };

  if (loading) {
    return (
      <AnimatedTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-80 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
              </div>
              <div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedTransition>
    );
  }

  if (!course) {
    return (
      <AnimatedTransition>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/courses">Back to Courses</a>
          </Button>
        </div>
      </AnimatedTransition>
    );
  }

  const getLevelColor = () => {
    switch (course.level) {
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

  const getIconForLessonType = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'reading':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight mb-2 sm:mb-0">{course.title}</h1>
            <div className="flex space-x-2">
              <Badge className={getLevelColor()}>
                {course.level}
              </Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.studentsCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 mr-1 fill-yellow-400" />
              <span>{course.rating} ({course.ratingCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden mb-8 w-full aspect-video">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center mb-6">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-medium">{course.instructor.name}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor.role}</p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3">Description</h3>
                  <p className="text-muted-foreground">{course.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.objectives.map((objective, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {course.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <div className="space-y-6">
                  <h3 className="text-xl font-medium mb-1">Course Content</h3>
                  <p className="text-muted-foreground mb-4">
                    {course.modules.length} modules • {course.totalLessons} lessons • {course.duration} total length
                  </p>
                  
                  {course.modules.map((module) => (
                    <div key={module.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <h4 className="font-medium">{module.title}</h4>
                        <div className="text-sm text-muted-foreground">{module.duration} • {module.lessons.length} lessons</div>
                      </div>
                      <ul className="divide-y">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                            <div className="flex items-center">
                              {lesson.completed ? 
                                <CheckCircle className="h-5 w-5 mr-3 text-green-500" /> : 
                                <div className="mr-3">{getIconForLessonType(lesson.type)}</div>
                              }
                              <span className={lesson.completed ? "line-through text-muted-foreground" : ""}>
                                {lesson.title}
                              </span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {lesson.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructor">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      className="h-20 w-20 rounded-full mr-6"
                    />
                    <div>
                      <h3 className="text-xl font-medium">{course.instructor.name}</h3>
                      <p className="text-muted-foreground">{course.instructor.role}</p>
                    </div>
                  </div>
                  
                  <p>{course.instructor.bio}</p>
                  
                  <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                      <div className="text-lg font-medium">12</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Students</div>
                      <div className="text-lg font-medium">45.3K</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                      <div className="text-lg font-medium">4.8</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-5xl font-bold">{course.rating}</div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Course Rating • {course.ratingCount.toLocaleString()} Reviews
                        </div>
                      </div>
                      
                      <div className="space-y-1 flex-grow">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const percent = rating === 5 ? 65 : 
                                        rating === 4 ? 20 : 
                                        rating === 3 ? 10 : 
                                        rating === 2 ? 3 : 2;
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="text-sm mr-2">{rating}</div>
                              <Star className="h-3 w-3 mr-2 fill-yellow-400 text-yellow-400" />
                              <Progress value={percent} className="h-2 flex-grow" />
                              <div className="text-sm ml-2 text-muted-foreground w-10 text-right">{percent}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <Button>Write a Review</Button>
                  </div>
                  
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      Reviews are only visible after enrolling in the course.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-1">
            <div className="border rounded-xl p-6 sticky top-24">
              {isEnrolled ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Your Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium">3/{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Time Left</span>
                      <span className="font-medium">6h 45m</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Award className="h-4 w-4 mr-2" />
                      Certificate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{course.price}</div>
                    <p className="text-sm text-muted-foreground">One-time payment, lifetime access</p>
                  </div>
                  
                  <Button className="w-full" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={handleBookmark}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">This Course Includes</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share This Course
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default CourseDetail;
