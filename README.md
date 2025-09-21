LinkedIn Profile Enhancer
A full-stack application that helps users optimize their LinkedIn profiles using AI-powered suggestions and professional enhancements.

🚀 Features
AI Profile Analysis: Get instant feedback on your LinkedIn profile
Interactive Dashboard: Visual before/after comparisons
Resume Integration: Upload and analyze resumes
Profile Scoring: Numerical ratings with section-by-section feedback
Export Options: Easy copy/download of enhanced content
Responsive Design: Seamless experience across all devices

🛠️ Tech Stack
Frontend:

React 18 with TypeScript
Vite for build tooling
TailwindCSS for styling
React Router for navigation
Backend:

Node.js with Express
MySQL database
JWT authentication
bcrypt for password hashing

📦 Installation

1.Clone the repository:
git clone https://github.com/Varun18K/ProfileBooster.git
cd ProfileBooster

2.Setup Backend:
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev

3.Setup Frontend:
cd frontend
npm install
npm run dev

🌐 Environment Variables
Create .env files in both frontend and backend directories:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=profile_booster
JWT_SECRET=your_secret

📁 Project Structure

ProfileBooster/
├── backend/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   └── routes/           # API routes
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Helper functions
│   └── public/          # Static assets
└── README.md

🔧 Scripts
Backend:
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Run production server

Frontend:
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run lint   # Run ESLint

🧪 Testing
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

🚀 Deployment
1.Build both frontend and backend
2.Configure environment variables
3.Set up database
4.Deploy to your preferred hosting service

📝 License
MIT License - see LICENSE for details

👥 Contributing
1.Fork the repository
2.Create your feature branch (git checkout -b feature/AmazingFeature)
3.Commit changes (git commit -m 'Add: AmazingFeature')
4.Push to branch (git push origin feature/AmazingFeature)
5.Open a Pull Request


📸 Screenshots

📫 Contact 

email: karlevarun18@gmail.com
Project Link: https://github.com/Varun18K/ProfileBooster

