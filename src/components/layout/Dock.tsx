import React from 'react';
import { Book, Users, Settings, Wallet, Menu, Globe2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { motion, AnimatePresence } from 'framer-motion';

export function Dock() {
  const { isVisible } = useScroll();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { icon: <Book />, label: 'Mint', path: '/mint' },
    { icon: <Users />, label: 'Community', path: '/community' },
    { icon: <Settings />, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-surface-100/80 backdrop-blur-xl border-b border-surface-200/50" />

      {/* Main navigation content */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-surface-900 group">
            <Globe2 className="h-6 w-6 text-brand-500" />
            <span className="text-lg font-bold">PolyGlot</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative px-4 py-2 rounded-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-2 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-5 h-5 ${
                      location.pathname === item.path ? 'text-brand-500' : 'text-surface-700'
                    }`}
                  >
                    {item.icon}
                  </motion.div>
                  <span className={`font-medium ${
                    location.pathname === item.path ? 'text-brand-500' : 'text-surface-700'
                  }`}>
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-brand-500/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}

            {/* Connect Wallet button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="connect-button flex items-center space-x-2 group ml-4"
            >
              <Wallet className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Connect Wallet</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-200/50 transition-colors"
          >
            <Menu className="w-6 h-6 text-surface-700" />
          </motion.button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'text-brand-500 bg-brand-500/10'
                          : 'text-surface-700 hover:text-surface-900 hover:bg-surface-200/50'
                      }`}
                    >
                      <div className={`w-5 h-5 ${
                        location.pathname === item.path ? 'text-brand-500' : ''
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Connect Wallet button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="connect-button w-full mt-4 py-3 flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}