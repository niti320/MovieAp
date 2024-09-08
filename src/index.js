import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the use of `react-dom/client` for React 18+
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';


import SearchResult from './components/SearchResult';
import FavoriteMovies from './components/FavoriteMovies'; 
import TopRatedMovies from './components/TopRatedMovies';
import './App.css'; 

const AnimatedRoutes = () => {
  
AOS.init({
  duration: 1000, 
  once: true,     
});
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/top-rated" element={<TopRatedMovies />} />
          <Route path="/favorites" element={<FavoriteMovies />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AnimatedRoutes />
  </Router>
);
