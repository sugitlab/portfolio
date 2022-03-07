import Navbar from "./navbar";
import Footer from "./footer";

export type BlogLayoutProps = {
  children: React.ReactNode;
};

export default function BlogLayout(props: BlogLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="flex flex-col px-2 md:flex-row">
        <div className="container w-4/5 md:w-3/5 mx-auto">{props.children}</div>
        <div className="h-10" />
      </div>
      <Footer />
    </div>
  );
}
