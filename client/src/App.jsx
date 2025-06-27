import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthenticationRoute from "./components/auth/AuthenticationRoute"; // แก้ไข path
import ProtectedRoute from "./components/auth/ProtectedRoute"; // แก้ไข path
import jwtInterceptors from "./utils/jwtInterceptors";

function App() {
  // Setup JWT interceptors globally when app starts
  useEffect(() => {
    jwtInterceptors.setup();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="post/:postId" element={<ViewPostPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Authentication Section - สำหรับ guest เท่านั้น */}
            <Route
              path="/sign-up"
              element={
                <AuthenticationRouteWrapper>
                  <SignUpPage />
                </AuthenticationRouteWrapper>
              }
            />
            <Route
              path="/sign-up/success"
              element={
                <AuthenticationRouteWrapper>
                  <SignUpSuccessPage />
                </AuthenticationRouteWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <AuthenticationRouteWrapper>
                  <LoginPage />
                </AuthenticationRouteWrapper>
              }
            />

            {/* User Section - สำหรับ authenticated users เท่านั้น */}
            <Route
              path="/profile"
              element={
                <ProtectedRouteWrapper>
                  <ProfilePage />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteWrapper>
                  <ResetPasswordPage />
                </ProtectedRouteWrapper>
              }
            />
          </Routes>

          <Toaster
            toastOptions={{
              unstyled: true,
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Wrapper components ที่ใช้ useAuth
import { useAuth } from "./contexts/authentication";

function AuthenticationRouteWrapper({ children }) {
  const { state, isAuthenticated } = useAuth();

  return (
    <AuthenticationRoute
      isLoading={state.getUserLoading}
      isAuthenticated={isAuthenticated}
    >
      {children}
    </AuthenticationRoute>
  );
}

function ProtectedRouteWrapper({ children }) {
  const { state, isAuthenticated } = useAuth();

  return (
    <ProtectedRoute
      isLoading={state.getUserLoading}
      isAuthenticated={isAuthenticated}
      userRole={state.user?.role || "user"}
      requiredRole="user"
    >
      {children}
    </ProtectedRoute>
  );
}

export default App;
