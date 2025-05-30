import { AppHeader } from '@/components/layout/header';
import DashboardClientContent from './dashboard-client-content';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-grow">
        <DashboardClientContent />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} Happiness Hub. Powered by Data & AI.
      </footer>
    </div>
  );
}
