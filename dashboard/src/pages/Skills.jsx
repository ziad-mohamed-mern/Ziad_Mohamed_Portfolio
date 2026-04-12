import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { skillAPI } from '../services/api';
import { RefreshCw, Save, XCircle, Wand2, Trash2 } from 'lucide-react';
import './Skills.css';

const categories = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'tools', label: 'Tools' },
  { value: 'other', label: 'Other' },
];

const initialForm = {
  name: '',
  category: 'frontend',
  iconUrl: '',
  iconFile: null,
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillAPI.getAll();
      setSkills(response.data.skills || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load skills');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingSkill(null);
  };

  const populateForm = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      iconUrl: skill.icon || '',
      iconFile: null,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('category', formData.category);
      if (formData.iconFile) {
        payload.append('icon', formData.iconFile);
      } else if (formData.iconUrl) {
        payload.append('icon', formData.iconUrl);
      }

      if (editingSkill) {
        await skillAPI.update(editingSkill._id, payload);
      } else {
        await skillAPI.create(payload);
      }

      await fetchSkills();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    if (!window.confirm(`Delete ${skill.name}?`)) return;
    try {
      await skillAPI.delete(skill._id);
      setSkills((prev) => prev.filter((item) => item._id !== skill._id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete skill');
    }
  };

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Skill Library</h2>
            <p className="panel-subtitle">
              Curate the technologies that appear in your public profile.
            </p>
          </div>
          <div className="panel-actions">
            <button className="btn btn-secondary" onClick={fetchSkills}>
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {error && <div className="inline-error">{error}</div>}

        <div className="skills-layout">
          <form className="skills-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>{editingSkill ? 'Update skill' : 'Add new skill'}</h3>
              {editingSkill && (
                <button type="button" className="btn btn-ghost" onClick={resetForm}>
                  <XCircle size={16} />
                  Cancel edit
                </button>
              )}
            </div>
            <div className="form-group">
              <label>Skill name</label>
              <input
                className="input"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="select"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Upload icon</label>
              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, iconFile: e.target.files?.[0] || null }))
                }
              />
            </div>
            <div className="form-group">
              <label>Icon URL</label>
              <input
                className="input"
                value={formData.iconUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, iconUrl: e.target.value }))}
                placeholder="https://cdn..."
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : editingSkill ? 'Save skill' : 'Add skill'}
            </button>
          </form>

          <div className="skills-grid">
            {loading ? (
              <div className="route-loader">
                <div className="spinner-large" />
              </div>
            ) : (
              skills.map((skill) => (
                <Motion.div
                  key={skill._id}
                  className="skill-card"
                  whileHover={{ y: -4, boxShadow: '0 16px 30px rgba(15,23,42,0.12)' }}
                >
                  <div className="skill-card__icon">
                    {skill.icon ? <img src={skill.icon} alt={skill.name} /> : <Wand2 />}
                  </div>
                  <div className="skill-card__info">
                    <h4>{skill.name}</h4>
                    <p>{skill.category}</p>
                  </div>
                  <div className="skill-card__actions">
                    <button className="icon-btn" onClick={() => populateForm(skill)}>
                      <Save size={16} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(skill)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Motion.div>
              ))
            )}

            {!loading && !skills.length && (
              <div className="empty-state">
                <Wand2 size={48} />
                <h3>No skills yet</h3>
                <p>Add the technologies you want to highlight.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

