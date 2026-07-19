import React from 'react';
import { Server, Database, Code, ShieldCheck } from 'lucide-react';

export default function Technology() {
  return (
    <div className="container section-spacing">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="eyebrow">UNDER THE HOOD</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>System Architecture & Stack</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Transparent design, open models, and secure data flow.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '80px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
             Data Flow Diagram
           </h3>
           
           <div className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', lineHeight: 1.8 }}>
             <div>[Smart Bin: sensors + camera]</div>
             <div style={{ paddingLeft: '16px', color: 'var(--text-tertiary)' }}>↓ (BLE/LoRaWAN, metadata)</div>
             
             <div>[Edge Device: CNN inference]</div>
             <div style={{ paddingLeft: '16px', color: 'var(--text-tertiary)' }}>↓ (REST/MQTT, low payload)</div>
             
             <div>[Cloud API: Node Backend]</div>
             <div style={{ paddingLeft: '16px', color: 'var(--text-tertiary)' }}>↓</div>
             
             <div style={{ display: 'flex', gap: '8px' }}>
               <div>[Time-Series DB]</div>
               <div>[VRP Optimizer]</div>
             </div>
             <div style={{ paddingLeft: '16px', color: 'var(--text-tertiary)' }}>↓</div>
             
             <div style={{ display: 'flex', gap: '8px' }}>
               <div>[Dashboard UI]</div>
               <div>[Marketplace]</div>
             </div>
           </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ display: 'flex', gap: '16px' }}>
            <Code className="accent-text" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Recommended Tech Stack</h4>
              <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>Frontend:</strong> React (Vite), Tailwind CSS/Custom CSS, Recharts</li>
                <li><strong>Backend:</strong> Node/Express, PostgreSQL, Redis</li>
                <li><strong>ML Edge:</strong> TensorFlow Lite, MobileNetV3 (Transfer Learning)</li>
                <li><strong>Optimization:</strong> Google OR-Tools (VRP), Prophet (Demand Forecasting)</li>
                <li><strong>IoT Prototype:</strong> ESP32-CAM / Raspberry Pi Zero W + HC-SR04</li>
              </ul>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', gap: '16px' }}>
            <ShieldCheck className="accent-text" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Model Transparency & Limitations</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                The classification model is trained primarily on well-lit, single-item images (e.g., TrashNet/TACO datasets). 
                Performance on cluttered or heavily mixed waste piles is lower and represents a noted area for future work and iterative data collection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
