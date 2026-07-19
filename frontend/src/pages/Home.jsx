import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Cpu, Bot, Recycle, Building2, Factory, Users } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({ waste: 0, diversion: 0, fuel: 0 });

  // Simulate ticking numbers on mount
  useEffect(() => {
    let interval = setInterval(() => {
      setStats(prev => ({
        waste: Math.min(prev.waste + 0.1, 2.4),
        diversion: Math.min(prev.diversion + 1, 31),
        fuel: Math.min(prev.fuel + 1, 18)
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 7.1 Hero */}
      <section className="hero-bg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="eyebrow">AI × CLIMATE × CIRCULAR ECONOMY</div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.02em', marginBottom: '24px', maxWidth: '900px' }}>
            Technology that helps the planet <span className="accent-text">breathe.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '40px' }}>
            Breathe is the AI operating system for waste — sensing, sorting, and circulating resources so cities and industries can grow greener, not smaller.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '64px' }}>
            <Link to="/contact" className="btn-primary">Request a Pilot →</Link>
            <a href="#demo" className="btn-ghost">See it in action ↓</a>
          </div>
          
          {/* Ticking Stat Bar */}
          <div style={{ display: 'flex', gap: '48px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
            <div>
              <div className="mono accent-text" style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.waste.toFixed(1)}M tons</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Waste analyzed (simulated)</div>
            </div>
            <div>
              <div className="mono accent-text" style={{ fontSize: '2rem', fontWeight: 700 }}>{Math.floor(stats.diversion)}%</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Avg. landfill diversion increase</div>
            </div>
            <div>
              <div className="mono accent-text" style={{ fontSize: '2rem', fontWeight: 700 }}>{Math.floor(stats.fuel)}%</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Avg. collection fuel savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.2 The Problem */}
      <section className="section-spacing container">
        <div className="eyebrow" style={{ color: 'var(--accent-warm)' }}>THE CRISIS</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px' }}>We can't manage what we can't see.</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div className="card" style={{ borderColor: 'rgba(255, 177, 61, 0.2)' }}>
            <div className="mono" style={{ fontSize: '2.5rem', color: 'var(--accent-warm)', marginBottom: '8px' }}>2.24B</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>tons</p>
            <p style={{ fontSize: '0.875rem' }}>Municipal solid waste generated globally per year.</p>
          </div>
          <div className="card">
            <div className="mono" style={{ fontSize: '2.5rem', color: 'var(--danger)', marginBottom: '8px' }}>~33%</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Unmanaged</p>
            <p style={{ fontSize: '0.875rem' }}>Waste that is not managed in an environmentally safe way.</p>
          </div>
          <div className="card">
            <div className="mono" style={{ fontSize: '2.5rem', color: 'var(--danger)', marginBottom: '8px' }}>15–25%</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Contamination</p>
            <p style={{ fontSize: '0.875rem' }}>Typical contamination rate in recycling streams.</p>
          </div>
          <div className="card">
            <div className="mono" style={{ fontSize: '2.5rem', color: 'var(--accent-warm)', marginBottom: '8px' }}>3x</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Fuel Wasted</p>
            <p style={{ fontSize: '0.875rem' }}>Fuel wasted on fixed-route collection of partially-empty bins.</p>
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '16px', textAlign: 'center' }}>
          Figures are illustrative/representative for this hackathon prototype, based on publicly reported waste-sector benchmarks.
        </p>
      </section>

      {/* 7.3 The Solution */}
      <section className="section-spacing container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>One AI stack. Three layers. A closed loop.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <Link to="/solution" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '24px' }}>
              <Cpu size={32} className="accent-text" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>1. SENSE</h3>
            <p style={{ marginBottom: '24px', flex: 1 }}>Smart sensors + computer vision detect what's being thrown away, in real time.</p>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Learn more →</span>
          </Link>

          <Link to="/solution" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '24px' }}>
              <Bot size={32} className="accent-text" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>2. SORT</h3>
            <p style={{ marginBottom: '24px', flex: 1 }}>On-device AI classifies and separates recyclables with 90%+ purity.</p>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Learn more →</span>
          </Link>

          <Link to="/solution" className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '24px' }}>
              <Recycle size={32} className="accent-text" />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>3. CIRCULATE</h3>
            <p style={{ marginBottom: '24px', flex: 1 }}>Optimized routes and a materials marketplace turn recovered waste back into revenue.</p>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Learn more →</span>
          </Link>

        </div>
      </section>

      {/* 7.4 Live Demo Teaser */}
      <section id="demo" className="section-spacing container">
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', background: 'rgba(31, 182, 232, 0.05)', borderColor: 'rgba(31, 182, 232, 0.2)' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Watch AI sort waste in real time.</h2>
            <p style={{ marginBottom: '32px' }}>Upload a photo of an item. Our model classifies it instantly — the same model architecture running inside our smart bins.</p>
            <Link to="/demo" className="btn-primary" style={{ backgroundColor: 'var(--accent-secondary)' }}>Try the full demo →</Link>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '300px', aspectRatio: '1', border: '1px dashed var(--accent-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
              <Play className="accent-text" style={{ color: 'var(--accent-secondary)' }} size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* 7.6 Personas */}
      <section className="section-spacing container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Link to="/" className="card" style={{ display: 'flex', gap: '16px' }}>
            <Building2 size={32} className="accent-text" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>For Cities</h4>
              <p style={{ fontSize: '0.875rem' }}>Cut collection costs, hit recycling mandates, prove impact to your council.</p>
            </div>
          </Link>
          <Link to="/" className="card" style={{ display: 'flex', gap: '16px' }}>
            <Factory size={32} className="accent-text" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>For Industry</h4>
              <p style={{ fontSize: '0.875rem' }}>Turn byproduct into revenue. Meet ESG targets with auditable data.</p>
            </div>
          </Link>
          <Link to="/" className="card" style={{ display: 'flex', gap: '16px' }}>
            <Users size={32} className="accent-text" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>For Communities</h4>
              <p style={{ fontSize: '0.875rem' }}>Know what's recyclable. See your neighborhood's real impact.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 7.8 Growth Statement */}
      <section className="section-spacing container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', maxWidth: '900px', margin: '0 auto 48px', lineHeight: '1.3' }}>
          "Every ton diverted from landfill is a ton of value recovered — not a cost absorbed. Breathe turns sustainability from a budget line into a revenue line."
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(52, 245, 168, 0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '24px', fontSize: '0.875rem', fontWeight: 600 }}>✓ Fuel saved</div>
          <div style={{ background: 'rgba(52, 245, 168, 0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '24px', fontSize: '0.875rem', fontWeight: 600 }}>✓ Material revenue recovered</div>
          <div style={{ background: 'rgba(52, 245, 168, 0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '24px', fontSize: '0.875rem', fontWeight: 600 }}>✓ New skilled jobs enabled</div>
        </div>
      </section>
      
      {/* 7.9 Final CTA */}
      <section style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(20, 46, 38, 1) 100%)', padding: '120px 0', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Let's help the planet breathe. Together.</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', alignItems: 'center' }}>
            <Link to="/contact" className="btn-primary">Request a Pilot Program →</Link>
            <Link to="/technology" style={{ color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid var(--accent-primary)', paddingBottom: '4px' }}>View technology deep-dive →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
