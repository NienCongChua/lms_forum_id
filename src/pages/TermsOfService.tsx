
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsOfService = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('termsTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Last updated: June 1, 2023
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to EduForum ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website and services (collectively, the "Service") operated by EduForum.
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
              
              <h2>2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2>3. Content</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
              </p>
              
              <h2>4. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of EduForum and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of EduForum.
              </p>
              
              <h2>5. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
              </p>
              
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall EduForum, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
              
              <h2>7. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at legal@eduforum.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedTransition>
  );
};

export default TermsOfService;
