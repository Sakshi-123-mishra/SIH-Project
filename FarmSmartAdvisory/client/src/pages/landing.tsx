import { useState, useEffect } from 'react';
import { LanguageSelection } from '@/components/language-selection';
import { LoginForm } from '@/components/login-form';
import { useTranslation } from 'react-i18next';

interface LandingProps {
  onLogin: (farmer: any) => void;
}

export default function Landing({ onLogin }: LandingProps) {
  const { i18n } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);

  // Check if language was already selected
  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmwise-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setShowLogin(true);
    }
  }, [i18n]);

  const handleLanguageSelect = (language: string) => {
    localStorage.setItem('farmwise-language', language);
    setShowLogin(true);
  };

  const handleLogin = (farmer: any) => {
    localStorage.setItem('farmwise-farmer', JSON.stringify(farmer));
    onLogin(farmer);
  };

  if (showLogin) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
}
