"use client";

import { useState } from "react";
import { apiRequest } from "@/Services/api.js";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await apiRequest("/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, code, password }),
      });
      setMessage("Пароль успешно изменён!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05204A] text-white">
      <form className="bg-[#0B3D91] p-8 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Сброс пароля</h1>
        {error && <div className="bg-red-500 p-2 rounded mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-500 p-2 rounded mb-4 text-center">{message}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded mb-4 bg-[#4B6CB7] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          required
        />
        <input
          type="text"
          placeholder="Код из письма"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 rounded mb-4 bg-[#4B6CB7] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          required
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded mb-6 bg-[#4B6CB7] text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#1E90FF] py-3 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Сброс..." : "Сменить пароль"}
        </button>
      </form>
    </div>
  );
}
