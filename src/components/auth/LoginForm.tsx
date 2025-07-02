import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { validateEmail, validateRequired } from '@/utils/validation';
import { LoginCredentials } from '@/types';
import logo_verde from '@/assets/logo_verde.png';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    senha: '',
  });
  
  const [errors, setErrors] = useState<{
    email?: string;
    senha?: string;
    general?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginCredentials) => (value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validar email
    const emailError = validateRequired(credentials.email, 'E-mail');
    if (emailError) {
      newErrors.email = emailError;
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }

    // Validar senha
    const senhaError = validateRequired(credentials.senha, 'Senha');
    if (senhaError) {
      newErrors.senha = senhaError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(credentials);
      if (success) {
        navigate('/kanban');
      }
    } catch (error: any) {
      console.log('Erro completo recebido:', error);
      console.log('Status do erro:', error.status);
      if (error.status === 401) {
        setErrors({
          general: 'Credenciais inválidas. Verifique o e-mail e a senha e tente novamente.',
        });
      } else {
        setErrors({
          general: 'Ocorreu um problema. Tente novamente mais tarde.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <img src={logo_verde} alt="Logo JusCash" className="h-18 mx-auto mb-2" />
          {/* <h1 className="text-3xl font-bold text-juscash_blue mb-2">JusCash</h1> */}
          {/* <p className="text-gray-600">Faça login em sua conta</p>  - MELHRORIA */}
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={credentials.email}
              onChange={handleChange('email')}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
            />

            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={credentials.senha}
              onChange={handleChange('senha')}
              error={errors.senha}
              leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            {/* Error message */}
            {errors.general && (
              <ErrorMessage message={errors.general} variant="card" />
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="juscash"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Login
            </Button>

            {/* Links */}
            <div className="text-center space-y-2">
              <Link
                to="/register"
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                Não possui uma conta? Cadastre-se
              </Link>
              
              <div>
                <Link
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  to="/forgot-password"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
          </form>
        </Card>

        {import.meta.env.VITE_ENABLE_MOCK_DATA === 'true' && (
          <Card padding="sm" className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-xs text-blue-600 font-medium mb-2">
                Credenciais para teste:
              </p>
              <p className="text-xs text-blue-700">
                <strong>E-mail:</strong> test@test.com<br />
                <strong>Senha:</strong> Test@123
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
