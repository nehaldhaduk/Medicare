# MedCare - Medication Management System

A comprehensive fullstack web application for managing medications with smart reminders and medicine information lookup.

## 🚀 Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React.js** - UI library
- **Bootstrap 5** - CSS framework
- **HTML5 & CSS3** - Markup and styling
- **JavaScript (ES6+)** - Programming language

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Twilio API** - SMS notifications
- **RxNorm API** - Medicine information
- **OpenFDA API** - Drug information

## 📋 Features

### 1. **Medicine Information Search**
- Search from 10 pre-loaded medicines
- Detailed information including dosage, side effects, warnings
- Real-time search suggestions
- Medicine categories and generic names

### 2. **Medicine Refill Reminders**
- Set custom refill dates and times
- SMS notifications via Twilio
- Manage multiple refill reminders
- Add notes for pharmacy information

### 3. **Medicine Take Reminders**
- Schedule medication times (1-4 times daily)
- Track medication adherence
- Progress monitoring
- Issue and due date management

### 4. **User Authentication**
- Secure login and registration
- User profile management
- Session management

### 5. **Responsive Design**
- Mobile-first approach
- Bootstrap responsive grid
- Cross-device compatibility

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Twilio account (for SMS features)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Medication
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
```

### 3. Environment Configuration
```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your credentials:
```env
PORT=5000
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend (in new terminal)
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Pages Overview

### 1. **Home Page** (`/`)
- Hero section with medical imagery
- Feature highlights
- Statistics and benefits
- Call-to-action buttons

### 2. **Medicine Information** (`/medicine-info`)
- Search bar with autocomplete
- Medicine database with 10 medicines:
  - Paracetamol, Ibuprofen, Amoxicillin
  - Cetirizine, Aspirin, Omeprazole
  - ORS, Metformin, Salbutamol, Vitamin D
- Detailed medicine cards with complete information

### 3. **Refill Reminder** (`/refill-reminder`)
- Add new refill reminders
- Set date, time, and phone number
- View active reminders
- SMS notification scheduling

### 4. **Take Reminder** (`/take-reminder`)
- Add medication schedules
- Multiple daily frequencies
- Progress tracking
- Medication adherence monitoring

### 5. **Authentication** (`/auth`)
- Login and registration forms
- Form validation
- User session management
- Responsive design

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Medicine Information
- `GET /api/medicine/:name` - Get medicine details

### Reminders
- `POST /api/schedule-refill` - Schedule refill reminder
- `GET /api/refill-reminders` - Get all refill reminders
- `POST /api/schedule-medication` - Schedule medication
- `GET /api/medication-schedules` - Get medication schedules

## 🎨 Design Features

### Medical Theme
- Stethoscope and medical icons
- Healthcare color scheme (blues, greens)
- Professional typography
- Medical imagery and illustrations

### User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Progress indicators
- Status badges and alerts
- Smooth animations and transitions

## 📦 Project Structure

```
Medication/
├── pages/                 # Next.js pages
│   ├── index.js          # Home page
│   ├── medicine-info.js  # Medicine search
│   ├── refill-reminder.js # Refill reminders
│   ├── take-reminder.js  # Take reminders
│   ├── auth.js           # Authentication
│   └── _app.js           # App component
├── components/           # React components
│   └── Layout.js         # Main layout
├── styles/              # CSS styles
│   └── globals.css      # Global styles
├── backend/             # Express backend
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment template
├── package.json         # Frontend dependencies
├── next.config.js       # Next.js configuration
└── README.md           # Documentation
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
npm run start
```

### Backend (Heroku/Railway)
```bash
cd backend
npm start
```

## 🔐 Security Features

- Input validation and sanitization
- Environment variable protection
- CORS configuration
- Error handling middleware
- Secure authentication flow

## 📞 Support

For support and questions:
- Email: support@medcare.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License.

---

**MedCare** - Your Health, Our Priority 💊