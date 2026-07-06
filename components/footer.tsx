const Footer = () => {
  return (
    <footer className="relative z-10 bg-white/40 dark:bg-sg-dark-base/40 border-t border-white/70 dark:border-white/10 px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center backdrop-blur-sm">
      <p className="font-display text-sg-xs text-sg-gray-600 dark:text-sg-gray-500 tracking-wide">
        &copy; {new Date().getFullYear()} sugitlab. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
