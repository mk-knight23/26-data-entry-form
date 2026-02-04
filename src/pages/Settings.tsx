import { useUserStore } from '../stores/userStore';
import { Moon, Sun, Bell } from 'lucide-react';

export default function Settings() {
  const userStore = useUserStore();
  
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Settings</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Appearance</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-700">Theme</span>
            <button
              onClick={() => userStore.updateSettings({ theme: userStore.settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {userStore.settings.theme === 'light' ? <Moon size={20} className="text-slate-700" /> : <Sun size={20} className="text-slate-700" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Notifications</span>
            <button
              onClick={() => userStore.updateSettings({ notifications: !userStore.settings.notifications })}
              className={`p-2 rounded-lg font-medium text-sm ${userStore.settings.notifications ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'}`}
            >
              {userStore.settings.notifications ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile</h3>
          <input
            type="text"
            placeholder="Your name"
            value={userStore.profile.name}
            onChange={(e) => userStore.updateProfile({ name: e.target.value })}
            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
