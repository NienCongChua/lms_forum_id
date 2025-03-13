
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Book, Video, Download, ExternalLink } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const resourceCategories = [
  {
    id: 'ebooks',
    title: 'E-Books',
    icon: Book,
    color: 'text-blue-500',
    count: 124
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    color: 'text-green-500',
    count: 86
  },
  {
    id: 'videos',
    title: 'Video Tutorials',
    icon: Video,
    color: 'text-red-500',
    count: 58
  }
];

const featuredResources = [
  {
    id: 1,
    title: 'Beginner\'s Guide to Machine Learning',
    type: 'E-Book',
    description: 'A comprehensive introduction to machine learning concepts and algorithms.',
    author: 'Dr. Alex Johnson',
    downloadCount: 1245,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    type: 'Video Course',
    description: 'Learn the basics of HTML, CSS, and JavaScript with hands-on examples.',
    author: 'Sarah Williams',
    downloadCount: 982,
    rating: 4.6
  },
  {
    id: 3,
    title: 'Data Science for Beginners',
    type: 'Document',
    description: 'An introduction to data science concepts, tools, and methodologies.',
    author: 'Michael Chen',
    downloadCount: 756,
    rating: 4.5
  },
  {
    id: 4,
    title: 'Advanced Python Programming',
    type: 'E-Book',
    description: 'Take your Python skills to the next level with advanced techniques and best practices.',
    author: 'Elena Rodriguez',
    downloadCount: 543,
    rating: 4.7
  }
];

const Resources = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('resourcesTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('resourcesSubtitle')}</p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Resource Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`p-2 rounded-full bg-secondary ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.count} resources</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-start">Browse {category.title}</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">{resource.type}</div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>By {resource.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{resource.downloadCount} downloads</span>
                    <span>★ {resource.rating}/5</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Preview
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Resources;
