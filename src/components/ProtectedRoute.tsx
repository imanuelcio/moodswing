import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { isAuthenticated } from "../lib/auth";

interface Props {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
