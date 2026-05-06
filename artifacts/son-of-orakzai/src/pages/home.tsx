import { Link } from 'wouter';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Activity } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const founderPath = '/malak-speen-gul.jpg';
const chairmanPath = '/faisal-orakzai.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }
  }
};

const GOLD = '#D4AF37';

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
  numericValue: number;
  target: number;
  targetLabel: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Users, label: 'Registered Members', value: '1,200+', numericValue: 1200, target: 5000, targetLabel: '5,000 target', color: 'rgba(6,78,59,0.8)' },
  { icon: GraduationCap, label: 'Students Trained', value: '450+', numericValue: 450, target: 2000, targetLabel: '2,000 target', color: 'rgba(6,78,59,0.8)' },
  { icon: Activity, label: 'Health Cases Resolved', value: '85+', numericValue: 85, target: 500, targetLabel: '500 target', color: 'rgba(6,78,59,0.8)' },
];

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
            transition: inView ? 'width 1.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
            boxShadow: `0 0 8px rgba(212,175,55,0.6)`,
          }}
        />
      </div>
      <p className="text-white/30 text-xs mt-1 tracking-wider">{value.toLocaleString()} / {target.toLocaleString()}</p>
    </div>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref} variants={fadeInUp}>
      <div
        className="glass-emerald rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.15)',
        }}
      >
        <div className="flex items-center gap-4 mb-1">
          <div
            className="p-3 rounded-xl"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
          >
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
    </motion.div>
  );
}

