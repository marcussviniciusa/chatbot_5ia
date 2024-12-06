import { AuthForm } from '@/components/auth/auth-form';
import { Scale } from 'lucide-react';

export function AuthPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Scale className="h-12 w-12 text-blue-400" />
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}