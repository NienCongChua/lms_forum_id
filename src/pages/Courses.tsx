
import React from 'react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import CourseCard from '@/components/course/CourseCard';

// Mock course data
const coursesData = [
  {
    id: 'course-1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with JavaScript. This course is designed for absolute beginners who want to start their programming journey.',
    instructor: 'Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    studentsCount: 12543,
    rating: 4.8,
    progress: 35,
    tags: ['JavaScript', 'Programming', 'Web Development']
  },
  {
    id: 'course-2',
    title: 'Advanced Web Development',
    description: 'Master modern web development techniques and frameworks. Learn to build complex, responsive, and performant web applications.',
    instructor: 'Michael Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Web Development',
    level: 'Advanced',
    duration: '10 weeks',
    studentsCount: 8432,
    rating: 4.9,
    tags: ['React', 'Node.js', 'GraphQL', 'TypeScript']
  },
  {
    id: 'course-3',
    title: 'Data Science Fundamentals',
    description: 'Learn the core concepts of data science, including data analysis, visualization, and machine learning fundamentals.',
    instructor: 'Emily Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '12 weeks',
    studentsCount: 9876,
    rating: 4.7,
    tags: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics']
  },
  {
    id: 'course-4',
    title: 'UX/UI Design Principles',
    description: 'Master the principles of user experience and interface design to create beautiful, functional digital products.',
    instructor: 'Alex Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Design',
    level: 'Beginner',
    duration: '6 weeks',
    studentsCount: 7654,
    rating: 4.6,
    progress: 15,
    tags: ['UI Design', 'UX Research', 'Figma', 'Prototyping']
  },
  {
    id: 'course-5',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native. Learn once, write everywhere.',
    instructor: 'David Kim',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '8 weeks',
    studentsCount: 6543,
    rating: 4.5,
    tags: ['React Native', 'iOS', 'Android', 'JavaScript']
  },
  {
    id: 'course-6',
    title: 'Cloud Computing with AWS',
    description: 'Learn to design, deploy, and manage applications on the Amazon Web Services cloud platform.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Cloud Computing',
    level: 'Advanced',
    duration: '10 weeks',
    studentsCount: 5432,
    rating: 4.9,
    tags: ['AWS', 'DevOps', 'Serverless', 'Infrastructure']
  }
];

// Enrolled courses data
const enrolledCoursesData = [
  {
    id: 'course-1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with JavaScript. This course is designed for absolute beginners who want to start their programming journey.',
    instructor: 'Jane Smith',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    studentsCount: 12543,
    rating: 4.8,
    progress: 35,
    tags: ['JavaScript', 'Programming', 'Web Development']
  },
  {
    id: 'course-4',
    title: 'UX/UI Design Principles',
    description: 'Master the principles of user experience and interface design to create beautiful, functional digital products.',
    instructor: 'Alex Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Design',
    level: 'Beginner',
    duration: '6 weeks',
    studentsCount: 7654,
    rating: 4.6,
    progress: 15,
    tags: ['UI Design', 'UX Research', 'Figma', 'Prototyping']
  }
];

const Courses = () => {
  return (
    <AnimatedTransition className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-muted-foreground">
            Browse our collection of courses designed to help you learn and grow.
          </p>
        </div>

        <div className="w-full">
          <div className="tabs tabs-boxed bg-background border mb-6 rounded-lg p-1 w-fit">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">All Courses</button>
            <button className="px-4 py-2 rounded-md hover:bg-muted">My Courses</button>
            <button className="px-4 py-2 rounded-md hover:bg-muted">Popular</button>
            <button className="px-4 py-2 rounded-md hover:bg-muted">New</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map(course => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                thumbnail={course.thumbnail}
                category={course.category}
                level={course.level as any}
                duration={course.duration}
                studentsCount={course.studentsCount}
                rating={course.rating}
                progress={course.progress}
                tags={course.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Courses;
