
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Lock } from 'lucide-react';
import MobileMenu from './MobileMenu';

interface LandingHeaderProps {
  onShowWaitlist: () => void;
  onRequestDemo: () => void;
}

const LandingHeader = ({ onShowWaitlist, onRequestDemo }: LandingHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle smooth scrolling when clicking navigation links
  const scrollToSection = (elementId: string) => {
    setIsMenuOpen(false); // Close mobile menu if open
    
    const element = document.getElementById(elementId);
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled 
          ? 'backdrop-blur-md bg-background/70 shadow-sm' 
          : 'backdrop-blur-sm bg-background/50'
      } border-b border-border/50`}
    >
      <div className="container flex items-center justify-between h-16 md:h-18 px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/89d84111-7606-492c-9784-5785924d0f35.png" 
              alt="Tandem Symbol" 
              className="h-8 w-8" 
            />
            <span className="text-lg md:text-xl font-bold">Tandem</span>
          </Link>
          
          {/* Nav Links - Hidden on mobile */}
          <nav className="hidden md:flex gap-6 ml-6">
            <button 
              onClick={() => scrollToSection('product')} 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-transform hover:scale-[1.02]"
            onClick={() => scrollToSection('waitlist')}
          >
            Join the Waitlist
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02]"
            asChild
          >
            <Link to="/auth">
              <Lock className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onShowWaitlist={() => scrollToSection('waitlist')}
        onRequestDemo={onRequestDemo}
        onNavigate={scrollToSection}
      />
    </header>
  );
};

export default LandingHeader;
