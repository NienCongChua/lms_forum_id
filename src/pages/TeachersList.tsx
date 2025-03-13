
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Star, BookOpen } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const teachers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Professor of Computer Science',
    specializations: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    rating: 4.9,
    students: 1284,
    courses: 8,
    bio: 'PhD in Computer Science with 15+ years of teaching experience. Specializes in artificial intelligence and machine learning.'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Associate Professor of Mathematics',
    specializations: ['Calculus', 'Linear Algebra', 'Number Theory'],
    rating: 4.7,
    students: 956,
    courses: 6,
    bio: 'Mathematics expert with a passion for making complex concepts accessible to students of all levels.'
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Professor of Business Administration',
    specializations: ['Entrepreneurship', 'Marketing', 'Business Strategy'],
    rating: 4.8,
    students: 1420,
    courses: 10,
    bio: 'Business consultant and educator with extensive experience in entrepreneurship and startup mentoring.'
  },
  {
    id: 4,
    name: 'Prof. David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Assistant Professor of Biology',
    specializations: ['Molecular Biology', 'Genetics', 'Biotechnology'],
    rating: 4.6,
    students: 728,
    courses: 5,
    bio: 'Researcher and educator specializing in molecular biology and genetics with a focus on biotechnology applications.'
  },
  {
    id: 5,
    name: 'Dr. Lisa Wang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Professor of Psychology',
    specializations: ['Clinical Psychology', 'Cognitive Behavior', 'Neuroscience'],
    rating: 4.9,
    students: 1056,
    courses: 7,
    bio: 'Clinical psychologist with research focus on cognitive behavior and applications of neuroscience in psychological treatments.'
  },
  {
    id: 6,
    name: 'Prof. James Wilson',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    title: 'Professor of Engineering',
    specializations: ['Electrical Engineering', 'Robotics', 'Control Systems'],
    rating: 4.7,
    students: 846,
    courses: 6,
    bio: 'Engineering educator with industry experience in robotics and control systems design.'
  }
];

const TeachersList = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('teachersTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('teachersSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{teacher.name}</CardTitle>
                <CardDescription>{teacher.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">{spec}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{teacher.bio}</p>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="font-medium">{teacher.rating}</span>
                    </div>
                    <div className="text-muted-foreground mt-1">Rating</div>
                  </div>
                  <div>
                    <div className="font-medium">{teacher.students}</div>
                    <div className="text-muted-foreground mt-1">Students</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-medium">{teacher.courses}</span>
                    </div>
                    <div className="text-muted-foreground mt-1">Courses</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full gap-2 mr-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
                <Button className="w-full">View Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default TeachersList;
