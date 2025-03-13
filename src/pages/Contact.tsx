
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, MapPin, Phone, Calendar, Clock } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

const contactTopics = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Questions' },
  { value: 'partnership', label: 'Partnership Opportunities' },
  { value: 'feedback', label: 'Feedback & Suggestions' }
];

type ContactFormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const Contact = () => {
  const { t } = useLanguage();
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      topic: '',
      message: ''
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real app, this would send the contact form to a server
    console.log('Form submitted with data:', data);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond as soon as possible.",
    });
    form.reset();
  };
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('contactTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('contactSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} required />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email address" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {contactTopics.map(topic => (
                                <SelectItem key={topic.value} value={topic.value}>
                                  {topic.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-32"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide as much detail as possible so we can best assist you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:support@eduforum.com" className="text-muted-foreground hover:text-primary">
                      support@eduforum.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+1-800-123-4567" className="text-muted-foreground hover:text-primary">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Office</div>
                    <address className="text-muted-foreground not-italic">
                      123 Education St.<br />
                      San Francisco, CA 94103<br />
                      United States
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Days</div>
                    <div className="text-muted-foreground">
                      Monday - Friday
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-muted-foreground">
                      9:00 AM - 6:00 PM (EST)
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Our support team typically responds within 24 hours on business days.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Contact;
