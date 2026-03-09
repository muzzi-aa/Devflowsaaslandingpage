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
