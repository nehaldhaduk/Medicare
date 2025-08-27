import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-primary mb-4">
                <i className="fas fa-stethoscope me-3"></i>
                Your Health, Our Priority
              </h1>
              <p className="lead mb-4">
                Comprehensive medication management system with smart reminders, 
                medicine information, and refill alerts to keep you healthy.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/medicine-info" className="btn btn-primary btn-lg">
                  <i className="fas fa-search me-2"></i>Search Medicine
                </Link>
                <Link href="/take-reminder" className="btn btn-outline-primary btn-lg">
                  <i className="fas fa-bell me-2"></i>Set Reminder
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <i className="fas fa-pills text-primary" style={{ fontSize: '15rem', opacity: 0.1 }}></i>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <i className="fas fa-heartbeat text-primary" style={{ fontSize: '8rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Features</h2>
            <p className="text-muted">Everything you need to manage your medications effectively</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h5>Medicine Information</h5>
                <p className="text-muted">Search and get detailed information about medicines including dosage, side effects, and usage instructions.</p>
                <Link href="/medicine-info" className="btn btn-primary mt-auto">
                  Explore Now
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h5>Refill Reminders</h5>
                <p className="text-muted">Never run out of medicines again. Set smart refill reminders with SMS notifications.</p>
                <Link href="/refill-reminder" className="btn btn-primary mt-auto">
                  Set Reminder
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="feature-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <h5>Take Reminders</h5>
                <p className="text-muted">Stay on track with your medication schedule. Get timely reminders to take your medicines.</p>
                <Link href="/take-reminder" className="btn btn-primary mt-auto">
                  Manage Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-pills fa-3x text-primary"></i>
              </div>
              <h3 className="fw-bold">10+</h3>
              <p className="text-muted">Medicines Database</p>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-users fa-3x text-success"></i>
              </div>
              <h3 className="fw-bold">1000+</h3>
              <p className="text-muted">Active Users</p>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-bell fa-3x text-warning"></i>
              </div>
              <h3 className="fw-bold">5000+</h3>
              <p className="text-muted">Reminders Set</p>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-shield-alt fa-3x text-info"></i>
              </div>
              <h3 className="fw-bold">100%</h3>
              <p className="text-muted">Secure & Safe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 MedCare. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  )
}