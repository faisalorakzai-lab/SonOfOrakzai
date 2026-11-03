import { FormEvent, useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Quote, Send, Users } from "lucide-react";

const GOLD = "#D6B44C";
const IVORY = "#F5F1E7";
const CANONICAL = "https://orakzai.org/community-stories";

const stories = [
  {
    name: "Aftab Khan",
    location: "Orakzai District, KPK",
    role: "Scholarship Beneficiary",
    category: "Education & Scholarships",
    story: "Thanks to the Orakzai.org education programme, I completed my engineering degree and now support my entire family. The scholarship changed not just my life, but my village's future.",
    detail: "Aftab's story reflects the long-term value of education support: a scholarship helped him complete his engineering degree and contribute to his family and community.",
  },
  {
    name: "Rukhsana Bibi",
    location: "Hangu, KPK",
    role: "Women's Vocational Training Graduate",
    category: "Women's Empowerment",
    story: "I never thought I would run my own tailoring business. The training centre gave me skills, confidence, and a way to earn an income while staying close to my children.",
    detail: "Rukhsana describes how vocational training helped her build practical skills, confidence, and an income-generating path close to home.",
  },
  {
    name: "Dr. Imran Orakzai",
    location: "UAE Diaspora",
    role: "Diaspora Volunteer & Donor",
    category: "Diaspora Engagement",
    story: "Living abroad, I felt disconnected from my roots. Orakzai.org gave me a real way to contribute — I helped fund a water project in my ancestral village and visited to see it completed.",
    detail: "Dr. Imran's experience shows how diaspora members can stay connected to their communities through practical local support.",
  },
  {
    name: "Hussain Ali",
    location: "Peshawar, KPK",
    role: "Flood Relief Recipient",
    category: "Humanitarian Relief",
    story: "When the floods destroyed our home, Orakzai.org arrived within days. They provided food, shelter materials, and later helped us rebuild. We are forever grateful.",
    detail: "Hussain's testimony follows a relief journey from immediate support after flooding to help with rebuilding.",
  },
  {
    name: "Zainab Afridi",
    location: "Central Orakzai",
    role: "Health Outreach Patient",
    category: "Community Development",
    story: "The mobile clinic came to our village when my son was critically ill. Without it, we had no way to reach a hospital. The doctors treated him and saved his life.",
    detail: "Zainab's account highlights the importance of bringing basic health outreach closer to villages that face barriers to hospital access.",
  },
] as const;

const categories = ["All stories", ...Array.from(new Set(stories.map((story) => story.category)))];

function setMeta(selector: string, attribute: "name" | "property", value: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${selector}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector);
    document.head.appendChild(element);
  }
  element.content = value;
}

