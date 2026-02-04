import { useUserStore } from '../stores/userStore';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

export default function Stats() {
  const userStore = useUserStore();
  
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Visits</p>
          <p className="text-3xl font-bold text-slate-900">{userStore.stats.totalVisits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Projects Created</p>
          <p className="text-3xl font-bold text-slate-900">{userStore.stats.projectsCreated}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Session Score</p>
          <p className="text-3xl font-bold text-slate-900">{Math.min(100, userStore.stats.totalVisits * 5)}</p>
        </div>
      </div>
    </div>
  );
}
