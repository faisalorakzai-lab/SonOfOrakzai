import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Activity } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const founderPath = '/malak-speen-gul.jpg';
const chairmanPath = '/faisal-orakzai.png';

const GOLD = '#D4AF37';

/* ── Reusable cinematic section wrapper ── */
function CinematicSection({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      scale: direction === 'scale' ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated gold progress bar ── */
function AnimatedProgressBar({ value, target, inView }: { value: number; target: number; inView: boolean }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white/40 text-xs tracking-widest uppercase">Progress</span>
        <span className="text-xs font-bold" style={{ color: GOLD }}>{Math.round(pct)}%</span>
      </div>
      <div className="h-[2px] w-full rounded-full" style={{ background: 'rgba(212,175,55,0.12)' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #b8860b, ${GOLD}, #f5e07a)`,
            width: inView ? `${pct}%` : '0%',
            transition: inView ? 'width 2s cubic-bezier(0.4,0,0.2,1) 0.3s' : 'none',
            boxShadow: `0 0 8px rgba(212,175,55,0.6)`,
          }}
        />
      </div>
      <p className="text-white/30 text-xs mt-1 tracking-wider">{value.toLocaleString()} / {target.toLocaleString()}</p>
    </div>
  );
}

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
  numericValue: number;
  target: number;
  targetLabel: string;
}

const stats: StatItem[] = [
  { icon: Users, label: 'Registered Members', value: '1,200+', numericValue: 1200, target: 5000, targetLabel: '5,000 target' },
  { icon: GraduationCap, label: 'Students Trained', value: '450+', numericValue: 450, target: 2000, targetLabel: '2,000 target' },
  { icon: Activity, label: 'Health Cases Resolved', value: '85+', numericValue: 85, target: 500, targetLabel: '500 target' },
];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <CinematicSection delay={index * 0.15} direction="up">
      <div ref={ref}
        className="rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'rgba(6, 28, 20, 0.55)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.08)',
        }}
      >
        <div className="flex items-center gap-4 mb-1">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
            <stat.icon className="w-7 h-7" style={{ color: GOLD }} />
          </div>
          <div>
            <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
            <p className="text-white/60 text-sm font-medium tracking-wide">{stat.label}</p>
          </div>
        </div>
        <AnimatedProgressBar value={stat.numericValue} target={stat.target} inView={inView} />
        <p className="text-white/25 text-xs mt-2 italic tracking-widest">Goal: {stat.targetLabel}</p>
      </div>
    </CinematicSection>
  );
}

/* ── Leader card with pinstripe gold frame ── */
function LeaderCard({ imgSrc, altText, title, name, bio, direction }: {
  imgSrc: string; altText: string; title: string; name: string; bio: string; direction: 'left' | 'right';
}) {
  return (
    <CinematicSection direction={direction} delay={direction === 'left' ? 0 : 0.2}>
      <div className='overflow-hidden rounded-2xl group relative' style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px rgba(212,175,55,0.5), inset 0 0 0 3px rgba(212,175,55,0.08)` }}
        />
        {[['top-3 left-3', 'borderTop borderLeft'], ['top-3 right-3', 'borderTop borderRight'],
          ['bottom-3 left-3', 'borderBottom borderLeft'], ['bottom-3 right-3', 'borderBottom borderRight']].map(([pos], i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5 z-20 pointer-events-none`} style={{
            borderTop: i < 2 ? `1px solid ${GOLD}` : undefined,
            borderBottom: i >= 2 ? `1px solid ${GOLD}` : undefined,
            borderLeft: i % 2 === 0 ? `1px solid ${GOLD}` : undefined,
            borderRight: i % 2 === 1 ? `1px solid ${GOLD}` : undefined,
          }} />
        ))}
        <div className='relative h-[420px]'>
          <img src={imgSrc} alt={altText}
            className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(1,10,6,0.95) 0%, rgba(1,10,6,0.4) 50%, transparent 100%)' }} />
          <div className='absolute bottom-0 left-0 right-0 p-8 z-10'>
            <div className="rank-bar inline-flex items-center px-4 py-1.5 rounded-sm mb-3 text-xs font-black uppercase tracking-[0.25em]"
              style={{ color: '#011a10', letterSpacing: '0.2em' }}>
              ✦ {title} ✦
            </div>
            <h3 className='text-2xl font-bold text-white mb-2' style={{ fontFamily: "'Playfair Display', serif" }}>{name}</h3>
            <p className='text-white/65 text-sm leading-relaxed'>{bio}</p>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}

