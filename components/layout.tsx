import Navbar from "./navbar";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
