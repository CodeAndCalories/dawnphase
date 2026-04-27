import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "The Follicular Phase — What It Is and What to Expect",
  description:
    "The follicular phase runs from day 1 to ovulation. Here's what happens hormonally, why energy often rises, how long it lasts, and how to track it.",
  openGraph: {
    title: "The Follicular Phase — What It Is and What to Expect",
    description:
      "The follicular phase runs from day 1 to ovulation. Here's what happens hormonally, why energy often rises, how long it lasts, and how to track it.",
    images: [{
      url: "https://www.dawnphase.com/og?title=The%20Follicular%20Phase%20%E2%80%94%20What%20It%20Is%20and%20What%20to%20Expect&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="The Follicular Phase — What It Is and What to Expect"
        description="The follicular phase runs from day 1 to ovulation. Here's what happens hormonally, why energy often rises, how long it lasts, and how to track it."
        url="https://www.dawnphase.com/blog/follicular-phase-explained"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          The Follicular Phase — What It Is and What to Expect
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Individual experiences of the follicular phase vary widely. Consult a healthcare provider with any concerns about your cycle.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            The follicular phase is one of the four main phases of the menstrual cycle — and for many people, it&apos;s the one associated with rising energy, improved mood, and increased motivation. Understanding what&apos;s happening hormonally during this phase helps explain why it often feels different from the rest of the cycle.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What is the follicular phase?</h2>
          <p>
            The follicular phase begins on day 1 of your period and ends at ovulation. It overlaps with, and then continues after, the menstrual phase. While you are bleeding in the first few days, the follicular phase has already begun in the background.
          </p>
          <p>
            The name comes from the follicles — small fluid-filled sacs in the ovaries that each contain an immature egg. Under the influence of follicle-stimulating hormone (FSH), several follicles begin developing at the start of each cycle. Usually one becomes dominant and matures fully; the others gradually stop developing. The dominant follicle eventually ruptures to release its egg at ovulation, marking the end of the follicular phase.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What happens hormonally</h2>
          <p>
            The follicular phase is primarily characterised by rising oestrogen. As the dominant follicle develops, it produces increasing amounts of oestradiol (the main form of oestrogen). Oestrogen has wide-ranging effects throughout the body:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>It thickens the uterine lining in preparation for potential implantation</li>
            <li>It affects the brain&apos;s dopamine and serotonin systems, which is linked to improved mood and motivation in many people</li>
            <li>It supports collagen production, which some people notice as improved skin quality during this phase</li>
            <li>It has mild anabolic effects — research suggests it may support muscle protein synthesis and recovery</li>
            <li>It promotes the production of cervical mucus, which becomes increasingly fertile as ovulation approaches</li>
          </ul>
          <p>
            Towards the end of the follicular phase, rising oestrogen triggers a surge of luteinising hormone (LH), which causes the dominant follicle to rupture and release the egg — ovulation. This LH surge marks the end of the follicular phase.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How long does the follicular phase last?</h2>
          <p>
            The follicular phase is the most variable part of the menstrual cycle. In a textbook 28-day cycle, it lasts approximately 14 days (days 1–14). But cycle length variation almost entirely comes from variability in the follicular phase — the luteal phase (after ovulation) is relatively consistent at 12–16 days for most people.
          </p>
          <p>
            A shorter follicular phase (10–11 days) produces a shorter overall cycle; a longer follicular phase (16–18+ days) produces a longer cycle. Factors including stress, illness, significant weight change, sleep disruption, and age all affect follicular phase length. With PCOS, the follicular phase can be significantly prolonged, or follicles may develop but not fully mature, resulting in anovulatory cycles.
          </p>
          <p>
            Use our free <Link href="/cycle-calculator" className="text-[#E8637A] hover:underline font-medium">cycle length calculator</Link> to estimate the pattern in your cycles.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Common symptoms and energy patterns</h2>
          <p>
            Many people notice a shift in how they feel as the follicular phase progresses and oestrogen rises. Research suggests that oestrogen&apos;s effects on dopamine signalling contribute to improved mood, motivation, and cognitive performance during this phase. Commonly reported patterns include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Increasing energy levels as the phase progresses</li>
            <li>Improved concentration and mental clarity</li>
            <li>Greater sociability and willingness to engage in new activities</li>
            <li>Reduced appetite compared to the luteal phase</li>
            <li>Changes in cervical mucus — from dry/sticky to watery, then to clear and stretchy as ovulation approaches</li>
          </ul>
          <p>
            These are population-level tendencies, not guarantees. Individual experience varies, and factors like sleep quality, stress, and overall health influence how any given follicular phase feels. See also:{" "}
            <Link href="/symptoms/low-energy-menstrual-phase" className="text-[#E8637A] hover:underline font-medium">low energy during your period</Link>{" "}
            for the contrast at the start of the follicular phase.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Exercise and nutrition in the follicular phase</h2>
          <p>
            Some research suggests that oestrogen&apos;s anabolic effects may make the follicular phase a good time for higher-intensity or strength-focused exercise, and that recovery may be efficient during this period. However, individual variation is significant, and the evidence for specific training prescriptions based on cycle phase is still developing.
          </p>
          <p>
            From a nutritional standpoint, the follicular phase is often associated with lower appetite and easier blood sugar regulation compared to the luteal phase. Iron replenishment after menstrual losses is worth prioritising in the early follicular phase for those with heavier periods.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to track the follicular phase</h2>
          <p>
            The most reliable way to identify your follicular phase is to track period start dates (which marks day 1) and ovulation signs (which marks the end). Ovulation signs include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cervical mucus becoming clear and stretchy (egg-white consistency)</li>
            <li>A positive ovulation predictor kit (OPK) result</li>
            <li>A rise in basal body temperature (BBT) the day after ovulation</li>
          </ul>
          <p>
            Dawn Phase tracks your cycle day from your logged period start and shows which phase you&apos;re in in real time. Logging daily energy, mood, and symptoms across several cycles builds a picture of how your specific follicular phase tends to feel.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="follicular-phase-explained"
          slugs={["ovulation-symptoms", "luteal-phase-symptoms", "cycle-syncing-explained"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track every phase of your cycle</h3>
          <p className="mb-6 opacity-90">See your follicular phase patterns across months. 7-day free trial.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
