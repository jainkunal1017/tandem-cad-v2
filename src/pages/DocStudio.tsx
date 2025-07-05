
import FileBrowser from '@/components/dashboard/FileBrowser';
import ActionCards from '@/components/dashboard/ActionCards';

const DocStudio = () => {
  return (
    <div className="h-screen flex bg-white">
      {/* File Browser - Left Side */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <FileBrowser />
      </div>
      
      {/* Main Content - Right Side */}
      <div className="flex-1 bg-white">
        <ActionCards />
      </div>
    </div>
  );
};

export default DocStudio;
