import React from 'react';
import { Menu, Wallet, LogOut, Globe2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppKit } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect } from '@reown/appkit/react';

export function Dock() {
  const { isVisible } = useScroll();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  
  const navItems = [
    { label: 'PublishContent', path: '/mint' },
    { label: 'Posts', path: '/marketplace' },
  ];

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getButtonText = () => {
    if (status === 'connecting') return 'Connecting...';
    if (isConnected && address) return truncateAddress(address);
    return 'Connect Wallet';
  };

  const handleWalletClick = async () => {
    if (!isConnected) {
      await open();
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <Globe2 className="h-6 w-6 text-brand-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold group-hover:text-brand-500 transition-colors">PolyGlot</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1 px-16">
            <div className="flex items-center justify-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'text-brand-500' 
                      : 'text-surface-700 hover:text-surface-900'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-500"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section with wallet */}
          <div className="flex items-center">
            {/* Wallet Button with Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => isConnected && setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWalletClick}
                disabled={status === 'connecting'}
                className={`connect-button flex items-center space-x-2 group ${
                  isConnected ? 'bg-brand-600 hover:bg-brand-700' : ''
                }`}
              >
                <Wallet className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  status === 'connecting' ? 'animate-spin' : ''
                }`} />
                <span>{getButtonText()}</span>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && isConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-1 w-40 rounded-xl bg-surface-100 shadow-lg ring-1 ring-surface-300/50 backdrop-blur-xl overflow-hidden"
                  >
                    <button
                      onClick={handleDisconnect}
                      className="w-full px-3 py-2 text-left text-surface-700 hover:text-surface-900 hover:bg-surface-200/50 transition-colors flex items-center space-x-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Disconnect</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-4 p-2 rounded-lg hover:bg-surface-200/50 transition-colors"
            >
              <Menu className="w-6 h-6 text-surface-700" />
            </motion.button>
          </div>
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
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'text-brand-500 bg-brand-500/10'
                          : 'text-surface-700 hover:text-surface-900 hover:bg-surface-200/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Wallet Button */}
                {isConnected ? (
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    onClick={handleDisconnect}
                    className="w-full px-4 py-2 text-left text-surface-700 hover:text-surface-900 hover:bg-surface-200/50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    onClick={handleWalletClick}
                    disabled={status === 'connecting'}
                    className="connect-button w-full mt-4 py-3 flex items-center justify-center space-x-2"
                  >
                    <Wallet className={`w-4 h-4 ${
                      status === 'connecting' ? 'animate-spin' : ''
                    }`} />
                    <span>{getButtonText()}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}