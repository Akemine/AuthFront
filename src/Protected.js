import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Protected() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const response = await axios.get('http://localhost:8080/protected', { withCredentials: true });
        setContent(response.data);
      } catch (error) {
        console.error('Erreur d\'accès à la page protégée:', error);
        navigate('/');
      }
    };

    fetchProtectedContent();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div style={{...styles.container, backgroundColor: isDarkMode ? '#333' : '#f0f2f5'}}>
      <div style={{...styles.content, backgroundColor: isDarkMode ? '#444' : 'white'}}>
        <h1 style={{...styles.title, color: isDarkMode ? '#fff' : '#333'}}>Page Protégée</h1>
        <p style={{color: isDarkMode ? '#ddd' : '#333'}}>{content}</p>
        <Link to="/profile" style={{...styles.profileLink, color: isDarkMode ? '#8AE234' : '#4CAF50'}}>Voir le profil</Link>
        <Link to="/news" style={{...styles.profileLink, color: isDarkMode ? '#8AE234' : '#4CAF50'}}>Actualités</Link>
        <Link to="/contact" style={{...styles.profileLink, color: isDarkMode ? '#8AE234' : '#4CAF50'}}>Contact</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>Se déconnecter</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  content: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  profileLink: {
    display: 'block',
    marginBottom: '1rem',
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Protected;