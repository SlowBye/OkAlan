import { useState } from "react";

const Header = ({ login, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        OK ALAN!
      </div>
      <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {login && (
          <button className='login-btn' onClick={onLogout}>
            Se déconnecter
          </button>
        )}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;

