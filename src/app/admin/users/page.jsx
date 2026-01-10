"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token"); // JWT текущего залогиненного админа
  if (!token) return;

  fetch("http://localhost:5000/api/users/", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Ошибка: " + res.status);
      return res.json();
    })
    .then(data => setUsers(data))
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#0B3D91]">Пользователи</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#0B3D91] text-white">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Телефон</th>
            <th className="p-2 border">Роль</th>
            <th className="p-2 border">Статус</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="text-center">
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.phone}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.is_verified ? "Verified" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
