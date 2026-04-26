export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-1">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dawn Phase
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Science-backed cycle tracking for every body.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/cycle-calculator" className="hover:text-white transition-colors">Cycle calculator</a></li>
              <li><a href="/luteal-phase-calculator" className="hover:text-white transition-colors">Luteal phase calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/login" className="hover:text-white transition-colors">Log in</a></li>
              <li><a href="/signup" className="hover:text-white transition-colors">Sign up</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/settings" className="hover:text-white transition-colors">Settings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Dawn Phase. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Not a substitute for medical advice. Always consult a healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
