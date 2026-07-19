import React from 'react';
import { Cpu, Bot, Recycle, AlertTriangle, Route, BarChart3 } from 'lucide-react';

export default function Solution() {
  return (
    <div className="container section-spacing">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="eyebrow">THE TECHNOLOGY</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Deep Dive into the 3-Layer Stack</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          How Breathe transforms mixed waste into pure, traceable resources through edge IoT, robotics, and logistics AI.
        </p>
      </div>

      {/* Layer 1: SENSE */}
      <div style={{ marginBottom: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
              <Cpu size={32} className="accent-text" />
            </div>
            <h2 style={{ fontSize: '2rem' }}>Layer 1: SENSE</h2>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The planet's nervous system, in every bin.</h3>
          <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <li>Ultrasonic + weight sensors measure bin fill-level every 5 minutes.</li>
            <li>A camera module captures an image at point of disposal.</li>
            <li>An on-device lightweight CNN (MobileNetV3) classifies the item into 7 categories.</li>
            <li>Only metadata is sent to the cloud (privacy-preserving, low-bandwidth).</li>
          </ol>
        </div>
        <div className="card" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>Hardware Spec Sheet</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.875rem' }}>
            <div>
              <div style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Compute Node</div>
              <div style={{ color: 'var(--text-primary)' }}>Raspberry Pi Zero W / ESP32</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Inference Latency</div>
              <div className="mono" style={{ color: 'var(--accent-primary)' }}>~80ms</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Model Architecture</div>
              <div style={{ color: 'var(--text-primary)' }}>Quantized MobileNetV3</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Target Accuracy</div>
              <div className="mono" style={{ color: 'var(--accent-primary)' }}>92.4% Top-1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2: SORT */}
      <div style={{ marginBottom: '80px', display: 'flex', flexDirection: 'column-reverse', gap: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
               <AlertTriangle color="var(--accent-warm)" size={24} style={{ flexShrink: 0 }} />
               <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Contamination Early-Warning</h4>
                  <p style={{ fontSize: '0.875rem' }}>The system flags high-contamination batches based on upstream Sense data before they reach the sorting floor, enabling targeted education instead of batch rejection.</p>
               </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
               <AlertTriangle color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
               <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Hazard Prevention</h4>
                  <p style={{ fontSize: '0.875rem' }}>Detects batteries and e-waste on the conveyor to prevent MRF fires—a critical safety feature for material recovery facilities.</p>
               </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                <Bot size={32} className="accent-text" />
              </div>
              <h2 style={{ fontSize: '2rem' }}>Layer 2: SORT</h2>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>From mixed waste to pure resource.</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Facility-level pipeline: Conveyor belt → Multi-camera vision array → Real-time classification → Robotic/pneumatic sorting arms → Material-specific bunkers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(52, 245, 168, 0.05)', borderRadius: '8px', border: '1px solid rgba(52, 245, 168, 0.2)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Manual Sorting</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>~75% Purity</div>
              </div>
              <div style={{ color: 'var(--border-subtle)', fontWeight: 'bold' }}>vs</div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>AI-Assisted</div>
                <div className="accent-text" style={{ fontWeight: 600, fontSize: '1.25rem' }}>92-96% Purity</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Layer 3: CIRCULATE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
              <Recycle size={32} className="accent-text" />
            </div>
            <h2 style={{ fontSize: '2rem' }}>Layer 3: CIRCULATE</h2>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Turning logistics into leverage.</h3>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
             <Route className="accent-text" size={24} style={{ flexShrink: 0, marginTop: '4px' }} />
             <div>
                <h4 style={{ color: 'var(--text-primary)' }}>Dynamic Route Optimization</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Constrained VRP solver ingests live bin fill-levels to generate daily optimized routes, reducing fleet mileage.</p>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
             <BarChart3 className="accent-text" size={24} style={{ flexShrink: 0, marginTop: '4px' }} />
             <div>
                <h4 style={{ color: 'var(--text-primary)' }}>The Circular Marketplace</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>A two-sided exchange where recovered material is matched with industrial buyers using price, grade, and geographic proximity to minimize transport emissions.</p>
             </div>
          </div>
        </div>

        <div className="card" style={{ background: 'var(--accent-primary)', color: 'var(--bg-primary)' }}>
          <h4 style={{ marginBottom: '16px', fontWeight: 700, fontSize: '1.25rem' }}>The Economic Spread</h4>
          <p style={{ marginBottom: '24px', fontWeight: 500 }}>
            A ton of sorted PET flake can be worth ₹16,000–₹32,000 to a buyer instead of a landfill tipping fee cost of ₹2,500–₹6,500.
          </p>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Breathe's marketplace captures that spread for municipalities and facilities, turning a historical expense into an ESG-compliant revenue stream.
          </p>
        </div>
      </div>
    </div>
  );
}
