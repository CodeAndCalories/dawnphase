export default function BillingSettings() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Billing</h2>
      <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-100 rounded-xl mb-4">
        <div>
          <p className="text-sm font-semibold text-purple-900">Pro plan</p>
          <p className="text-xs text-purple-600 mt-0.5">$7/month · renews May 1, 2026</p>
        </div>
        <span className="text-xs bg-purple-500 text-white px-2.5 py-1 rounded-full font-medium">Active</span>
      </div>
      <div className="flex gap-3">
        <button className="text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          Manage subscription
        </button>
        <button className="text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          Download invoices
        </button>
      </div>
    </section>
  );
}
