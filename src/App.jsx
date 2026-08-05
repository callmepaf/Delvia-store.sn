import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const Admin = lazy(() => import('./pages/Admin'))

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
