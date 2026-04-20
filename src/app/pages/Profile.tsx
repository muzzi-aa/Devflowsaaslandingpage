import { useState } from 'react';
import {
  User, Settings, Bell, CreditCard, Key, Camera, Save,
  Check, Eye, EyeOff, Copy, Plus, Trash2, Shield, ChevronRight,
} from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

const tabs = [
  { id: 'profile',       label: 'Profile',       icon: User },
  { id: 'preferences',   label: 'Preferences',   icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing',       label: 'Billing',       icon: CreditCard },
  { id: 'api',           label: 'API Keys',      icon: Key },
];

const apiKeys = [
  { id: 1, name: 'Production Key',  key: 'df_live_sk_••••••••••••••••xKJ9', created: 'Jan 12, 2026', lastUsed: '2h ago',   active: true },
  { id: 2, name: 'Development Key', key: 'df_dev_sk_••••••••••••••••mR2p',  created: 'Feb 3, 2026',  lastUsed: '5d ago',   active: true },
  { id: 3, name: 'CI/CD Pipeline',  key: 'df_ci_sk_••••••••••••••••nT7q',   created: 'Mar 1, 2026',  lastUsed: 'Never',    active: false },
];

function Field({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', color: '#64748B', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 14px', borderRadius: 10, boxSizing: 'border-box',
          background: focus ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
          border: focus ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.07)',
          color: '#F0FDF4', fontSize: 14, outline: 'none',
          boxShadow: focus ? '0 0 0 3px rgba(16,185,129,0.08)' : 'none',
          transition: 'all 200ms',
        }}
      />
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ color: '#94A3B8', fontSize: 14 }}>{label}</span>
      <button onClick={() => onChange(!on)} style={{
        width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer', position: 'relative',
        background: on ? `linear-gradient(90deg, ${E.mid}, ${E.bright})` : 'rgba(255,255,255,0.08)',
        transition: 'background 300ms',
        boxShadow: on ? `0 0 10px rgba(16,185,129,0.3)` : 'none',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 22 : 3, width: 18, height: 18,
          borderRadius: '50%', background: '#F0FDF4',
          transition: 'left 300ms', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </button>
    </div>
  );
}

