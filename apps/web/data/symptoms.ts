export type Phase =
  | "Menstrual"
  | "Follicular"
  | "Ovulatory"
  | "Luteal"
  | "Perimenopause"
  | "All";

export interface Symptom {
  slug: string;
  name: string;
  phase: Phase;
  description: string;
  causes: string;
  tracking: string;
  whenToSeeDoctor: string;
  related: string[];
  patternNote?: string;
}

export const symptoms: Symptom[] = [
  // ── Luteal ───────────────────────────────────────────────────────────────────
  {
    slug: "bloating-before-period",
    name: "Bloating Before Period",
    phase: "Luteal",
    description:
      "Abdominal bloating in the days before your period is caused by rising progesterone and fluid retention. Learn what causes it, how to track it, and when it signals something more.",
    causes:
      "After ovulation, progesterone rises rapidly and acts on smooth muscle, slowing digestion and encouraging fluid retention. Oestrogen fluctuations in the late luteal phase can compound this, widening blood vessels and increasing water held in tissues. The result is a sensation of fullness, tightness, or visible distension — typically worst in the 3–5 days before your period begins, and resolving within a day or two of flow starting.",
    tracking:
      "Log bloating severity daily on a 0–3 scale alongside your cycle day. After two or three cycles you'll see a clear pattern — most women find the worst days cluster on days 24–28. Track alongside sodium intake, sleep, and stress, as all three can amplify luteal bloating. Seeing the pattern helps separate premenstrual bloating from digestive conditions that don't follow the cycle.",
    whenToSeeDoctor:
      "Bloating that is severe, persistent throughout your whole cycle, accompanied by significant pain, or associated with changes in bowel habits may indicate endometriosis, fibroids, irritable bowel syndrome, or ovarian pathology. If bloating doesn't reliably resolve within 2 days of your period starting, mention it to your doctor.",
    related: ["cramps-during-period", "mood-swings-before-period", "fatigue-luteal-phase"],
  },
  {
    slug: "fatigue-luteal-phase",
    name: "Fatigue During Luteal Phase",
    phase: "Luteal",
    description:
      "Intense tiredness in the second half of your cycle is a hallmark of the luteal phase. Progesterone has a sedating effect — here's why, and how to track whether it's hormonal.",
    causes:
      "Progesterone is mildly sedating — it binds to GABA receptors in the brain, producing a calming, drowsy effect. In the luteal phase, when progesterone is at its peak, many women feel noticeably more tired than in the follicular phase. As progesterone drops sharply in the final days before menstruation, sleep disruption often increases, leading to cumulative fatigue. Low iron from heavy periods can compound this further.",
    tracking:
      "Rate your energy level on a 1–5 scale each morning. After two cycles, compare your follicular-phase average with your luteal-phase average. If you consistently score 2 points lower in the luteal phase, that confirms a hormonal pattern rather than general fatigue. Also track sleep hours and period flow — iron-deficiency fatigue tends to be worst in the days immediately after a heavy period.",
    whenToSeeDoctor:
      "Fatigue that is severe enough to interfere with daily function, present throughout your whole cycle, or accompanied by cold intolerance, weight changes, or hair loss warrants testing for thyroid dysfunction or iron-deficiency anaemia. These conditions are common in women and often go undiagnosed.",
    related: ["low-energy-menstrual-phase", "mood-swings-before-period", "bloating-before-period"],
  },
  {
    slug: "mood-swings-before-period",
    name: "Mood Swings Before Period",
    phase: "Luteal",
    description:
      "Irritability, tearfulness, and emotional sensitivity in the week before your period are driven by hormonal fluctuations. Here's how to distinguish PMS from PMDD — and track your patterns.",
    causes:
      "Progesterone and oestrogen both influence serotonin and GABA signalling in the brain. In the late luteal phase, both hormones fall sharply, reducing serotonin availability and destabilising mood regulation. Women with premenstrual mood changes often have a normal hormonal profile — their brains appear more sensitive to the fluctuations rather than having abnormally high or low hormone levels.",
    tracking:
      "Log mood daily using a simple scale or emotion categories. The critical thing to track is timing: if mood symptoms consistently appear in the 7–14 days before your period and resolve within 1–2 days of it starting, that confirms a premenstrual pattern. Symptoms present throughout the whole cycle are unlikely to be purely hormonal.",
    whenToSeeDoctor:
      "If mood symptoms are severe enough to affect your relationships, work, or daily functioning, or include hopelessness, suicidal thoughts, or extreme rage, consider evaluation for PMDD (premenstrual dysphoric disorder). PMDD is a recognised condition that responds well to treatment — SSRIs, hormonal therapy, or both.",
    related: ["pms-vs-pmdd", "fatigue-luteal-phase", "bloating-before-period"],
  },
  {
    slug: "pms-vs-pmdd",
    name: "PMS vs PMDD — Key Differences",
    phase: "Luteal",
    description:
      "PMS and PMDD are both premenstrual conditions, but PMDD involves severe mood disruption that impairs daily life. Here's how to tell them apart and what to do about each.",
    causes:
      "Both PMS and PMDD are driven by sensitivity to the hormonal shifts of the late luteal phase — particularly the fall in oestrogen and progesterone. In PMDD, the brain's response to these shifts appears exaggerated, likely involving differences in GABA receptor sensitivity, serotonin signalling, or neurosteroid metabolism. The hormone levels themselves are typically normal; it's the neurological response to the changes that differs.",
    tracking:
      "Daily symptom tracking across at least two full cycles is the cornerstone of diagnosing both PMS and PMDD. Record the type and severity of each symptom and the cycle day it occurs on. A pattern of severe symptoms confined to the luteal phase (days 15–28) that resolve promptly with menstruation, and which impair functioning, meets the PMDD criteria. This record is also what your doctor will ask for.",
    whenToSeeDoctor:
      "See a doctor if premenstrual symptoms are causing significant distress or impairing work, relationships, or daily activities. PMDD is underdiagnosed — many women are treated for depression without the cyclical pattern being recognised. A symptom log is the most useful thing you can bring to the appointment.",
    related: ["mood-swings-before-period", "fatigue-luteal-phase", "anxiety-perimenopause"],
  },
  {
    slug: "breast-tenderness-before-period",
    name: "Breast Tenderness Before Period",
    phase: "Luteal",
    description:
      "Sore, swollen, or tender breasts in the days before your period are a common luteal phase symptom driven by hormonal shifts. Here's what causes it and when to get checked.",
    causes:
      "Rising oestrogen and progesterone in the luteal phase cause breast tissue to swell and become more sensitive. Oestrogen stimulates growth of breast ducts; progesterone stimulates development of the milk-producing lobules. Both effects cause engorgement and tenderness. The symptoms typically peak in the 3–5 days before menstruation and resolve rapidly once the period starts and hormone levels drop.",
    tracking:
      "Log breast tenderness daily on a simple severity scale. Tracking the start and end day relative to your cycle helps confirm a cyclical pattern. Note whether tenderness is bilateral (both sides) — cyclical breast pain is almost always bilateral and symmetrical, which distinguishes it from breast pathology, which is usually localised.",
    whenToSeeDoctor:
      "See a doctor if breast pain is localised to one area, non-cyclical (present throughout the month), associated with a lump, nipple discharge, or skin changes, or if it began after starting a new medication. Cyclical breast pain linked to hormonal fluctuations is common and rarely sinister, but new or one-sided pain warrants evaluation.",
    related: ["bloating-before-period", "mood-swings-before-period", "pms-vs-pmdd"],
  },
  {
    slug: "headache-before-period",
    name: "Headaches Before Your Period",
    phase: "Luteal",
    description:
      "Hormonal headaches and menstrual migraines are triggered by the drop in oestrogen before your period. Learn how to predict and track them using your cycle data.",
    causes:
      "The sharp decline in oestrogen in the late luteal phase — typically days 24–28 of a 28-day cycle — is a potent trigger for headaches and migraines in susceptible women. Oestrogen modulates serotonin receptors and influences blood vessel tone; falling oestrogen destabilises these systems. Menstrual migraines (those that occur consistently around menstruation) are the most common type of hormonally triggered headache.",
    tracking:
      "Log headache occurrence, severity, and cycle day. After 2–3 cycles, a pattern of headaches clustering in days 24–28 confirms a hormonal trigger. Also track sleep, hydration, and stress — these interact with the hormonal trigger and can make episodes more or less severe. Identifying the window lets you prepare with early intervention.",
    whenToSeeDoctor:
      "See a doctor if headaches are disabling, require prescription medication, occur with visual disturbances, weakness, or confusion, or don't follow the expected premenstrual pattern. Women with menstrual migraines with aura face an elevated cardiovascular risk with combined oral contraceptives — this should be discussed with your doctor.",
    related: ["bloating-before-period", "mood-swings-before-period", "fatigue-luteal-phase"],
  },
  {
    slug: "food-cravings-luteal-phase",
    name: "Food Cravings in the Luteal Phase",
    phase: "Luteal",
    description:
      "Intense cravings for carbohydrates, sugar, and chocolate in the second half of your cycle are hormonally driven. Here's the science — and how tracking reveals your pattern.",
    causes:
      "Progesterone raises basal metabolic rate by around 5–10% in the luteal phase, increasing caloric needs slightly. Falling serotonin in the late luteal phase drives carbohydrate cravings specifically — carbohydrates boost brain tryptophan availability and temporarily raise serotonin. Chocolate cravings may involve magnesium depletion (magnesium is used in prostaglandin synthesis) and the mood-modulatory effects of phenylethylamine found in cocoa.",
    tracking:
      "Log cravings as part of your daily symptom record — noting type, intensity, and cycle day. Most women find cravings peak in days 22–27. Tracking reveals whether cravings correlate with low energy or mood dips, helping distinguish emotional eating from hormonally-driven appetite shifts.",
    whenToSeeDoctor:
      "Cravings that lead to significant binge eating, distress, or disruption to daily life — especially if accompanied by purging — may indicate binge eating disorder or bulimia, both of which are worsened by the luteal phase. These warrant professional support.",
    related: ["fatigue-luteal-phase", "bloating-before-period", "mood-swings-before-period"],
  },

  // ── Perimenopause ─────────────────────────────────────────────────────────────
  {
    slug: "brain-fog-perimenopause",
    name: "Brain Fog in Perimenopause",
    phase: "Perimenopause",
    description:
      "Difficulty concentrating, word-finding problems, and memory lapses are among the most distressing perimenopause symptoms. Oestrogen plays a key role in cognitive function — here's why.",
    causes:
      "Oestrogen has direct effects on brain function: it modulates acetylcholine (involved in memory), serotonin (mood and attention), and dopamine (motivation and executive function). As oestrogen fluctuates and eventually declines during perimenopause, cognitive processing can become less sharp. Sleep disruption from night sweats compounds the problem — sleep is critical for memory consolidation and cognitive performance.",
    tracking:
      "Log cognitive symptoms daily — concentration difficulty, word-finding problems, and short-term memory lapses — alongside sleep quality and night sweat frequency. This helps distinguish brain fog driven by poor sleep from fog driven directly by hormonal shifts. Tracking also provides evidence for healthcare conversations; many women are dismissed when they report cognitive symptoms without supporting data.",
    whenToSeeDoctor:
      "See a doctor if cognitive symptoms are significantly impacting work or daily life, worsening over time, or accompanied by personality changes, language difficulties, or spatial disorientation. Perimenopause brain fog is real but rarely causes severe impairment — symptoms that seem disproportionate warrant neurological evaluation to rule out other causes.",
    related: ["night-sweats-perimenopause", "anxiety-perimenopause", "hot-flashes-causes"],
  },
  {
    slug: "night-sweats-perimenopause",
    name: "Night Sweats During Perimenopause",
    phase: "Perimenopause",
    description:
      "Waking drenched in the night is one of the most disruptive perimenopause symptoms. Learn why they happen, how oestrogen is involved, and how consistent tracking can help.",
    causes:
      "Night sweats are the nocturnal equivalent of hot flashes. Declining oestrogen disrupts the hypothalamus's thermoregulatory set point, causing it to misread normal body temperature as too hot and triggering sweating to cool down. The threshold at which this misfire occurs narrows as oestrogen falls — meaning smaller temperature fluctuations (a warm room, stress, alcohol) can trigger episodes that wouldn't have affected you previously.",
    tracking:
      "Log night sweats by frequency (number of episodes), severity (mild dampness vs drenching), and which part of the night they occur. Track alongside alcohol intake, room temperature, and stress level — all three are common triggers that are within your control. Showing a doctor a 2-month log of night sweat frequency and severity is far more useful than estimating from memory.",
    whenToSeeDoctor:
      "Night sweats that are severe, occur throughout the night, or are associated with fever, unexplained weight loss, or drenching sweats unrelated to menopause timing should be evaluated. Night sweats can occasionally signal infection, lymphoma, or other conditions that require investigation.",
    related: ["hot-flashes-causes", "brain-fog-perimenopause", "anxiety-perimenopause"],
  },
  {
    slug: "hot-flashes-causes",
    name: "Hot Flashes — Causes and Tracking",
    phase: "Perimenopause",
    description:
      "Hot flashes affect up to 75% of women during perimenopause. Here's what causes them, what makes them worse, and how tracking frequency and triggers can help you manage them.",
    causes:
      "Hot flashes are caused by dysregulation of the hypothalamic thermostat as oestrogen declines. The hypothalamus normally maintains body temperature within a narrow zone. In perimenopause, the zone narrows, causing the hypothalamus to trigger vasodilation and sweating in response to small temperature increases that would previously have been ignored. The resulting rush of heat, flushing, and sweating typically lasts 1–5 minutes and may be followed by chills.",
    tracking:
      "Log each hot flash by time of day, duration, severity (1–3), and any identifiable trigger. Common triggers include caffeine, alcohol, spicy food, hot drinks, stress, and warm environments. After 4–6 weeks of logging, patterns usually emerge — many women find their worst episodes cluster at specific times of day or around specific activities. This data is directly actionable for trigger avoidance.",
    whenToSeeDoctor:
      "Hot flashes that are severe, frequent (more than 7 per day), or significantly affecting quality of life warrant a conversation with a doctor about treatment options. Effective treatments include hormone replacement therapy (HRT), some antidepressants, and non-hormonal options. Don't accept severe hot flashes as something you simply have to endure.",
    related: ["night-sweats-perimenopause", "brain-fog-perimenopause", "anxiety-perimenopause"],
  },
  {
    slug: "irregular-periods-perimenopause",
    name: "Irregular Periods in Perimenopause",
    phase: "Perimenopause",
    description:
      "Cycle irregularity is often the first sign of perimenopause. Cycles become shorter, then longer, then unpredictable — here's what's happening hormonally and how to track the transition.",
    causes:
      "As the ovarian reserve declines, follicle development becomes less reliable. Some cycles may not include ovulation, producing a shorter, lighter cycle (anovulatory cycle). Other cycles may have delayed or prolonged follicular phases, producing longer cycles. FSH rises as the pituitary gland tries harder to stimulate the ovaries. The result is cycles that vary unpredictably in length and flow.",
    tracking:
      "Log period start dates, cycle lengths, and flow intensity for every cycle. Tracking over 6–12 months reveals the progression from regular cycles to shorter cycles (a common early sign), then to longer and more variable cycles. This record is valuable for distinguishing perimenopause from thyroid dysfunction, PCOS, or other causes of cycle irregularity.",
    whenToSeeDoctor:
      "See a doctor if bleeding is very heavy (soaking a pad or tampon per hour for more than a few hours), if periods become significantly more frequent than every 21 days, if you experience bleeding between periods or after sex, or if you have pelvic pain. Irregular bleeding in perimenopause should not be automatically attributed to hormones without ruling out fibroids, polyps, or endometrial pathology.",
    related: ["irregular-periods-pcos", "heavy-period", "night-sweats-perimenopause"],
  },
  {
    slug: "anxiety-perimenopause",
    name: "Anxiety During Perimenopause",
    phase: "Perimenopause",
    description:
      "New or worsening anxiety is a common but under-recognised perimenopause symptom. Oestrogen's role in the nervous system explains why hormonal shifts can trigger or amplify anxiety.",
    causes:
      "Oestrogen modulates GABA receptors — the same receptors targeted by benzodiazepines. It also influences the amygdala (the brain's fear centre) and the prefrontal cortex. Falling and fluctuating oestrogen can reduce GABAergic inhibition of the stress response, making the nervous system more reactive. Many women experience perimenopausal anxiety as a new, physiological sensation — different from anxiety driven by life circumstances — often described as a sense of dread or heightened alertness without an obvious cause.",
    tracking:
      "Rate anxiety level daily (1–5) and note time of day, cycle phase, and any triggers. Many women find anxiety spikes in the late luteal phase and in the days after a period — periods of rapidly falling hormones. Tracking helps distinguish cyclical hormonal anxiety from generalised anxiety disorder.",
    whenToSeeDoctor:
      "See a doctor if anxiety is interfering with daily functioning, sleep, or relationships. Mention explicitly that you are in perimenopause — anxiety is a recognised oestrogen-driven symptom and may respond to HRT, which is often not offered unless the hormonal component is identified. CBT and some antidepressants are also effective.",
    related: ["brain-fog-perimenopause", "hot-flashes-causes", "night-sweats-perimenopause"],
  },
  {
    slug: "joint-pain-perimenopause",
    name: "Joint Pain in Perimenopause",
    phase: "Perimenopause",
    description:
      "Aching joints — especially in the hands, knees, and hips — are a frequently overlooked perimenopause symptom. Oestrogen has anti-inflammatory properties, and declining levels affect joint tissue.",
    causes:
      "Oestrogen receptors are present in cartilage, synovial membrane, and tendons. Oestrogen has anti-inflammatory effects in joint tissue and helps maintain cartilage integrity. As oestrogen declines in perimenopause, joint inflammation can increase and cartilage may deteriorate more rapidly. Many women experience new-onset joint pain in their 40s that coincides with perimenopause and resolves or improves with HRT.",
    tracking:
      "Log joint pain location, severity, and whether it correlates with cycle phase or sleep quality. Joint pain driven by hormonal fluctuations often worsens in the luteal phase and perimenopause transition, and may improve after menstruation or with HRT. This pattern helps distinguish perimenopausal joint pain from osteoarthritis or autoimmune conditions.",
    whenToSeeDoctor:
      "See a doctor if joint pain is sudden in onset, involves significant swelling or redness, is asymmetric, or is accompanied by fever or fatigue. These features suggest inflammatory arthritis or other conditions that need investigation. Perimenopause-related joint pain tends to be bilateral and to improve over time after the menopause transition.",
    related: ["anxiety-perimenopause", "brain-fog-perimenopause", "fatigue-luteal-phase"],
  },

  // ── Ovulatory ────────────────────────────────────────────────────────────────
  {
    slug: "ovulation-pain",
    name: "Ovulation Pain (Mittelschmerz)",
    phase: "Ovulatory",
    description:
      "A sharp or crampy pain on one side of the lower abdomen at mid-cycle is called Mittelschmerz — German for 'middle pain'. It's caused by ovulation itself and is usually harmless.",
    causes:
      "Ovulation pain occurs when the follicle ruptures to release the egg. This can cause brief local inflammation and sometimes a small amount of fluid or blood to be released into the pelvic cavity, irritating the peritoneum. The pain is typically felt on the side corresponding to the ovulating ovary. It can last from a few minutes to a couple of hours, occasionally longer.",
    tracking:
      "Note the date, cycle day, and which side the pain occurs on. Consistent mid-cycle pain (typically days 11–16 in a 28-day cycle) that alternates between left and right is classic Mittelschmerz and can actually help you identify your ovulation window. Track alongside any other ovulation signs — cervical mucus changes, a brief dip in basal body temperature — to build a fuller picture.",
    whenToSeeDoctor:
      "See a doctor if the pain is severe, lasts more than 3 days, is accompanied by fever or vomiting, or if you have a history of ovarian cysts, endometriosis, or ectopic pregnancy. A ruptured ovarian cyst or ectopic pregnancy can mimic Mittelschmerz with more serious consequences.",
    related: ["ovulation-discharge", "bloating-before-period", "irregular-periods-pcos"],
  },
  {
    slug: "ovulation-discharge",
    name: "Discharge During Ovulation",
    phase: "Ovulatory",
    description:
      "Clear, stretchy, egg-white cervical mucus around ovulation is a normal and important sign of fertility. Here's what causes it, what to look for, and how to track it.",
    causes:
      "Oestrogen peaks just before ovulation, stimulating cervical glands to produce a clear, slippery, stretchy mucus — often described as resembling raw egg white. This mucus creates a sperm-friendly environment, facilitating transport through the cervix. After ovulation, progesterone causes mucus to become thick and sticky (less conducive to sperm). Noticing the transition from egg-white to thick mucus helps identify when ovulation has occurred.",
    tracking:
      "Check cervical mucus daily — at the same time, before urinating — and note its appearance and consistency. Categories: dry, sticky/creamy, watery, egg-white (peak fertility). Record on which cycle day you notice each type. Over two or three cycles, your fertile window (egg-white days) will become predictable.",
    whenToSeeDoctor:
      "See a doctor if you never observe egg-white cervical mucus and are trying to conceive (may indicate anovulation), if discharge has an unusual colour, odour, or is associated with itching or burning (may indicate infection), or if discharge is significantly heavier than expected.",
    patternNote:
      "The pattern tells you more than the symptom. Noticing discharge changes once is useful. Noticing it appears on the same cycle days, with the same consistency, every month — that's a window into your actual ovulation pattern. For women with PCOS or irregular cycles, tracking discharge alongside other symptoms helps you spot ovulation even when the calendar can't predict it.",
    related: ["ovulation-pain", "irregular-periods-pcos", "bloating-before-period"],
  },

  // ── Menstrual ─────────────────────────────────────────────────────────────────
  {
    slug: "low-energy-menstrual-phase",
    name: "Low Energy During Your Period",
    phase: "Menstrual",
    description:
      "Fatigue and low energy during menstruation are normal — but the causes vary. Understanding whether it's hormonal, iron-related, or prostaglandin-driven helps you manage it effectively.",
    causes:
      "Oestrogen and progesterone are at their lowest point during menstruation, removing the stimulatory effects of both hormones. Prostaglandins — hormone-like compounds that trigger uterine contractions — cause cramping and can also produce systemic effects including fatigue, nausea, and headache. Blood loss can cause transient iron deficiency, especially with heavy periods, leading to reduced oxygen-carrying capacity and pronounced fatigue.",
    tracking:
      "Log energy levels during your period alongside flow intensity and duration. If fatigue is significantly worse during heavy flow days, iron-deficiency fatigue is likely. If fatigue is present even with light flow, prostaglandin effects or low hormone levels may be the driver. Tracking over multiple cycles reveals whether the severity is consistent or worsening over time.",
    whenToSeeDoctor:
      "See a doctor if period fatigue is severe enough to keep you from normal activities, if you experience symptoms of anaemia (pallor, shortness of breath, dizziness, rapid heartbeat), or if your periods are so heavy that you're soaking more than one pad per hour. Heavy periods with severe fatigue warrant investigation.",
    related: ["cramps-during-period", "heavy-period", "fatigue-luteal-phase"],
  },
  {
    slug: "cramps-during-period",
    name: "Period Cramps (Dysmenorrhoea)",
    phase: "Menstrual",
    description:
      "Period cramps are caused by prostaglandins triggering uterine contractions. Here's what drives their severity, how to track them, and when cramping warrants medical investigation.",
    causes:
      "The shedding uterine lining releases prostaglandins — inflammatory compounds that cause the uterus to contract to expel its contents. Higher prostaglandin production causes stronger contractions and more pain. The pain can radiate to the lower back and thighs. Primary dysmenorrhoea (no underlying cause) is driven purely by this mechanism and typically begins with the onset of flow. Secondary dysmenorrhoea (caused by conditions like endometriosis or fibroids) often starts before flow and can be severe.",
    tracking:
      "Log cramp severity (0–10) each day of your period, noting which cycle day they peak on, how long they last, and whether they respond to ibuprofen. Primary dysmenorrhoea typically peaks on days 1–2 and responds to NSAIDs; secondary dysmenorrhoea may peak before flow starts and be resistant to standard pain relief. This pattern is diagnostic.",
    whenToSeeDoctor:
      "See a doctor if cramps are severe and not adequately relieved by over-the-counter NSAIDs, if they start before your period begins and last more than 2–3 days into your flow, if they are getting progressively worse over time, or if they are accompanied by pain during sex or bowel movements — these features suggest endometriosis.",
    related: ["heavy-period", "bloating-before-period", "low-energy-menstrual-phase"],
  },
  {
    slug: "heavy-period",
    name: "Heavy Periods (Menorrhagia)",
    phase: "Menstrual",
    description:
      "Heavy menstrual bleeding affects 1 in 3 women. Learn what defines heavy bleeding, common causes from fibroids to hormonal imbalance, and how to track your flow accurately.",
    causes:
      "Heavy periods can be caused by hormonal imbalances (oestrogen dominance, thyroid dysfunction), structural issues (fibroids, polyps, adenomyosis), blood clotting disorders, or be idiopathic. Anovulatory cycles — common in perimenopause and PCOS — often produce heavier bleeding because unopposed oestrogen causes the uterine lining to build up excessively before shedding. Progesterone deficiency has the same effect.",
    tracking:
      "Track flow using the PBAC (Pictorial Blood Assessment Chart) method: log the number of pads/tampons used, their saturation level, and the presence of clots for each day of your period. A score above 100 defines heavy menstrual bleeding clinically. Logging across multiple cycles reveals whether bleeding is consistently heavy, worsening, or variable.",
    whenToSeeDoctor:
      "See a doctor if you are soaking through a pad or tampon every hour for more than 2 hours, if you are passing clots larger than a 50p coin, if bleeding lasts more than 7 days, if you have symptoms of anaemia (fatigue, breathlessness, pallor), or if heavy bleeding is new or getting progressively worse. Heavy bleeding is treatable — it is not something to simply manage.",
    related: ["cramps-during-period", "low-energy-menstrual-phase", "irregular-periods-pcos"],
  },

  // ── All / PCOS ───────────────────────────────────────────────────────────────
  {
    slug: "irregular-periods-pcos",
    name: "Irregular Periods with PCOS",
    phase: "All",
    description:
      "Polycystic ovary syndrome is one of the most common causes of irregular periods. Here's how PCOS affects your cycle, what to track, and how to identify patterns even without regular periods.",
    causes:
      "PCOS involves elevated androgens (testosterone), insulin resistance, and disrupted follicle development. Multiple follicles begin developing but often none reach maturity and rupture — so ovulation doesn't occur. Without ovulation there is no progesterone, oestrogen continues to stimulate the uterine lining unchecked, and eventually a period occurs — but the timing is unpredictable. Cycles can range from 35 to over 90 days, or periods may be absent for months.",
    tracking:
      "Log every period start date, cycle length, flow characteristics, and daily symptoms. With PCOS, symptom patterns — acne flares, energy dips, weight fluctuations, mood changes — may be more informative than cycle timing. Tracking for 6–12 months builds a picture of your individual PCOS pattern. Export this data as a CSV before GP appointments — it's far more useful than trying to recall dates.",
    whenToSeeDoctor:
      "See a doctor if you are missing periods consistently (more than 3 in a row), if you have symptoms of high androgens (unwanted hair growth, scalp hair loss, persistent acne), if you are trying to conceive, or if you have been diagnosed with PCOS and are not being monitored. Long-term anovulation without progesterone can increase the risk of endometrial hyperplasia.",
    related: ["irregular-periods-perimenopause", "heavy-period", "ovulation-pain"],
  },

  // ── Follicular ───────────────────────────────────────────────────────────────
  {
    slug: "low-libido-hormonal",
    name: "Low Libido and Hormonal Changes",
    phase: "Follicular",
    description:
      "Libido naturally fluctuates across the cycle, peaking around ovulation and often dipping in the luteal phase and perimenopause. Here's the hormonal picture and how to track changes.",
    causes:
      "Testosterone — present in women in smaller amounts — peaks around ovulation alongside oestrogen, driving the natural mid-cycle increase in libido. In the luteal phase, rising progesterone can reduce sexual drive. During perimenopause, declining oestrogen causes vaginal dryness and reduced sensitivity, while lower testosterone contributes to reduced desire. Fatigue, mood changes, and relationship stress compound these hormonal effects.",
    tracking:
      "Log libido on a simple 1–5 scale each day, and note your cycle day. After a couple of cycles, a pattern typically emerges — most women see a peak around days 12–16 (ovulatory) and a dip in the late luteal phase. This normalises what might otherwise feel like a random or distressing variation.",
    whenToSeeDoctor:
      "See a doctor if low libido is causing distress, if it represents a significant change from your baseline, or if it is accompanied by other symptoms such as vaginal dryness, pain during sex, fatigue, or mood changes. Hypoactive sexual desire disorder (HSDD) is a recognised and treatable condition.",
    related: ["ovulation-pain", "fatigue-luteal-phase", "anxiety-perimenopause"],
  },
  {
    slug: "acne-hormonal",
    name: "Hormonal Acne and Your Cycle",
    phase: "Luteal",
    description:
      "Breakouts that follow your cycle — especially around the jaw, chin, and cheeks — are a classic sign of hormonal acne. Here's why it happens and how cycle tracking helps you predict and manage it.",
    causes:
      "In the late luteal phase, falling oestrogen means androgens (testosterone) become relatively more dominant. Androgens stimulate sebaceous glands to produce more sebum, increasing the likelihood of blocked pores and breakouts. Some women also notice acne flares around ovulation, when a brief LH surge elevates androgens temporarily. PCOS-related acne is driven by persistently elevated androgens throughout the cycle.",
    tracking:
      "Log breakout location, severity, and cycle day. Hormonal acne typically follows a consistent pattern — most women find breakouts appear on days 21–27 and resolve after their period starts. Tracking confirms the pattern, helps distinguish hormonal from dietary or stress-related acne, and provides evidence if you're seeking dermatological or hormonal treatment.",
    whenToSeeDoctor:
      "See a doctor or dermatologist if acne is severe, leaving scars, associated with excess body hair or irregular periods (possible PCOS), or not responding to standard topical treatments. Hormonal acne often responds to combined oral contraceptives, anti-androgen medications, or topical retinoids.",
    related: ["irregular-periods-pcos", "mood-swings-before-period", "food-cravings-luteal-phase"],
  },
  {
    slug: "sleep-problems-before-period",
    name: "Sleep Problems Before Your Period",
    phase: "Luteal",
    description:
      "Difficulty falling asleep, waking in the night, and restless sleep in the week before your period are hormonally driven. Here's why the luteal phase disrupts sleep and how to track it.",
    causes:
      "Progesterone has both sleep-promoting and sleep-disrupting effects. Early in the luteal phase, progesterone's sedating quality can cause drowsiness. As progesterone drops sharply in the days before menstruation, body temperature rises slightly, making deep sleep harder to maintain. Oestrogen withdrawal also affects serotonin and melatonin signalling, further destabilising sleep architecture in the late luteal phase.",
    tracking:
      "Log sleep hours, time to fall asleep, number of awakenings, and a morning quality rating each day. Comparing your follicular-phase sleep scores with your luteal-phase scores reveals the hormonal contribution. Also note if you're waking between 2–4 am — this early-morning waking pattern is characteristic of low-progesterone sleep disruption.",
    whenToSeeDoctor:
      "See a doctor if sleep disruption is severe, present throughout the whole cycle, or significantly affecting your daytime functioning. Persistent insomnia warrants evaluation for thyroid dysfunction, sleep apnea, or mood disorders, which may be exacerbating the hormonal effects.",
    related: ["fatigue-luteal-phase", "mood-swings-before-period", "night-sweats-perimenopause"],
  },
];

export const PHASE_COLORS: Record<Phase, { bg: string; text: string; border: string }> = {
  Menstrual:     { bg: "bg-rose-50",   text: "text-rose-700",   border: "border-rose-200"   },
  Follicular:    { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  Ovulatory:     { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200"  },
  Luteal:        { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Perimenopause: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  All:           { bg: "bg-gray-50",   text: "text-gray-600",   border: "border-gray-200"   },
};
