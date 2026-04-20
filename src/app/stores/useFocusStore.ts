import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FocusTask {
  id: string;
  label: string;
  done: boolean;
}

export interface FocusSession {
  id: string;
  isActive: boolean;
  startTime: number | null; // timestamp when session started
  pausedAt: number | null; // timestamp when paused
  totalPausedTime: number; // accumulated paused duration in ms
  targetDuration: number; // target duration in seconds (e.g., 90*60)
  currentTask: string;
  tasks: FocusTask[];
  blockedAttempts: number;
  challengeId?: string; // if started from Coding Arena
}

interface FocusStore {
  session: FocusSession | null;
  
  // Actions
  startSession: (targetDuration: number, taskName?: string, challengeId?: string) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  updateTask: (taskName: string) => void;
  toggleTaskDone: (taskId: string) => void;
  addTask: (label: string) => void;
  incrementBlockedAttempts: () => void;
  
  // Computed
  getElapsedTime: () => number; // in seconds
  getRemainingTime: () => number; // in seconds
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set, get) => ({
      session: null,

      startSession: (targetDuration, taskName = 'Focus Session', challengeId) => {
        const now = Date.now();
        set({
          session: {
            id: `session_${now}`,
            isActive: true,
            startTime: now,
            pausedAt: null,
            totalPausedTime: 0,
            targetDuration,
            currentTask: taskName,
            tasks: [
              { id: '1', label: taskName, done: false }
            ],
            blockedAttempts: 0,
            challengeId,
          },
        });
      },

      pauseSession: () => {
        const { session } = get();
        if (!session || !session.isActive) return;
        
        set({
          session: {
            ...session,
            isActive: false,
            pausedAt: Date.now(),
          },
        });
      },

      resumeSession: () => {
        const { session } = get();
        if (!session || session.isActive || !session.pausedAt) return;
        
        const pauseDuration = Date.now() - session.pausedAt;
        
        set({
          session: {
            ...session,
            isActive: true,
            pausedAt: null,
            totalPausedTime: session.totalPausedTime + pauseDuration,
          },
        });
      },

      endSession: () => {
        set({ session: null });
      },

      updateTask: (taskName) => {
        const { session } = get();
        if (!session) return;
        
        set({
          session: {
            ...session,
            currentTask: taskName,
          },
        });
      },

      toggleTaskDone: (taskId) => {
        const { session } = get();
        if (!session) return;
        
        set({
          session: {
            ...session,
            tasks: session.tasks.map(t => 
              t.id === taskId ? { ...t, done: !t.done } : t
            ),
          },
        });
      },

      addTask: (label) => {
        const { session } = get();
        if (!session) return;
        
        const newTask: FocusTask = {
          id: `task_${Date.now()}`,
          label,
          done: false,
        };
        
        set({
          session: {
            ...session,
            tasks: [...session.tasks, newTask],
          },
        });
      },

      incrementBlockedAttempts: () => {
        const { session } = get();
        if (!session) return;
        
        set({
          session: {
            ...session,
            blockedAttempts: session.blockedAttempts + 1,
          },
        });
      },

      // Get elapsed time in seconds (accounting for pauses)
      getElapsedTime: () => {
        const { session } = get();
        if (!session || !session.startTime) return 0;
        
        const now = Date.now();
        const activeTime = session.isActive && !session.pausedAt
          ? now - session.startTime - session.totalPausedTime
          : session.pausedAt
          ? session.pausedAt - session.startTime - session.totalPausedTime
          : 0;
        
        return Math.floor(activeTime / 1000);
      },

      // Get remaining time in seconds
      getRemainingTime: () => {
        const { session } = get();
        if (!session) return 0;
        
        const elapsed = get().getElapsedTime();
        const remaining = session.targetDuration - elapsed;
        
        return Math.max(0, remaining);
      },
    }),
    {
      name: 'devflow-focus-session', // localStorage key
      // Only persist session data, not computed functions
      partialize: (state) => ({ session: state.session }),
    }
  )
);
