import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Home() {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/protected', { withCredentials: true });
        if (response.status === 200) {
          // Si la requête réussit, l'utilisateur est connecté, donc on le redirige
          navigate('/protected');
        }
      } catch (error) {
        // Si la requête échoue, l'utilisateur n'est pas connecté, donc on ne fait rien
        console.log('Utilisateur non connecté');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password }, { withCredentials: true });
      if (response.status === 200) {
        navigate('/protected');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Identifiants incorrects');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google/login';
  };

  return (
    <div style={{...styles.container, backgroundColor: isDarkMode ? '#333' : '#f0f2f5'}}>
      <div style={{...styles.formContainer, backgroundColor: isDarkMode ? '#444' : 'white'}}>
        <h1 style={{...styles.title, color: isDarkMode ? '#fff' : '#333'}}>Page d'accueil</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Se connecter</button>
        </form>
        <button onClick={handleGoogleLogin} style={styles.googleButton}>
          Connexion via Google
        </button>
        {error && <p style={styles.error}>{error}</p>}
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
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    width: '100%',
  },
};

export default Home;