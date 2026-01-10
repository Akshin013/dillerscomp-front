"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/auth/login");
      else if (role && user.role !== role) router.push("/");
    }
  }, [user, loading]);

  if (loading || !user) return null;
  return children;
}
