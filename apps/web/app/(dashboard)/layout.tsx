import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Sidebar />
      {/* Offset for fixed desktop sidebar; bottom padding for mobile tab bar */}
      <main className="md:pl-60 pb-20 md:pb-0 min-h-screen">
        <div className="px-4 md:px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
