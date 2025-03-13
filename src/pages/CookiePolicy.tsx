
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiePolicy = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('cookieTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Last updated: June 1, 2023
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                This Cookie Policy explains how EduForum ("we", "our", or "us") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2>2. What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, EduForum) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2>3. Why Do We Use Cookies?</h2>
              <p>
                We use first and third party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics and other purposes.
              </p>
              
              <h2>4. Types of Cookies We Use</h2>
              <p>
                The specific types of first and third party cookies served through our website and the purposes they perform are described below:
              </p>
              
              <h3>4.1 Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              
              <h3>4.2 Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3>4.3 Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.
              </p>
              
              <h3>4.4 Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h3>4.5 Social Media Cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our website through third party social networking and other websites. These cookies may also be used for advertising purposes too.
              </p>
              
              <h2>5. How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided below.
              </p>
              <p>
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
              </p>
              <p>
                In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com</a>.
              </p>
              
              <h2>6. Do You Serve Targeted Advertising?</h2>
              <p>
                Third parties may serve cookies on your computer or mobile device to serve advertising through our website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details or other personally identifying details unless you choose to provide these.
              </p>
              
              <h2>7. How Often Will You Update This Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2>8. Where Can You Get Further Information?</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at privacy@eduforum.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedTransition>
  );
};

export default CookiePolicy;
