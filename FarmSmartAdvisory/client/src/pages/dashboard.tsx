import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Volume2, Settings as SettingsIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/navigation';
import { CropRecommendation } from '@/components/crop-recommendation';
import { YieldPrediction } from '@/components/yield-prediction';
import { PredictionHistory } from '@/components/prediction-history';
import { SettingsModal } from '@/components/settings-modal';
import { useVoice } from '@/hooks/use-voice';
import { useOffline } from '@/hooks/use-offline';

interface DashboardProps {
  farmer: any;
  onLogout: () => void;
}

export default function Dashboard({ farmer, onLogout }: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { settings: voiceSettings, updateSettings: updateVoiceSettings } = useVoice();
  const { isOnline } = useOffline();
  const [activeTab, setActiveTab] = useState('crop-recommendation');
  const [showSettings, setShowSettings] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Listen for install prompt event
    const handleInstallPrompt = () => {
      setShowInstallPrompt(true);
    };
    
    window.addEventListener('showInstallPrompt', handleInstallPrompt);
    
    // Show install prompt after 5 seconds
    const timer = setTimeout(() => {
      setShowInstallPrompt(true);
    }, 5000);

    return () => {
      window.removeEventListener('showInstallPrompt', handleInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleMakePrediction = () => {
    setActiveTab('crop-recommendation');
  };

  const handleLogout = () => {
    localStorage.removeItem('farmwise-farmer');
    localStorage.removeItem('farmwise-language');
    // Reset i18n to default language
    i18n.changeLanguage('en');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Header */}
      <header className="bg-card border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between max-w-6xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="text-primary-foreground w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold" data-testid="app-title">{t('app.title')}</h1>
              <p className="text-sm text-muted-foreground" data-testid="farmer-name">
                {farmer.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateVoiceSettings({ enabled: !voiceSettings.enabled })}
              data-testid="button-toggle-voice"
            >
              <Volume2 className={`w-5 h-5 ${voiceSettings.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="hidden md:flex"
              data-testid="button-open-settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </Button>
            {/* Offline Status Indicator */}
            <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-primary' : 'bg-orange-500'}`} />
              <span className="text-xs text-muted-foreground" data-testid="connection-status">
                {isOnline ? t('status.online') : t('status.offline')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Content Area */}
      <main className="container mx-auto max-w-6xl px-4 py-6">
        {activeTab === 'crop-recommendation' && (
          <CropRecommendation farmer={farmer} />
        )}
        {activeTab === 'yield-prediction' && (
          <YieldPrediction farmer={farmer} />
        )}
        {activeTab === 'history' && (
          <PredictionHistory farmer={farmer} onMakePrediction={handleMakePrediction} />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        farmer={farmer}
        onLogout={handleLogout}
      />

      {/* Install PWA Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 bg-card border rounded-lg p-4 shadow-lg z-20">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1" data-testid="install-title">
                Install FarmWise App
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="install-description">
                Get faster access and work offline
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInstallPrompt(false)}
                data-testid="button-dismiss-install"
              >
                Later
              </Button>
              <Button
                size="sm"
                onClick={async () => {
                  const { installApp } = await import('@/lib/pwa');
                  const installed = await installApp();
                  if (installed) {
                    setShowInstallPrompt(false);
                  }
                }}
                data-testid="button-install-app"
              >
                Install
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
