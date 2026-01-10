"use client";
import { useAuth } from "@/hooks/useAuth.js";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Профиль</h1>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
    </div>
  );
}
