// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PokemonDetail from './pages/PokemonDetail';
import Navbar from './components/Navbar';
import Favorites from './pages/Favourites';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default App;
