import {
  Code2,
  LayoutDashboard,
  LogOut,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
  Brain,
  MonitorPlay,
  Trophy,
  Lightbulb,
  TrendingUp,
  Map as MapIcon,
  User,
  Medal,
  CreditCard,
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router';
import { useState, useCallback, useRef, useEffect, type LucideIcon } from 'react';
import { FocusBar } from './FocusBar';

// ─── Constants ────────────────────────────────────────────────────────────────
const EXPANDED_W  = 260;
const COLLAPSED_W = 72;

// Sidebar: near-invisible dark slate — merges naturally with the page
const SIDEBAR_BG     = 'linear-gradient(180deg, #0B1018 0%, #0C1220 60%, #0F172A 100%)';
const SIDEBAR_BORDER = '1px solid rgba(255,255,255,0.045)';
const DIVIDER        = '1px solid rgba(255,255,255,0.04)';
const ACTIVE_BG      = 'rgba(16,185,129,0.07)';
const ACTIVE_COLOR   = '#34D399';
const HOVER_BG_EXP   = 'rgba(255,255,255,0.04)';
const HOVER_BG_COL   = 'rgba(255,255,255,0.05)';
const HOVER_TEXT     = '#94A3B8';
const DEFAULT_TEXT   = '#3D4F63';
const SECTION_LABEL  = '#1A2333';

// ─── Nav data ─────────────────────────────────────────────────────────────────
const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/dashboard' },
  { icon: Brain,           label: 'Focus Mode',   path: '/dashboard/focus-mode' },
  { icon: MonitorPlay,     label: 'Coding Arena', path: '/dashboard/coding-arena' },
  { icon: Trophy,          label: 'Competitions', path: '/dashboard/competitions' },
  { icon: Lightbulb,       label: 'Career AI',    path: '/dashboard/career-ai' },
  { icon: TrendingUp,      label: 'Skill Gap',    path: '/dashboard/skill-gap' },
  { icon: MapIcon,         label: 'Roadmap',      path: '/dashboard/roadmap' },
];

const accountNavItems = [
  { icon: User,       label: 'Profile',     path: '/dashboard/profile' },
  { icon: Medal,      label: 'Leaderboard', path: '/dashboard/leaderboard' },
  { icon: CreditCard, label: 'Pricing',     path: '/pricing' },
];

// ─── Tooltip state type ───────────────────────────────────────────────────────
interface TooltipState {
  label: string;
  y: number;
}

// ─── EXPANDED NavItem ─────────────────────────────────────────────────────────
interface NavItemExpandedProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
  onClick?: () => void;
}

function NavItemExpanded({ icon: Icon, label, path, active, onClick }: NavItemExpandedProps) {
  const [hovered, setHovered] = useState(false);
  const bg    = active ? ACTIVE_BG    : hovered ? HOVER_BG_EXP : 'transparent';
  const color = active ? ACTIVE_COLOR : hovered ? HOVER_TEXT   : DEFAULT_TEXT;

  return (
    <Link
      to={path}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 10,
        backgroundColor: bg,
        color,
        textDecoration: 'none',
        transition: 'background-color 200ms ease, color 200ms ease',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Left accent bar — expanded only */}
      {active && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 3,
            height: '60%',
            borderRadius: '0 4px 4px 0',
            background: ACTIVE_COLOR,
            boxShadow: `0 0 10px ${ACTIVE_COLOR}80`,
          }}
        />
      )}
      {/* Radial glow */}
      {active && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 10,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 200ms ease',
          color: 'inherit',
        }}
      >
        <Icon
          size={20}
          strokeWidth={active ? 2 : 1.75}
          style={{ filter: active ? `drop-shadow(0 0 6px ${ACTIVE_COLOR}80)` : 'none' }}
        />
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          whiteSpace: 'nowrap',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </span>
    </Link>
  );
}

// ─── COLLAPSED NavItem ────────────────────────────────────────────────────────
// Completely independent structure — 48×48, icon only, no text layer at all
interface NavItemCollapsedProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
  onClick?: () => void;
  onTooltip: (state: TooltipState | null) => void;
}