export default function Home() {
  return (
    <MainLayout>
      {/* HERO */}
      <section className='relative min-h-[92vh] flex items-center pt-20 overflow-hidden' style={{ background: '#011a10' }}>
        {/* Combined Orakzai + Circuit overlay */}
        <div className="absolute inset-0 orakzai-pattern circuit-pattern opacity-70" />

        {/* Atmospheric gradient layers */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(6,78,59,0.35) 0%, transparent 60%)' }} />
          <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          <div
            className='absolute inset-0 opacity-25'
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2940&auto=format&fit=crop')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
            }}
          />
          <div className='absolute inset-0' style={{ background: 'linear-gradient(to right, rgba(1,26,16,0.92) 0%, rgba(1,26,16,0.7) 60%, rgba(1,26,16,0.4) 100%)' }} />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />

        <div className='container mx-auto px-4 md:px-6 relative z-10'>
          <div className='max-w-4xl'>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={staggerContainer}
            >
              {/* Sada-e-Orakzai gold metallic badge */}
              <motion.div variants={fadeInUp} className='inline-flex items-center mb-6'>
                <div
                  className='px-5 py-2 rounded-full border text-sm font-bold tracking-[0.2em] uppercase'
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    borderColor: 'rgba(212,175,55,0.4)',
                    boxShadow: '0 0 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(212,175,55,0.2)',
                  }}
                >
                  <span className='gold-sheen-badge'>✦ Sada-e-Orakzai ✦</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className='text-5xl md:text-7xl font-bold text-white leading-tight mb-6'
                style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
              >
                Mutahid, Ba-Ikhtiyar, <br />
                <span style={{ color: GOLD, textShadow: `0 0 40px rgba(212,175,55,0.3)` }}>Taraqi-Yafta</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className='text-xl md:text-2xl text-white/70 mb-10 max-w-2xl leading-relaxed'
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', letterSpacing: '0.01em' }}
              >
                A digital homeland where tradition meets progress, and every member of the Orakzai community is seen, heard, and empowered.
              </motion.p>

              <motion.div variants={fadeInUp} className='flex flex-wrap gap-4'>
                <Link href='/join'>
                  <Button
                    size='lg'
                    className='font-bold px-10 h-14 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl'
                    style={{
                      background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`,
                      backgroundSize: '200% auto',
                      color: '#011a10',
                      boxShadow: `0 4px 24px rgba(212,175,55,0.4)`,
                      border: 'none',
                    }}
                  >
                    Join the Movement
                  </Button>
                </Link>
                <Link href='/about'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='font-semibold px-10 h-14 rounded-full text-lg text-white hover:text-white'
                    style={{
                      borderColor: 'rgba(212,175,55,0.4)',
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Our Story
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 h-40' style={{ background: 'linear-gradient(to top, #011a10, transparent)' }} />
      </section>

      {/* IMPACT STATS — Emerald Glassmorphism */}
      <section className='py-16 relative z-20 -mt-20' style={{ background: '#011a10' }}>
        <div className='container mx-auto px-4 md:px-6'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
          >
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className='py-24' style={{ background: 'linear-gradient(180deg, #011a10 0%, #022c22 100%)' }}>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>Our Visionaries</p>
            <h2
              className='text-3xl md:text-5xl font-bold text-white mb-6'
              style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
            >
              Institutional Leadership
            </h2>
            <div className="h-[1px] w-24 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            {/* Founder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className='overflow-hidden rounded-2xl group relative' style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                {/* Pinstripe gold frame */}
                <div
                  className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px rgba(212,175,55,0.5), inset 0 0 0 3px rgba(212,175,55,0.08)`,
                  }}
                />
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div className="absolute top-3 right-3 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
                <div className="absolute bottom-3 left-3 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div className="absolute bottom-3 right-3 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />

                <div className='relative h-[420px]'>
                  <img
                    src={founderPath}
                    alt='Malak Speen Gul Orakzai'
                    className='w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(1,10,6,0.95) 0%, rgba(1,10,6,0.4) 50%, transparent 100%)' }} />

                  <div className='absolute bottom-0 left-0 right-0 p-8 z-10'>
                    {/* Military rank insignia bar */}
                    <div
                      className="rank-bar inline-flex items-center px-4 py-1.5 rounded-sm mb-3 text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: '#011a10', letterSpacing: '0.2em' }}
                    >
                      ✦ Founder &amp; Former MNA ✦
                    </div>
                    <h3
                      className='text-2xl font-bold text-white mb-2'
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Malak Speen Gul Orakzai
                    </h3>
                    <p className='text-white/65 text-sm leading-relaxed'>A lifelong advocate for the rights and development of the Orakzai district, building bridges between tradition and modernity.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chairman */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className='overflow-hidden rounded-2xl group relative' style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                {/* Pinstripe gold frame */}
                <div
                  className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px rgba(212,175,55,0.5), inset 0 0 0 3px rgba(212,175,55,0.08)`,
                  }}
                />
                <div className="absolute top-3 left-3 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div className="absolute top-3 right-3 w-5 h-5 z-20 pointer-events-none" style={{ borderTop: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
                <div className="absolute bottom-3 left-3 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderLeft: `1px solid ${GOLD}` }} />
                <div className="absolute bottom-3 right-3 w-5 h-5 z-20 pointer-events-none" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />

                <div className='relative h-[420px]'>
                  <img
                    src={chairmanPath}
                    alt='Faisal Orakzai'
                    className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(1,10,6,0.95) 0%, rgba(1,10,6,0.4) 50%, transparent 100%)' }} />

                  <div className='absolute bottom-0 left-0 right-0 p-8 z-10'>
                    {/* Military rank insignia bar */}
                    <div
                      className="rank-bar inline-flex items-center px-4 py-1.5 rounded-sm mb-3 text-xs font-black uppercase tracking-[0.25em]"
                      style={{ color: '#011a10', letterSpacing: '0.2em' }}
                    >
                      ✦ Chairman ✦
                    </div>
                    <h3
                      className='text-2xl font-bold text-white mb-2'
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Faisal Orakzai
                    </h3>
                    <p className='text-white/65 text-sm leading-relaxed'>Spearheading digital initiatives and youth empowerment programs to prepare the next generation for global opportunities.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className='py-24 relative overflow-hidden' style={{ background: '#011a10' }}>
        <div className="absolute inset-0 orakzai-pattern opacity-50" />
        <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,78,59,0.2) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }} />

        <div className='container mx-auto px-4 md:px-6 relative z-10 text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='max-w-4xl mx-auto'
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>Join the Movement</p>
            <h2
              className='text-4xl md:text-6xl font-bold text-white mb-6'
              style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
            >
              Apni Matti, Apne Log <br />
              <span style={{ color: GOLD }}>— Son Of Orakzai</span>
            </h2>
            <div className="h-[1px] w-32 mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <p className='text-xl text-white/60 mb-10' style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
              Join hands with us to build a stronger, educated, and prosperous community. Your participation matters.
            </p>
            <Link href='/join'>
              <Button
                size='lg'
                className='font-bold px-12 h-16 rounded-full text-xl transition-all hover:-translate-y-1'
                style={{
                  background: `linear-gradient(135deg, #b8860b, ${GOLD}, #f5e07a, ${GOLD})`,
                  backgroundSize: '200% auto',
                  color: '#011a10',
                  boxShadow: `0 8px 40px rgba(212,175,55,0.35)`,
                  border: 'none',
                }}
              >
                Become a Member Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
