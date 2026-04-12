import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { aboutAPI } from '../services/api';
import { UserCircle, RefreshCw, Edit3, Trash2 } from 'lucide-react';
import './About.css';

const initialForm = {
  name: '',
  role: '',
  descriptionEn: '',
  descriptionAr: '',
  address: '',
  phone: '',
  email: '',
  cvLink: '',
  profileImageUrl: '',
  profileImageFile: null,
};

const About = () => {
  const [aboutEntries, setAboutEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const response = await aboutAPI.getAll();
      setAboutEntries(response.data.about || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load about section');
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (entry) => {
    setEditingEntry(entry);
    setFormData({
      name: entry.name,
      role: entry.role,
      descriptionEn: entry.description?.en || entry.description || '',
      descriptionAr: entry.description?.ar || '',
      address: entry.address || '',
      phone: entry.phone || '',
      email: entry.email || '',
      cvLink: entry.cvLink || '',
      profileImageUrl: entry.profileImage || '',
      profileImageFile: null,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingEntry(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('role', formData.role);
      payload.append('descriptionEn', formData.descriptionEn);
      payload.append('descriptionAr', formData.descriptionAr);
      payload.append('address', formData.address);
      payload.append('phone', formData.phone);
      payload.append('email', formData.email);
      payload.append('cvLink', formData.cvLink);
      if (formData.profileImageFile) {
        payload.append('profileImage', formData.profileImageFile);
      } else if (formData.profileImageUrl) {
        payload.append('profileImage', formData.profileImageUrl);
      }

      if (editingEntry) {
        await aboutAPI.update(editingEntry._id, payload);
      } else {
        await aboutAPI.create(payload);
      }

      await fetchAbout();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save entry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (entry) => {
    if (!window.confirm('Delete this about entry?')) return;
    try {
      await aboutAPI.delete(entry._id);
      setAboutEntries((prev) => prev.filter((item) => item._id !== entry._id));
      if (editingEntry?._id === entry._id) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete record');
    }
  };

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">About Section</h2>
            <p className="panel-subtitle">
              Keep your biography, contact information and CV link up to date.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={fetchAbout}>
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {error && <div className="inline-error">{error}</div>}

        <div className="about-layout">
          <form className="about-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>{editingEntry ? 'Edit entry' : 'Add new entry'}</h3>
              {editingEntry && (
                <button type="button" className="btn btn-ghost" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  className="input"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group full">
                <label>Short bio (English)</label>
                <textarea
                  className="textarea"
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descriptionEn: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-group full">
                <label>Short bio (Arabic)</label>
                <textarea
                  className="textarea"
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descriptionAr: e.target.value }))
                  }
                  dir="rtl"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  className="input"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>CV link</label>
                <input
                  className="input"
                  value={formData.cvLink}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cvLink: e.target.value }))}
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="form-group">
                <label>Upload profile image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profileImageFile: e.target.files?.[0] || null,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Or image URL</label>
                <input
                  className="input"
                  value={formData.profileImageUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, profileImageUrl: e.target.value }))
                  }
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingEntry ? 'Save changes' : 'Create entry'}
            </button>
          </form>

          <div className="about-list">
            {loading ? (
              <div className="route-loader">
                <div className="spinner-large" />
              </div>
            ) : (
              aboutEntries.map((entry) => (
                <Motion.article
                  key={entry._id}
                  className="about-card"
                  whileHover={{ y: -4, boxShadow: '0 20px 35px rgba(15,23,42,0.12)' }}
                >
                  <div className="about-card__media">
                    {entry.profileImage ? (
                      <img src={entry.profileImage} alt={entry.name} />
                    ) : (
                      <UserCircle size={64} />
                    )}
                  </div>
                  <div className="about-card__body">
                    <h3>{entry.name}</h3>
                    <p className="role">{entry.role}</p>
                    <p className="description">{entry.description?.en || entry.description}</p>
                    {entry.description?.ar && (
                      <p className="description" dir="rtl">{entry.description.ar}</p>
                    )}
                    <div className="about-meta">
                      {entry.email && <span>{entry.email}</span>}
                      {entry.phone && <span>{entry.phone}</span>}
                      {entry.address && <span>{entry.address}</span>}
                    </div>
                    {entry.cvLink && (
                      <a href={entry.cvLink} target="_blank" rel="noreferrer" className="cv-link">
                        View CV
                      </a>
                    )}
                  </div>
                  <div className="about-card__actions">
                    <button className="icon-btn" onClick={() => populateForm(entry)}>
                      <Edit3 size={18} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(entry)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Motion.article>
              ))
            )}

            {!loading && !aboutEntries.length && (
              <div className="empty-state">
                <UserCircle size={48} />
                <h3>No about entries</h3>
                <p>Create an entry to introduce yourself.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

