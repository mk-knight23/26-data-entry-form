import { useUserStore } from '../stores/userStore';
import { Moon, Sun, Bell } from 'lucide-react';

export default function Settings() {
  const userStore = useUserStore();
  
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between mb-4">
            <span>Theme</span>
            <button
              onClick={() => userStore.updateSettings({ theme: userStore.settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 rounded-lg bg-white/10"
            >
              {userStore.settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>Notifications</span>
            <button
              onClick={() => userStore.updateSettings({ notifications: !userStore.settings.notifications })}
              className={`p-2 rounded-lg ${userStore.settings.notifications ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              {userStore.settings.notifications ? 'On' : 'Off'}
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Profile</h3>
          <input
            type="text"
            placeholder="Your name"
            value={userStore.profile.name}
            onChange={(e) => userStore.updateProfile({ name: e.target.value })}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>
      </div>
    </div>
  );
}
