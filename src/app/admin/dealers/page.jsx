"use client";
import { useEffect, useState } from "react";

export default function DealersPage() {
  const [dealers, setDealers] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token"); // получаем JWT текущего админа
  if (!token) return;

  fetch("http://localhost:5000/api/dealers/all", {
    headers: {
      "Authorization": `Bearer ${token}` // передаем токен
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Ошибка: " + res.status); // обработка ошибок
      return res.json();
    })
    .then(data => setDealers(data))
    .catch(err => console.error(err)); // лог ошибок
}, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#0B3D91]">Дилеры</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#0B3D91] text-white">
            <th className="p-2 border">Название</th>
            <th className="p-2 border">Тип</th>
            <th className="p-2 border">Email владельца</th>
            <th className="p-2 border">Статус</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map(d => (
            <tr key={d._id} className="text-center">
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.type}</td>
              <td className="p-2 border">{d.owner?.email}</td>
              <td className="p-2 border">{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
