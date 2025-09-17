import React from 'react';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-sidebar-border bg-card mt-8">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Copyright © Designed & Developed by VKnightHub 2022
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-[#6c5ce7] transition-colors flex items-center gap-1"
              title="Vcoincheck Website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-[#6c5ce7] transition-colors flex items-center gap-1"
              title="Vcoincheck Social"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-[#6c5ce7] transition-colors flex items-center gap-1"
              title="Vcoincheck Community"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}