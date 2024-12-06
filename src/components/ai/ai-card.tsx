import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: string;
  link?: string;
}

export function AICard({ title, description, icon: Icon, type, link }: AICardProps) {
  return (
    <div className="rounded-lg border border-dark-800 bg-dark-900 p-6 shadow-lg transition-all hover:border-dark-700 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dark-800">
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-4 text-dark-300">{description}</p>
      <Button 
        onClick={() => link && window.open(link, '_blank')}
        className={cn(
          "w-full",
          link 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-dark-700 cursor-not-allowed"
        )}
        disabled={!link}
      >
        {link ? 'Acessar' : 'Coming Soon'}
      </Button>
    </div>
  );
}