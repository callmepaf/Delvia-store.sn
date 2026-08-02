import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFloatButton from './WhatsAppFloatButton'

export default function Layout() {
  return (
    <div className="bg-white font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  )
}
