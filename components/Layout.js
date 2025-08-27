import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-primary">
            <i className="fas fa-pills me-2"></i>MedCare
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/medicine-info" className="nav-link">Medicine Info</Link>
              </li>
              <li className="nav-item">
                <Link href="/refill-reminder" className="nav-link">Refill Reminder</Link>
              </li>
              <li className="nav-item">
                <Link href="/take-reminder" className="nav-link">Take Reminder</Link>
              </li>
            </ul>
            <div className="d-flex gap-2">
              {!isLoggedIn ? (
                <>
                  <Link href="/auth" className="btn btn-outline-primary">Login</Link>
                  <Link href="/auth" className="btn btn-primary">Sign Up</Link>
                </>
              ) : (
                <button className="btn btn-outline-danger" onClick={() => setIsLoggedIn(false)}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main style={{ paddingTop: '76px' }}>
        {children}
      </main>
    </>
  )
}