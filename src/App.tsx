import { Outlet, Link } from 'react-router';
import { Database, FileText, Settings, ShieldCheck, Home, BarChart3 } from 'lucide-react';

export default function App() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex border-t-4 border-indigo-600">
            {/* Sidebar Info */}
            <aside className="hidden lg:flex w-[400px] flex-col p-12 bg-white border-r border-slate-200">
                <div className="mb-20 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Database className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-black tracking-tighter uppercase">Form<span className="text-indigo-600">Flow</span></h1>
                </div>

                <nav className="space-y-6 mb-12">
                    <Link to="/" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                        <Home className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wider">Home</span>
                    </Link>
                    <Link to="/stats" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wider">Statistics</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wider">Settings</span>
                    </Link>
                </nav>

                <div className="space-y-12 flex-1">
                    <section>
                        <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-6">Workflow Status</h2>
                        <div className="space-y-6">
                            {[
                                { label: 'Validation Engine', status: 'Operational', color: 'text-emerald-500' },
                                { label: 'Database Sync', status: 'Encrypted', color: 'text-indigo-500' },
                                { label: 'Form version', status: 'v2.5.0', color: 'text-slate-900' }
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className={item.color}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                        <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Enterprise Security</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">All inputs are validated, sanitized, and encrypted with AES-256 before being committed to the vault.</p>
                    </section>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Settings className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Portal Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 lg:p-20 flex flex-col overflow-y-auto" role="main">
                <Outlet />
            </main>
        </div>
    );
}
