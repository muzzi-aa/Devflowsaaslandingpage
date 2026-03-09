import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ backgroundColor: "#111418", color: "#FFFFFF" }}
    >
      <RouterProvider router={router} />
    </div>
  );
}