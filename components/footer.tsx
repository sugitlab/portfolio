const Footer = () => {
  return (
    <footer className="bg-sg-gray-950 border-t border-sg-dark-muted py-6 px-6 text-center">
      <p className="font-display text-sg-xs text-sg-gray-500 tracking-wide">
        &copy; {new Date().getFullYear()} sugitlab. All rights reserved.
      </p>
      <p className="font-accent text-sm text-sg-lime-50/60 mt-1">
        the sky is not the limit — it&apos;s just the beginning.
      </p>
    </footer>
  );
};

export default Footer;
