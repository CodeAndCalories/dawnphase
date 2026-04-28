import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Irregular Periods — 8 Common Causes and When to See a Doctor",
  description:
    "An irregular cycle means periods that come earlier, later, or more unpredictably than usual. Here are 8 common causes and how to figure out which applies to you.",
  openGraph: {
    title: "Irregular Periods — 8 Common Causes and When to See a Doctor",
    description:
      "An irregular cycle means periods that come earlier, later, or more unpredictably than usual. Here are 8 common causes and how to figure out which applies to you.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Irregular%20Periods%20%E2%80%94%208%20Common%20Causes%20and%20When%20to%20See%20a%20Doctor&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Irregular Periods — 8 Common Causes and When to See a Doctor"
        description="An irregular cycle means periods that come earlier, later, or more unpredictably than usual. Here are 8 common causes and how to figure out which applies to you."
        url="https://www.dawnphase.com/blog/irregular-periods-causes"
        datePublished="2026-04-27"
        dateModified="2026-04-27"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Irregular Periods — 8 Common Causes and When to See a Doctor
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and is not medical advice. Irregular periods can have many causes, some of which require medical attention. If your periods have recently changed or you have concerns, consult a healthcare provider.</p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            A &quot;regular&quot; cycle doesn&apos;t mean one that arrives on a fixed date — it means one that falls reliably within a predictable range. Irregular periods are generally defined as cycles that fall outside the 21–35 day range, that vary by more than 7–9 days cycle to cycle, or that are simply unpredictable from month to month. Here are the eight most common reasons this happens.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">1. PCOS (Polycystic Ovary Syndrome)</h2>

          <p>
            PCOS is the most common hormonal cause of irregular periods in reproductive-age people, affecting approximately 8–13% of this population. Elevated androgens (testosterone and DHEAS) disrupt the normal ovulatory process — follicles begin to develop but frequently fail to reach maturation and release an egg. Without ovulation, the normal hormonal cascade that triggers menstruation doesn&apos;t occur.
          </p>
          <p>
            Cycles in PCOS may be 35–90+ days, or periods may be absent for months at a time (oligomenorrhoea or amenorrhoea). Other signs that suggest PCOS include acne particularly on the jawline and back, excess facial or body hair (hirsutism), hair thinning at the scalp, and difficulty managing weight. Diagnosis requires clinical assessment — a single blood panel combined with symptom history and often an ultrasound.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">2. Perimenopause</h2>

          <p>
            Perimenopause — the transition toward menopause — is a very common and often unrecognised cause of cycle irregularity, particularly in people in their early-to-mid 40s. It can begin in the late 30s. As ovarian follicle reserves decline, ovulation becomes less predictable: some cycles are anovulatory, others involve irregular follicle development, and the result is a cycle that starts changing in length.
          </p>
          <p>
            The pattern is often a shortening of cycles first (26 days, then 24, then 22), followed later by lengthening and skipped periods. If your cycles are changing and you are over 38, perimenopause is worth considering. Other early signs include changes in flow, new sleep disruption, and mood changes that weren&apos;t present before.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">3. Thyroid dysfunction</h2>

          <p>
            Both an underactive thyroid (hypothyroidism) and an overactive thyroid (hyperthyroidism) can disrupt menstrual cycles. Thyroid hormones interact directly with the reproductive hormone axis — affecting GnRH pulsatility, sex hormone binding globulin, and the metabolism of oestrogen and progesterone.
          </p>
          <p>
            Hypothyroidism is more commonly associated with heavy, irregular periods and prolonged cycles. Hyperthyroidism more commonly causes light, infrequent periods. Both are reversible with appropriate treatment and are frequently missed as a cause of cycle irregularity because the other symptoms (fatigue, weight changes, temperature sensitivity, palpitations) are attributed to other causes. A simple TSH blood test screens for thyroid dysfunction.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">4. High stress and cortisol</h2>

          <p>
            Significant psychological or physical stress activates the HPA (hypothalamic-pituitary-adrenal) axis and raises cortisol levels. High cortisol suppresses the pulsatile release of GnRH from the hypothalamus — the signal that initiates the whole reproductive hormonal cascade. The result is delayed or absent ovulation, and therefore a delayed or absent period.
          </p>
          <p>
            This mechanism explains why periods can be late or missed after illness, intensive travel, bereavement, exam periods, or major life disruption. The effect is dose-dependent and reversible — when the stressor resolves, ovulation typically resumes. Chronic stress, however, can produce persistent cycle disruption that warrants investigation.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">5. Significant weight changes or low body fat</h2>

          <p>
            The reproductive system is sensitive to energy availability. At very low body fat percentages — common in distance runners, gymnasts, dancers, and people recovering from eating disorders — the hypothalamus down-regulates reproductive function. This is called hypothalamic amenorrhoea: the brain essentially interprets insufficient energy stores as an unsafe environment for pregnancy and suppresses ovulation.
          </p>
          <p>
            Significant rapid weight gain can also affect cycle regularity through different mechanisms: increased peripheral oestrogen conversion in adipose tissue can disrupt the normal feedback cycle. Both extremes are worth discussing with a doctor if they coincide with cycle changes.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">6. Stopping hormonal contraception</h2>

          <p>
            After stopping combined oral contraceptives, hormonal IUDs, implants, or injections, it is common for the cycle to take time to regularise. Most people see a return to regular ovulation within 1–3 months, but post-pill amenorrhoea (absence of periods after stopping the pill) lasting 3–6 months is within the normal range and does not indicate permanent damage.
          </p>
          <p>
            People who had irregular cycles before starting hormonal contraception often find those irregular cycles return afterwards — the pill was regulating the cycle artificially, not treating the underlying cause. If your cycle was irregular before contraception and is irregular again after stopping, the cause may have been present all along.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">7. Excessive exercise</h2>

          <p>
            High training load without adequate nutritional support — sometimes called the Female Athlete Triad or, more broadly, Relative Energy Deficiency in Sport (RED-S) — suppresses ovulation through the same hypothalamic mechanism as low body fat. The key variable is not exercise volume alone, but the ratio of energy intake to energy expenditure.
          </p>
          <p>
            Elite and recreational athletes alike can develop RED-S. Signs include missed or irregular periods, stress fractures, recurrent illness, and poor recovery. If you have significantly increased training load and your cycle has changed, RED-S is worth discussing with a sports medicine doctor or a dietitian with experience in this area.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">8. Structural causes (fibroids, polyps)</h2>

          <p>
            Uterine fibroids and endometrial polyps are non-cancerous growths that can alter bleeding patterns and cycle timing. Submucosal fibroids — those that grow into the uterine cavity — most commonly cause heavier, longer, and sometimes more frequent periods, as well as irregular spotting between periods.
          </p>
          <p>
            Structural causes are typically diagnosed on ultrasound and are more common with age. They do not always require treatment, but they do require assessment — particularly if bleeding is significantly heavier than before or if there is mid-cycle spotting.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking helps identify the cause</h2>

          <p>
            The pattern of your irregularity is often more diagnostic than the irregularity itself. Consistent 45–60 day cycles suggest anovulation (PCOS or hypothalamic suppression). Cycles that were regular and are now shortening from the mid-40s point toward perimenopause. Irregularity that appeared only during a period of high stress or intensive training suggests a functional cause. Irregularity accompanied by much heavier flow points toward structural causes.
          </p>
          <p>
            Tracking your cycle — even imperfectly — over two to three months builds a pattern that is clinically actionable. Dawn Phase works for cycles from 21 to 90 days and doesn&apos;t assume a 28-day baseline.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to see a doctor</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>No period for 3 or more months and pregnancy has been ruled out</li>
            <li>Periods that have suddenly become significantly heavier, longer, or more painful than before</li>
            <li>Significant pelvic pain outside of menstruation</li>
            <li>Irregularity that began alongside other new symptoms (excess hair, acne, weight changes, temperature intolerance, palpitations)</li>
            <li>Concern about fertility or difficulty conceiving</li>
            <li>Mid-cycle spotting that is new and persistent</li>
          </ul>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="irregular-periods-causes"
          slugs={["pcos-cycle-tracking", "perimenopause-age", "period-after-birth-control"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your irregular cycle with Dawn Phase</h3>
          <p className="mb-6 opacity-90">Works for cycles from 21–90 days. No 28-day assumption.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
