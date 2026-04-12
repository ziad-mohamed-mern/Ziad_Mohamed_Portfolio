import { Menu } from 'lucide-react';
import './Header.css';

const Header = ({ onMenuClick }) => {
  return (
    <header className="dashboard-header">
      <button className="menu-toggle" onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <div className="header-content">
        <h1 className="header-title">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;

