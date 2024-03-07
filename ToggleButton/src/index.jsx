import React, { useState, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';

const languages = ['JavaScript', 'Python'];

// Create a context for the favorite programming language
const FavoriteLanguageContext = createContext();

function App() {
  const [favoriteLanguageIndex, setFavoriteLanguageIndex] = useState(0);

  const toggleFavoriteLanguage = () => {
    setFavoriteLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  return (
    <FavoriteLanguageContext.Provider value={{ favoriteLanguageIndex, toggleFavoriteLanguage }}>
      <MainSection />
    </FavoriteLanguageContext.Provider>
  );
}

function MainSection() {
  return (
    <div>
      <FavoriteLanguage />
      <button onClick={useContext(FavoriteLanguageContext).toggleFavoriteLanguage}>
        Toggle Language
      </button>
    </div>
  );
}

function FavoriteLanguage() {
  const { favoriteLanguageIndex } = useContext(FavoriteLanguageContext);
  return <p id="favoriteLanguage">Favorite programming language: {languages[favoriteLanguageIndex]}</p>;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
