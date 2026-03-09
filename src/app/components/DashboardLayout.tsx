import {
  Code2,
  LayoutDashboard,
  Upload,
  FileText,
  CreditCard,
  LogOut,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Upload Content', path: '/dashboard/upload' },
  { icon: FileText, label: 'My Uploads', path: '/dashboard/uploads' },
  { icon: BookOpen, label: 'Library', path: '/dashboard/library' },
  { icon: CreditCard, label: 'Subscription', path: '/dashboard/subscription' },
];

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const notifications = [
    { id: 1, text: 'Your upload "React Hooks" is ready', time: '2m ago', unread: true },
    { id: 2, text: 'Pro trial expires in 3 days', time: '1h ago', unread: true },
    { id: 3, text: 'New feature: AI-powered search', time: '1d ago', unread: false },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#111418' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-transform duration-300 w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: '#1A1F24', borderRight: '1px solid #2A2F35' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid #2C3238' }}>
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)' }}
            >
              <Code2 className="w-4 h-4" style={{ color: '#111418' }} strokeWidth={2.5} />
            </div>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>DevFlow</span>
          </Link>
          <button className="lg:hidden p-1" style={{ color: '#9AA4B2' }} onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Pill */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid #2C3238' }}>
          <div
            className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all"
            style={{ backgroundColor: 'rgba(42,47,53,0.5)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', color: '#111418', fontWeight: 700 }}
            >
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate" style={{ color: '#FFFFFF', fontWeight: 600 }}>Mufiza Dev</p>
              <p className="text-xs truncate" style={{ color: '#9AA4B2' }}>Free Plan</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#9AA4B2' }} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs uppercase tracking-widest px-3 mb-3" style={{ color: '#9AA4B2', opacity: 0.6 }}>
            Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={
                isActive(item.path)
                  ? {
                      backgroundColor: 'rgba(74,222,128,0.12)',
                      color: '#4ADE80',
                      borderLeft: '2px solid #4ADE80',
                    }
                  : {
                      color: '#9AA4B2',
                      borderLeft: '2px solid transparent',
                    }
              }
              onMouseEnter={e => {
                if (!isActive(item.path)) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(42,47,53,0.7)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(item.path)) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#9AA4B2';
                }
              }}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom — Usage & Logout */}
        <div className="px-4 py-4 space-y-4" style={{ borderTop: '1px solid #2C3238' }}>
          {/* Usage bar */}
          <div className="px-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: '#9AA4B2' }}>Storage Used</span>
              <span style={{ color: '#4ADE80' }}>24 / 50</span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#2A2F35' }}>
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: '48%',
                  background: 'linear-gradient(90deg, #4ADE80, #22C55E)',
                }}
              />
            </div>
          </div>

          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
            style={{ color: '#9AA4B2' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(212,53,61,0.1)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#F87171';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#9AA4B2';
            }}
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between gap-4"
          style={{ backgroundColor: '#1A1F24', borderBottom: '1px solid #2A2F35' }}
        >
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#9AA4B2' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9AA4B2' }} />
            <input
              type="text"
              placeholder="Search your library..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
              style={{
                backgroundColor: '#111418',
                borderColor: '#2A2F35',
                color: '#FFFFFF',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#4ADE80')}
              onBlur={e => (e.currentTarget.style.borderColor = '#2A2F35')}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all"
                style={{ backgroundColor: '#111418', borderColor: '#2A2F35', color: '#9AA4B2' }}
              >
                <Bell className="w-4 h-4" />
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#4ADE80' }}
                />
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 top-12 w-80 rounded-2xl border shadow-2xl overflow-hidden z-50"
                  style={{ backgroundColor: '#1A1F24', borderColor: '#2A2F35' }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: '#2C3238' }}>
                    <h3 className="text-sm" style={{ color: '#FFFFFF', fontWeight: 600 }}>Notifications</h3>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 border-b cursor-pointer transition-all hover:opacity-80"
                      style={{
                        borderColor: '#2C3238',
                        backgroundColor: n.unread ? 'rgba(74,222,128,0.05)' : 'transparent',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {n.unread && (
                          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#4ADE80' }} />
                        )}
                        <div className={n.unread ? '' : 'ml-5'}>
                          <p className="text-sm" style={{ color: '#FFFFFF' }}>{n.text}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#9AA4B2' }}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 text-center">
                    <span className="text-xs" style={{ color: '#4ADE80' }}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #4ADE80, #22C55E)', color: '#111418', fontWeight: 700 }}
            >
              M
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}