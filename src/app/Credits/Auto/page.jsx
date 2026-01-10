"use client";
import { useEffect, useState, useMemo } from "react";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import Link from "next/link";

const CREDIT_SUBTYPE_MAP = {
  CONSUMER_LOAN: "Потребительский кредит",
  AUTO_LOAN: "Автокредит",
  MORTGAGE: "Ипотека",
  SECURED_LOAN: "Кредит под залог",
};

const TERMS = [
  { label: "Все", value: null },
  { label: "3 мес", value: 3 },
  { label: "6 мес", value: 6 },
  { label: "9 мес", value: 9 },
  { label: "1 год", value: 12 },
  { label: "2 года", value: 24 },
  { label: "3 года", value: 36 },
  { label: "4 года", value: 48 },
  { label: "5 лет", value: 60 },
];

export default function AutoLoanPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Фильтры
const [amount, setAmount] = useState(null); // Сумма кредита
const [term, setTerm] = useState(null); // Срок
const [initialPayment, setInitialPayment] = useState(null); // Первоначальный взнос

  useEffect(() => {
    const fetchAutoLoans = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products?category=CREDIT&subtype=AUTO_LOAN"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAutoLoans();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (amount !== null) {
        if (p.credit?.minAmount > amount) return false;
        if (p.credit?.maxAmount < amount) return false;
      }
      if (initialPayment !== null) {
        if ((p.credit?.initialPayment ?? 0) > initialPayment) return false;
      }
      if (term !== null) {
        if (p.credit?.minTerm > term) return false;
        if (p.credit?.maxTerm < term) return false;
      }
      return true;
    });
  }, [products, amount, initialPayment, term]);

  if (loading)
    return (
      <p className="text-center mt-20 text-white">Загрузка автокредитов...</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0b1f3a] py-10 px-4">
            <div className=" bg-[#050d1c] px-4 ">
      {/* Хлебные крошки */}
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Кредиты", href: "/Credits" },
          { label: "Автокредиты" },
        ]}
      />
    </div>
      <h1 className="text-3xl font-bold text-white text-center mb-10">
        Автокредиты
      </h1>

<div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3 mb-10">
  {/* СУММА */}
  <div className="bg-[#0b1f3a] p-4 rounded-xl shadow">
    <p className="text-white mb-2 font-semibold">Сумма</p>
    <input
      type="number"
      min={1000}
      max={50000}
      step={500}
      value={amount ?? ""}
      placeholder="Любая"
      onChange={(e) =>
        setAmount(e.target.value === "" ? null : Number(e.target.value))
      }
      className="w-full px-3 py-2 rounded text-black"
    />
    <input
      type="range"
      min={1000}
      max={50000}
      step={500}
      value={amount === null ? 1000 : amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      className="w-full accent-blue-500"
    />
    <div className="flex justify-between text-xs text-slate-300">
      <span>{amount === null ? "Любая сумма" : "1 000 ₼"}</span>
      <span>50 000 ₼</span>
    </div>
  </div>

  {/* СРОК */}
  <div className="bg-[#0b1f3a] p-4 rounded-xl shadow">
    <p className="text-white mb-2 font-semibold">Срок</p>
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
  </div>

  {/* ПЕРВОНАЧАЛЬНЫЙ ВЗНОС */}
  <div className="bg-[#0b1f3a] p-4 rounded-xl shadow">
    <p className="text-white mb-2 font-semibold">Первоначальный взнос</p>
    <input
      type="number"
      min={0}
      max={50000}
      step={500}
      value={initialPayment ?? ""}
      placeholder="Любой"
      onChange={(e) =>
        setInitialPayment(e.target.value === "" ? null : Number(e.target.value))
      }
      className="w-full px-3 py-2 rounded text-black"
    />
    <input
      type="range"
      min={0}
      max={50000}
      step={500}
      value={initialPayment ?? 0}
      onChange={(e) => setInitialPayment(Number(e.target.value))}
      className="w-full accent-blue-500"
    />
    <div className="flex justify-between text-xs text-slate-300">
      <span>{initialPayment === null ? "Любой" : initialPayment + " ₼"}</span>
      <span>50 000 ₼</span>
    </div>
  </div>

  {/* Кнопка сброса */}
  <button
    onClick={() => {
      setAmount(null);
      setTerm(null);
      setInitialPayment(null);
    }}
    className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
  >
    Сбросить фильтры
  </button>
</div>


      {/* Сетка карточек */}
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
        {filteredProducts.map((credit) => (
          <div
            key={credit._id}
            className="bg-[#08162c] rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-blue-400 mb-1">
                {CREDIT_SUBTYPE_MAP[credit.subtype]}
              </p>
              <h2 className="text-white text-xl font-semibold mb-2">
                {credit.title}
              </h2>
              <p className="text-slate-300 mb-4">{credit.description}</p>
              {credit.credit && (
                <div className="text-slate-400 text-sm space-y-1 mb-4">
                  <p>
                    💰 Сумма:{" "}
                    <span className="text-white">
                      {credit.credit.minAmount} - {credit.credit.maxAmount} ₼
                    </span>
                  </p>
                  <p>
                    🏦 Первоначальный взнос:{" "}
                    <span className="text-white">
                      {credit.credit.initialPayment ?? 0} ₼
                    </span>
                  </p>
                  <p>
                    📅 Срок:{" "}
                    <span className="text-white">
                      {credit.credit.minTerm} - {credit.credit.maxTerm} мес
                    </span>
                  </p>
                  <p>
                    📈 Ставка:{" "}
                    <span className="text-white">
                      от {credit.credit.interestRateFrom}%
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href={credit.credit?.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-center transition"
              >
                Подать заявку
              </a>
              <Link
                href={`/Credits/Auto/${credit._id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-center transition"
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
