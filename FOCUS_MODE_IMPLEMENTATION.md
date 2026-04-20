# Focus Mode & Coding Arena - Persistent Session Implementation

## Overview
This implementation creates a **persistent focus session** that continues running across all pages in DevFlow using **Zustand** for global state management and **timestamp-based** timers.

---

## Architecture

### 1. **Global State Management** (`/src/app/stores/useFocusStore.ts`)

**Key Features:**
- **Zustand store** with localStorage persistence
- **Timestamp-based timer** (not setInterval) - prevents reset on navigation
- **Pause/Resume functionality** with accumulated pause time tracking
- Session data includes: tasks, current challenge, blocked attempts, etc.

**Core Logic:**
```typescript
// Timer calculation uses timestamps
getElapsedTime: () => {
  const now = Date.now();
  const activeTime = now - session.startTime - session.totalPausedTime;
  return Math.floor(activeTime / 1000); // Returns seconds
}
```

**Why timestamps over setInterval?**
- ✅ Survives component unmount/remount
- ✅ Persists across page navigation
- ✅ Accurate even when tab is inactive
- ✅ No memory leaks from dangling intervals

---

### 2. **Reusable Timer Component** (`/src/app/components/FocusTimer.tsx`)

**3 Display Variants:**
1. **`full`** - Large circular timer with controls (Focus Mode page)
2. **`compact`** - Small display with pause/end buttons (floating widget)
3. **`mini`** - Status badge only (sidebar integration)

**Auto-updating Display:**
```typescript
// Component forces re-render every second to show live time
useEffect(() => {
  const interval = setInterval(() => {
    setTick(t => t + 1); // Force update
    
    // Check if session complete
    if (getRemainingTime() === 0) {
      onEnd?.(); // Trigger completion callback
    }
  }, 1000);
  
  return () => clearInterval(interval);
}, [session]);
```

---

### 3. **Persistent Focus Bar** (`/src/app/components/FocusBar.tsx`)

**What it does:**
- Fixed position widget (top-right) that appears when a session is active
- Shows on **all pages** (injected in DashboardLayout)
- Displays compact timer + quick access to Focus Mode
- Animated progress bar at bottom

**Usage:**
```tsx
// In DashboardLayout.tsx
<main>
  <FocusBar />  {/* Shows globally when session active */}
  <Outlet />
</main>
```

---

### 4. **Updated Focus Mode Page** (`/src/app/pages/FocusModeNew.tsx`)

**Changes from original:**
- ❌ Removed local `useState` for timer
- ✅ Uses `useFocusStore()` for session state
- ✅ Shows "Start Session" UI when no active session
- ✅ Uses `<FocusTimer />` component when session running
- ✅ Tasks sync with global store

**Starting a session:**
```typescript
const handleStartSession = () => {
  startSession(
    targetDuration * 60,  // Convert minutes to seconds
    'Implement authentication module',
    challengeId  // Optional: link to Coding Arena challenge
  );
};
```

---

### 5. **Coding Arena Integration** (Example)

**To add timer display in Coding Arena:**

```tsx
// In /src/app/pages/CodingArena.tsx
import { useFocusStore } from '../stores/useFocusStore';
import { FocusTimer } from '../components/FocusTimer';

export default function CodingArena() {
  const { session, startSession } = useFocusStore();
  
  const handleStartChallenge = (challengeId: string) => {
    // Auto-start focus session when entering challenge
    if (!session) {
      startSession(
        45 * 60,  // 45 minute session
        'Solve: Two Sum Problem',
        challengeId
      );
    }
  };
  
  return (
    <div>
      {/* Show mini timer in header */}
      {session && <FocusTimer variant="mini" showControls={false} />}
      
      {/* Your existing challenge UI */}
      {/* ... */}
    </div>
  );
}
```

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  User Journey: Focus Mode → Coding Arena                   │
└─────────────────────────────────────────────────────────────┘

1. User opens Focus Mode page
   ↓
2. Clicks "Start Focus Session" (90 minutes)
   ↓
3. useFocusStore.startSession() called
   - Creates session object with startTime = Date.now()
   - Saves to localStorage (persistence)
   - Sets isActive = true
   ↓
4. Timer starts displaying (FocusTimer component)
   - setInterval ticks every 1 second
   - Each tick calls getElapsedTime() which calculates:
     elapsed = Date.now() - startTime - totalPausedTime
   ↓
5. User clicks "Go to Coding Arena" button
   ↓
6. React Router navigates to /dashboard/coding-arena
   - Focus Mode component unmounts
   - ❌ OLD WAY: Timer would stop here
   - ✅ NEW WAY: Session persists in Zustand + localStorage
   ↓
7. Coding Arena page loads
   - useFocusStore() hook reads existing session
   - FocusBar appears (top-right widget)
   - Timer continues from where it left off
   ↓
8. User navigates to any other page
   - Session still active
   - FocusBar follows user everywhere
   ↓
9. User returns to Focus Mode
   - Same session still running
   - Timer shows accurate elapsed time
   ↓
10. Session ends (time expires or user clicks End)
    - useFocusStore.endSession() called
    - session = null
    - FocusBar disappears
```

---

## Key Features

### ✅ **Persistence Across Navigation**
- Session survives page changes
- Uses timestamps (not local counters)
- localStorage backup (survives browser refresh)

### ✅ **Pause/Resume with Accuracy**
```typescript
// Pause: Record current time
pauseSession: () => {
  set({ pausedAt: Date.now(), isActive: false });
}

