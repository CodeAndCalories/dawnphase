export default function Hero() {
  return (
    <section className="relative overflow-hidden dawn-gradient pt-20 pb-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 text-sm text-purple-700 mb-8">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          Science-backed cycle tracking
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          Know your cycle.
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            Own your health.
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Dawn Phase tracks your period, predicts every phase, and gives you
          personalized insights — so you can work with your hormones, not
          against them.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
          >
            Start tracking free
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-full text-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Free 14-day trial · No credit card required · Cancel anytime
        </p>
      </div>

      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
    </section>
  );
}
