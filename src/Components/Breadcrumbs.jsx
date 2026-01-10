// components/Breadcrumbs.jsx
"use client";
import Link from "next/link";
import React from "react";
    
export default function Breadcrumbs({ items }) {
  // items = [{ label: "Главная", href: "/" }, { label: "Кредиты" }, { label: "Автокредиты" }]
  return (
    <nav aria-label="breadcrumb" className="text-sm text-slate-400 mb-4">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline text-blue-400">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-slate-500">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
