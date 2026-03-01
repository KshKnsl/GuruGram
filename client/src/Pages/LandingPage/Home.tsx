import { useState, useEffect, type ReactNode } from "react";

const texts = [
  "Marketing","AWS","Career","Web Development",
  "Data Science","UI/UX Design","Finance","Healthcare",
];

const mentors = [
  { name:"John Doe",     expertise:"Marketing Guru", rating:4.9, sessions:120, img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
  { name:"Jane Smith",   expertise:"AWS Expert",     rating:4.8, sessions:98,  img:"https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?w=400&auto=format&fit=crop&q=80" },
  { name:"Alex Johnson", expertise:"Career Coach",   rating:4.7, sessions:85,  img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
  { name:"Emily Brown",  expertise:"Web Developer",  rating:4.9, sessions:150, img:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80" },
];

const features = [
  { title:"Discussion Forums",   desc:"Peer-to-peer & mentor-led channels for rich collaboration", icon:"💬" },
  { title:"Verified Mentors",    desc:"Every mentor is a verified domain expert",                  icon:"✦"  },
  { title:"Gamified Learning",   desc:"Earn points, badges, and milestones as you grow",           icon:"🏆" },
  { title:"Flexible Pricing",    desc:"Options for every budget and commitment level",             icon:"◈"  },
  { title:"Live Video Sessions", desc:"Crystal-clear video for immersive 1-on-1 learning",        icon:"▶"  },
  { title:"Global Access",       desc:"Connect with world-class mentors across time zones",        icon:"◎"  },
  { title:"Progress Tracking",   desc:"Detailed analytics to visualize your trajectory",          icon:"⬆"  },
  { title:"Smart Scheduling",    desc:"AI-powered booking that fits both calendars",              icon:"◷"  },
  { title:"AI-Powered Matching", desc:"Precision pairing based on goals and learning style",      icon:"✦"  },
];

const categories = [
  { name:"Marketing",    emoji:"📣" },{ name:"AWS",        emoji:"☁️" },
  { name:"Career",       emoji:"💼" },{ name:"Web Dev",    emoji:"🌐" },
  { name:"Data Science", emoji:"📊" },{ name:"UI/UX",      emoji:"🎨" },
  { name:"Finance",      emoji:"💹" },{ name:"Healthcare", emoji:"🏥" },
  { name:"Education",    emoji:"📚" },{ name:"Music",      emoji:"🎵" },
  { name:"Art",          emoji:"🎭" },{ name:"Leadership", emoji:"🧭" },
];

const testimonials = [
  { name:"Emily R.", title:"Software Engineer, Google",  quote:"The platform connected me with a mentor who saw my potential before I did. Within 3 months I had my dream offer.",  img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80" },
  { name:"David K.", title:"Marketing Manager, Amazon",  quote:"Mentorship here is genuinely transformative. Not just advice — real accountability and vision.",                    img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" },
  { name:"Sarah L.", title:"Data Analyst, Microsoft",    quote:"I went from unemployed grad to industry professional. This platform changed everything.",                           img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80" },
];

const steps = [
  { n:"01", title:"Create Profile",  desc:"Tell us your goals and what you want to achieve."        },
  { n:"02", title:"Match & Browse",  desc:"AI surfaces perfect mentors. Browse and compare freely." },
  { n:"03", title:"Book a Session",  desc:"Schedule in two clicks. No back-and-forth emails."       },
  { n:"04", title:"Grow Fast",       desc:"Learn, build, and accelerate your trajectory."           },
];

const cardData = [
  { domain:"Marketing",    name:"Senior Marketing Strategist", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
  { domain:"AWS",          name:"Cloud Architecture Expert",   img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80" },
  { domain:"Career",       name:"Executive Career Coach",      img:"https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&auto=format&fit=crop&q=80" },
  { domain:"Web Dev",      name:"Full-Stack Engineering Lead",  img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80" },
  { domain:"Data Science", name:"ML & Analytics Principal",    img:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80" },
  { domain:"UI/UX Design", name:"Product Design Director",     img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80" },
  { domain:"Finance",      name:"Investment & Finance Advisor", img:"https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=80" },
  { domain:"Healthcare",   name:"Medical Career Navigator",     img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80" },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
      <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
        {children}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif-display text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-stone-100">
      {children}
    </h2>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button className="clip-skew px-9 py-4 text-xs font-medium tracking-widest uppercase cursor-pointer bg-amber-500 hover:bg-amber-400 text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] border-0">
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: ReactNode }) {
  return (
    <button className="px-8 py-4 text-xs font-light tracking-widest uppercase cursor-pointer bg-transparent border border-amber-500/30 text-gray-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
      {children}
    </button>
  );
}

function ShowcaseCard({ c, active }: { c: typeof cardData[number]; active: boolean }) {
  return (
    <div className={`absolute inset-0 transition-all duration-700 ${active ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-5 scale-95 pointer-events-none"}`}>
      <div className="relative h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800 border border-amber-500/20">
        <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent" />
        <img src={c.img} alt={c.name} className="w-full h-52 object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <span className="text-xs tracking-widest uppercase font-medium text-amber-500">
              Specialized in {c.domain}
            </span>
            <h3 className="font-serif-display text-xl font-bold mt-2 mb-1 text-gray-900 dark:text-stone-100">
              {c.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Available for 1-on-1 sessions
            </p>
          </div>
          <span className="mt-4 self-start text-xs tracking-widest uppercase font-medium text-amber-500 border-b border-amber-500 pb-0.5 cursor-pointer hover:opacity-70 transition-opacity">
            Connect Now →
          </span>
        </div>
      </div>
    </div>
  );
}

function StepCard({ s, isLast }: { s: typeof steps[number]; isLast: boolean }) {
  return (
    <div className={`py-12 px-8 transition-colors duration-300 hover:bg-amber-500/5 border-b border-amber-500/20 ${!isLast ? "lg:border-r border-amber-500/20" : ""}`}>
      <span className="font-serif-display block text-8xl font-black leading-none mb-6 text-amber-500/20">
        {s.n}
      </span>
      <h3 className="font-serif-display text-xl font-bold mb-3 text-gray-900 dark:text-stone-100">
        {s.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {s.desc}
      </p>
    </div>
  );
}

function MentorCard({ m }: { m: typeof mentors[number] }) {
  return (
    <div className="overflow-hidden cursor-pointer transition-all duration-300 group bg-white dark:bg-gray-800 border border-amber-500/20 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-xl dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
      <img src={m.img} alt={m.name} className="w-full h-48 object-cover object-top grayscale-20 group-hover:grayscale-0 transition-all duration-300" />
      <div className="p-5">
        <h3 className="font-serif-display text-lg font-bold mb-1 text-gray-900 dark:text-stone-100">
          {m.name}
        </h3>
        <p className="text-xs tracking-widest uppercase font-medium mb-3 text-amber-500">
          {m.expertise}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-amber-500">★ {m.rating}</span>
          <span>{m.sessions} sessions</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f }: { f: typeof features[number] }) {
  return (
    <div className="p-10 cursor-default transition-colors duration-300 bg-white dark:bg-gray-950 hover:bg-stone-50 dark:hover:bg-gray-900 border-r border-b border-amber-500/15">
      <span className="block text-2xl mb-5 text-amber-500">{f.icon}</span>
      <h3 className="font-serif-display text-lg font-bold mb-2 text-gray-900 dark:text-stone-100">
        {f.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {f.desc}
      </p>
    </div>
  );
}

function TestiCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="p-9 transition-transform duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border border-amber-500/20">
      <p className="font-serif-display text-sm leading-loose italic mb-7 pl-5 border-l-2 border-amber-500 text-gray-700 dark:text-stone-300">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-4">
        <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-amber-500/25 grayscale-20" />
        <div>
          <span className="block text-sm font-medium text-gray-900 dark:text-stone-100">{t.name}</span>
          <span className="block text-xs tracking-wide text-amber-500">{t.title}</span>
        </div>
      </div>
    </div>
  );
}

function CatButton({ c }: { c: typeof categories[number] }) {
  return (
    <button className="flex items-center gap-2 px-6 py-3 text-sm cursor-pointer bg-transparent border border-amber-500/20 text-gray-700 dark:text-stone-300 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200">
      <span>{c.emoji}</span>
      <span>{c.name}</span>
    </button>
  );
}

export default function Home() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="font-dm min-h-screen overflow-x-hidden bg-stone-50 text-gray-900 dark:bg-gray-950 dark:text-stone-100 transition-colors duration-300">

      <section className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-32 overflow-hidden bg-linear-to-br from-stone-50 via-stone-50 to-amber-50/50 dark:from-gray-950 dark:via-gray-950 dark:to-amber-950/20">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(201,168,76,0.06)_0%,transparent_70%)] dark:[background:radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div>
            <SectionLabel>Expert Mentorship Platform</SectionLabel>
            <h1 className="font-serif-display text-5xl lg:text-7xl font-black leading-tight mb-6 tracking-tight text-gray-900 dark:text-stone-100">
              Learn from those<br />
              who've <em className="not-italic text-amber-500">already</em>
              <br />walked the path.
            </h1>
            <p className="text-lg mb-1 font-light text-gray-500 dark:text-gray-400">
              1-on-1 guidance in
            </p>
            <div className="font-serif-display text-4xl lg:text-5xl font-bold italic mb-12 min-h-16 flex items-center overflow-hidden text-amber-500">
              <span key={idx} className="block animate-[fadeIn_0.4s_ease]">{texts[idx]}</span>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <PrimaryButton>Find Your Mentor</PrimaryButton>
              <GhostButton>See How It Works</GhostButton>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-105">
              {cardData.map((c, i) => (
                <ShowcaseCard key={i} c={c} active={i === idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-28 bg-stone-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Process</SectionLabel>
            <SectionTitle>
              From sign-up to <em className="not-italic text-amber-500">breakthrough</em>, in four steps.
            </SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StepCard key={i} s={s} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <SectionLabel>Experts</SectionLabel>
              <SectionTitle>
                Top-rated <em className="not-italic text-amber-500">mentors</em> this week
              </SectionTitle>
            </div>
            <GhostButton>Browse All →</GhostButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((m, i) => <MentorCard key={i} m={m} />)}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-28 bg-stone-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Platform</SectionLabel>
            <SectionTitle>
              Everything you need to <em className="not-italic text-amber-500">grow.</em>
            </SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-amber-500/15">
            {features.map((f, i) => <FeatureCard key={i} f={f} />)}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Stories</SectionLabel>
            <SectionTitle>
              What our <em className="not-italic text-amber-500">mentees</em> say
            </SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-28 bg-stone-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>
              Browse by <em className="not-italic text-amber-500">domain</em>
            </SectionTitle>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((c, i) => <CatButton key={i} c={c} />)}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-16 lg:px-24 py-36 text-center overflow-hidden bg-gray-50 dark:bg-gray-900 border-t border-amber-500/20">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-16 relative z-10" />
        <h2 className="font-serif-display text-6xl lg:text-9xl font-black leading-none mb-8 tracking-tight relative z-10 text-gray-900 dark:text-stone-100">
          Ready to <em className="not-italic text-amber-500">accelerate</em>?
        </h2>
        <p className="text-lg max-w-lg mx-auto mb-12 font-light leading-relaxed relative z-10 text-gray-500 dark:text-gray-400">
          Join thousands of learners achieving their goals with world-class personalized mentorship.
        </p>
        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <PrimaryButton>Get Started — It's Free</PrimaryButton>
          <GhostButton>Become a Mentor</GhostButton>
        </div>
      </section>

    </div>
  );
}