function Card({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: 16, padding: '28px', marginBottom: 20 }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 24 }}>
          {title && <h3 style={{ color: '#F0FDF4', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{title}</h3>}
          {subtitle && <p style={{ color: '#475569', fontSize: 13 }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Mufiza Dev');
  const [email, setEmail] = useState('mufiza@devflow.dev');
  const [bio, setBio] = useState('Senior developer focused on React and TypeScript. Building tools that help devs reach peak performance.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [github, setGithub] = useState('mufizadev');
  const [website, setWebsite] = useState('https://mufiza.dev');
  const [saved, setSaved] = useState(false);

  // Notification prefs
  const [notifs, setNotifs] = useState({ email: true, push: true, leaderboard: true, career: true, weekly: true, marketing: false });

  // Preferences
  const [prefs, setPrefs] = useState({ darkMode: true, compactMode: false, animations: true, sounds: false, language: 'English', timezone: 'America/Los_Angeles' });

  // API
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function copyKey(id: number) {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(16,185,129,0.08)', borderRadius: 12, padding: 5, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: activeTab === t.id ? 'rgba(16,185,129,0.12)' : 'transparent',
            border: activeTab === t.id ? '1px solid rgba(16,185,129,0.25)' : '1px solid transparent',
            color: activeTab === t.id ? E.light : '#475569',
            cursor: 'pointer', transition: 'all 200ms', flexShrink: 0,
          }}>
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ── */}
      {activeTab === 'profile' && (
        <>
          <Card title="Public Profile" subtitle="This information will be displayed on your public profile">
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${E.dark}, ${E.bright})`,
                  color: '#0F172A', fontWeight: 900, fontSize: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 24px rgba(16,185,129,0.3)`,
                  border: '3px solid rgba(16,185,129,0.3)',
                }}>M</div>
                <button style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 26, height: 26, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
                  border: '2px solid #0F172A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <Camera size={11} color="#0F172A" />
                </button>
              </div>
              <div>
                <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 18 }}>{name}</p>
                <p style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>{email}</p>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 99, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 11, color: E.light, fontWeight: 700 }}>Pro Plan</span>
                  <span style={{ padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontSize: 11, color: '#475569', fontWeight: 600 }}>Member since Jan 2026</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <Field label="Full Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Email Address" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#64748B', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>BIO</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{
                width: '100%', padding: '11px 14px', borderRadius: 10, boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                color: '#F0FDF4', fontSize: 14, outline: 'none', resize: 'vertical', lineHeight: 1.6, transition: 'all 200ms',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(16,185,129,0.4)'; e.target.style.background = 'rgba(16,185,129,0.04)'; e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.08)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.02)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <Field label="Location" value={location} onChange={setLocation} placeholder="City, Country" />
              <Field label="GitHub Username" value={github} onChange={setGithub} placeholder="your-github" />
            </div>
            <Field label="Website" value={website} onChange={setWebsite} placeholder="https://yoursite.dev" />
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} style={{
              padding: '11px 28px', borderRadius: 10,
              background: saved ? 'rgba(16,185,129,0.15)' : `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
              border: saved ? '1px solid rgba(16,185,129,0.3)' : 'none',
              color: '#F0FDF4', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: saved ? 'none' : `0 0 20px rgba(16,185,129,0.2)`,
              transition: 'all 300ms',
            }}>
              {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save changes</>}
            </button>
          </div>
        </>
      )}

      {/* ── PREFERENCES TAB ── */}
      {activeTab === 'preferences' && (
        <Card title="Preferences" subtitle="Customize your DevFlow experience">
          <Toggle on={prefs.darkMode}    onChange={v => setPrefs(p => ({...p, darkMode: v}))}    label="Dark mode" />
          <Toggle on={prefs.compactMode} onChange={v => setPrefs(p => ({...p, compactMode: v}))} label="Compact sidebar" />
          <Toggle on={prefs.animations}  onChange={v => setPrefs(p => ({...p, animations: v}))}  label="UI animations & transitions" />
          <Toggle on={prefs.sounds}      onChange={v => setPrefs(p => ({...p, sounds: v}))}      label="Focus mode sounds & alerts" />
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#64748B', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Language</label>
              <select value={prefs.language} onChange={e => setPrefs(p => ({...p, language: e.target.value}))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: '#F0FDF4', fontSize: 14, outline: 'none' }}>
                {['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi'].map(l => <option key={l} value={l} style={{ background: '#1E293B' }}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#64748B', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Timezone</label>
              <select value={prefs.timezone} onChange={e => setPrefs(p => ({...p, timezone: e.target.value}))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: '#F0FDF4', fontSize: 14, outline: 'none' }}>
                {['America/Los_Angeles', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata'].map(tz => <option key={tz} value={tz} style={{ background: '#1E293B' }}>{tz}</option>)}
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* ── NOTIFICATIONS TAB ── */}
      {activeTab === 'notifications' && (
        <Card title="Notification Settings" subtitle="Choose how and when DevFlow contacts you">
          <Toggle on={notifs.email}        onChange={v => setNotifs(p => ({...p, email: v}))}        label="Email notifications" />
          <Toggle on={notifs.push}         onChange={v => setNotifs(p => ({...p, push: v}))}         label="Push notifications (browser)" />
          <Toggle on={notifs.leaderboard}  onChange={v => setNotifs(p => ({...p, leaderboard: v}))}  label="Leaderboard rank changes" />
          <Toggle on={notifs.career}       onChange={v => setNotifs(p => ({...p, career: v}))}       label="Career AI insights & updates" />
          <Toggle on={notifs.weekly}       onChange={v => setNotifs(p => ({...p, weekly: v}))}       label="Weekly productivity digest" />
          <Toggle on={notifs.marketing}    onChange={v => setNotifs(p => ({...p, marketing: v}))}    label="Product updates & announcements" />
        </Card>
      )}

      {/* ── BILLING TAB ── */}
      {activeTab === 'billing' && (
        <>
          <Card title="Current Plan" subtitle="Your subscription details">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderRadius: 12, background: `linear-gradient(135deg, rgba(22,101,52,0.3), rgba(15,23,42,0.8))`, border: '1px solid rgba(16,185,129,0.2)', marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={22} color={E.bright} />
                </div>
                <div>
                  <p style={{ color: '#F0FDF4', fontWeight: 800, fontSize: 17 }}>Pro Plan</p>
                  <p style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>$15/mo · Renews Apr 12, 2026</p>
                </div>
              </div>
              <button style={{
                padding: '9px 18px', borderRadius: 9, background: 'transparent',
                border: '1px solid rgba(16,185,129,0.25)', color: E.light,
                fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Manage <ChevronRight size={13} />
              </button>
            </div>
          </Card>

          <Card title="Payment Method">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 26, borderRadius: 5, background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 800 }}>VISA</div>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>•••• •••• •••• 4242</span>
                <span style={{ color: '#475569', fontSize: 12 }}>Expires 12/27</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: E.bright, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Update</button>
            </div>
          </Card>
        </>
      )}

      {/* ── API KEYS TAB ── */}
      {activeTab === 'api' && (
        <>
          <Card title="API Keys" subtitle="Use these keys to authenticate requests to the DevFlow API">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {apiKeys.map(k => (
                <div key={k.id} style={{
                  padding: '16px 18px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
                      <p style={{ color: '#F0FDF4', fontWeight: 700, fontSize: 14 }}>{k.name}</p>
                      <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700, background: k.active ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)', color: k.active ? E.light : '#475569', border: `1px solid ${k.active ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                        {k.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#475569' }}>
                      {showKeys[k.id] ? k.key.replace('••••••••••••••••', 'sk_real_key_demo') : k.key}
                    </p>
                    <p style={{ color: '#334155', fontSize: 11, marginTop: 4 }}>Created {k.created} · Last used {k.lastUsed}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
                    <button onClick={() => setShowKeys(s => ({...s, [k.id]: !s[k.id]}))} title={showKeys[k.id] ? 'Hide' : 'Reveal'} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {showKeys[k.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                    <button onClick={() => copyKey(k.id)} title="Copy" style={{ width: 32, height: 32, borderRadius: 8, background: copiedId === k.id ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.03)', border: copiedId === k.id ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(255,255,255,0.07)', color: copiedId === k.id ? E.light : '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms' }}>
                      {copiedId === k.id ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                    <button title="Delete" style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.12)', color: '#F87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10,
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              color: E.light, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.08)')}
            >
              <Plus size={14} /> Generate New Key
            </button>
          </Card>
        </>
      )}
    </div>
  );
}