
import DocStudioHeroCard from '@/components/dashboard/DocStudioHeroCard';
import FilesTable from '@/components/dashboard/FilesTable';

const DocStudio = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <DocStudioHeroCard />
      <FilesTable />
    </div>
  );
};

export default DocStudio;