// Resume: Calculate pause duration and add to total
resumeSession: () => {
  const pauseDuration = Date.now() - session.pausedAt;
  set({
    isActive: true,
    pausedAt: null,
    totalPausedTime: session.totalPausedTime + pauseDuration
  });
}
```

### ✅ **No Memory Leaks**
- setInterval only in display component (FocusTimer)
- Proper cleanup in useEffect return
- Core timer logic uses pure calculations (Date.now())

### ✅ **Sync Tasks**
```typescript
// Tasks stored in session object
toggleTaskDone: (taskId) => {
  set({
    session: {
      ...session,
      tasks: session.tasks.map(t => 
        t.id === taskId ? { ...t, done: !t.done } : t
      )
    }
  });
}
```

---

## Optional Backend Integration

### Node.js + Express Example

**Schema (MongoDB/Postgres):**
```typescript
interface FocusSessionDB {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  targetDuration: number; // seconds
  totalPausedTime: number;
  currentTask: string;
  challengeId?: string;
  tasksCompleted: number;
  totalTasks: number;
  blockedAttempts: number;
  xpEarned: number;
}
```

**API Endpoints:**
```javascript
// POST /api/focus/start
app.post('/api/focus/start', async (req, res) => {
  const session = await FocusSession.create({
    userId: req.user.id,
    startTime: new Date(),
    targetDuration: req.body.duration,
    currentTask: req.body.taskName,
    challengeId: req.body.challengeId
  });
  res.json(session);
});

// POST /api/focus/end
app.post('/api/focus/end/:sessionId', async (req, res) => {
  const session = await FocusSession.findByIdAndUpdate(
    req.params.sessionId,
    { endTime: new Date(), xpEarned: calculateXP(session) },
    { new: true }
  );
  res.json(session);
});

// GET /api/focus/analytics
app.get('/api/focus/analytics', async (req, res) => {
  const stats = await FocusSession.aggregate([
    { $match: { userId: req.user.id } },
    { $group: {
      _id: null,
      totalSessions: { $sum: 1 },
      totalFocusTime: { $sum: '$targetDuration' },
      avgSessionLength: { $avg: '$targetDuration' },
      totalXP: { $sum: '$xpEarned' }
    }}
  ]);
  res.json(stats);
});
```

**Sync Strategy:**
1. **Optimistic UI**: Update Zustand immediately (instant feedback)
2. **Background sync**: POST to API after 10 seconds of inactivity
3. **On session end**: Final sync with all data
4. **On app load**: Fetch latest session from server (overwrite localStorage if newer)

---

## Testing Checklist

- [ ] Start session in Focus Mode → Navigate to Dashboard → Timer persists
- [ ] Start session → Close browser → Reopen → Session still active (localStorage)
- [ ] Pause session → Navigate away → Return → Resume works correctly
- [ ] Session timer reaches 0:00 → Auto-ends (optional callback)
- [ ] Toggle tasks in Focus Mode → Check tasks in store
- [ ] Start session → Navigate to Coding Arena → FocusBar appears
- [ ] End session → FocusBar disappears globally

---

## Common Issues & Solutions

### ❌ **Issue: Timer resets to target duration on navigation**
**Cause:** Using `useState(TOTAL_SECONDS)` and decrementing
**Solution:** Use timestamps: `Date.now() - startTime`

### ❌ **Issue: setInterval continues after component unmounts**
**Cause:** Missing cleanup in useEffect
**Solution:**
```typescript
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval); // ✅ Cleanup
}, []);
```

### ❌ **Issue: Session lost on page refresh**
**Cause:** Zustand persist middleware not configured
**Solution:**
```typescript
persist(
  (set, get) => ({ /* store */ }),
  { name: 'devflow-focus-session' } // ✅ localStorage key
)
```

### ❌ **Issue: Timer drifts over time**
**Cause:** Accumulating small delays in setInterval
**Solution:** Always calculate from timestamp, not by incrementing:
```typescript
// ❌ BAD
const [elapsed, setElapsed] = useState(0);
setInterval(() => setElapsed(e => e + 1), 1000);

// ✅ GOOD
const elapsed = Math.floor((Date.now() - startTime) / 1000);
```

---

## File Structure

```
src/app/
├── stores/
│   └── useFocusStore.ts          ← Global state (Zustand)
├── components/
│   ├── FocusTimer.tsx             ← Reusable timer display
│   ├── FocusBar.tsx               ← Persistent floating widget
│   └── DashboardLayout.tsx        ← Injects FocusBar globally
└── pages/
    ├── FocusModeNew.tsx           ← Updated Focus Mode page
    └── CodingArena.tsx            ← Can read session via useFocusStore()
```

---

## Next Steps

1. **Auto-start from Coding Arena**: When user clicks "Start Challenge", auto-activate focus mode
2. **XP Multiplier**: Award bonus XP for maintaining focus throughout challenge
3. **Analytics Dashboard**: Show focus time trends, distraction patterns
4. **Browser Extension**: Actual site blocking (requires Chrome/Firefox extension)
5. **Notifications**: Desktop notifications when session ends
6. **Streak Tracking**: Daily focus streaks with gamification

---

## Summary

**The Key Innovation:** Using **timestamps instead of counters** makes the timer **stateless and persistent**. The session isn't "running" in memory—it's just recording a start time, and any component can calculate elapsed time at any moment.

**Before (❌):**
```typescript
// Local state - resets on navigation
const [seconds, setSeconds] = useState(5400);
setInterval(() => setSeconds(s => s - 1), 1000);
```

**After (✅):**
```typescript
// Global timestamp - persists everywhere
const session = { startTime: Date.now(), ... };
const elapsed = Date.now() - session.startTime;
```

This approach makes Focus Mode a **true cross-page feature** rather than a page-specific timer.
