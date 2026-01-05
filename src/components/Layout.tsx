import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import FloatingNav from './FloatingNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:pl-24"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
