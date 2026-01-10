"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/Components/Breadcrumbs";

const TERMS = [
  { label: "Все", value: null },
  { label: "5 лет", value: 60 },
  { label: "10 лет", value: 120 },
  { label: "15 лет", value: 180 },
  { label: "20 лет", value: 240 },
  { label: "25 лет", value: 300 },
];

export default function MortgagePage() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Фильтры
  const [amount, setAmount] = useState(null);
  const [term, setTerm] = useState(null);
  const [initialPayment, setInitialPayment] = useState(null);

  useEffect(() => {
    const fetchMortgages = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products?category=CREDIT&subtype=MORTGAGE"
        );
        const data = await res.json();
        setCredits(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMortgages();
  }, []);

  const filteredCredits = useMemo(() => {
    return credits.filter((c) => {
      if (amount !== null) {
        if (c.credit?.minAmount > amount) return false;
        if (c.credit?.maxAmount < amount) return false;
      }

      if (term !== null) {
        if (c.credit?.minTerm > term) return false;
        if (c.credit?.maxTerm < term) return false;
      }

      if (initialPayment !== null) {
        if ((c.credit?.initialPayment ?? 0) > initialPayment) return false;
      }

      return true;
    });
  }, [credits, amount, term, initialPayment]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-white">
        Загрузка ипотечных программ...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0b1f3a] px-4 py-10">
      {/* Хлебные крошки */}
      <div className="max-w-6xl mx-auto mb-6">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кредиты", href: "/Credits" },
            { label: "Ипотека" },
          ]}
        />
      </div>

      <h1 className="text-3xl font-bold text-white text-center mb-10">
        Ипотечные кредиты
      </h1>

      {/* Фильтры */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 mb-10">
        {/* Сумма */}
        <FilterBox title="Сумма кредита">
          <input
            type="number"
            placeholder="Любая"
            value={amount ?? ""}
            onChange={(e) =>
              setAmount(e.target.value === "" ? null : Number(e.target.value))
            }
            className="w-full px-3 py-2 rounded text-black"
          />
        </FilterBox>

        {/* Срок */}
        <FilterBox title="Срок">
          <select
            value={term ?? ""}
            onChange={(e) =>
              setTerm(e.target.value === "" ? null : Number(e.target.value))
            }
            className="w-full bg-[#08162c] text-white p-3 rounded"
          >
            <option value="">Все</option>
            {TERMS.filter((t) => t.value !== null).map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </FilterBox>

        {/* Первоначальный взнос */}
        <FilterBox title="Первоначальный взнос">
          <input
            type="number"
            placeholder="Любой"
            value={initialPayment ?? ""}
            onChange={(e) =>
              setInitialPayment(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
            className="w-full px-3 py-2 rounded text-black"
          />
        </FilterBox>

        {/* Сброс */}
        <button
          onClick={() => {
            setAmount(null);
            setTerm(null);
            setInitialPayment(null);
          }}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded md:col-span-3"
        >
          Сбросить фильтры
        </button>
      </div>

      {/* Карточки */}
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
        {filteredCredits.map((credit) => (
          <div
            key={credit._id}
            className="bg-[#08162c] rounded-2xl p-6 shadow flex flex-col justify-between"
          >
            <div>
              <p className="text-blue-400 text-sm mb-1">Ипотека</p>
              <h2 className="text-white text-xl font-semibold mb-2">
                {credit.title}
              </h2>
              <p className="text-slate-300 mb-4">{credit.description}</p>

              <div className="text-sm text-slate-400 space-y-1">
                <p>
                  🏠 Сумма:{" "}
                  <span className="text-white">
                    {credit.credit.minAmount} – {credit.credit.maxAmount} ₼
                  </span>
                </p>
                <p>
                  📅 Срок:{" "}
                  <span className="text-white">
                    {credit.credit.minTerm} – {credit.credit.maxTerm} мес
                  </span>
                </p>
                <p>
                  💰 Взнос:{" "}
                  <span className="text-white">
                    {credit.credit.initialPayment ?? 0} ₼
                  </span>
                </p>
                <p>
                  📈 Ставка:{" "}
                  <span className="text-white">
                    от {credit.credit.interestRateFrom}%
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                href={`/Credits/Mortgage/${credit._id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-center"
              >
                Подробнее
              </Link>
              <a
                href={credit.credit?.websiteUrl || "#"}
                target="_blank"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-center"
              >
                Подать заявку
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔹 Компонент фильтра */
function FilterBox({ title, children }) {
  return (
    <div className="bg-[#0b1f3a] p-4 rounded-xl shadow">
      <p className="text-white mb-2 font-semibold">{title}</p>
      {children}
    </div>
  );
}
