import React from 'react';
import { useTheme } from './ThemeContext';

function News() {
  const { isDarkMode } = useTheme();

  const sections = [
    { title: 'Actualités générales', content: 'Contenu à venir...' },
    { title: 'Technologie', content: 'Contenu à venir...' },
    { title: 'Science', content: 'Contenu à venir...' },
    { title: 'Économie', content: 'Contenu à venir...' },
  ];

  return (
    <div style={{...styles.container, backgroundColor: isDarkMode ? '#333' : '#f0f2f5'}}>
      <div style={{...styles.newsContainer, backgroundColor: isDarkMode ? '#444' : 'white'}}>
        <h1 style={{...styles.title, color: isDarkMode ? '#fff' : '#333'}}>Actualités</h1>
        {sections.map((section, index) => (
          <div key={index} style={styles.section}>
            <h2 style={{...styles.sectionTitle, color: isDarkMode ? '#ddd' : '#444'}}>{section.title}</h2>
            <p style={{...styles.sectionContent, color: isDarkMode ? '#bbb' : '#666'}}>{section.content}</p>
          </div>
        ))}
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
  newsContainer: {
    maxWidth: '800px',
    width: '100%',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    marginBottom: '1rem',
  },
  sectionContent: {
    lineHeight: '1.6',
  },
};

export default News;