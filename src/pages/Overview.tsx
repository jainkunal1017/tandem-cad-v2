
import OverviewHeroCard from '@/components/dashboard/OverviewHeroCard';
import ActivityTable from '@/components/dashboard/ActivityTable';

const Overview = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <OverviewHeroCard />
      <ActivityTable />
    </div>
  );
};

export default Overview;
