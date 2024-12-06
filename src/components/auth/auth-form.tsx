import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const currentForm = isLogin ? loginForm : registerForm;

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setError(null);
    
    if (isLogin) {
      const result = await login(data as LoginFormData);
      if (result.success) {
        navigate('/home');
      } else {
        setError(result.message);
      }
    } else {
      const result = await registerUser(data as RegisterFormData);
      if (result.success) {
        setError(result.message);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {isLogin ? 'Entre na sua conta' : 'Create a new account'}
        </h2>
      </div>

      {error && (
        <div className="rounded-md bg-red-900/20 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={currentForm.handleSubmit(onSubmit)}>
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark-200">
              Name
            </label>
            <Input
              id="name"
              type="text"
              {...registerForm.register('name')}
              className="mt-1 bg-dark-900 border-dark-700 text-white placeholder-dark-400"
            />
            {registerForm.formState.errors.name && (
              <p className="mt-1 text-sm text-red-400">{registerForm.formState.errors.name.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-200">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            {...currentForm.register('email')}
            className="mt-1 bg-dark-900 border-dark-700 text-white placeholder-dark-400"
          />
          {currentForm.formState.errors.email && (
            <p className="mt-1 text-sm text-red-400">{currentForm.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark-200">
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...currentForm.register('password')}
            className="mt-1 bg-dark-900 border-dark-700 text-white placeholder-dark-400"
          />
          {currentForm.formState.errors.password && (
            <p className="mt-1 text-sm text-red-400">{currentForm.formState.errors.password.message}</p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-200">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...registerForm.register('confirmPassword')}
              className="mt-1 bg-dark-900 border-dark-700 text-white placeholder-dark-400"
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{registerForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {isLogin ? 'Entrar' : 'Sign up'}
          </Button>
        </div>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            loginForm.reset();
            registerForm.reset();
          }}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {isLogin
            ? "Não tem conta? Inscreva-se agora"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}