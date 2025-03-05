
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, MessageSquare, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ForumCard from '@/components/forum/ForumCard';
import CourseCard from '@/components/course/CourseCard';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

// Sample data for popular forums
const popularForums = [
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
  }
];

// Sample data for featured courses
const featuredCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
    instructor: "Michael Thompson",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Web Development",
    level: "Beginner" as const,
    duration: "12 weeks",
    studentsCount: 1543,
    rating: 4.8,
    tags: ["html", "css", "javascript", "react", "node.js"]
  },
  {
    id: "2",
    title: "Advanced Data Science with Python",
    description: "Master data analysis, visualization, machine learning and AI techniques using Python.",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Data Science",
    level: "Advanced" as const,
    duration: "8 weeks",
    studentsCount: 876,
    rating: 4.7,
    tags: ["python", "machine-learning", "data-analysis", "statistics"]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 md:py-24 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              Welcome to EduForum Connect
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Learn, Share, and Grow <br className="hidden md:block" />
              <span className="text-gradient">Together</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              An interactive platform for students and teachers to collaborate, 
              share knowledge, and enhance the learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-muted-foreground text-sm">Active Users</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-muted-foreground text-sm">Courses</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">15,000+</h3>
              <p className="text-muted-foreground text-sm">Forum Posts</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-3 mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-muted-foreground text-sm">Satisfaction</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/30 rounded-3xl my-16 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EduForum Connect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to enhance your educational journey through collaboration, structured learning, and real-time interaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card p-6 rounded-xl border border-border"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Interactive Forums</h3>
              <p className="text-muted-foreground">
                Engage in discussions, ask questions, and share knowledge with peers and instructors in a structured environment.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-xl border border-border"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Structured Courses</h3>
              <p className="text-muted-foreground">
                Access comprehensive courses with lessons, exercises, and assessments to track your learning progress.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-xl border border-border"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Teacher Support</h3>
              <p className="text-muted-foreground">
                Get direct assistance and guidance from qualified teachers who can monitor your progress and provide feedback.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Popular Forums Section */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Forums</h2>
            <Link to="/forums">
              <Button variant="ghost" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularForums.map((forum) => (
              <ForumCard key={forum.id} {...forum} />
            ))}
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link to="/courses">
              <Button variant="ghost" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 my-12 rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join our community of learners and teachers to enhance your educational journey today.
            </p>
            <Link to="/register">
              <Button size="lg" className="rounded-full px-8">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
