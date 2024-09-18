import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Protected from './Protected';
import Profile from './Profile';
import News from './News';
import { ThemeProvider, useTheme } from './ThemeContext';
import Contact from './Contact';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={styles.themeToggle}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={styles.app}>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    transition: 'background-color 0.3s',
  },
  themeToggle: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
  },
};

export default App;