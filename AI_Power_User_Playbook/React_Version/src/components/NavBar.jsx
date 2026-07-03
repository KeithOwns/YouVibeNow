import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

function NavBar() {
  const [showSettings, setShowSettings] = useState(false);
  const { syncCode, updateSyncCode } = useProgress();
  const [tempCode, setTempCode] = useState(syncCode);

  const handleSave = () => {
    updateSyncCode(tempCode);
    setShowSettings(false);
  };

  return (
    <>
      <nav className="top-nav glass-card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="nav-left">
          <Link to="/" className="nav-link" style={{ fontWeight: 'bold' }}>00: Primer</Link>
          <Link to="/module-01" className="nav-link">01: Context Engineering</Link>
          <Link to="/module-02" className="nav-link">02: The Baseline</Link>
          <Link to="/module-03" className="nav-link">03: Digital Twin</Link>
          <Link to="/module-04" className="nav-link">04: The Capstone</Link>
        </div>
        <div className="nav-right" style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="nav-link special" 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setShowSettings(true)}
          >
            ⚙️ Cloud Sync
          </button>
        </div>
      </nav>

      {showSettings && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content glass-card" style={{ padding: '2rem', width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ marginTop: 0, color: 'var(--accent-primary)' }}>Firebase Cloud Sync</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter a unique secret code here. Use the exact same code on your phone to magically sync your progress via Firebase!</p>
            <input 
              type="text" 
              value={tempCode} 
              onChange={(e) => setTempCode(e.target.value)}
              placeholder="e.g. KEITHS-SECRET-123"
              style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '4px' }}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="export-btn" style={{ flex: 1 }} onClick={handleSave}>Save & Sync</button>
              <button onClick={() => setShowSettings(false)} style={{ background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', borderRadius: '4px', padding: '0.5rem', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
