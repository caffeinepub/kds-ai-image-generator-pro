import { useState } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import ProfileSetupModal from '../auth/ProfileSetupModal';
import ToolNav from '../nav/ToolNav';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const navigate = useNavigate();
  const routerState = useRouterState();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <img 
                src="/assets/generated/kdsai-logo.dim_512x512.png" 
                alt="KDS AI Logo" 
                className="h-10 w-10 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tight">KDS AI</span>
                <span className="text-xs text-muted-foreground">Image Generator Pro</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant={routerState.location.pathname === '/' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => navigate({ to: '/' })}
              >
                Dashboard
              </Button>
              <Button
                variant={routerState.location.pathname === '/tools' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => navigate({ to: '/tools' })}
              >
                Tools
              </Button>
              {isAuthenticated && (
                <Button
                  variant={routerState.location.pathname.startsWith('/my-projects') ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => navigate({ to: '/my-projects' })}
                >
                  My Projects
                </Button>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && userProfile && (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Welcome,</span>
                <span className="font-medium">{userProfile.name}</span>
              </div>
            )}
            <LoginButton />
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="flex flex-col gap-4 py-4">
                  {isAuthenticated && userProfile && (
                    <div className="px-2 py-3 border-b border-border">
                      <p className="text-sm text-muted-foreground">Signed in as</p>
                      <p className="font-medium">{userProfile.name}</p>
                    </div>
                  )}
                  <ToolNav onNavigate={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © 2026. Built with <Sparkles className="inline h-4 w-4 text-accent" /> using{' '}
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs">
              All processing happens locally in your browser
            </p>
          </div>
        </div>
      </footer>

      {/* Profile Setup Modal */}
      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
