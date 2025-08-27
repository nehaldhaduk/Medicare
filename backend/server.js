const express = require('express')
const cors = require('cors')
const cron = require('node-cron')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage (replace with database in production)
let users = []
let refillReminders = []
let medicationSchedules = []

// Twilio setup (uncomment when you have credentials)
// const twilio = require('twilio')
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'MedCare API is running!' })
})

// Authentication routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body
  
  // Check if user exists
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    email,
    password, // In production, hash this password
    firstName,
    lastName,
    phone,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  
  res.status(201).json({
    message: 'User created successfully',
    user: { id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }
  })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
  })
})

// Medicine information route (using local database)
app.get('/api/medicine/:name', (req, res) => {
  const medicineName = req.params.name.toLowerCase()
  
  // This would typically query RxNorm API or OpenFDA API
  // For demo, using local data
  const medicineInfo = {
    name: req.params.name,
    description: 'Medicine information from FDA database',
    dosage: 'As prescribed by physician',
    sideEffects: 'Consult healthcare provider',
    warnings: 'Read package insert carefully'
  }
  
  res.json(medicineInfo)
})

// Refill reminder routes
app.post('/api/schedule-refill', (req, res) => {
  const reminder = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  
  refillReminders.push(reminder)
  
  // Schedule SMS (uncomment when Twilio is configured)
  // scheduleRefillSMS(reminder)
  
  res.json({ message: 'Refill reminder scheduled successfully', reminder })
})

app.get('/api/refill-reminders', (req, res) => {
  res.json(refillReminders)
})

// Medication schedule routes
app.post('/api/schedule-medication', (req, res) => {
  const schedule = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  
  medicationSchedules.push(schedule)
  
  // Schedule notifications
  scheduleMedicationReminders(schedule)
  
  res.json({ message: 'Medication schedule created successfully', schedule })
})

app.get('/api/medication-schedules', (req, res) => {
  res.json(medicationSchedules)
})

// Twilio SMS function (uncomment when configured)
/*
const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    })
    console.log('SMS sent:', result.sid)
    return result
  } catch (error) {
    console.error('SMS error:', error)
    throw error
  }
}

const scheduleRefillSMS = (reminder) => {
  const reminderDate = new Date(`${reminder.reminderDate}T${reminder.reminderTime}`)
  const now = new Date()
  
  if (reminderDate > now) {
    const delay = reminderDate.getTime() - now.getTime()
    
    setTimeout(async () => {
      try {
        await sendSMS(
          reminder.phoneNumber,
          `🏥 MedCare Reminder: Time to refill your ${reminder.medicineName}! Don't forget to visit your pharmacy. ${reminder.notes ? 'Note: ' + reminder.notes : ''}`
        )
      } catch (error) {
        console.error('Failed to send refill SMS:', error)
      }
    }, delay)
  }
}
*/

const scheduleMedicationReminders = (schedule) => {
  // This would set up cron jobs for each medication time
  console.log(`Scheduling reminders for ${schedule.medicineName}`)
  
  // Example: Schedule daily reminders
  schedule.times.forEach((time, index) => {
    if (time) {
      const [hours, minutes] = time.split(':')
      
      // Create cron job for each time
      cron.schedule(`${minutes} ${hours} * * *`, () => {
        console.log(`Reminder: Take ${schedule.medicineName} - ${schedule.quantity}`)
        
        // Send SMS reminder (uncomment when Twilio is configured)
        /*
        if (schedule.phoneNumber) {
          sendSMS(
            schedule.phoneNumber,
            `💊 MedCare Reminder: Time to take your ${schedule.medicineName} (${schedule.quantity}). ${schedule.instructions || ''}`
          )
        }
        */
      })
    }
  })
}

// Cron job to check for due refills (runs every hour)
cron.schedule('0 * * * *', () => {
  const now = new Date()
  
  refillReminders.forEach(reminder => {
    const reminderTime = new Date(`${reminder.reminderDate}T${reminder.reminderTime}`)
    
    if (now >= reminderTime && !reminder.sent) {
      console.log(`Sending refill reminder for ${reminder.medicineName}`)
      
      // Mark as sent
      reminder.sent = true
      
      // Send SMS (uncomment when Twilio is configured)
      /*
      sendSMS(
        reminder.phoneNumber,
        `🏥 MedCare: Time to refill ${reminder.medicineName}! ${reminder.notes || ''}`
      )
      */
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 MedCare API server running on port ${PORT}`)
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`)
})