import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi' | 'fr' | 'es';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Common translations used throughout the application
export const translations: Translations = {
  // Footer translations
  platformTitle: {
    en: 'Platform',
    vi: 'Nền tảng',
    fr: 'Plateforme',
    es: 'Plataforma',
  },
  forums: {
    en: 'Forums',
    vi: 'Diễn đàn',
    fr: 'Forums',
    es: 'Foros',
  },
  courses: {
    en: 'Courses',
    vi: 'Khóa học',
    fr: 'Cours',
    es: 'Cursos',
  },
  teachers: {
    en: 'Teachers',
    vi: 'Giáo viên',
    fr: 'Enseignants',
    es: 'Profesores',
  },
  resources: {
    en: 'Resources',
    vi: 'Tài nguyên',
    fr: 'Ressources',
    es: 'Recursos',
  },
  supportTitle: {
    en: 'Support',
    vi: 'Hỗ trợ',
    fr: 'Support',
    es: 'Soporte',
  },
  helpCenter: {
    en: 'Help Center',
    vi: 'Trung tâm trợ giúp',
    fr: 'Centre d\'aide',
    es: 'Centro de ayuda',
  },
  faq: {
    en: 'FAQ',
    vi: 'Câu hỏi thường gặp',
    fr: 'FAQ',
    es: 'Preguntas frecuentes',
  },
  contactUs: {
    en: 'Contact Us',
    vi: 'Liên hệ',
    fr: 'Contactez-nous',
    es: 'Contáctenos',
  },
  feedback: {
    en: 'Feedback',
    vi: 'Phản hồi',
    fr: 'Commentaires',
    es: 'Comentarios',
  },
  legalTitle: {
    en: 'Legal',
    vi: 'Pháp lý',
    fr: 'Mentions légales',
    es: 'Legal',
  },
  termsOfService: {
    en: 'Terms of Service',
    vi: 'Điều khoản dịch vụ',
    fr: 'Conditions d\'utilisation',
    es: 'Términos de servicio',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    vi: 'Chính sách bảo mật',
    fr: 'Politique de confidentialité',
    es: 'Política de privacidad',
  },
  cookiePolicy: {
    en: 'Cookie Policy',
    vi: 'Chính sách cookie',
    fr: 'Politique des cookies',
    es: 'Política de cookies',
  },
  allRightsReserved: {
    en: 'All rights reserved',
    vi: 'Tất cả các quyền được bảo lưu',
    fr: 'Tous droits réservés',
    es: 'Todos los derechos reservados',
  },
  // Resources page
  resourcesTitle: {
    en: 'Learning Resources',
    vi: 'Tài nguyên học tập',
    fr: 'Ressources d\'apprentissage',
    es: 'Recursos de aprendizaje',
  },
  resourcesSubtitle: {
    en: 'Browse our collection of learning materials',
    vi: 'Khám phá bộ sưu tập tài liệu học tập của chúng tôi',
    fr: 'Parcourez notre collection de matériel d\'apprentissage',
    es: 'Explore nuestra colección de materiales de aprendizaje',
  },
  // Teachers page
  teachersTitle: {
    en: 'Our Teachers',
    vi: 'Giáo viên của chúng tôi',
    fr: 'Nos enseignants',
    es: 'Nuestros profesores',
  },
  teachersSubtitle: {
    en: 'Meet our experienced educators',
    vi: 'Gặp gỡ các nhà giáo dục giàu kinh nghiệm của chúng tôi',
    fr: 'Rencontrez nos éducateurs expérimentés',
    es: 'Conozca a nuestros educadores experimentados',
  },
  // Help Center
  helpCenterTitle: {
    en: 'Help Center',
    vi: 'Trung tâm trợ giúp',
    fr: 'Centre d\'aide',
    es: 'Centro de ayuda',
  },
  helpCenterSubtitle: {
    en: 'Find answers to your questions',
    vi: 'Tìm câu trả lời cho câu hỏi của bạn',
    fr: 'Trouvez des réponses à vos questions',
    es: 'Encuentre respuestas a sus preguntas',
  },
  // FAQ
  faqTitle: {
    en: 'Frequently Asked Questions',
    vi: 'Câu hỏi thường gặp',
    fr: 'Questions fréquemment posées',
    es: 'Preguntas frecuentes',
  },
  // Contact
  contactTitle: {
    en: 'Contact Us',
    vi: 'Liên hệ với chúng tôi',
    fr: 'Contactez-nous',
    es: 'Contáctenos',
  },
  contactSubtitle: {
    en: 'Get in touch with our team',
    vi: 'Liên hệ với đội ngũ của chúng tôi',
    fr: 'Contactez notre équipe',
    es: 'Póngase en contacto con nuestro equipo',
  },
  // Feedback
  feedbackTitle: {
    en: 'Feedback',
    vi: 'Phản hồi',
    fr: 'Commentaires',
    es: 'Comentarios',
  },
  feedbackSubtitle: {
    en: 'Share your thoughts and suggestions',
    vi: 'Chia sẻ suy nghĩ và đề xuất của bạn',
    fr: 'Partagez vos pensées et suggestions',
    es: 'Comparta sus pensamientos y sugerencias',
  },
  // Terms
  termsTitle: {
    en: 'Terms of Service',
    vi: 'Điều khoản dịch vụ',
    fr: 'Conditions d\'utilisation',
    es: 'Términos de servicio',
  },
  // Privacy
  privacyTitle: {
    en: 'Privacy Policy',
    vi: 'Chính sách bảo mật',
    fr: 'Politique de confidentialité',
    es: 'Política de privacidad',
  },
  // Cookie
  cookieTitle: {
    en: 'Cookie Policy',
    vi: 'Chính sách cookie',
    fr: 'Politique des cookies',
    es: 'Política de cookies',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (translations[key]?.[language]) {
      return translations[key][language];
    }
    return key; // Fallback to key if translation is not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
