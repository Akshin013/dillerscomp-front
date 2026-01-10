"use client";
import { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation"; // <-- добавили useRouter

export default function Register() {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get("role") || "USER";
  const router = useRouter(); // <-- создаём роутер

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    role: roleFromQuery,
    companyName: "",
    type: "BANK"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(formData);
    setMessage(data.message);

    if (!data.error) {
      // Редирект на страницу подтверждения email с query-параметром email
      router.push(`/Verify?email=${formData.email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Регистрация ({formData.role})</h2>
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="text" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded"/>
          <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded"/>
          
          {formData.role === "DEALER" && (
            <>
              <input type="text" name="companyName" placeholder="Название компании" value={formData.companyName} onChange={handleChange} required className="w-full p-2 border rounded"/>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="BANK">Банк</option>
                <option value="INSURANCE">Страховая</option>
                <option value="MFI">МФО</option>
              </select>
            </>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
