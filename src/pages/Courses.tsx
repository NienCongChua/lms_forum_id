
import React from 'react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((course) => (
                <Card key={course} className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted" />
                  <CardHeader>
                    <CardTitle>Introduction to Programming</CardTitle>
                    <CardDescription>Learn the basics of programming with JavaScript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">24 lessons</div>
                      <Button variant="outline" size="sm">Enroll</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enrolled" className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">You're not enrolled in any courses yet</h3>
              <p className="text-muted-foreground mt-2">Browse our catalog and start learning today!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Popular courses coming soon</h3>
              <p className="text-muted-foreground mt-2">Check back later for our most popular offerings</p>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">New courses coming soon</h3>
              <p className="text-muted-foreground mt-2">Stay tuned for our latest course offerings</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedTransition>
  );
};

export default Courses;
