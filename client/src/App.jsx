import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuth } from "./contexts/authentication.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="post/:postId" element={<ViewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Authentication Section */}
        <Route
          path="/sign-up"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/sign-up/success"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <SignUpSuccessPage />
            </AuthenticationRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticationRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
            >
              <LoginPage />
            </AuthenticationRoute>
          }
        />

        {/* User Section */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute
              isLoading={state.getUserLoading}
              isAuthenticated={isAuthenticated}
              userRole={state.user?.role}
              requiredRole="user"
            >
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;
