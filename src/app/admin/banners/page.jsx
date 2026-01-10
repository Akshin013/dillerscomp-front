"use client";
import { useEffect, useState } from "react";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token"); // получаем JWT текущего админа
  if (!token) return;

  fetch("http://localhost:5000/api/banners/all", {
    headers: {
      "Authorization": `Bearer ${token}` // передаем токен
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Ошибка: " + res.status); // обработка ошибок
      return res.json();
    })
    .then(data => setBanners(data))
    .catch(err => console.error(err)); // лог ошибок
}, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#0B3D91]">Баннеры</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#0B3D91] text-white">
            <th className="p-2 border">Название</th>
            <th className="p-2 border">Ссылка</th>
            <th className="p-2 border">Клики</th>
            <th className="p-2 border">Статус</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(b => (
            <tr key={b._id} className="text-center">
              <td className="p-2 border">{b.title}</td>
              <td className="p-2 border">{b.link}</td>
              <td className="p-2 border">{b.clicks}</td>
              <td className="p-2 border">{b.approved ? "Approved" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
