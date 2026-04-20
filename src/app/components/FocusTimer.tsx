import { useEffect, useState } from 'react';
import { useFocusStore } from '../stores/useFocusStore';
import { Play, Pause, X, Clock } from 'lucide-react';

interface FocusTimerProps {
  variant?: 'full' | 'compact' | 'mini';
  showControls?: boolean;
  onEnd?: () => void;
}

export function FocusTimer({ variant = 'full', showControls = true, onEnd }: FocusTimerProps) {
  const { session, pauseSession, resumeSession, endSession, getElapsedTime, getRemainingTime } = useFocusStore();
  
  // Force re-render every second to update display
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      setTick(t => t + 1);
      
      // Auto-end session when time runs out
      const remaining = getRemainingTime();
      if (remaining === 0 && session.isActive) {
        if (onEnd) onEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, getRemainingTime, onEnd]);

  if (!session) return null;

  const elapsed = getElapsedTime();
  const remaining = getRemainingTime();
  const hours = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  const elapsedMins = Math.floor(elapsed / 60);
  const elapsedSecs = elapsed % 60;

  const progress = (elapsed / session.targetDuration) * 100;

  const pad = (n: number) => String(n).padStart(2, '0');

  // Mini variant (just timer, no controls)
  if (variant === 'mini') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: 99,
        background: session.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${session.isActive ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.07)'}`,
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: session.isActive ? '#34D399' : '#475569',
          boxShadow: session.isActive ? '0 0 6px #34D399' : 'none',
        }} />
        <Clock size={12} color={session.isActive ? '#34D399' : '#475569'} />
        <span style={{
          fontSize: 12,
          color: session.isActive ? '#34D399' : '#475569',
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {hours > 0 ? `${pad(hours)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`}
        </span>
      </div>
    );
  }

  // Compact variant (small display with controls)
  if (variant === 'compact') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 12,
        background: 'rgba(15,23,42,0.9)',
        border: '1px solid rgba(16,185,129,0.15)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontSize: 11,
            color: '#334155',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {session.isActive ? 'Focus Active' : 'Paused'}
          </span>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 20,
            fontWeight: 700,
            color: '#F0FDF4',
          }}>
            {hours > 0 ? `${pad(hours)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`}
          </div>
          <span style={{ fontSize: 10, color: '#475569' }}>
            {elapsedMins}m {elapsedSecs}s elapsed
          </span>
        </div>

        {showControls && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={session.isActive ? pauseSession : resumeSession}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid rgba(16,185,129,0.2)',
                background: 'rgba(16,185,129,0.08)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {session.isActive ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={endSession}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid rgba(239,68,68,0.2)',
                background: 'rgba(239,68,68,0.08)',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full variant (large circular timer)
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Task name */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
          Current Task
        </p>
        <h3 style={{ color: '#F0FDF4', fontSize: 18, fontWeight: 700 }}>
          {session.currentTask}
        </h3>
      </div>

      {/* SVG Ring */}
      <div style={{ position: 'relative', width: 280, height: 280 }}>
        {/* Glow */}
        {session.isActive && (
          <div style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
        )}

        <svg width={280} height={280} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={140} cy={140} r={radius} fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth={10} />
          <circle
            cx={140}
            cy={140}
            r={radius}
            fill="none"
            stroke={session.isActive ? '#34D399' : '#166534'}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 500ms' }}
          />
        </svg>

        {/* Time Display */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 52,
            fontWeight: 900,
            color: '#F0FDF4',
            textShadow: session.isActive ? '0 0 40px rgba(16,185,129,0.4)' : 'none',
          }}>
            {hours > 0 ? `${pad(hours)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`}
          </div>
          <span style={{ color: '#334155', fontSize: 12, marginTop: 8 }}>
            {session.isActive ? `${elapsedMins}m ${elapsedSecs}s elapsed` : 'Paused'}
          </span>
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            onClick={session.isActive ? pauseSession : resumeSession}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: session.isActive
                ? 'rgba(248,113,113,0.1)'
                : 'linear-gradient(135deg, #166534, #10B981)',
              border: session.isActive ? '1px solid rgba(248,113,113,0.3)' : 'none',
              color: session.isActive ? '#F87171' : '#0F172A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: session.isActive ? '0 0 24px rgba(248,113,113,0.2)' : '0 0 32px rgba(16,185,129,0.3)',
              transition: 'all 300ms',
            }}
          >
            {session.isActive ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" style={{ marginLeft: 3 }} />}
          </button>

          <button
            onClick={endSession}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.03)',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 340, textAlign: 'center' }}>
        <div style={{ height: 3, borderRadius: 99, background: 'rgba(16,185,129,0.08)', marginBottom: 8 }}>
          <div style={{
            height: '100%',
            borderRadius: 99,
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #166534, #10B981)',
            transition: 'width 1s linear',
          }} />
        </div>
        <span style={{ color: '#334155', fontSize: 11 }}>
          {Math.round(progress)}% complete
        </span>
      </div>
    </div>
  );
}
