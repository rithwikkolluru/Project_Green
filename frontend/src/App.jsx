import React, { useState } from 'react';
import ResourceAppraiser from './components/ResourceAppraiser';
import ResourceMap from './components/ResourceMap';
import { Leaf, Map as MapIcon, Sparkles } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('appraise'); // 'appraise' or 'map'

  return (
    <>
      <div className="bg-glow"></div>
      
      <div className="app-container animate-in">
        <header className="nav-header">
          <div className="logo">
            <Leaf size={28} />
            Green-ROI
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setActiveTab('appraise')}
              className={`glass-button ${activeTab === 'appraise' ? 'active-tab' : ''}`}
              style={{
                background: activeTab === 'appraise' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' 
                  : 'rgba(30, 41, 59, 0.5)'
              }}
            >
              <Sparkles size={18} /> AI Appraiser
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`glass-button ${activeTab === 'map' ? 'active-tab' : ''}`}
              style={{
                background: activeTab === 'map' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' 
                  : 'rgba(30, 41, 59, 0.5)'
              }}
            >
              <MapIcon size={18} /> Impact Map
            </button>
          </div>
        </header>

        <main>
          {activeTab === 'appraise' ? <ResourceAppraiser /> : <ResourceMap />}
        </main>
      </div>
    </>
  );
}

export default App;
