const Footer = () => {
  return (
    <footer className="bg-sg-gray-100 dark:bg-sg-gray-950 border-t border-sg-gray-200 dark:border-sg-dark-muted py-6 px-6 text-center">
      <p className="font-display text-sg-xs text-sg-gray-600 dark:text-sg-gray-500 tracking-wide">
        &copy; {new Date().getFullYear()} sugitlab. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
