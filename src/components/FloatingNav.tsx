import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/' },
  { icon: <User className="w-5 h-5" />, label: 'About', path: '/about' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Works', path: '/works' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Courses', path: '/courses' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Blog', path: '/blog' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Testimonials', path: '/testimonials' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', path: '/contact' },
];

const FloatingNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="glass-card p-2 flex flex-col gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center p-3 mb-2 text-foreground font-display font-bold text-lg border-b border-border/30"
          >
            {isExpanded ? 'Abenime' : 'A'}
          </Link>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="nav-button justify-center mb-2"
            aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn('nav-button', isActive && 'active')}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap overflow-hidden text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right" className="glass-card border-border/30">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 lg:hidden nav-button p-4"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 glass-card rounded-none z-50 lg:hidden p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display font-bold text-xl">Abenime</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300',
                        isActive
                          ? 'bg-foreground/10 text-foreground'
                          : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                      )}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
