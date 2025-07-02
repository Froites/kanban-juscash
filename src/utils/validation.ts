export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Uma letra minúscula');
  }
  if (!/\d/.test(password)) {
    errors.push('Um número');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Um caractere especial');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateRequired = (value: string, fieldName: string): string | undefined => {
  return value.trim() ? undefined : `${fieldName} é obrigatório.`;
};

export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | undefined>
): Record<keyof T, string | undefined> => {
  const errors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;
  
  Object.keys(rules).forEach((key) => {
    const error = rules[key as keyof T](data[key as keyof T]);
    if (error) {
      errors[key as keyof T] = error;
    }
  });
  
  return errors;
};