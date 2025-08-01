import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        {/* Eclipse Logo Animation */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-primary-glow eclipse-loading eclipse-glow mx-auto">
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl">🌘</span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text eclipse-text-glow">
            HOKKAIDO ECLIPSE
          </h1>
          <p className="text-muted-foreground animate-pulse">
            Loading elite experience...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-secondary rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-glow animate-fade-in" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;