import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertFarmerSchema, getStates, getDistrictsByState } from '@shared/schema';
import { getLocalizedStateName, getLocalizedDistrictName } from '@/lib/utils';

interface LoginFormProps {
  onLogin: (farmer: any) => void;
}

const states = getStates();

export function LoginForm({ onLogin }: LoginFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    state: '',
    district: ''
  });
  const [districts, setDistricts] = useState<string[]>([]);
  
  // Update districts when state changes
  useEffect(() => {
    if (formData.state) {
      const stateDistricts = getDistrictsByState(formData.state);
      setDistricts(stateDistricts.map(d => d.charAt(0).toUpperCase() + d.slice(1)));
      // Reset district if it's not in the new state
      if (formData.district && !stateDistricts.includes(formData.district.toLowerCase())) {
        setFormData(prev => ({ ...prev, district: '' }));
      }
    }
  }, [formData.state]);

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/farmers/login', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to FarmWise!",
        });
        onLogin(data.farmer);
      } else {
        throw new Error(data.error || 'Login failed');
      }
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    try {
      const validatedData = insertFarmerSchema.parse({
        ...formData,
        language: localStorage.getItem('farmwise-language') || 'en'
      });
      
      console.log('Validated data:', validatedData);
      loginMutation.mutate(validatedData);
    } catch (error) {
      console.error('Validation error:', error);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Leaf className="text-primary-foreground w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold" data-testid="login-title">
            {t('login.welcome')}
          </h1>
          <p className="text-muted-foreground" data-testid="login-subtitle">
            {t('app.description')}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="phone" data-testid="label-phone">
                  {t('login.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  data-testid="input-phone"
                />
              </div>
              
              <div>
                <Label htmlFor="name" data-testid="label-name">
                  {t('login.name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label htmlFor="state" data-testid="label-state">
                  {t('login.state')}
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, state: value, district: '' }))}
                  required
                >
                  <SelectTrigger data-testid="select-state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {t(getLocalizedStateName(state, localStorage.getItem('farmwise-language') || 'en'))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="district" data-testid="label-district">
                  {t('login.district')}
                </Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                  required
                  disabled={!formData.state}
                >
                  <SelectTrigger data-testid="select-district">
                    <SelectValue placeholder={formData.state ? "Select District" : "First select a state"} />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {t(getLocalizedDistrictName(district, localStorage.getItem('farmwise-language') || 'en'))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? 'Logging in...' : t('login.continue')}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span data-testid="security-note">{t('login.secure')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
