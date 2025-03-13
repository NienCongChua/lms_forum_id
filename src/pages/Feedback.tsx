
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ThumbsUp, Star, Smile, Meh, Frown } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

type FeedbackFormValues = {
  satisfaction: string;
  email: string;
  comments: string;
  improvements: string[];
};

const Feedback = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'general' | 'feature' | 'bug'>('general');
  
  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      satisfaction: '3',
      email: '',
      comments: '',
      improvements: []
    }
  });

  const onSubmit = (data: FeedbackFormValues) => {
    // In a real app, this would send the feedback to a server
    console.log('Feedback submitted:', data);
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps us improve our platform.",
    });
    form.reset();
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('feedbackTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('feedbackSubtitle')}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-3 divide-x divide-border">
              <button
                className={`py-4 px-2 text-center transition-colors ${
                  activeTab === 'general' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('general')}
              >
                General Feedback
              </button>
              <button
                className={`py-4 px-2 text-center transition-colors ${
                  activeTab === 'feature' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('feature')}
              >
                Feature Request
              </button>
              <button
                className={`py-4 px-2 text-center transition-colors ${
                  activeTab === 'bug' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
                onClick={() => setActiveTab('bug')}
              >
                Report a Bug
              </button>
            </div>
          </div>
          
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Feedback</CardTitle>
                <CardDescription>
                  Share your overall experience with our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="satisfaction"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>How satisfied are you with our platform?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4 justify-center"
                            >
                              <div className="flex flex-col items-center space-y-1">
                                <RadioGroupItem value="1" id="r1" className="sr-only peer" />
                                <Label 
                                  htmlFor="r1" 
                                  className="cursor-pointer p-2 rounded-full hover:bg-secondary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/10"
                                >
                                  <Frown className="h-8 w-8" />
                                </Label>
                                <div className="text-xs">Not satisfied</div>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <RadioGroupItem value="2" id="r2" className="sr-only peer" />
                                <Label 
                                  htmlFor="r2" 
                                  className="cursor-pointer p-2 rounded-full hover:bg-secondary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/10"
                                >
                                  <Meh className="h-8 w-8" />
                                </Label>
                                <div className="text-xs">Neutral</div>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <RadioGroupItem value="3" id="r3" className="sr-only peer" />
                                <Label 
                                  htmlFor="r3" 
                                  className="cursor-pointer p-2 rounded-full hover:bg-secondary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/10"
                                >
                                  <Smile className="h-8 w-8" />
                                </Label>
                                <div className="text-xs">Satisfied</div>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <RadioGroupItem value="4" id="r4" className="sr-only peer" />
                                <Label 
                                  htmlFor="r4" 
                                  className="cursor-pointer p-2 rounded-full hover:bg-secondary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/10"
                                >
                                  <ThumbsUp className="h-8 w-8" />
                                </Label>
                                <div className="text-xs">Very satisfied</div>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <RadioGroupItem value="5" id="r5" className="sr-only peer" />
                                <Label 
                                  htmlFor="r5" 
                                  className="cursor-pointer p-2 rounded-full hover:bg-secondary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/10"
                                >
                                  <Star className="h-8 w-8" />
                                </Label>
                                <div className="text-xs">Excellent</div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email if you'd like us to follow up" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comments</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share your thoughts about our platform..." 
                              className="min-h-32"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Submit Feedback</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'feature' && (
            <Card>
              <CardHeader>
                <CardTitle>Feature Request</CardTitle>
                <CardDescription>
                  Suggest new features or improvements to existing ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="feature-title">Feature Title</Label>
                    <Input id="feature-title" placeholder="Brief title for your suggested feature" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="feature-description">Description</Label>
                    <Textarea 
                      id="feature-description" 
                      placeholder="Describe the feature and how it would benefit users..." 
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="feature-importance">How important is this feature to you?</Label>
                    <RadioGroup defaultValue="medium" className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="importance-low" />
                        <Label htmlFor="importance-low">Nice to have</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="importance-medium" />
                        <Label htmlFor="importance-medium">Important</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="importance-high" />
                        <Label htmlFor="importance-high">Critical</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-email">Email (optional)</Label>
                    <Input id="contact-email" type="email" placeholder="Your email if you'd like updates on this feature" />
                  </div>
                  
                  <Button type="submit">Submit Feature Request</Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'bug' && (
            <Card>
              <CardHeader>
                <CardTitle>Report a Bug</CardTitle>
                <CardDescription>
                  Help us improve by reporting issues you encounter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="bug-title">Issue Summary</Label>
                    <Input id="bug-title" placeholder="Brief description of the problem" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="bug-steps">Steps to Reproduce</Label>
                    <Textarea 
                      id="bug-steps" 
                      placeholder="1. Go to...
2. Click on...
3. Notice that..." 
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bug-expected">Expected Behavior</Label>
                    <Textarea 
                      id="bug-expected" 
                      placeholder="What should have happened?" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bug-browser">Browser & Device Information</Label>
                    <Input id="bug-browser" placeholder="e.g., Chrome 91 on Windows 10" />
                  </div>
                  
                  <div>
                    <Label htmlFor="bug-email">Email (optional)</Label>
                    <Input id="bug-email" type="email" placeholder="Your email if you'd like updates on this issue" />
                  </div>
                  
                  <Button type="submit">Submit Bug Report</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Feedback;