export default function Home() {
  /* Parallax on hero */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <MainLayout>
      {/* ── HERO with parallax ── */}
      <section ref={heroRef} className='relative min-h-[92vh] flex items-center pt-20 overflow-hidden' style={{ background: '#011a10' }}>
        <div className="absolute inset-0 orakzai-pattern circuit-pattern opacity-70" />
        <motion.div className='absolute inset-0' style={{ y: heroY }}>
          <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(6,78,59,0.35) 0%, transparent 60%)' }} />
          <div
            className='absolute inset-0 opacity-25'
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2940&auto=format&fit=crop')",
              backgroundPosition: 'center', backgroundSize: 'cover', mixBlendMode: 'overlay',
            }}
          />
          <div className='absolute inset-0' style={{ background: 'linear-gradient(to right, rgba(1,26,16,0.92) 0%, rgba(1,26,16,0.7) 60%, rgba(1,26,16,0.4) 100%)' }} />
        </motion.div>

        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />

        <motion.div className='container mx-auto px-4 md:px-6 relative z-10' style={{ opacity: heroOpacity }}>
          <div className='max-w-4xl'>
            <motion.div initial='hidden' animate='visible' variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18 } } }}>

              {/* Gold metallic badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
                className='inline-flex items-center mb-6'
              >
                <div className='px-5 py-2 rounded-full border text-sm font-bold tracking-[0.2em] uppercase'
                  style={{ background: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.4)', boxShadow: '0 0 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(212,175,55,0.2)' }}>
                  <span className='gold-sheen-badge'>✦ Sada-e-Orakzai ✦</span>
                </div>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25,0.46,0.45,0.94] } } }}
                className='text-5xl md:text-7xl font-bold text-white leading-tight mb-6'
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
              >
                Mutahid, Ba-Ikhtiyar, <br />
                <motion.span
                  style={{ color: GOLD, textShadow: `0 0 40px rgba(212,175,55,0.3)` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Taraqi-Yafta
                </motion.span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } } }}
                className='text-xl md:text-2xl text-white/70 mb-10 max-w-2xl leading-relaxed'
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.01em' }}
              >
                A digital homeland where tradition meets progress, and every member of the Orakzai community is seen, heard, and empowered.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } } }}
                className='flex flex-wrap gap-4'
              >
                <Link href='/join'>
                  <Button size='lg' className='font-bold px-10 h-14 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl'
                    style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`, backgroundSize: '200% auto', color: '#011a10', boxShadow: `0 4px 24px rgba(212,175,55,0.4)`, border: 'none' }}>
                    Join the Movement
                  </Button>
                </Link>
                <Link href='/about'>
                  <Button size='lg' variant='outline' className='font-semibold px-10 h-14 rounded-full text-lg text-white hover:text-white'
                    style={{ borderColor: 'rgba(212,175,55,0.4)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
                    Our Story
                  </Button>
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 rounded-full" style={{ background: `linear-gradient(to bottom, ${GOLD}80, transparent)` }} />
        </motion.div>

        <div className='absolute bottom-0 left-0 right-0 h-40' style={{ background: 'linear-gradient(to top, #011a10, transparent)' }} />
      </section>

      {/* ── IMPACT STATS ── */}
      <section className='py-16 relative z-20 -mt-20' style={{ background: '#011a10' }}>
        <div className='container mx-auto px-4 md:px-6'>
          {/* Section label */}
          <CinematicSection direction="up" delay={0}>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: GOLD }}>By the Numbers</p>
              <div className="h-[1px] w-16 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            </div>
          </CinematicSection>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {stats.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className='py-24' style={{ background: 'linear-gradient(180deg, #011a10 0%, #022c22 100%)' }}>
        <div className='container mx-auto px-4 md:px-6'>
          <CinematicSection direction="up" delay={0}>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>Our Visionaries</p>
              <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                Institutional Leadership
              </h2>
              <div className="h-[1px] w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            </div>
          </CinematicSection>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            <LeaderCard
              imgSrc={founderPath} altText="Malak Speen Gul Orakzai"
              title="Founder & Former MNA" name="Malak Speen Gul Orakzai"
              bio="A lifelong advocate for the rights and development of the Orakzai district, building bridges between tradition and modernity."
              direction="left"
            />
            <LeaderCard
              imgSrc={chairmanPath} altText="Faisal Orakzai"
              title="Chairman" name="Faisal Orakzai"
              bio="Spearheading digital initiatives and youth empowerment programs to prepare the next generation for global opportunities."
              direction="right"
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className='py-24 relative overflow-hidden' style={{ background: '#011a10' }}>
        <div className="absolute inset-0 orakzai-pattern opacity-50" />
        <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,78,59,0.2) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />

        <div className='container mx-auto px-4 md:px-6 relative z-10 text-center'>
          <CinematicSection direction="scale" delay={0}>
            <div className='max-w-4xl mx-auto'>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>Join the Movement</p>
              <h2 className='text-4xl md:text-6xl font-bold text-white mb-6'
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
                Apni Matti, Apne Log <br />
                <span style={{ color: GOLD }}>— Son Of Orakzai</span>
              </h2>
              <div className="h-[1px] w-32 mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
              <p className='text-xl text-white/60 mb-10' style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
                Join hands with us to build a stronger, educated, and prosperous community. Your participation matters.
              </p>
              <Link href='/join'>
                <Button size='lg' className='font-bold px-12 h-16 rounded-full text-xl transition-all hover:-translate-y-1'
                  style={{ background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`, backgroundSize: '200% auto', color: '#011a10', boxShadow: `0 8px 40px rgba(212,175,55,0.35)`, border: 'none' }}>
                  Become a Member Today
                </Button>
              </Link>
            </div>
          </CinematicSection>
        </div>
      </section>
    </MainLayout>
  );
}
