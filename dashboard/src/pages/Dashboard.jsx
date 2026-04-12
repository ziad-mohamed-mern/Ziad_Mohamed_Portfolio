import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Briefcase, Code, User, MessageSquare, BarChart3, TrendingUp } from 'lucide-react';
import { productAPI, skillAPI, aboutAPI, messageAPI, analyticsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    skills: 0,
    about: 0,
    messages: 0,
    unreadMessages: 0,
    visits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, skillsRes, aboutRes, messagesRes, analyticsRes] = await Promise.all([
        productAPI.getAll(),
        skillAPI.getAll(),
        aboutAPI.getAll(),
        messageAPI.getAll(),
        analyticsAPI.get(),
      ]);

      const unreadMessages = messagesRes.data.messages.filter((m) => !m.read).length;

      setStats({
        products: productsRes.data.products.length,
        skills: skillsRes.data.skills.length,
        about: aboutRes.data.about.length,
        messages: messagesRes.data.messages.length,
        unreadMessages,
        visits: analyticsRes.data.analytics?.visits || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: Briefcase, label: 'Products', value: stats.products, color: '#667eea' },
    { icon: Code, label: 'Skills', value: stats.skills, color: '#f093fb' },
    { icon: User, label: 'About', value: stats.about, color: '#4facfe' },
    { icon: MessageSquare, label: 'Messages', value: stats.messages, color: '#43e97b', badge: stats.unreadMessages },
    { icon: BarChart3, label: 'Total Visits', value: stats.visits, color: '#fa709a' },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Overview</h1>
        <p className="page-subtitle">Welcome to your portfolio dashboard</p>
      </Motion.div>

      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
            >
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                {stat.badge && stat.badge > 0 && (
                  <span className="stat-badge">{stat.badge} unread</span>
                )}
              </div>
              <div className="stat-trend">
                <TrendingUp size={16} />
              </div>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

