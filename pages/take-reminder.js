import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function TakeReminder() {
  const [medications, setMedications] = useState([])
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    frequency: 'once',
    times: [''],
    issueDate: '',
    dueDate: '',
    instructions: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('takeReminders')
    if (saved) {
      setMedications(JSON.parse(saved))
    }
  }, [])

  const saveToStorage = (newMedications) => {
    localStorage.setItem('takeReminders', JSON.stringify(newMedications))
  }

  const handleFrequencyChange = (freq) => {
    const timeSlots = {
      'once': [''],
      'twice': ['', ''],
      'thrice': ['', '', ''],
      'four': ['', '', '', '']
    }
    setFormData({
      ...formData,
      frequency: freq,
      times: timeSlots[freq]
    })
  }

  const handleTimeChange = (index, time) => {
    const newTimes = [...formData.times]
    newTimes[index] = time
    setFormData({...formData, times: newTimes})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newMedication = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'active',
      completedDoses: 0,
      totalDoses: calculateTotalDoses()
    }

    const updatedMedications = [...medications, newMedication]
    setMedications(updatedMedications)
    saveToStorage(updatedMedications)

    // Send to backend for scheduling
    try {
      await fetch('/api/schedule-medication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedication)
      })
      alert('Medication schedule created successfully!')
    } catch (error) {
      alert('Schedule saved locally. Notification service unavailable.')
    }

    setFormData({
      medicineName: '',
      quantity: '',
      frequency: 'once',
      times: [''],
      issueDate: '',
      dueDate: '',
      instructions: ''
    })
  }

  const calculateTotalDoses = () => {
    const start = new Date(formData.issueDate)
    const end = new Date(formData.dueDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    const dailyDoses = formData.times.length
    return days * dailyDoses
  }

  const markDoseTaken = (medId) => {
    const updatedMedications = medications.map(med => {
      if (med.id === medId) {
        return {
          ...med,
          completedDoses: med.completedDoses + 1,
          lastTaken: new Date().toISOString()
        }
      }
      return med
    })
    setMedications(updatedMedications)
    saveToStorage(updatedMedications)
  }

  const deleteMedication = (id) => {
    const updatedMedications = medications.filter(m => m.id !== id)
    setMedications(updatedMedications)
    saveToStorage(updatedMedications)
  }

  const getProgressPercentage = (med) => {
    return Math.min((med.completedDoses / med.totalDoses) * 100, 100)
  }

  const isOverdue = (med) => {
    return new Date() > new Date(med.dueDate)
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            <i className="fas fa-bell me-3 text-success"></i>
            Medicine Take Reminders
          </h1>
          <p className="text-muted">Stay on track with your medication schedule</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card reminder-card shadow-sm">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">
                  <i className="fas fa-plus me-2"></i>
                  Add New Medication
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

                  <div className="mb-3">
                    <label className="form-label">Quantity per dose</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      required
                      placeholder="e.g., 1 tablet, 5ml, 2 capsules"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Frequency</label>
                    <select
                      className="form-select"
                      value={formData.frequency}
                      onChange={(e) => handleFrequencyChange(e.target.value)}
                    >
                      <option value="once">Once daily</option>
                      <option value="twice">Twice daily</option>
                      <option value="thrice">Three times daily</option>
                      <option value="four">Four times daily</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Times</label>
                    {formData.times.map((time, index) => (
                      <input
                        key={index}
                        type="time"
                        className="form-control mb-2"
                        value={time}
                        onChange={(e) => handleTimeChange(index, e.target.value)}
                        required
                      />
                    ))}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Issue Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        min={formData.issueDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Instructions (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.instructions}
                      onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                      placeholder="e.g., Take with food, Before meals, etc."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    <i className="fas fa-plus me-2"></i>
                    Add to Schedule
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-pills me-2"></i>
                  Current Medications ({medications.length})
                </h4>
              </div>
              <div className="card-body">
                {medications.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-prescription-bottle fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No medications scheduled yet</p>
                  </div>
                ) : (
                  <div className="medication-list">
                    {medications.map(med => (
                      <div key={med.id} className={`card mb-3 border-start border-3 ${isOverdue(med) ? 'border-danger' : 'border-success'}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="fw-bold text-primary">
                                <i className="fas fa-pills me-2"></i>
                                {med.medicineName}
                              </h6>
                              <p className="mb-1">
                                <i className="fas fa-prescription me-2 text-info"></i>
                                {med.quantity} - {med.frequency} daily
                              </p>
                              <p className="mb-1">
                                <i className="fas fa-clock me-2 text-warning"></i>
                                Times: {med.times.join(', ')}
                              </p>
                              <p className="mb-1">
                                <i className="fas fa-calendar me-2 text-success"></i>
                                {med.issueDate} to {med.dueDate}
                              </p>
                              {med.instructions && (
                                <p className="mb-0 text-muted small">
                                  <i className="fas fa-info-circle me-2"></i>
                                  {med.instructions}
                                </p>
                              )}
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteMedication(med.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                          
                          <div className="progress mb-2" style={{ height: '8px' }}>
                            <div
                              className={`progress-bar ${isOverdue(med) ? 'bg-danger' : 'bg-success'}`}
                              style={{ width: `${getProgressPercentage(med)}%` }}
                            ></div>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              {med.completedDoses}/{med.totalDoses} doses completed
                            </small>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => markDoseTaken(med.id)}
                              disabled={med.completedDoses >= med.totalDoses}
                            >
                              <i className="fas fa-check me-1"></i>
                              Mark Taken
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
              <h5><i className="fas fa-lightbulb me-2"></i>Tips for medication adherence:</h5>
              <ul className="mb-0">
                <li>Set consistent times for taking your medications</li>
                <li>Use the "Mark Taken" button to track your progress</li>
                <li>Keep medications in a visible place as a reminder</li>
                <li>Set phone alarms for additional reminders</li>
                <li>Never skip doses without consulting your doctor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}