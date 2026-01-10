"use client";
import { useRouter } from "next/navigation";

export default function RoleSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 max-w-3xl">
        {/* Пользователь */}
        <div
          onClick={() => router.push("/auth/register?role=USER")}
          className="cursor-pointer bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
        >
          <img src="/user-icon.png" alt="User" className="w-28 h-28 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Пользователь</h2>
          <p className="text-gray-600 text-center text-lg">
            Вход и регистрация для обычного пользователя
          </p>
        </div>

        {/* Дилер */}
        <div
          onClick={() => router.push("/auth/login?role=DEALER")}
          className="cursor-pointer bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
        >
          <img src="/dealer-icon.png" alt="Dealer" className="w-28 h-28 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Дилер</h2>
          <p className="text-gray-600 text-center text-lg">
            Регистрация для банка, МФО или страховой компании
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 text-white text-lg">
        Уже есть аккаунт?{" "}
        <span
          onClick={() => router.push("/auth/login")}
          className="underline cursor-pointer hover:text-gray-200"
        >
          Войти
        </span>
      </div>
    </div>
  );
}
