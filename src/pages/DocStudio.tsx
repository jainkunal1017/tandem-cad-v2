
import FileBrowser from '@/components/dashboard/FileBrowser';
import ActionCards from '@/components/dashboard/ActionCards';

const DocStudio = () => {
  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700">
        <FileBrowser />
      </div>
      <div className="flex-1 p-8">
        <ActionCards />
      </div>
    </div>
  );
};

export default DocStudio;
