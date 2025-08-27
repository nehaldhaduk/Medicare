import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function RefillReminder() {
  const [reminders, setReminders] = useState([])
  const [formData, setFormData] = useState({
    medicineName: '',
    reminderDate: '',
    reminderTime: '',
    phoneNumber: '',
    notes: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('refillReminders')
    if (saved) {
      setReminders(JSON.parse(saved))
    }
  }, [])

  const saveToStorage = (newReminders) => {
    localStorage.setItem('refillReminders', JSON.stringify(newReminders))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newReminder = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'active'
    }

    const updatedReminders = [...reminders, newReminder]
    setReminders(updatedReminders)
    saveToStorage(updatedReminders)

    // Send to backend for SMS scheduling
    try {
      await fetch('/api/schedule-refill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReminder)
      })
      alert('Refill reminder set successfully! You will receive an SMS notification.')
    } catch (error) {
      alert('Reminder saved locally. SMS service unavailable.')
    }

    setFormData({
      medicineName: '',
      reminderDate: '',
      reminderTime: '',
      phoneNumber: '',
      notes: ''
    })
  }

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter(r => r.id !== id)
    setReminders(updatedReminders)
    saveToStorage(updatedReminders)
  }

  const formatDateTime = (date, time) => {
    return new Date(`${date}T${time}`).toLocaleString()
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            <i className="fas fa-clock me-3 text-warning"></i>
            Medicine Refill Reminders
          </h1>
          <p className="text-muted">Never run out of your important medications</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card refill-card shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h4 className="mb-0">
                  <i className="fas fa-plus me-2"></i>
                  Set New Reminder
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Medicine Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.medicineName}
                      onChange={(e) => setFormData({...formData, medicineName: e.target.value})}
                      required
                      placeholder="e.g., Paracetamol 500mg"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Reminder Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.reminderDate}
                        onChange={(e) => setFormData({...formData, reminderDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Reminder Time</label>
                      <input
                        type="time"
                        className="form-control"
                        value={formData.reminderTime}
                        onChange={(e) => setFormData({...formData, reminderTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number (for SMS)</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      placeholder="+1234567890"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Additional notes about the medicine or pharmacy..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-warning w-100">
                    <i className="fas fa-bell me-2"></i>
                    Set Refill Reminder
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-list me-2"></i>
                  Active Reminders ({reminders.length})
                </h4>
              </div>
              <div className="card-body">
                {reminders.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No refill reminders set yet</p>
                  </div>
                ) : (
                  <div className="reminder-list">
                    {reminders.map(reminder => (
                      <div key={reminder.id} className="card mb-3 border-start border-warning border-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="fw-bold text-primary">
                                <i className="fas fa-pills me-2"></i>
                                {reminder.medicineName}
                              </h6>
                              <p className="mb-1">
                                <i className="fas fa-calendar me-2 text-warning"></i>
                                {formatDateTime(reminder.reminderDate, reminder.reminderTime)}
                              </p>
                              <p className="mb-1">
                                <i className="fas fa-phone me-2 text-success"></i>
                                {reminder.phoneNumber}
                              </p>
                              {reminder.notes && (
                                <p className="mb-0 text-muted small">
                                  <i className="fas fa-sticky-note me-2"></i>
                                  {reminder.notes}
                                </p>
                              )}
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteReminder(reminder.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="alert alert-info">
              <h5><i className="fas fa-info-circle me-2"></i>How it works:</h5>
              <ul className="mb-0">
                <li>Set a reminder date and time when you want to be notified to refill your medicine</li>
                <li>Provide your phone number to receive SMS notifications</li>
                <li>You'll get an SMS reminder at the scheduled time</li>
                <li>Manage all your refill reminders in one place</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}