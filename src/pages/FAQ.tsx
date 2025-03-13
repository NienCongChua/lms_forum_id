
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const faqCategories = [
  { id: 'account', title: 'Account & Profile' },
  { id: 'courses', title: 'Courses & Learning' },
  { id: 'forums', title: 'Forums & Discussions' },
  { id: 'technical', title: 'Technical Support' },
  { id: 'billing', title: 'Billing & Payments' },
  { id: 'content', title: 'Content Creation' }
];

// Sample FAQ data
const faqData = {
  account: [
    {
      question: "How do I update my profile information?",
      answer: "You can update your profile by clicking on your avatar in the top right corner, selecting 'Profile', and then clicking the 'Edit Profile' button. From there, you can update your personal information, profile picture, and other settings."
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "If you've forgotten your password, click 'Login' on the navigation menu, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link."
    },
    {
      question: "Can I change my username or email address?",
      answer: "You can change your email address in your account settings. However, usernames cannot be changed once an account is created to maintain consistency in the forums and course discussions."
    },
    {
      question: "How do I delete my account?",
      answer: "To delete your account, go to your Account Settings, scroll to the bottom, and click 'Delete Account'. Please note that this action is permanent and will remove all your data from our platform."
    }
  ],
  courses: [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, navigate to the course page and click the 'Enroll' button. If the course is free, you'll get immediate access. If it's a paid course, you'll be directed to the payment page to complete your enrollment."
    },
    {
      question: "Can I download course materials for offline viewing?",
      answer: "Yes, most course materials can be downloaded for offline viewing. Look for the download icon next to videos, PDFs, and other resources. Please note that downloaded materials are for personal use only."
    },
    {
      question: "How do I track my progress in a course?",
      answer: "Your course progress is automatically tracked as you complete lessons. You can view your overall progress on the course dashboard or in your user profile under 'My Courses'."
    },
    {
      question: "Do courses have completion certificates?",
      answer: "Many courses offer completion certificates. If a course provides a certificate, you'll see this mentioned on the course page. To earn a certificate, you typically need to complete all required components of the course with a passing grade."
    }
  ],
  forums: [
    {
      question: "How do I start a new discussion in the forums?",
      answer: "To start a new discussion, navigate to the Forums page and click the 'New Discussion' button. Choose a relevant category, add a title and content for your discussion, and then submit it."
    },
    {
      question: "Are there rules for posting in the forums?",
      answer: "Yes, we have community guidelines for forum participation. In general, be respectful to other users, don't post spam or promotional content, and make sure your posts are relevant to the discussion topic."
    },
    {
      question: "How do I follow a discussion thread?",
      answer: "To follow a discussion, click the 'Follow' button at the top of the discussion page. You'll receive notifications when new replies are added to the thread."
    },
    {
      question: "Can I edit or delete my forum posts?",
      answer: "You can edit your posts within 24 hours of posting. To edit, click the 'Edit' button below your post. Posts can be deleted by clicking 'Delete', but please note that this is permanent and cannot be undone."
    }
  ],
  technical: [
    {
      question: "What browsers are supported?",
      answer: "Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version."
    },
    {
      question: "Why won't videos play on my device?",
      answer: "If videos aren't playing, first check your internet connection. Then, make sure your browser is updated and has the necessary permissions to play video content. Clearing your browser cache can also help resolve playback issues."
    },
    {
      question: "The site is running slowly. What can I do?",
      answer: "If the site is running slowly, try clearing your browser cache and cookies. Make sure you're not running too many applications simultaneously, as this can affect performance. A stable internet connection is also important for optimal site performance."
    },
    {
      question: "How do I report a technical issue or bug?",
      answer: "To report a technical issue, click on 'Help' in the footer, then select 'Contact Support'. Provide as much detail as possible about the issue, including what steps you took, what happened, and what you expected to happen."
    }
  ],
  billing: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and in some regions, bank transfers. All payments are processed securely through our payment partners."
    },
    {
      question: "How do I update my payment information?",
      answer: "You can update your payment information in your Account Settings under the 'Billing' section. Click 'Edit Payment Method' to update your card details or change your payment method."
    },
    {
      question: "Can I get a refund for a course I purchased?",
      answer: "We offer a 30-day refund policy for most courses if you're not satisfied. To request a refund, go to your Purchase History in Account Settings and click 'Request Refund' next to the relevant course."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "To cancel a subscription, go to your Account Settings, select 'Subscriptions', and click 'Cancel Subscription' next to the subscription you want to end. Your access will continue until the end of the current billing period."
    }
  ],
  content: [
    {
      question: "How do I become a content creator?",
      answer: "To become a content creator, you need to apply through our Creator Program. Go to the 'Teach' section of our website and follow the application process. We review all applications and select creators based on expertise and teaching ability."
    },
    {
      question: "What are the requirements for course content?",
      answer: "Courses should be comprehensive, accurate, and professionally presented. They should include clear learning objectives, well-structured lessons, and appropriate assessments. All content must be original or properly licensed."
    },
    {
      question: "How are creator earnings calculated?",
      answer: "Creator earnings are based on a revenue-sharing model. You'll earn a percentage of the revenue from your course enrollments. The exact percentage depends on various factors and is detailed in the Creator Agreement."
    },
    {
      question: "Can I update my course after publishing it?",
      answer: "Yes, you can update your course content after publishing. In fact, we encourage creators to keep their courses current and relevant. Updates may include adding new lessons, updating existing content, or responding to student feedback."
    }
  ]
};

const FAQ = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('faqTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to the most common questions about our platform
          </p>
          
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search FAQs..." 
              className="pl-10 py-6 text-lg rounded-full"
            />
          </div>
        </div>
        
        <Tabs defaultValue="account" className="mb-12">
          <TabsList className="flex flex-wrap justify-center mb-8 h-auto">
            {faqCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="m-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(faqData).map((categoryId) => (
            <TabsContent key={categoryId} value={categoryId}>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {faqData[categoryId as keyof typeof faqData].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <div className="mb-4">{item.answer}</div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-muted-foreground">Was this helpful?</div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          Yes
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsDown className="h-4 w-4" />
                          No
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center bg-secondary/40 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the answer to your question, our support team is here to help!
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default FAQ;
