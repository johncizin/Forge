import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FAB from "./components/FAB";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import {Projects, Tasks, Report, Favorites, Settings } from "./pages";
import { Dashboard } from "./components/Dashboard";
import { AuthProvider } from "./context/authContext";

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
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/report" element={<Report />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
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
          <Route path="/*" element={<Layout />} /> {/* routes to layout pages */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}