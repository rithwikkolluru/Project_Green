import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Wind } from 'lucide-react';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ 
        padding: '24px 0', 
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(6, 18, 15, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
            <Wind className="accent-text" size={32} />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 700 }}>BREATHE</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center', fontSize: '0.9rem' }}>
            <Link to="/solution" style={{ color: 'var(--text-secondary)' }}>Solution</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
            <Link to="/technology" style={{ color: 'var(--text-secondary)' }}>Technology</Link>
            <Link to="/demo" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Try Demo →</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </main>

      <footer style={{ background: 'var(--bg-secondary)', padding: '64px 0 32px', marginTop: 'auto' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                <Wind className="accent-text" size={24} />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>BREATHE</span>
              </div>
              <p style={{ fontSize: '0.875rem' }}>AI operating system for waste. Turning trash into tracked, sorted, and reused resources.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Product</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <Link to="/solution" style={{ color: 'var(--text-secondary)' }}>Solution</Link>
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
                <Link to="/demo" style={{ color: 'var(--text-secondary)' }}>Live Demo</Link>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <Link to="/technology" style={{ color: 'var(--text-secondary)' }}>Technology</Link>
                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Team</Link>
                <Link to="/" style={{ color: 'var(--text-secondary)' }}>Contact</Link>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <span className="mono">"Build technology that helps the planet breathe."</span>
            <span>Built at Hackathon 2026. Data is illustrative.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
