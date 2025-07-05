
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShowWaitlist: () => void;
  onRequestDemo: () => void;
  onNavigate: (sectionId: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onShowWaitlist, onRequestDemo, onNavigate }: MobileMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-background shadow-lg animate-in slide-in-from-top-5 duration-300">
      <nav className="container flex flex-col py-4 px-4">
        <button 
          className="py-3 px-2 text-left text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          onClick={() => {
            onNavigate('product');
            onClose();
          }}
        >
          Product
        </button>
        <button 
          className="py-3 px-2 text-left text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          onClick={() => {
            onNavigate('features');
            onClose();
          }}
        >
          Features
        </button>
        <button 
          className="py-3 px-2 text-left text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
          onClick={() => {
            onNavigate('contact');
            onClose();
          }}
        >
          Contact
        </button>
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
          <Button 
            variant="outline"
            className="w-full justify-center"
            onClick={() => {
              onShowWaitlist();
              onClose();
            }}
          >
            Join the Waitlist
          </Button>
          <Button 
            className="w-full justify-center"
            asChild
          >
            <Link to="/auth" onClick={() => onClose()}>
              <Lock className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
