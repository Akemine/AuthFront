import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile', { withCredentials: true });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du profil:', error);
        navigate('/');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!userInfo) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{...styles.container, backgroundColor: isDarkMode ? '#333' : '#f0f2f5'}}>
      <div style={{...styles.profileCard, backgroundColor: isDarkMode ? '#444' : 'white'}}>
        <h1 style={{...styles.title, color: isDarkMode ? '#fff' : '#333'}}>Profil Utilisateur</h1>
        <div style={{...styles.infoContainer, color: isDarkMode ? '#ddd' : '#333'}}>
          <p><strong>ID:</strong> {userInfo.ID}</p>
          <p><strong>Nom d'utilisateur:</strong> {userInfo.Username}</p>
          <p><strong>Email:</strong> {userInfo.Email}</p>
          <p><strong>Type:</strong> {userInfo.Type ? 'Admin' : 'Utilisateur'}</p>
          <p><strong>Créé le:</strong> {new Date(userInfo.CreatedAt).toLocaleString()}</p>
        </div>
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
  profileCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  infoContainer: {
    textAlign: 'left',
    marginBottom: '1.5rem',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Profile;
