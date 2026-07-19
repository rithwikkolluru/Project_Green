import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Zap, Banknote, Clock, Loader2 } from 'lucide-react';

export default function GreenROIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [result, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/green-roi-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to get ROI analysis');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Connection to AI consultant failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="glass-button"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          padding: 0,
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.5)',
          zIndex: 50,
          display: isOpen ? 'none' : 'flex'
        }}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="glass-panel animate-in"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '400px',
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.85)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(16, 185, 129, 0.1)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', margin: 0 }}>
              <Zap className="text-primary" size={20} />
              AI Green-ROI Consultant
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {!result && !isLoading && !error && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                <MessageSquare size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                <p>Describe your facility's energy or waste challenges.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Example: "We discard 2 tons of cardboard weekly at our warehouse."</p>
              </div>
            )}

            {isLoading && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--primary)' }}>
                <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Formulating Green-ROI strategies...</span>
              </div>
            )}

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            {result && (
              <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <strong>Problem:</strong> {result.problem_summary}
                </div>
                
                {result.solutions?.map((sol, idx) => (
                  <div key={idx} style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{idx + 1}. {sol.title}</h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>{sol.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                        <Banknote size={14} /> {sol.estimated_cost_INR}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa' }}>
                        <Clock size={14} /> ROI: {sol.projected_roi_time}
                      </span>
                    </div>
                  </div>
                ))}

                <div style={{ textAlign: 'center', padding: '0.5rem', background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '8px', fontWeight: 'bold' }}>
                  Annual Impact: {result.carbon_saved_estimate} CO₂ saved
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your challenge here..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--glass-border)',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '24px',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button 
                type="submit" 
                disabled={isLoading || !prompt.trim()}
                style={{
                  background: 'var(--primary)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: (isLoading || !prompt.trim()) ? 0.5 : 1
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
