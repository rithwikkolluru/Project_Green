import React, { useState } from 'react';
import { UploadCloud, Loader2, Sparkles } from 'lucide-react';

export default function Demo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const runDemo = async () => {
    if (!file) return;
    setIsLoading(true);
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/analyze-resource`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      // Map the backend JSON format to the UI state
      setResult({
        category: data.category,
        confidence: (data.confidence * 100).toFixed(1) + '%',
        bin: data.bin_color.charAt(0).toUpperCase() + data.bin_color.slice(1) + ' Bin',
        binColor: data.bin_color,
        reasoning: data.reasoning
      });
    } catch (error) {
      console.error(error);
      setResult({
        category: 'Error',
        confidence: 'N/A',
        bin: 'Unknown',
        binColor: '#ef4444',
        reasoning: 'Failed to connect to the classification engine. Ensure backend is running.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container section-spacing">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="eyebrow">INTERACTIVE DEMO</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Test the AI Vision Model</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Upload a photo of an item. Our model classifies it instantly — the same architecture running inside our smart bins at the edge.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center' }}>
        
        {/* Upload Zone */}
        <div className="card" style={{ flex: '1 1 400px', maxWidth: '500px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          {!previewUrl ? (
            <div 
              style={{ flex: 1, border: '2px dashed var(--border-subtle)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s', padding: '32px', textAlign: 'center' }}
              onClick={() => document.getElementById('demo-upload').click()}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              <UploadCloud size={48} className="accent-text" style={{ marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Drag & drop or click to upload</h3>
              <p style={{ fontSize: '0.875rem' }}>Supports JPG, PNG (Max 5MB)</p>
              <input type="file" id="demo-upload" style={{ display: 'none' }} accept="image/*" onChange={handleFile} />
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '24px' }}></div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => { setFile(null); setPreviewUrl(null); setResult(null); }}>Reset</button>
                <button className="btn-primary" style={{ flex: 2 }} onClick={runDemo} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> : 'Run AI Inference'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="card" style={{ flex: '1 1 400px', maxWidth: '500px', minHeight: '400px', background: 'var(--bg-tertiary)' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles className="accent-text" size={20} /> Inference Results
          </h3>
          
          {isLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--accent-primary)' }}>
              <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
              <div className="mono">Running MobileNetV3 CNN...</div>
            </div>
          )}

          {!isLoading && !result && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-tertiary)' }}>
              Awaiting image input...
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>Predicted Category</div>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                  {result.category}
                  <span className="mono" style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>{result.confidence}</span>
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>Routing Destination</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: result.binColor }}></div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{result.bin}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>Model Reasoning</div>
                <div style={{ background: 'rgba(52, 245, 168, 0.1)', color: 'var(--accent-primary)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.875rem' }}>
                  {result.reasoning}
                </div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: 'auto', paddingTop: '24px', fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            *Note: This demo uses a simulated inference response for hackathon presentation speed. The live edge device runs a quantized TensorFlow Lite model.
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
