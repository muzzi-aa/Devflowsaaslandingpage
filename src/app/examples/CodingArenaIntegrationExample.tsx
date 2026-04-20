/**
 * EXAMPLE: How to integrate Focus Mode auto-start in Coding Arena
 * 
 * This shows how to:
 * 1. Auto-activate focus mode when starting a challenge
 * 2. Display the focus timer in the challenge view
 * 3. Award XP bonuses for maintaining focus
 */

import { useState } from 'react';
import { useFocusStore } from '../stores/useFocusStore';
import { FocusTimer } from '../components/FocusTimer';
import { Play, Zap } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  estimatedTime: number; // minutes
  baseXP: number;
}

export function CodingArenaIntegrationExample() {
  const { session, startSession, endSession, getElapsedTime, getRemainingTime } = useFocusStore();
  const [showFocusPrompt, setShowFocusPrompt] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);

  // Example challenge
  const exampleChallenge: Challenge = {
    id: 'ch_001',
    title: 'Two Sum Problem',
    estimatedTime: 45,
    baseXP: 150,
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    
    // If no active focus session, prompt user
    if (!session) {
      setShowFocusPrompt(true);
    }
  };

  const handleStartWithFocus = () => {
    if (currentChallenge) {
      // Auto-start focus mode with challenge context
      startSession(
        currentChallenge.estimatedTime * 60,  // Convert to seconds
        `Solve: ${currentChallenge.title}`,
        currentChallenge.id  // Link session to challenge
      );
      setShowFocusPrompt(false);
    }
  };

  const handleStartWithoutFocus = () => {
    // User declined focus mode, proceed normally
    setShowFocusPrompt(false);
  };

  const handleCompleteChallenge = () => {
    if (!currentChallenge) return;

    let totalXP = currentChallenge.baseXP;

    // Award XP bonus based on focus session
    if (session && session.challengeId === currentChallenge.id) {
      const elapsed = getElapsedTime();
      const targetTime = currentChallenge.estimatedTime * 60;
      
      // Focus Quality Bonus: Did they maintain focus?
      const focusQuality = 1 - (session.blockedAttempts * 0.05); // -5% per distraction
      const focusBonus = Math.floor(currentChallenge.baseXP * 0.5 * focusQuality);
      totalXP += focusBonus;

      // Speed Bonus: Completed under estimated time?
      if (elapsed < targetTime) {
        const speedBonus = Math.floor(currentChallenge.baseXP * 0.3);
        totalXP += speedBonus;
      }

      // End the focus session
      endSession();

      // Show completion modal with XP breakdown
      showCompletionModal(currentChallenge.baseXP, focusBonus, totalXP);
    }

    setCurrentChallenge(null);
  };

  const showCompletionModal = (baseXP: number, focusBonus: number, totalXP: number) => {
    // Your completion modal UI here
    console.log('Challenge Complete!', { baseXP, focusBonus, totalXP });
  };

  return (
    <div style={{ padding: 32, background: '#0F172A', minHeight: '100vh' }}>
      <h1 style={{ color: '#F0FDF4', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
        Coding Arena - Focus Integration Example
      </h1>

      {/* Focus Prompt Modal */}
      {showFocusPrompt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#1E293B',
            borderRadius: 16,
            padding: 32,
            maxWidth: 480,
            border: '1px solid rgba(16,185,129,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #166534, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px rgba(16,185,129,0.3)',
              }}>
                <Zap size={24} color="#0F172A" fill="#0F172A" />
              </div>
              <div>
                <h3 style={{ color: '#F0FDF4', fontSize: 18, fontWeight: 700 }}>
                  Ready for Deep Work?
                </h3>
                <p style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>
                  Estimated time: {currentChallenge?.estimatedTime} minutes
                </p>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Activate Focus Mode to eliminate distractions and earn a{' '}
              <span style={{ color: '#34D399', fontWeight: 700 }}>1.5× XP bonus</span> for
              maintaining concentration throughout the challenge.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#64748B', fontSize: 12 }}>Base XP</span>
                  <span style={{ color: '#F0FDF4', fontSize: 14, fontWeight: 700 }}>+{currentChallenge?.baseXP}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontSize: 12 }}>Focus Bonus (max)</span>
                  <span style={{ color: '#34D399', fontSize: 14, fontWeight: 700 }}>+{currentChallenge ? Math.floor(currentChallenge.baseXP * 0.5) : 0}</span>
                </div>
              </div>

              <button
                onClick={handleStartWithFocus}
                style={{
                  padding: '12px 24px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #166534, #10B981)',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 0 24px rgba(16,185,129,0.3)',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Play size={16} fill="currentColor" />
                Start with Focus Mode
              </button>

              <button
                onClick={handleStartWithoutFocus}
                style={{
                  padding: '10px 24px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#64748B',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#64748B';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                Start without Focus Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge View (when active) */}
      {currentChallenge && !showFocusPrompt && (
        <div style={{
          background: '#1E293B',
          borderRadius: 16,
          padding: 32,
          border: '1px solid rgba(16,185,129,0.15)',
        }}>
          {/* Header with timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <h2 style={{ color: '#F0FDF4', fontSize: 20, fontWeight: 800 }}>
                {currentChallenge.title}
              </h2>
              <p style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>
                Difficulty: Medium • {currentChallenge.baseXP} XP
              </p>
            </div>

            {/* Show timer if focus session active */}
            {session && session.challengeId === currentChallenge.id && (
              <FocusTimer variant="compact" showControls={true} />
            )}
          </div>

          {/* Challenge content */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>
              Given an array of integers nums and an integer target, return indices of
              the two numbers such that they add up to target.
            </p>
          </div>

          {/* Code editor placeholder */}
          <div style={{
            background: '#0F172A',
            borderRadius: 10,
            padding: 20,
            border: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            color: '#94A3B8',
            minHeight: 200,
            marginBottom: 16,
          }}>
            {`function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n}`}
          </div>

          {/* Submit button */}
          <button
            onClick={handleCompleteChallenge}
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #166534, #10B981)',
              border: 'none',
              color: '#0F172A',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(16,185,129,0.2)',
            }}
          >
            Submit Solution
          </button>
        </div>
      )}

      {/* Start Challenge Button (when no active challenge) */}
      {!currentChallenge && (
        <div style={{
          background: '#1E293B',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center',
          border: '1px solid rgba(16,185,129,0.15)',
        }}>
          <h3 style={{ color: '#F0FDF4', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Example Challenge
          </h3>
          <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>
            Click to see the Focus Mode integration in action
          </p>
          <button
            onClick={() => handleStartChallenge(exampleChallenge)}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #166534, #10B981)',
              border: 'none',
              color: '#0F172A',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 32px rgba(16,185,129,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Play size={16} fill="currentColor" />
            Start Example Challenge
          </button>
        </div>
      )}

      {/* Implementation Notes */}
      <div style={{
        marginTop: 32,
        padding: 24,
        background: 'rgba(16,185,129,0.04)',
        border: '1px solid rgba(16,185,129,0.12)',
        borderRadius: 12,
      }}>
        <h4 style={{ color: '#34D399', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
          Implementation Notes:
        </h4>
        <ul style={{ color: '#6EE7B7', fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Focus session auto-starts when user clicks "Start with Focus Mode"</li>
          <li>Session is linked to challenge ID via startSession(duration, task, challengeId)</li>
          <li>Timer persists even if user navigates away from challenge</li>
          <li>XP bonuses calculated based on focus quality (blocked attempts) and speed</li>
          <li>FocusBar appears globally and follows user across pages</li>
        </ul>
      </div>
    </div>
  );
}

export default CodingArenaIntegrationExample;
