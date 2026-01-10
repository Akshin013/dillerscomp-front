"use client";
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

useEffect(() => {
  fetch("http://localhost:5000/banners") // тут правильный путь к твоему роуту
    .then(res => res.json())
    .then(data => setBanners(data))
    .catch(console.error);
}, []);

  // Авто-переключение баннеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000); // смена каждые 5 секунд
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return null;

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
      {banners.map((banner, idx) => (
        <a
          key={banner._id}
          href={banner.link || "#"}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          target="_blank"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-xl md:text-3xl font-bold">{banner.title}</h2>
            {banner.subtitle && <p className="text-sm md:text-lg">{banner.subtitle}</p>}
          </div>
        </a>
      ))}
    </div>
  );
}
