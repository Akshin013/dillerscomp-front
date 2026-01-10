import ProtectedRoute from "@/Components/ProtectedRoute";

export default function DealerLayout({ children }) {
  return <ProtectedRoute role="DEALER">{children}</ProtectedRoute>;
}
