
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('privacyTitle')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Last updated: June 1, 2023
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                EduForum ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our service, or interact with us in any way.
              </p>
              <p>
                We use your data to provide and improve our service. By using the service, you agree to the collection and use of information in accordance with this policy.
              </p>
              
              <h2>2. Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Information"). Personal Information may include, but is not limited to:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
              
              <h3>Usage Data</h3>
              <p>
                We may also collect information on how the service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>
              
              <h3>Tracking & Cookies Data</h3>
              <p>
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
              
              <h2>3. Use of Data</h2>
              <p>
                EduForum uses the collected data for various purposes:
              </p>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features of our service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
              
              <h2>4. Legal Basis for Processing Personal Information</h2>
              <p>
                EduForum will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.
              </p>
              <p>
                These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:
              </p>
              <ul>
                <li>We need it to provide you the services, including to operate the services, provide customer support and personalized features and to protect the safety and security of the services;</li>
                <li>It satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote the services and to protect our legal rights and interests;</li>
                <li>You give us consent to do so for a specific purpose; or</li>
                <li>We need to process your data to comply with a legal obligation.</li>
              </ul>
              
              <h2>5. Disclosure of Data</h2>
              <p>
                We may disclose your personal information in the following situations:
              </p>
              <ul>
                <li><strong>Business Transaction.</strong> If we are involved in a merger, acquisition or asset sale, your personal information may be transferred.</li>
                <li><strong>Disclosure for Law Enforcement.</strong> Under certain circumstances, we may be required to disclose your personal information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Other cases.</strong> We may disclose your information also:
                  <ul>
                    <li>To our subsidiaries and affiliates</li>
                    <li>To contractors, service providers, and other third parties we use to support our business</li>
                    <li>To fulfill the purpose for which you provide it</li>
                    <li>For any other purpose disclosed by us when you provide the information</li>
                    <li>With your consent</li>
                  </ul>
                </li>
              </ul>
              
              <h2>6. Security of Data</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              
              <h2>7. Your Rights</h2>
              <p>
                EduForum aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal information. If you wish to be informed what personal information we hold about you and if you want it to be removed from our systems, please contact us.
              </p>
              <p>
                In certain circumstances, you have the following data protection rights:
              </p>
              <ul>
                <li>The right to access, update or delete the information we have on you</li>
                <li>The right of rectification - You have the right to have your information rectified if that information is inaccurate or incomplete</li>
                <li>The right to object - You have the right to object to our processing of your personal information</li>
                <li>The right of restriction - You have the right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability - You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format</li>
                <li>The right to withdraw consent - You also have the right to withdraw your consent at any time where EduForum relied on your consent to process your personal information</li>
              </ul>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@eduforum.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedTransition>
  );
};

export default PrivacyPolicy;
