import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Solution from './pages/Solution';
import Dashboard from './pages/Dashboard';
import Demo from './pages/Demo';
import Technology from './pages/Technology';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="solution" element={<Solution />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="demo" element={<Demo />} />
        <Route path="technology" element={<Technology />} />
      </Route>
    </Routes>
  );
}

export default App;
