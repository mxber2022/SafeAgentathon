import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Dock } from './components/layout/Dock';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { MintPage } from './pages/MintPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ContentPage } from './pages/ContentPage';
import { FlowPage } from './pages/FlowPage';
import { PageTransition } from './components/layout/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        } />
        <Route path="/mint" element={
          <PageTransition>
            <MintPage />
          </PageTransition>
        } />
        <Route path="/marketplace" element={
          <PageTransition>
            <MarketplacePage />
          </PageTransition>
        } />
        <Route path="/collections" element={
          <PageTransition>
            <CollectionsPage />
          </PageTransition>
        } />
        <Route path="/flow" element={
          <PageTransition>
            <FlowPage />
          </PageTransition>
        } />
        <Route path="/api/content/:id" element={
          <PageTransition>
            <ContentPage />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface-50">
        <Dock />
        
        <main className="flex-grow pt-28">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}