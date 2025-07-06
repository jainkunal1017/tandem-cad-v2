
import OverviewHeroCard from '@/components/dashboard/OverviewHeroCard';
import ActivityTable from '@/components/dashboard/ActivityTable';

const Overview = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <OverviewHeroCard />
      <ActivityTable />
    </div>
  );
};

export default Overview;
