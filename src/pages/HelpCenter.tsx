
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileQuestion, MessageSquare, LifeBuoy, Video, Lightbulb, BookOpen } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const helpCategories = [
  {
    id: 'account',
    title: 'Account & Profile',
    icon: <FileQuestion className="h-6 w-6" />,
    description: 'Manage your account, update profile settings, password recovery',
    url: '/faq#account'
  },
  {
    id: 'courses',
    title: 'Courses & Learning',
    icon: <BookOpen className="h-6 w-6" />,
    description: 'Enrolling in courses, course materials, certificates, progress tracking',
    url: '/faq#courses'
  },
  {
    id: 'forums',
    title: 'Forums & Discussions',
    icon: <MessageSquare className="h-6 w-6" />,
    description: 'Posting in forums, creating discussions, community guidelines',
    url: '/faq#forums'
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: <LifeBuoy className="h-6 w-6" />,
    description: 'Troubleshooting, system requirements, browser issues',
    url: '/faq#technical'
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    icon: <FileQuestion className="h-6 w-6" />,
    description: 'Payment methods, invoices, refunds, subscription management',
    url: '/faq#billing'
  },
  {
    id: 'content',
    title: 'Content Creation',
    icon: <Lightbulb className="h-6 w-6" />,
    description: 'Creating courses, uploading materials, content guidelines',
    url: '/faq#content'
  }
];

const popularArticles = [
  'How to reset your password',
  'Troubleshooting video playback issues',
  'Downloading course materials for offline use',
  'Requesting a course certificate',
  'Changing your account email address',
  'Setting up two-factor authentication'
];

const HelpCenter = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('helpCenterTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t('helpCenterSubtitle')}</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search for help..." 
              className="pl-10 py-6 text-lg rounded-full"
            />
            <Button className="absolute right-1 top-1 rounded-full">Search</Button>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 text-primary">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={category.url}>Browse Articles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>Frequently viewed help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {popularArticles.map((article, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="flex items-start p-3 hover:bg-secondary rounded-md transition-colors"
                    >
                      <FileQuestion className="h-5 w-5 mr-3 text-primary mt-0.5" />
                      <span>{article}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn with step-by-step videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/40 rounded-md p-3 flex items-center">
                <Video className="h-10 w-10 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Getting Started</h4>
                  <p className="text-sm text-muted-foreground">Platform orientation</p>
                </div>
              </div>
              <div className="bg-secondary/40 rounded-md p-3 flex items-center">
                <Video className="h-10 w-10 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Forum Navigation</h4>
                  <p className="text-sm text-muted-foreground">Using discussion boards</p>
                </div>
              </div>
              <div className="bg-secondary/40 rounded-md p-3 flex items-center">
                <Video className="h-10 w-10 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Course Enrollment</h4>
                  <p className="text-sm text-muted-foreground">Finding & joining courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Our support team is ready to assist you</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="default">
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/feedback">Leave Feedback</Link>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default HelpCenter;
