import React from 'react';
import { Navigation } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Navigation className="h-8 w-8 text-primary-600" />
    </div>
  );
};

export default Logo;