const STATS = [
  { value: "Privacy-first",   label: "Your data is never sold" },
  { value: "No data selling", label: "Ever. Guaranteed." },
  { value: "Cancel anytime",  label: "No commitment required" },
];

export default function LiveStatsBar() {
  return (
    <section className="py-10 px-6 bg-[#FFFBF8] border-y border-[#E6D7F3]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        <p className="text-sm font-semibold text-[#5a3575] uppercase tracking-widest text-center">
          Join women who finally understand their cycles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {STATS.map((item) => (
            <div key={item.value} className="text-center">
              <p className="text-2xl font-bold text-[#1E0F30] leading-none">
                {item.value}
              </p>
              <p className="text-xs text-[#3d2855] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
