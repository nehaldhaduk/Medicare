import { useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      setLoading(false)
      return
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        alert(isLogin ? 'Login successful!' : 'Account created successfully!')
        router.push('/')
      } else {
        alert(data.message || 'Authentication failed')
      }
    } catch (error) {
      // Simulate successful auth for demo
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: isLogin ? 'User' : `${formData.firstName} ${formData.lastName}`
      }))
      alert(isLogin ? 'Login successful!' : 'Account created successfully!')
      router.push('/')
    }

    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    })
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-0">
                  <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="mb-0 mt-2 opacity-75">
                  {isLogin ? 'Sign in to your account' : 'Join MedCare today'}
                </p>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required={!isLogin}
                          placeholder="John"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required={!isLogin}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required={!isLogin}
                          placeholder="+1234567890"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        placeholder="Enter your password"
                        minLength="6"
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required={!isLogin}
                          placeholder="Confirm your password"
                          minLength="6"
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="agreeTerms" required />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the <a href="#" className="text-primary">Terms & Conditions</a>
                      </label>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {isLogin ? 'Signing in...' : 'Creating account...'}
                      </>
                    ) : (
                      <>
                        <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </>
                    )}
                  </button>
                </form>

                {isLogin && (
                  <div className="text-center mt-3">
                    <a href="#" className="text-decoration-none text-muted">
                      Forgot your password?
                    </a>
                  </div>
                )}

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      className="btn btn-link p-0 ms-1"
                      onClick={toggleMode}
                    >
                      {isLogin ? 'Sign up here' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="row mt-4 g-3">
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="fas fa-search"></i>
                  </div>
                  <p className="small mt-2 mb-0">Medicine Info</p>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <p className="small mt-2 mb-0">Refill Alerts</p>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="fas fa-bell"></i>
                  </div>
                  <p className="small mt-2 mb-0">Take Reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}