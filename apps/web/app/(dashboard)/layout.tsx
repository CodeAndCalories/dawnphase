import Sidebar from "@/components/dashboard/Sidebar";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import FeedbackWidget from "@/components/FeedbackWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3ECFA]">
      <Sidebar />
      <PWAInstallPrompt />
      {/* Offset for fixed desktop sidebar; pb-20 clears 64px tab bar on mobile */}
      <main className="md:pl-60 pb-20 md:pb-0 min-h-screen">
        <div className="px-4 md:px-8 py-6">{children}</div>
      </main>
      <FeedbackWidget />
    </div>
  );
}
