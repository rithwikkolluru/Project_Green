import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Award, Activity } from 'lucide-react';

const diversionData = [
  { month: 'Jan', rate: 21 },
  { month: 'Feb', rate: 22 },
  { month: 'Mar', rate: 24 },
  { month: 'Apr', rate: 23 },
  { month: 'May', rate: 28 }, // Event: Route optimization
  { month: 'Jun', rate: 32 },
  { month: 'Jul', rate: 31 },
  { month: 'Aug', rate: 34 },
];

const compositionData = [
  { name: 'Organic', value: 45, fill: '#10b981' }, // Green
  { name: 'Plastic', value: 20, fill: '#3b82f6' }, // Blue
  { name: 'Paper', value: 15, fill: '#f59e0b' },   // Amber
  { name: 'Metal', value: 8, fill: '#64748b' },    // Slate
  { name: 'Glass', value: 7, fill: '#14b8a6' },    // Teal
  { name: 'E-waste', value: 3, fill: '#8b5cf6' },  // Purple
  { name: 'Hazardous', value: 2, fill: '#ef4444' } // Red
];

export default function Dashboard() {
  return (
    <div className="container section-spacing">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <div className="eyebrow">CITY COMMAND CENTER</div>
          <h1 style={{ fontSize: '2.5rem' }}>Impact Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }} className="animate-pulse"></span>
          Live System Status
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Total Waste Analyzed</div>
          <div className="mono" style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>2.4M <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>tons</span></div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Landfill Diversion Rate</div>
          <div className="mono" style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>34.2% <TrendingUp size={20} style={{ display: 'inline', marginLeft: '8px' }} /></div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>CO₂e Avoided</div>
          <div className="mono" style={{ fontSize: '2rem', color: 'var(--accent-secondary)' }}>184.5k <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>tons</span></div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Est. Economic Value</div>
          <div className="mono" style={{ fontSize: '2rem', color: 'var(--accent-warm)' }}>₹35Cr <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>recovered</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        
        {/* Line Chart */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Landfill Diversion Trend</h3>
          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={diversionData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="rate" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marketplace Activity */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity className="accent-text" size={20} /> Marketplace Feed
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1 }}>
            {[
              { id: 1, mat: '140kg PET flake', buyer: 'GreenPoly Ind.', time: '2 mins ago', co2: '210kg' },
              { id: 2, mat: '500kg Cardboard', buyer: 'City Paper Mills', time: '14 mins ago', co2: '750kg' },
              { id: 3, mat: '25kg Aluminum', buyer: 'AlloyTech', time: '1 hr ago', co2: '350kg' },
              { id: 4, mat: '900kg Organics', buyer: 'AgriCompost', time: '3 hrs ago', co2: '450kg' }
            ].map((feed) => (
              <div key={feed.id} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px', borderLeft: '2px solid var(--accent-secondary)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  <strong>{feed.mat}</strong> matched with {feed.buyer}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  <span>{feed.time}</span>
                  <span style={{ color: 'var(--accent-primary)' }}>↓ {feed.co2} CO₂e</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Bar Chart */}
        <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Waste Composition Breakdown</h3>
          <div style={{ flex: 1, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compositionData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--text-tertiary)" hide />
                <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'var(--bg-tertiary)' }} contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award className="accent-text" size={20} /> Top Performing Zones
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}>
                <th style={{ paddingBottom: '12px' }}>Zone / Ward</th>
                <th style={{ paddingBottom: '12px' }}>Diversion Rate</th>
                <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Ward 12 (Andheri)', rate: '42%', trend: '+4%' },
                { name: 'Ward 8 (Peenya)', rate: '39%', trend: '+7%' },
                { name: 'Ward 3 (Jubilee Hills)', rate: '35%', trend: '+2%' },
                { name: 'Ward 14 (Electronic City)', rate: '31%', trend: '+5%' },
              ].map((zone, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 0', color: 'var(--text-primary)', fontWeight: 500 }}>{zone.name}</td>
                  <td className="mono" style={{ padding: '16px 0' }}>{zone.rate}</td>
                  <td className="mono" style={{ padding: '16px 0', textAlign: 'right', color: 'var(--accent-primary)' }}>{zone.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '32px' }}>
        Dashboard displays simulated data representative of live deployment for demonstration purposes.
      </p>
    </div>
  );
}
