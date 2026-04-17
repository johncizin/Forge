import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if(loading) return  null; //if refreshing, react renders components, then useEffect runs so its kicking user out each time
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}