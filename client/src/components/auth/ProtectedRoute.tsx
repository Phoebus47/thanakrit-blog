/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../WebSection";
import type { ProtectedRouteProps } from "../../types";

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}: ProtectedRouteProps) {
  // แสดง loading ขณะตรวจสอบ authentication
  if (isLoading === null || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  // ถ้าไม่ได้ login ให้ไป login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ถ้า login แล้วแต่ role ไม่ตรง (ถ้าต้องการตรวจสอบ role)
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ถ้าผ่านการตรวจสอบทั้งหมด ให้แสดงหน้าเป้าหมาย
  return children;
}

export default ProtectedRoute;