export default function CommunityStories() {
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [openStory, setOpenStory] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const title = "Orakzai.org Community Stories | Real People, Real Impact";
    const description = "Discover Orakzai.org community success stories covering education, humanitarian support, women's empowerment and diaspora contributions.";
    document.title = title;
    setMeta("description", "name", description);
    setMeta("robots", "name", "index, follow");
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL;
    setMeta("og:type", "property", "website");
    setMeta("og:url", "property", CANONICAL);
    setMeta("og:title", "property", title);
    setMeta("og:description", "property", description);
    setMeta("og:site_name", "property", "Orakzai.org");
    setMeta("twitter:card", "name", "summary");
    setMeta("twitter:url", "name", CANONICAL);
    setMeta("twitter:title", "name", title);
    setMeta("twitter:description", "name", description);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "community-stories-jsonld";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "Orakzai.org", url: "https://orakzai.org" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://orakzai.org/" },
          { "@type": "ListItem", position: 2, name: "Community Stories", item: CANONICAL },
        ],
      },
    });
    document.getElementById("community-stories-jsonld")?.remove();
    document.head.appendChild(schema);
    return () => document.getElementById("community-stories-jsonld")?.remove();
  }, []);

  const filteredStories = useMemo(
    () => activeCategory === "All stories" ? stories : stories.filter((story) => story.category === activeCategory),
    [activeCategory],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("story_submissions").insert({
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim() || null,
      story: String(form.get("story") ?? "").trim(),
      consent: form.get("consent") === "on",
      status: "pending",
    });
    setIsSubmitting(false);
    if (error) {
      setSubmitError("Your story could not be sent right now. Please try again shortly.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <main style={{ background: "#031B13", color: IVORY }}>
        <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(214,180,76,0.12), transparent 65%), linear-gradient(135deg, #031B13, #06271B)" }}>
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD, background: "rgba(214,180,76,.1)", border: "1px solid rgba(214,180,76,.3)" }}>
              <Users className="h-4 w-4" /> Real people • Real impact
            </div>
            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>Community &amp; Success Stories</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">Real voices, real transformation. Discover the people and communities whose lives have been touched by education, humanitarian support, economic empowerment, and global solidarity.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="featured-heading">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>A closer look</p><h2 id="featured-heading" className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Featured story</h2></div>
            <span className="hidden text-sm text-white/45 md:block">Authentic community voices</span>
          </div>
          <article className="grid overflow-hidden rounded-3xl md:grid-cols-[.8fr_1.2fr]" style={{ background: "linear-gradient(135deg, rgba(214,180,76,.12), rgba(6,39,27,.9))", border: "1px solid rgba(214,180,76,.26)" }}>
            <div className="flex min-h-64 items-center justify-center p-10" style={{ background: "radial-gradient(circle at 50% 40%, rgba(214,180,76,.2), transparent 58%)" }}><Quote className="h-24 w-24" style={{ color: GOLD, opacity: .65 }} /></div>
            <div className="p-8 md:p-12"><p className="mb-5 text-lg italic leading-relaxed text-white/80">“{stories[0].story}”</p><div className="mb-7 border-t border-white/10 pt-5"><p className="font-semibold">{stories[0].name}</p><p className="text-sm" style={{ color: GOLD }}>{stories[0].role}</p><p className="mt-2 flex items-center gap-1 text-sm text-white/45"><MapPin className="h-4 w-4" /> {stories[0].location}</p></div><button type="button" onClick={() => setOpenStory(stories[0].name)} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold" style={{ color: "#031B13", background: GOLD }}>Read full story <ArrowRight className="h-4 w-4" /></button></div>
          </article>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="stories-heading">
          <div className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Explore the collection</p><h2 id="stories-heading" className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Every story matters</h2></div>
          <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter stories by category">{categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className="rounded-full px-4 py-2 text-sm transition-colors" style={{ color: activeCategory === category ? "#031B13" : GOLD, background: activeCategory === category ? GOLD : "rgba(214,180,76,.08)", border: `1px solid ${activeCategory === category ? GOLD : "rgba(214,180,76,.28)"}` }}>{category}</button>)}</div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredStories.map((story, index) => <motion.article key={story.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="flex flex-col rounded-2xl p-7" style={{ background: "rgba(6,39,27,.62)", border: "1px solid rgba(214,180,76,.16)" }}><Quote className="mb-5 h-7 w-7" style={{ color: GOLD, opacity: .7 }} /><p className="flex-1 text-base italic leading-relaxed text-white/72">“{story.story}”</p><div className="mt-7 border-t border-white/10 pt-5"><p className="font-semibold">{story.name}</p><p className="text-sm" style={{ color: GOLD }}>{story.role}</p><p className="mt-2 flex items-center gap-1 text-xs text-white/45"><MapPin className="h-3.5 w-3.5" /> {story.location}</p><button type="button" onClick={() => setOpenStory(story.name)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>Read full story <ArrowRight className="h-4 w-4" /></button></div></motion.article>)}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24" aria-labelledby="submit-heading"><div className="grid gap-8 rounded-3xl p-8 md:grid-cols-[1fr_1.1fr] md:p-12" style={{ background: "linear-gradient(135deg, #06271B, #031B13)", border: "1px solid rgba(214,180,76,.22)" }}><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Your voice belongs here</p><h2 id="submit-heading" className="mb-5 text-3xl font-semibold md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>Your Story Matters</h2><p className="leading-relaxed text-white/62">Have you experienced the impact of an Orakzai.org programme? Share your story with our team. Every submission is reviewed privately and nothing is published without your permission.</p></div>{submitted ? <div className="flex items-center gap-3 rounded-2xl p-6 text-white/80" style={{ background: "rgba(214,180,76,.1)" }}><CheckCircle2 style={{ color: GOLD }} /> Thank you. Our team will review your story privately.</div> : <form onSubmit={handleSubmit} className="space-y-4"><label className="block text-sm text-white/65">Your name<input required name="name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" /></label><label className="block text-sm text-white/65">Email (optional)<input type="email" name="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" /></label><label className="block text-sm text-white/65">Your story<textarea required name="story" rows={4} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" /></label><label className="flex items-start gap-3 text-xs leading-relaxed text-white/55"><input required name="consent" type="checkbox" className="mt-1" /> I understand this submission will be reviewed privately and will not be published automatically.</label>{submitError && <p className="text-sm text-red-300">{submitError}</p>}<button disabled={isSubmitting} type="submit" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-60" style={{ color: "#031B13", background: GOLD }}>{isSubmitting ? "Sending…" : "Send for review"} <Send className="h-4 w-4" /></button></form>}</div></section>

        {openStory && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5" role="dialog" aria-modal="true" aria-label="Full story"><div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl p-8" style={{ background: "#06271B", border: "1px solid rgba(214,180,76,.35)" }}>{(() => { const story = stories.find((item) => item.name === openStory)!; return <><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{story.category}</p><h2 className="mb-2 text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>{story.name}</h2><p className="mb-7 text-sm text-white/45">{story.role} · {story.location}</p><p className="mb-5 text-lg italic leading-relaxed text-white/80">“{story.story}”</p><p className="leading-relaxed text-white/65">{story.detail}</p><button type="button" onClick={() => setOpenStory(null)} className="mt-8 rounded-full px-5 py-3 text-sm font-bold" style={{ color: "#031B13", background: GOLD }}>Close story</button></> })()}</div></div>}
      </main>
    </MainLayout>
  );
}
