// Medicare Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Login successful! Welcome back.');
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }

    // Handle Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const passwords = this.querySelectorAll('input[type="password"]');
            
            // Validate password match
            if (passwords[0].value !== passwords[1].value) {
                alert('Passwords do not match!');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Account created successfully! Please check your email for verification.');
                bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        });
    }

    // Handle Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully! We will get back to you soon.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// React Component for Doctors Section
const { useState, useEffect } = React;

function DoctorsSection() {
    const [doctors] = useState([
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            experience: "15 years",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "General Physician",
            experience: "12 years",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Dr. Emily Davis",
            specialty: "Pediatrician",
            experience: "10 years",
            image: "https://images.unsplash.com/photo-1594824475317-8b7b0c8b8b8b?w=300&h=300&fit=crop&crop=face"
        }
    ]);

    return React.createElement('div', { className: 'row g-4' },
        doctors.map(doctor =>
            React.createElement('div', { key: doctor.id, className: 'col-md-4' },
                React.createElement('div', { className: 'card h-100 border-0 shadow-sm' },
                    React.createElement('img', {
                        src: doctor.image,
                        className: 'card-img-top',
                        alt: doctor.name,
                        style: { height: '250px', objectFit: 'cover' }
                    }),
                    React.createElement('div', { className: 'card-body text-center' },
                        React.createElement('h5', { className: 'card-title' }, doctor.name),
                        React.createElement('p', { className: 'text-primary fw-bold' }, doctor.specialty),
                        React.createElement('p', { className: 'text-muted' }, `${doctor.experience} experience`),
                        React.createElement('button', {
                            className: 'btn btn-outline-primary',
                            onClick: () => alert(`Booking appointment with ${doctor.name}`)
                        }, 'Book Appointment')
                    )
                )
            )
        )
    );
}

// Render React component when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const doctorsContainer = document.getElementById('doctors-list');
    if (doctorsContainer) {
        ReactDOM.render(React.createElement(DoctorsSection), doctorsContainer);
    }
});