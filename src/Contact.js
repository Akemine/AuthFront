import React from 'react';
import { useTheme } from './ThemeContext';

function Contact() {
  const { isDarkMode } = useTheme();

  return (
    <div style={{...styles.container, backgroundColor: isDarkMode ? '#333' : '#f0f2f5'}}>
      <div style={{...styles.contactContainer, backgroundColor: isDarkMode ? '#444' : 'white'}}>
        <h1 style={{...styles.title, color: isDarkMode ? '#fff' : '#333'}}>Contactez-nous</h1>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Nom"
            style={{...styles.input, color: isDarkMode ? '#ddd' : '#333', backgroundColor: isDarkMode ? '#555' : '#fff'}}
          />
          <input
            type="email"
            placeholder="Email"
            style={{...styles.input, color: isDarkMode ? '#ddd' : '#333', backgroundColor: isDarkMode ? '#555' : '#fff'}}
          />
          <textarea
            placeholder="Message"
            style={{...styles.textarea, color: isDarkMode ? '#ddd' : '#333', backgroundColor: isDarkMode ? '#555' : '#fff'}}
          ></textarea>
          <button type="submit" style={styles.button}>Envoyer</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
  },
  contactContainer: {
    maxWidth: '500px',
    width: '100%',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
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
  textarea: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '150px',
    resize: 'vertical',
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
};

export default Contact;