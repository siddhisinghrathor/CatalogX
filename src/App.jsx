import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing Page (No Layout) */}
        <Route path="/" element={<Landing />} />
        
        {/* App Pages (With Layout) */}
        <Route path="/home" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/product/:id" element={
          <Layout>
            <ProductDetail />
          </Layout>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
