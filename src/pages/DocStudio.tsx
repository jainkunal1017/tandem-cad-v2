
import FileBrowser from '@/components/dashboard/FileBrowser';
import ActionCards from '@/components/dashboard/ActionCards';

const DocStudio = () => {
  return (
    <div className="h-full flex">
      {/* File Browser - Left Side */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <FileBrowser />
      </div>
      
      {/* Main Content - Right Side */}
      <div className="flex-1 p-8 bg-white">
        <ActionCards />
      </div>
    </div>
  );
};

export default DocStudio;
