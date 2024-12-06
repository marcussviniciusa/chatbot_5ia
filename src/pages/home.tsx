import { AICard } from '@/components/ai/ai-card';
import { useAuth } from '@/lib/auth';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { aiOptions } from '@/lib/ai-config';

export function HomePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <header className="border-b border-dark-800 bg-dark-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Pandora Pro
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-dark-300">Olá, {user?.name}</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-dark-200 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
             Assistentes IA Jurídico 
            </h2>
            <p className="mt-2 text-dark-300">
              Selecione.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(aiOptions).map((ai) => (
              <AICard
                key={ai.title}
                title={ai.title}
                description={ai.description}
                icon={ai.icon}
                link={ai.link}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}