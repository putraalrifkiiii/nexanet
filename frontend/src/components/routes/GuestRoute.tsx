import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
