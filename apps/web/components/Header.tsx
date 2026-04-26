import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#FDF6F0]/95 backdrop-blur-sm border-b border-[rgba(232,99,122,0.12)]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + brand */}
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Dawn Phase"
            width={36}
            height={36}
            className="rounded-xl"
          />
          <span className="font-semibold text-[#C94B6D] text-lg tracking-tight leading-none">
            Dawn Phase
          </span>
        </a>

        {/* Nav actions */}
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="px-3 py-2 text-sm font-medium text-[#8C6B5A] hover:text-[#C94B6D] transition-colors rounded-lg"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E8637A] to-[#F4956A] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <span className="hidden sm:inline">Start free trial</span>
            <span className="sm:hidden">Trial</span>
          </a>
        </div>
      </div>
    </header>
  );
}
