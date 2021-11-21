import Navbar from "./navbar";
import Footer from "./footer";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
