import Navbar from './navbar'
import Footer from './footer'
import Profile from '../components/profile_card'

export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-16 md:pb-20">
        <p className="font-accent text-sg-2xl text-sg-green-500 dark:text-sg-green-300 pt-8 pb-10 tracking-wide">
          Making product that last.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">{props.children}</div>
          <Profile />
        </div>
      </main>
      <Footer />
    </div>
  )
}
