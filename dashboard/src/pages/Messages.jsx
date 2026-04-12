import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { messageAPI } from '../services/api';
import { Mail, MailOpen, RefreshCw, Trash2, CheckCircle } from 'lucide-react';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getAll();
      setMessages(response.data.messages || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (message) => {
    try {
      const nextState = !message.read;
      await messageAPI.markAsRead(message._id, nextState);
      setMessages((prev) =>
        prev.map((item) => (item._id === message._id ? { ...item, read: nextState } : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update message');
    }
  };

  const handleDelete = async (message) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await messageAPI.delete(message._id);
      setMessages((prev) => prev.filter((item) => item._id !== message._id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete message');
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === 'unread') return !message.read;
    if (filter === 'read') return message.read;
    return true;
  });

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Inbox</h2>
            <p className="panel-subtitle">Respond to inquiries from your portfolio visitors.</p>
          </div>
          <div className="message-actions">
            <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
            <button className="btn btn-secondary" onClick={fetchMessages}>
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {error && <div className="inline-error">{error}</div>}

        {loading ? (
          <div className="route-loader">
            <div className="spinner-large" />
          </div>
        ) : (
          <div className="message-list">
            {filteredMessages.map((message) => (
              <Motion.article
                key={message._id}
                className={`message-card ${message.read ? 'read' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-icon">
                  {message.read ? <MailOpen size={22} /> : <Mail size={22} />}
                </div>
                <div className="message-body">
                  <div className="message-meta">
                    <h4>{message.name}</h4>
                    <span>{message.email}</span>
                    <time>{new Date(message.createdAt).toLocaleString()}</time>
                  </div>
                  <p>{message.message}</p>
                  <div className="message-tags">
                    <span className={`status-pill ${message.read ? '' : 'danger'}`}>
                      {message.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                <div className="message-actions-col">
                  <button className="btn btn-secondary" onClick={() => toggleRead(message)}>
                    <CheckCircle size={16} />
                    {message.read ? 'Mark unread' : 'Mark read'}
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(message)}>
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </Motion.article>
            ))}
            {!filteredMessages.length && (
              <div className="empty-state">
                <MailOpen size={48} />
                <h3>No messages</h3>
                <p>All caught up! No {filter === 'all' ? 'messages' : `${filter} messages`}.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

