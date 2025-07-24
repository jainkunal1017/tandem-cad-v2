
import { Link } from 'react-router-dom';
const LandingFooter = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        className="w-full max-w-7xl mx-auto rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden relative"
        style={{ 
          background: 'radial-gradient(ellipse at 20% 30%, #000000 0%, #0A0A0A 25%, #1a3a32 60%, #4ade80 100%)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" alt="Tandem Symbol" className="h-6 w-6 brightness-0 invert" />
            <span className="text-lg font-bold text-white">Tandem</span>
          </div>
          
          {/* Copyright - moved to center position */}
          <div className="hidden sm:block text-sm text-gray-300">© 2025 Tandem AI</div>
          
          {/* Mobile only copyright */}
          <div className="sm:hidden text-sm text-gray-300 text-center w-full mt-2">
            © 2025 Tandem Labs
          </div>
        </div>
      </div>
    </footer>
  );
};
export default LandingFooter;
