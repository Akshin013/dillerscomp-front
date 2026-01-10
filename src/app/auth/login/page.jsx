"use client";
import { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "", role: "USER" });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(formData.email, formData.password, formData.role);
    if (!data.user) setMessage(data.message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Вход</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <p className="text-black" onClick={() => router.push("/auth/forgot-password?role=USER")} >
          за
        </p>
        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded bg-red-600">
          <option value="USER">Пользователь</option>
          <option value="DEALER">Дилер</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Войти</button>
      </form>
    </div>
  );
}
