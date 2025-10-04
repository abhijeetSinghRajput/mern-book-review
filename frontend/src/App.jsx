import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PolicyPage from "./pages/PolicyPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";
import ProtectedRoute from "./ProtectedRoute";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";

const App = () => {
  const { checkAuth, loader, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Show loader while checking auth
  if (loader.checkAuth) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
          <div className="logo text-xl text-foreground/70">Book Review</div>
          <Loader className="animate-spin" />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" replace /> : <SignupPage />}
          />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
