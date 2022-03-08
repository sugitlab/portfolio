import Navbar from './navbar'
import Footer from './footer'
import Profile from '../components/profile_card'

export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="flex flex-col px-2 md:flex-row">
        <div className="container w-4/5 md:w-3/5 mx-auto">{props.children}</div>
        <div className="h-10" />
        <Profile />
      </div>
      <Footer />
    </div>
  )
}
