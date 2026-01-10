import React from 'react'
import Link from "next/link";

const Home = () => {
  return (
    <div className=''>
      Home
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4 h-80 text-xl">

        {/* COLUMN 1 */}
        <div className="grid grid-rows-2 gap-4">
          <div className="card-center flex justify-center items-center  bg-gray-300 rounded-xl">
            Подбор кредита
          </div>
          <div className="card-center flex justify-center items-center bg-gray-300 rounded-xl text-black">
            КАСКО
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="grid grid-rows-[1fr_1fr] gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/Credits" className="card-center flex justify-center items-center bg-gray-300 rounded-xl">
              Кредиты
            </Link>
            <Link href="/CreditCards" className="card-center flex justify-center items-center bg-gray-300 rounded-xl">
              Кредитные карты
            </Link>
          </div>
          <div className="card-center bg-gray-300 flex justify-center items-center rounded-xl">
            Дебетовые карты
          </div>
        </div>

        {/* COLUMN 3 */}
        <div className="grid grid-rows-[1fr_1fr] text-center  gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/Credits/Auto" className="card-center flex justify-center items-center bg-gray-300 rounded-xl">
              Автокредиты
            </Link>
            <div className="card-center bg-gray-300 flex justify-center items-center rounded-xl">
              Банки Азербайджана
            </div>
          </div>
          <div className="card-center bg-gray-300 flex justify-center items-center rounded-xl">
            Подбор карт
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home
