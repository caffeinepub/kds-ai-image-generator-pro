import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '../ui/button';
import { Lock } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { identity, login, loginStatus } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="rounded-full bg-muted p-6">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-muted-foreground max-w-md">
            Please log in to access your projects and save your work.
          </p>
        </div>
        <Button onClick={login} disabled={loginStatus === 'logging-in'} size="lg">
          {loginStatus === 'logging-in' ? 'Logging in...' : 'Log In'}
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
