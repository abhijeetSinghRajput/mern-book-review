import React from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "./stores/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser, loader } = useAuthStore();
  // Show loader while checking auth
  if (loader.checkAuth)
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <div className="logo text-xl text-foreground/70">Book Review</div>
        <Loader className="animate-spin" />
      </div>
    );

  // Redirect to login if not authenticated
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected page
  return children;
};

export default ProtectedRoute;
