import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UploadContent from "./pages/UploadContent";
import MyUploads from "./pages/MyUploads";
import Subscription from "./pages/Subscription";
import Library from "./pages/Library";
import DocumentViewer from "./pages/DocumentViewer";
import PricingPage from "./pages/PricingPage";
import PaymentSuccess from "./pages/PaymentSuccess";

// New Pages
import FocusMode from "./pages/FocusModeNew";
import CodingArena from "./pages/CodingArena";
import Competitions from "./pages/Competitions";
import CareerAI from "./pages/CareerAI";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "focus-mode",
        Component: FocusMode,
      },
      {
        path: "coding-arena",
        Component: CodingArena,
      },
      {
        path: "competitions",
        Component: Competitions,
      },
      {
        path: "career-ai",
        Component: CareerAI,
      },
      {
        path: "skill-gap",
        Component: SkillGap,
      },
      {
        path: "roadmap",
        Component: Roadmap,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
      // Keep existing dashboard routes available for continuity
      {
        path: "upload",
        Component: UploadContent,
      },
      {
        path: "uploads",
        Component: MyUploads,
      },
      {
        path: "subscription",
        Component: Subscription,
      },
      {
        path: "library",
        Component: Library,
      },
      {
        path: "library/:id",
        Component: DocumentViewer,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
    ],
  },
]);
