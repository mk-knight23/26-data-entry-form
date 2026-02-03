import { useUserStore } from '../stores/userStore';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

export default function Stats() {
  const userStore = useUserStore();
  
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-lg">
          <p className="text-sm opacity-70">Total Visits</p>
          <p className="text-3xl font-bold">{userStore.stats.totalVisits}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg">
          <p className="text-sm opacity-70">Projects Created</p>
          <p className="text-3xl font-bold">{userStore.stats.projectsCreated}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg">
          <p className="text-sm opacity-70">Session Score</p>
          <p className="text-3xl font-bold">{Math.min(100, userStore.stats.totalVisits * 5)}</p>
        </div>
      </div>
    </div>
  );
}
