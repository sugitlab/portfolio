import Navbar from "./navbar";
import Footer from "./footer";

export type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = (props: BlogLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-sg-base dark:bg-sg-dark-base">
      <Navbar noLink />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 py-10">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;
