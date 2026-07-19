import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Loader2, Leaf, IndianRupee, Building2, Target } from 'lucide-react';

export default function ResourceAppraiser() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // State for typing effect
  const [displayedText, setDisplayedText] = useState({});
  const typingRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
    setDisplayedText({});
  };

  const analyzeResource = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setDisplayedText({});

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Pointing to Render/Local backend (port 5000)
      // For Vercel production, you would use an environment variable here like import.meta.env.VITE_API_URL
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/analyze-resource`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
      simulateTyping(data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the AI brain. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateTyping = (data) => {
    const keys = Object.keys(data);
    let currentKeyIndex = 0;
    let currentCharIndex = 0;
    
    setDisplayedText({});
    
    clearInterval(typingRef.current);
    
    typingRef.current = setInterval(() => {
      if (currentKeyIndex >= keys.length) {
        clearInterval(typingRef.current);
        return;
      }
      
      const key = keys[currentKeyIndex];
      const textToType = String(data[key]);
      
      setDisplayedText(prev => ({
        ...prev,
        [key]: textToType.substring(0, currentCharIndex + 1)
      }));
      
      currentCharIndex++;
      
      if (currentCharIndex >= textToType.length) {
        currentKeyIndex++;
        currentCharIndex = 0;
      }
    }, 20); // Typing speed
  };

  useEffect(() => {
    return () => clearInterval(typingRef.current);
  }, []);

  return (
    <div className="glass-panel animate-in" style={{ padding: '2rem', marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Target className="text-primary" /> AI Resource Appraiser
      </h2>
      
      {!result && !isLoading && (
        <div 
          className={`dropzone ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileUpload').click()}
        >
          {previewUrl && <img src={previewUrl} alt="Preview" className="preview" />}
          
          <div className="dropzone-content">
            <UploadCloud size={48} style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
            <h3>Drag & drop a photo of waste/scrap</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>or click to browse from your device</p>
          </div>
          <input 
            type="file" 
            id="fileUpload" 
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={handleFileInput}
          />
        </div>
      )}

      {error && (
        <div style={{ color: '#ef4444', marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      {file && !result && !isLoading && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="glass-button" onClick={analyzeResource}>
            Analyze Economic Value
          </button>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Loader2 size={48} className="animate-spin text-primary" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <h3 className="typing-indicator" style={{ color: 'var(--primary)' }}>Consulting AI Economic Models</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Analyzing material composition and market rates...</p>
        </div>
      )}

      {result && (
        <div className="animate-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h3 style={{ color: 'var(--primary)' }}>Analysis Complete</h3>
             <button 
                className="glass-button" 
                style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                onClick={() => { setResult(null); setFile(null); setPreviewUrl(null); }}
             >
                Analyze Another
             </button>
          </div>
          
          <div className="results-card glass-panel" style={{ background: 'rgba(2, 6, 23, 0.4)' }}>
            
            <div className="stat-box">
              <div className="stat-label">Identified Material</div>
              <div className="stat-value">{displayedText.material_type || ''}</div>
            </div>

            <div className="stat-box" style={{ borderLeft: '2px solid var(--primary)' }}>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IndianRupee size={16} /> Market Value
              </div>
              <div className="stat-value" style={{ color: '#fbbf24' }}>
                {displayedText.estimated_market_value_INR || ''}
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Leaf size={16} color="#10b981" /> Eco-Score
              </div>
              <div className="stat-value">
                {displayedText.environmental_impact_score || ''}/10
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={16} /> Buyer Match
              </div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>
                {displayedText.buyer_industry_match || ''}
              </div>
            </div>
            
            <div className="stat-box" style={{ gridColumn: '1 / -1', background: 'rgba(16, 185, 129, 0.05)' }}>
               <div className="stat-label">Green ROI Summary</div>
               <div style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                 {displayedText.roi_summary || ''}
               </div>
            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
