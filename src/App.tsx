import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import DetailPage from './pages/details-page/DetailPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/characters/" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
