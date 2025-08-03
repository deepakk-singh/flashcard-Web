import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Practice from './pages/Practice';
import Stats from './pages/Stats';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="app-wrapper">
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <header className="app-header">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`hamburger ${menuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`app-nav ${menuOpen ? 'open' : ''}`}>
            <NavLink onClick={closeMenu} to="/" className="nav-link">Home</NavLink>
            <NavLink onClick={closeMenu} to="/create" className="nav-link">Create</NavLink>
            <NavLink onClick={closeMenu} to="/practice" className="nav-link">Practice</NavLink>
            <NavLink onClick={closeMenu} to="/stats" className="nav-link">Stats</NavLink>
          </nav>
        </header>

        <main id="main-content" className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>

        <footer className="app-footer">
          Flashcards App © {new Date().getFullYear()} | Made with ❤️
        </footer>
      </div>
    </Router>
  );
}

export default App;
