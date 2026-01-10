import "../styles/style.css";
import Navbar from "../Components/Common/Navbar";
import { AuthProvider } from "./Context/AuthContext";

export const metadata = {
  title: "Deep Blue App",
  description: "Frontend для Node.js + MongoDB backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-[#05204A] px-44 text-white font-sans">
        <AuthProvider>
          <Navbar />
          <main className="md:mx-[8%] lg:mx-[17%]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}



