import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Flights', href: '/search/flights' },
    { name: 'Hotels', href: '/search/hotels' },
    { name: 'Holidays', href: '/destinations' },
    { name: 'Cabs', href: '/cabs' },
    { name: 'Buses', href: '/bus-ticket' },
    { name: 'Trains', href: '/travel' },
    { name: 'Insurance', href: '/insurance' },
  ];

  const moreNav = [
    { name: 'Itinerary', href: '/itinerary' },
    { name: 'Weather', href: '/weather' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'For Business', href: '/business-travel' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e7e7e7] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-[60px]">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-mmt-500 flex items-center justify-center text-white font-bold text-sm">
              TB
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
              Travel<span className="text-mmt-500">Book</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-2.5 py-2 rounded-md text-[13px] font-semibold transition-colors',
                    isActive
                      ? 'text-mmt-500 bg-mmt-50'
                      : 'text-gray-700 hover:text-mmt-500 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/profile">
              <Button
                variant="ghost"
                className="text-gray-800 font-semibold text-sm hover:text-mmt-500 hover:bg-mmt-50"
              >
                My Trips
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-800 font-semibold text-sm hover:text-mmt-500 hover:bg-mmt-50"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-mmt-500 hover:bg-mmt-600 text-white border-0 font-semibold text-sm px-5 shadow-none">
                Create Account
              </Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100"
            aria-expanded={isMenuOpen}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#e7e7e7] bg-white max-h-[min(70vh,calc(100dvh-56px))] overflow-y-auto shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {[...navigation, ...moreNav].map((item) => (
              <Link
                key={`${item.href}-${item.name}`}
                to={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm font-semibold',
                  location.pathname === item.href
                    ? 'bg-mmt-50 text-mmt-500'
                    : 'text-gray-800 hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start font-semibold">
                My Trips
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-mmt-500 hover:bg-mmt-600 text-white border-0 font-semibold">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SimpleHeader;
