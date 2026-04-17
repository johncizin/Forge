import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FAB from "./components/FAB";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import { Tasks, Report, Favorites } from "./pages";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./context/authContext";
import { Project } from "./pages/ProjectView";
import { Settings } from "./pages/Settings"

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-forge-bg overflow-hidden">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> {/* for sidebar-collapsed by default initializes state setter and bool ** remember struct in interface*/}
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/report" element={<Report />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="projects/:shortId" element={<Project />} />
          </Routes>
        </main>
        <FAB />
      </div>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} /> {/* login page route everything is a function */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/*" element={<Layout />} /> {/* routes to layout pages */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}