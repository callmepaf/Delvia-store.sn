import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloatButton from './WhatsAppFloatButton'
import CartModal from './CartModal'

export default function Layout() {
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloatButton />
      <CartModal />
    </div>
  )
}
