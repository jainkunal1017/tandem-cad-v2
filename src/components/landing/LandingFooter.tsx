
import { Link } from 'react-router-dom';
const LandingFooter = () => {
  return <footer className="bg-black text-white py-6 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" alt="Tandem Symbol" className="h-6 w-6" />
            <span className="text-lg font-bold">Tandem</span>
          </div>
          
          {/* Copyright - moved to center position */}
          <div className="hidden sm:block text-sm text-white/60">© 2025 Tandem AI</div>
          
          {/* Mobile only copyright */}
          <div className="sm:hidden text-sm text-white/60 text-center w-full mt-2">
            © 2025 Tandem Labs
          </div>
        </div>
      </div>
    </footer>;
};
export default LandingFooter;
