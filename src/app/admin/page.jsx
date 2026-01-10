// app/admin/page.jsx
import AdminWrapper from "@/Components/AdminSidebar";
import AdminSidebar from "@/Components/AdminWrapper";

export default function AdminDashboard() {
  return (
    <AdminWrapper>
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Добро пожаловать в админ-панель</h1>
        <p>Здесь вы можете управлять пользователями, дилерами и баннерами.</p>
      </div>
    </AdminWrapper>
  );
}
