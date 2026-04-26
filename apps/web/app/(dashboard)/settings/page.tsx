import type { Metadata } from "next";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import NotificationSettings from "@/components/dashboard/NotificationSettings";
import BillingSettings from "@/components/dashboard/BillingSettings";
import DangerZone from "@/components/dashboard/DangerZone";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      <ProfileSettings />
      <NotificationSettings />
      <BillingSettings />
      <DangerZone />
    </div>
  );
}
