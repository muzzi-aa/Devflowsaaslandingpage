import { useFocusStore } from '../stores/useFocusStore';
import { FocusTimer } from './FocusTimer';
import { Link } from 'react-router';
import { Zap } from 'lucide-react';

const E = { bright: '#10B981', light: '#34D399', mid: '#166534', dark: '#14532D' };

/**
 * FocusBar - Persistent focus session indicator that appears when a session is active
 * Shows on any page to indicate focus mode is running
 */
export function FocusBar() {
  const { session } = useFocusStore();

  if (!session) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 72, // Below main header
      right: 24,
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(16,185,129,0.2)',
      borderRadius: 14,
      overflow: 'hidden',
      background: 'rgba(15,23,42,0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(16,185,129,0.2)',
    }}>
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${E.mid}, ${E.bright})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 16px rgba(16,185,129,0.3)`,
          flexShrink: 0,
        }}>
          <Zap size={16} color="#0F172A" strokeWidth={2.5} fill="#0F172A" />
        </div>

        <FocusTimer variant="compact" showControls={false} />

        <Link to="/dashboard/focus-mode" style={{
          textDecoration: 'none',
          padding: '6px 12px',
          borderRadius: 8,
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.2)',
          color: E.light,
          fontSize: 12,
          fontWeight: 600,
          transition: 'all 200ms',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.14)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.08)')}
        >
          Manage
        </Link>
      </div>

      {/* Animated progress bar at bottom */}
      <div style={{
        height: 2,
        background: 'rgba(16,185,129,0.1)',
        width: '100%',
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${E.mid}, ${E.bright})`,
          width: `${Math.min(((session.targetDuration - (Date.now() - (session.startTime || 0)) / 1000) / session.targetDuration) * 100, 100)}%`,
          boxShadow: `0 0 8px rgba(16,185,129,0.5)`,
          transition: 'width 1s linear',
        }} />
      </div>
    </div>
  );
}
