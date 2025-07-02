import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { validateEmail, validatePassword, validateRequired } from '@/utils/validation';
import { RegisterData } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import logo_verde from '@/assets/logo_verde.png';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<RegisterData>({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    senha?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof RegisterData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validar nome
    const nomeError = validateRequired(formData.nome, 'Nome');
    if (nomeError) {
      newErrors.nome = nomeError;
    }

    // Validar email
    const emailError = validateRequired(formData.email, 'E-mail');
    if (emailError) {
      newErrors.email = emailError;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }

    const passwordValidation = validatePassword(formData.senha);
    if (!passwordValidation.isValid) {
      newErrors.senha = `A senha deve ter: ${passwordValidation.errors.join(', ')}.`;
    }

    // Validar confirmação de senha
    if (formData.senha !== formData.confirmPassword) {
      newErrors.confirmPassword = 'A confirmação de senha não corresponde.';
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
      const success = await register(formData);
      if (success) {
        showToast('Cadastro realizado com sucesso! Bem-vindo(a)!', 'success', 5000);
        navigate('/kanban');
      }
    } catch (error: any) {
      if (error.error?.includes('Email já cadastrado')) {
        setErrors({
          general: 'E-mail já cadastrado. Tente fazer login.',
        });
      } else if (error.error?.includes('senha')) {
        setErrors({
          senha: error.error,
        });
      } else {
        setErrors({
          general: error.error || 'Ocorreu um problema. Tente novamente mais tarde.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src={logo_verde} alt="Logo JusCash" className="h-18 mx-auto mb-2" />
          {/* <h1 className="text-3xl font-bold text-juscash_blue mb-2">JusCash</h1> */}
          {/* <p className="text-gray-600">Crie sua conta</p> - Melhoria */}
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <Input
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange('nome')}
              error={errors.nome}
              leftIcon={<User className="w-5 h-5 text-gray-400" />}
              required
            />

            {/* Email */}
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
              required
            />

            {/* Senha */}
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie uma senha"
              value={formData.senha}
              onChange={handleChange('senha')}
              error={errors.senha}
              required
              leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              hint="Mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial"
            />

            {/* Confirmar Senha */}
            <Input
              label="Confirme sua senha"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />

            {errors.general && (
              <ErrorMessage message={errors.general} variant="card" />
            )}

            <Button type="submit" variant="juscash" size="lg" isLoading={isLoading} className="w-full">
              Criar conta
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                Já possui uma conta? Fazer o login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};