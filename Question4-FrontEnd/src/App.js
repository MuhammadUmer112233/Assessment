import React, { useContext } from 'react';
import Home from './Home';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import User from './User';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:userId' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
