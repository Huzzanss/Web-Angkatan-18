# ARCHITECTURE - Website Angkatan 18

## System Overview

Website Angkatan 18 is a full-stack web application built with modern web technologies. It serves as a digital directory and management system for batch 2026-2029 of SMP Islam Bunga Bangsa Samarinda.

---

## Architecture Layers

### 1. Frontend Layer
**Location:** `/` (root), `/page/`, `/src/`, `/public/`

**Components:**
- **HTML Pages** (`/page/`)
  - `students/index.html` - Student directory with search/filter
  - `gallery/index.html` - Photo gallery
  - `announcements/index.html` - Announcements feed
  - `admin/index.html` - Admin login & dashboard
  - `index.html` (root) - Landing page

- **Styles** (`/public/css/`)
  - `styles.css` - Main stylesheet
  - `admin-styles.css` - Admin panel styles

- **Scripts** (`/public/js/`)
  - `script.js` - Main application logic
  - `admin.js` - Admin panel functionality
  - `config.js` - Student data & configuration
  - `app.js` (root) - Frontend initialization

- **Components** (`/src/components/`)
  - Reusable UI components (navbar, footer, cards)

- **Utilities** (`/src/utils/`)
  - API client functions
  - Helper functions

**Technology Stack:**
- HTML5
- CSS3 (with Tailwind CSS CDN)
- Vanilla JavaScript (ES6+)
- Google Material Symbols

### 2. Backend Layer
**Location:** `/server/`

**Components:**
- **Server** (`server.js`)
  - Express.js HTTP server
  - Port: 5000
  - Graceful shutdown handling

- **Application** (`app.js`)
  - Express app configuration
  - Middleware setup
  - Route registration

- **Routes** (`/server/routes/`)
  - `students.js` - Student endpoints
  - `admin.js` - Admin endpoints
  - `gallery.js` - Gallery endpoints
  - `announcements.js` - Announcements endpoints

- **Middleware** (`/server/middleware/`)
  - `auth.js` - Authentication validation
  - `error.js` - Global error handling

- **Configuration** (`/server/config/`)
  - `database.js` - Database initialization

**Technology Stack:**
- Node.js
- Express.js
- CORS
- Body Parser
- Dotenv (environment variables)
- Firebase Admin (ready for integration)

### 3. Data Layer
**Location:** `/public/data.json`, database (future)

**Current Data Storage:**
- In-memory student data (79 students)
- Sample gallery data
- Sample announcements

**Future:**
- Firebase Firestore
- MongoDB
- PostgreSQL

---

## Data Flow

### Frontend → Backend Flow
```
User Action
   ↓
Frontend Event Handler (script.js)
   ↓
API Call (src/utils/api.js)
   ↓
Fetch Request to Backend
   ↓
Backend Route Handler (server/routes/)
   ↓
Business Logic
   ↓
JSON Response
   ↓
Frontend Data Processing
   ↓
UI Update (src/components/)
   ↓
User sees Result
```

### Example: Get Students
```
1. User loads /page/students/
2. script.js runs initializeGrid()
3. Fetches data from config.js (STUDENTS_DATA)
4. Calls renderStudents()
5. Creates student cards with createStudentCard()
6. Displays all 79 students
7. User can filter/search
```

---

## File Organization

```
Website-Angkatan-18/
├── Frontend (User-facing)
│   ├── index.html - Landing page
│   ├── page/ - Feature pages
│   ├── public/ - Static assets
│   └── src/ - Reusable components
│
├── Backend (Server-side)
│   ├── server/ - Express API
│   ├── app.js - Frontend init
│   └── package.json - Dependencies
│
├── Configuration
│   ├── .env - Environment variables
│   └── package.json - Project metadata
│
└── Documentation
    ├── docs/ - API & Architecture docs
    ├── README.md - Project overview
    └── Other markdown files
```

---

## API Architecture

### RESTful Design
- **Students**: CRUD operations on student records
- **Admin**: Authentication, password management
- **Gallery**: CRUD operations on media
- **Announcements**: CRUD operations on announcements

### Response Format
All API responses follow a consistent JSON structure:
```json
{
  "status": "success|error",
  "data": { /* response data */ },
  "message": "Human readable message",
  "timestamp": "ISO 8601 timestamp"
}
```

### CORS Configuration
- Allows requests from localhost:3000, localhost:8000
- Credentials support enabled
- Preflight requests handled

---

## Authentication & Security (Future)

### Current (v2.0)
- Simple token-based auth
- Default credentials in .env

### Future (v3.0)
- JWT (JSON Web Tokens)
- Password hashing (bcrypt)
- Session management
- HTTPS enforcement
- Rate limiting
- Input validation

---

## Scalability Considerations

### Horizontal Scaling
- Backend: Can be deployed to multiple servers
- Frontend: CDN-ready for static assets
- Database: Ready for cloud platforms (Firebase, MongoDB Atlas)

### Vertical Scaling
- Code modularization enables feature growth
- Component-based frontend supports new pages
- Route-based backend supports new endpoints

### Performance
- Current: No database queries (in-memory)
- Future: Implement caching, database indexing
- Optimizations: Code splitting, lazy loading

---

## Deployment Architecture

### Development
```
Local Machine
├── Frontend: python -m http.server 8000
└── Backend: npm start (port 5000)
```

### Staging
```
Cloud Server
├── Frontend: GitHub Pages / Vercel
└── Backend: Vercel / Heroku
```

### Production
```
Cloud Infrastructure
├── Frontend: CDN (Cloudflare, AWS CloudFront)
├── Backend: Load Balancer → App Servers
├── Database: Cloud Database (Firebase, MongoDB Atlas)
└── Cache: Redis
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5, CSS3, JS ES6+ | User interface |
| Styling | Tailwind CSS | Responsive design |
| UI Symbols | Google Material | Icons & symbols |
| Backend | Node.js, Express | Server runtime & framework |
| Middleware | CORS, Body Parser | Request processing |
| Config | Dotenv | Environment management |
| Database | In-memory (future: Firebase/MongoDB) | Data persistence |
| Version Control | Git, GitHub | Code management |
| Deployment | Vercel, GitHub Pages | Production hosting |

---

## Code Quality Standards

- **Semantic HTML5**: Proper markup structure
- **Valid CSS**: W3C compliant stylesheets
- **Clean JavaScript**: ES6+ with proper formatting
- **JSDoc Comments**: Function documentation
- **DRY Principle**: Avoid code repetition
- **Component-Based**: Reusable, modular code
- **Error Handling**: Comprehensive error management
- **Security First**: Input validation, XSS prevention

---

## Future Enhancements

### Phase 3 (Now)
- Database integration
- JWT authentication
- Image upload functionality
- API testing

### Phase 4 (Next)
- Real-time notifications
- User profiles
- Direct messaging
- Analytics dashboard

### Phase 5 (Later)
- Mobile app (React Native)
- Progressive Web App (PWA)
- Microservices architecture
- Kubernetes deployment

---

## Conclusion

Website Angkatan 18 is built with scalability, maintainability, and professional standards in mind. The separation of frontend, backend, and data layers allows for independent scaling and feature development. The modular code structure makes it easy to onboard new developers and add new features.
