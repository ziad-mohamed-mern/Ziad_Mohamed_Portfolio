import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { analyticsAPI } from '../services/api';
import { BarChart3, RefreshCw, TrendingUp } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ visits: 0, updatedAt: null });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [visitsInput, setVisitsInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.get();
      const data = response.data.analytics || { visits: 0 };
      setAnalytics(data);
      setVisitsInput(data.visits ?? 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (visitsInput < 0) {
      setError('Visits cannot be negative');
      return;
    }
    try {
      setUpdating(true);
      const response = await analyticsAPI.updateVisits(Number(visitsInput));
      setAnalytics(response.data.analytics);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update analytics');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Traffic Insights</h2>
            <p className="panel-subtitle">Monitor and fine-tune your portfolio analytics.</p>
          </div>
          <button className="btn btn-secondary" onClick={fetchAnalytics}>
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {error && <div className="inline-error">{error}</div>}

        {loading ? (
          <div className="route-loader">
            <div className="spinner-large" />
          </div>
        ) : (
          <div className="analytics-grid">
            <Motion.div className="analytics-card" whileHover={{ scale: 1.01 }}>
              <div className="analytics-icon">
                <BarChart3 size={28} />
              </div>
              <div>
                <p>Total visits</p>
                <h2>{analytics.visits}</h2>
                {analytics.updatedAt && (
                  <small>Updated {new Date(analytics.updatedAt).toLocaleString()}</small>
                )}
              </div>
              <span className="trend-pill">
                <TrendingUp size={16} />
                Live
              </span>
            </Motion.div>

            <form className="analytics-form" onSubmit={handleUpdate}>
              <h3>Manual override</h3>
              <p>Adjust the visit count if you need to resync analytics.</p>
              <div className="form-group">
                <label>Visit count</label>
                <input
                  type="number"
                  className="input"
                  value={visitsInput}
                  onChange={(e) => setVisitsInput(Number(e.target.value))}
                  min={0}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={updating}>
                {updating ? 'Updating...' : 'Update visits'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

