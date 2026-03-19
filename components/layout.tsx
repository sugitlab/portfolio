import Navbar from './navbar'
import Footer from './footer'
import Profile from '../components/profile_card'

export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-sg-base dark:bg-sg-dark-base">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
        <p className="font-accent text-sg-4xl text-sg-blue-400 dark:text-sg-blue-300 mb-6">
          Making products that last.
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