function NavItemCollapsed({ icon: Icon, label, path, active, onClick, onTooltip }: NavItemCollapsedProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    onTooltip({ label, y: rect.top + rect.height / 2 });
  }, [label, onTooltip]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onTooltip(null);
  }, [onTooltip]);

  const bg    = active ? ACTIVE_BG    : hovered ? HOVER_BG_COL : 'transparent';
  const color = active ? ACTIVE_COLOR : hovered ? HOVER_TEXT   : DEFAULT_TEXT;

  return (
    <Link
      to={path}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        color,
        textDecoration: 'none',
        transition: 'background-color 200ms ease, color 200ms ease',
        flexShrink: 0,
        boxShadow: active ? `0 0 12px rgba(34,197,94,0.18)` : 'none',
      }}
    >
      <Icon
        size={20}
        strokeWidth={active ? 2 : 1.75}
        style={{
          filter: active ? `drop-shadow(0 0 6px ${ACTIVE_COLOR}80)` : 'none',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 200ms ease, filter 200ms ease',
        }}
      />
    </Link>
  );
}

// ─── Main layout ──────────────────────────────────────────────────────────────
export function DashboardLayout() {
  const location = useLocation();

  const [collapsed,       setCollapsed]       = useState(false);
  const [sidebarOpen,     setSidebarOpen]      = useState(false);
  const [notifOpen,       setNotifOpen]        = useState(false);
  const [accountMenuOpen, setAccountMenuOpen]  = useState(false);
  const [profileHovered,  setProfileHovered]   = useState(false);
  const [tooltip,         setTooltip]          = useState<TooltipState | null>(null);
  const [toggleHovered,   setToggleHovered]    = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = useCallback((path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => { setNotifOpen(false); setAccountMenuOpen(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const notifications = [
    { id: 1, text: 'You jumped to #3 on the Leaderboard!', time: '2m ago',  unread: true  },
    { id: 2, text: 'Career AI generated your new path',    time: '1h ago',  unread: true  },
    { id: 3, text: 'New challenge in Coding Arena',        time: '1d ago',  unread: false },
  ];

  // ─── Page meta ────────────────────────────────────────────────────────────────
  const PAGE_META: Record<string, { label: string; description: string }> = {
    '/dashboard':                  { label: 'Dashboard',       description: 'Your productivity overview' },
    '/dashboard/focus-mode':       { label: 'Focus Mode',      description: 'Deep work, zero distractions' },
    '/dashboard/coding-arena':     { label: 'Coding Arena',    description: 'Practice & sharpen your skills' },
    '/dashboard/competitions':     { label: 'Competitions',    description: 'Compete and earn recognition' },
    '/dashboard/career-ai':        { label: 'Career AI',       description: 'AI-powered career guidance' },
    '/dashboard/skill-gap':        { label: 'Skill Gap',       description: 'Identify and close your gaps' },
    '/dashboard/roadmap':          { label: 'Roadmap',         description: 'Your personalised learning path' },
    '/dashboard/profile':          { label: 'Profile',         description: 'Account settings & preferences' },
    '/dashboard/leaderboard':      { label: 'Leaderboard',     description: 'Global developer rankings' },
    '/dashboard/upload':           { label: 'Upload Content',  description: 'Add new documents to your library' },
    '/dashboard/uploads':          { label: 'My Uploads',      description: 'Manage your uploaded documents' },
    '/dashboard/library':          { label: 'Library',         description: 'Browse your development library' },
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden', backgroundColor: '#0F172A' }}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════════════════════ SIDEBAR ════════════════════════════════ */}
      {/* On mobile: fixed overlay drawer. On desktop: in-flow flex child (pushes content). */}
      <aside
        style={{
          flexShrink: 0,
          width: collapsed ? COLLAPSED_W : EXPANDED_W,
          height: '100%',
          background: SIDEBAR_BG,
          borderRight: SIDEBAR_BORDER,
          boxShadow: '2px 0 24px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.04)',
          transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
        }}
        className={
          sidebarOpen
            ? 'fixed inset-y-0 left-0 lg:relative lg:inset-auto'
            : 'fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0 lg:relative lg:inset-auto'
        }
      >

        {/* ════════════════ EXPANDED SIDEBAR LAYOUT ════════════════ */}
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Brand row */}
            <div
              style={{
                padding: '18px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: DIVIDER,
                flexShrink: 0,
              }}
            >
              <Link
                to="/dashboard"
                style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
              >
                <div
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(74,222,128,0.25)',
                  }}
                >
                  <Code2 size={17} style={{ color: '#0F172A' }} strokeWidth={2.5} />
                </div>
                <span style={{ color: '#F9FAFB', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                  Dev<span style={{ color: '#4ADE80' }}>Flow</span>
                </span>
              </Link>

              {/* Collapse toggle */}
              <button
                onClick={() => setCollapsed(true)}
                className="hidden lg:flex"
                style={{
                  width: 28, height: 28, borderRadius: 7,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#6B7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                  transition: 'color 200ms ease, background 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#E5E7EB'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                title="Collapse sidebar"
              >
                <ChevronLeft size={14} strokeWidth={2} />
              </button>

              {/* Mobile close */}
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
                style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Profile (expanded) */}
            <div style={{ padding: '12px 12px', borderBottom: DIVIDER, flexShrink: 0 }}>
              <div style={{ position: 'relative' }} ref={profileRef}>
                <div
                  onClick={() => setAccountMenuOpen((v) => !v)}
                  onMouseEnter={() => setProfileHovered(true)}
                  onMouseLeave={() => setProfileHovered(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px',
                    borderRadius: 10, cursor: 'pointer',
                    background: accountMenuOpen ? ACTIVE_BG : profileHovered ? HOVER_BG_EXP : 'transparent',
                    transition: 'background 200ms ease',
                  }}
                >
                  <div
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                      color: '#0F172A', fontWeight: 700, fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 12px rgba(74,222,128,0.3)',
                      border: '2px solid rgba(74,222,128,0.3)',
                    }}
                  >
                    M
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#F9FAFB', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>Mufiza Dev</p>
                    <p style={{ color: '#6B7280', fontSize: 11, whiteSpace: 'nowrap', marginTop: 1 }}>Pro Plan</p>
                  </div>
                  <ChevronDown
                    size={14} strokeWidth={2}
                    style={{
                      color: '#6B7280', flexShrink: 0,
                      transform: accountMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 200ms ease',
                    }}
                  />
                </div>

                {/* Dropdown */}
                {accountMenuOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute', left: 0, right: 0, top: 'calc(100% + 6px)',
                      borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
                      background: '#1E293B', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      overflow: 'hidden', zIndex: 60,
                    }}
                  >
                    {accountNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => { setAccountMenuOpen(false); setSidebarOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 14px', fontSize: 13,
                          color: DEFAULT_TEXT, textDecoration: 'none',
                          transition: 'background 150ms ease, color 150ms ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = HOVER_BG_EXP; e.currentTarget.style.color = HOVER_TEXT; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DEFAULT_TEXT; }}
                      >
                        <item.icon size={15} strokeWidth={1.75} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation (expanded) */}
            <nav
              style={{
                flex: 1, overflowY: 'auto', overflowX: 'hidden',
                padding: '12px 10px',
                display: 'flex', flexDirection: 'column', gap: 2,
                scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent',
              }}
            >
              <p style={{
                fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: SECTION_LABEL,
                padding: '4px 4px 6px',
              }}>
                Menu
              </p>

              {mainNavItems.map((item) => (
                <NavItemExpanded
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={isActive(item.path)}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}

              <div style={{ marginTop: 20 }}>
                <p style={{
                  fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: SECTION_LABEL,
                  padding: '4px 4px 6px',
                }}>
                  Account
                </p>

                {accountNavItems.map((item) => (
                  <NavItemExpanded
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    active={isActive(item.path)}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </div>
            </nav>

            {/* Logout (expanded) */}
            <div style={{ padding: '12px 10px', borderTop: DIVIDER, flexShrink: 0 }}>
              <Link
                to="/login"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10,
                  color: DEFAULT_TEXT, textDecoration: 'none',
                  fontSize: 14, fontWeight: 500,
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#F87171'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DEFAULT_TEXT; }}
              >
                <LogOut size={20} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>Logout</span>
              </Link>
            </div>
          </div>
        )}

        {/* ════════════════ COLLAPSED SIDEBAR LAYOUT ════════════════ */}
        {collapsed && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              paddingTop: 16,
              paddingBottom: 12,
              gap: 0,
              width: COLLAPSED_W,
              /* Hide scrollbar */
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
            }}
          >

            {/* Brand icon */}
            <div
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: 4,
              }}
            >
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(74,222,128,0.25)',
                  }}
                >
                  <Code2 size={17} style={{ color: '#0F172A' }} strokeWidth={2.5} />
                </div>
              </Link>
            </div>

            {/* Expand toggle — 48×48, centered */}
            <div
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: 8,
              }}
            >
              <button
                onClick={() => setCollapsed(false)}
                className="hidden lg:flex"
                onMouseEnter={() => setToggleHovered(true)}
                onMouseLeave={() => setToggleHovered(false)}
                style={{
                  width: 32, height: 32, borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: toggleHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  color: toggleHovered ? '#E5E7EB' : '#6B7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color 200ms ease, background 200ms ease',
                }}
                title="Expand sidebar"
              >
                <ChevronRight size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)', flexShrink: 0, marginBottom: 16 }} />

            {/* Profile avatar — 48×48 centered */}
            <div
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginBottom: 16, position: 'relative',
              }}
              onMouseEnter={() => {
                const rect = profileRef.current?.getBoundingClientRect();
                if (rect) setTooltip({ label: 'Mufiza Dev · Pro Plan', y: rect.top + rect.height / 2 });
              }}
              onMouseLeave={() => setTooltip(null)}
              ref={profileRef}
            >
              <Link to="/dashboard/profile" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4ADE80, #22C55E)',
                    color: '#0F172A', fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(74,222,128,0.3)',
                    border: '2px solid rgba(74,222,128,0.3)',
                    transition: 'box-shadow 200ms ease, transform 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(74,222,128,0.5)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 12px rgba(74,222,128,0.3)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                  }}
                >
                  M
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)', flexShrink: 0, marginBottom: 8 }} />

            {/* Main nav icons — 8px gap */}
            <div
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8, width: '100%',
                paddingLeft: 0, paddingRight: 0,
              }}
            >
              {mainNavItems.map((item) => (
                <NavItemCollapsed
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={isActive(item.path)}
                  onClick={() => setSidebarOpen(false)}
                  onTooltip={setTooltip}
                />
              ))}
            </div>

            {/* Gap between sections */}
            <div style={{ marginTop: 20, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {/* Divider */}
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 4 }} />

              {accountNavItems.map((item) => (
                <NavItemCollapsed
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={isActive(item.path)}
                  onClick={() => setSidebarOpen(false)}
                  onTooltip={setTooltip}
                />
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Logout — 48×48 centered */}
            <div
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Link
                to="/login"
                style={{
                  width: 48, height: 48, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: DEFAULT_TEXT, textDecoration: 'none',
                  transition: 'background 200ms ease, color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                  e.currentTarget.style.color = '#F87171';
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({ label: 'Logout', y: rect.top + rect.height / 2 });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = DEFAULT_TEXT;
                  setTooltip(null);
                }}
              >
                <LogOut size={20} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* ── Tooltip (collapsed only) ── */}
      {collapsed && tooltip && (
        <div
          style={{
            position: 'fixed',
            left: COLLAPSED_W + 10,
            top: tooltip.y,
            transform: 'translateY(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'tooltipFadeIn 150ms ease forwards',
          }}
        >
          <div
            style={{
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F9FAFB',
              fontSize: 12,
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: 8,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              position: 'relative',
            }}
          >
            {tooltip.label}
            <div
              style={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                borderWidth: 5,
                borderStyle: 'solid',
                borderColor: 'transparent #1E293B transparent transparent',
              }}
            />
          </div>
        </div>
      )}

      {/* Keyframes + scrollbar */}
      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        nav::-webkit-scrollbar       { width: 4px; }
        nav::-webkit-scrollbar-track { background: transparent; }
        nav::-webkit-scrollbar-thumb { background: #374151; border-radius: 99px; }
        nav::-webkit-scrollbar-thumb:hover { background: #4B5563; }
        /* Hide scrollbar in collapsed sidebar */
        aside div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ═══════════════════════════ MAIN ════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <header
          style={{
            flexShrink: 0,
            zIndex: 30,
            padding: '0 24px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            background: '#0F172A',
            borderBottom: 'none',
          }}
        >
          {/* Hamburger — always visible */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{
              width: 36, height: 36, borderRadius: 9,
              border: 'none',
              background: 'transparent',
              color: '#334155',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              transition: 'color 180ms ease, background 180ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#334155'; e.currentTarget.style.background = 'transparent'; }}
          >
            <Menu size={19} strokeWidth={1.75} />
          </button>

          {/* Search — wide, fully rounded pill */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 540 }}>
            <Search
              size={14}
              style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)', color: '#1E293B', pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search challenges, roadmap…"
              style={{
                width: '100%', paddingLeft: 40, paddingRight: 18,
                paddingTop: 9, paddingBottom: 9,
                borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.035)',
                color: '#F9FAFB', fontSize: 13, outline: 'none',
                transition: 'border-color 200ms ease, background 200ms ease, box-shadow 200ms ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)';
                e.currentTarget.style.background = 'rgba(16,185,129,0.03)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.04)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setNotifOpen((v) => !v); setAccountMenuOpen(false); }}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: 'none',
                  background: 'transparent',
                  color: '#64748B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative',
                  transition: 'color 180ms ease, background 180ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(52,211,153,0.08)'; e.currentTarget.style.color = '#34D399'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
              >
                <Bell size={18} strokeWidth={1.75} />
                {/* Emerald notification dot */}
                <span
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#10B981',
                    border: '1.5px solid #0F172A',
                    boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                  }}
                />
              </button>

              {notifOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
                    width: 320, borderRadius: 14,
                    border: '1px solid rgba(16,185,129,0.12)',
                    background: '#1E293B', boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    overflow: 'hidden', zIndex: 50,
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 style={{ color: '#F9FAFB', fontWeight: 600, fontSize: 13 }}>Notifications</h3>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: n.unread ? 'rgba(16,185,129,0.04)' : 'transparent',
                        cursor: 'pointer', transition: 'background 150ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? 'rgba(16,185,129,0.04)' : 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        {n.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0, marginTop: 5 }} />}
                        <div style={{ marginLeft: n.unread ? 0 : 17 }}>
                          <p style={{ color: '#E5E7EB', fontSize: 13 }}>{n.text}</p>
                          <p style={{ color: '#6B7280', fontSize: 11, marginTop: 3 }}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <span style={{ color: '#34D399', fontSize: 12, cursor: 'pointer' }}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar — bright emerald circle with white M */}
            <Link to="/dashboard/profile" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  color: '#FFFFFF', fontWeight: 800, fontSize: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 14px rgba(16,185,129,0.45)',
                  border: '2px solid rgba(52,211,153,0.5)',
                  transition: 'box-shadow 200ms ease, transform 200ms ease',
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 22px rgba(16,185,129,0.65)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.07)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 14px rgba(16,185,129,0.45)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                }}
              >
                M
              </div>
            </Link>
          </div>
        </header>

        {/* ── Sub-header: breadcrumb + page title — flows into page bg ── */}
        {(() => {
          const meta = PAGE_META[location.pathname];
          if (!meta) return null;
          const parts = location.pathname.replace('/dashboard', '').split('/').filter(Boolean);
          return (
            <div style={{
              flexShrink: 0,
              background: '#0F172A',
              padding: '0 24px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                <Link to="/dashboard" style={{ color: '#1E293B', fontSize: 12, textDecoration: 'none', fontWeight: 500, transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#334155')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#1E293B')}>
                  Dashboard
                </Link>
                {parts.length > 0 && (
                  <>
                    <ChevronRight size={11} style={{ color: '#1E293B' }} />
                    <span style={{ color: '#334155', fontSize: 12, fontWeight: 500 }}>{meta.label}</span>
                  </>
                )}
              </div>
              {/* Page title */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <h1 style={{ color: '#F1F5F9', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {meta.label}
                </h1>
                <span style={{ color: '#1E293B', fontSize: 13 }}>{meta.description}</span>
              </div>
            </div>
          );
        })()}

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 32, background: '#0F172A', position: 'relative' }}>
          <FocusBar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}