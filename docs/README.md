# JobPortal - MERN Job Portal Documentation

A modern, full-featured job portal built with Next.js, featuring dark/light themes, beautiful animations, and a complete job search and application system.

## 🚀 Features

### Core Features
- **User Authentication** - Login/Signup for job seekers and employers
- **Job Search & Filtering** - Advanced search with location, type, and keyword filters
- **Job Applications** - Apply to jobs with application tracking
- **Saved Jobs** - Save jobs for later viewing
- **User Dashboard** - Comprehensive dashboard with statistics and activity
- **Job Posting** - Employers can post new job opportunities

### UI/UX Features
- **Dark/Light Theme** - Toggle between themes with system preference detection
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations** - Smooth transitions and hover effects
- **Modern Design** - Clean, professional interface with gradient accents
- **Loading States** - Elegant loading animations and skeleton screens

### Technical Features
- **Next.js App Router** - Modern routing with server components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first styling with custom animations
- **shadcn/ui** - High-quality, accessible UI components
- **Local Storage** - Client-side data persistence
- **API Routes** - RESTful API endpoints for data management

## 📁 Project Structure

\`\`\`
jobportal/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts    # Login API
│   │   │   └── register/route.ts # Registration API
│   │   ├── jobs/route.ts         # Jobs CRUD API
│   │   └── applications/route.ts # Applications API
│   ├── dashboard/                # User dashboard
│   │   ├── page.tsx             # Dashboard main page
│   │   └── loading.tsx          # Loading component
│   ├── jobs/                    # Job listings
│   │   ├── page.tsx             # Jobs listing page
│   │   └── loading.tsx          # Loading component
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Registration page
│   ├── post-job/page.tsx        # Job posting page
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── loading.tsx              # Global loading component
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── theme-provider.tsx       # Theme context provider
│   └── theme-toggle.tsx         # Theme toggle button
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── scripts/                     # Database scripts
│   ├── create-database.sql      # Database schema
│   └── seed-data.sql           # Sample data
├── docs/                        # Documentation
└── public/                      # Static assets
\`\`\`

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **next-themes** - Theme management

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### Database (Planned)
- **PostgreSQL** - Primary database
- **Prisma/Raw SQL** - Database ORM/queries

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/jobportal.git
cd jobportal
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your configuration:
\`\`\`env
# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key

# Database URL (when implementing database)
DATABASE_URL=postgresql://username:password@localhost:5432/jobportal

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "userType": "jobseeker" // or "employer"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "jobseeker"
  }
}
\`\`\`

#### POST /api/auth/login
Authenticate user and get JWT token.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "jobseeker"
  },
  "token": "jwt-token-here"
}
\`\`\`

### Jobs Endpoints

#### GET /api/jobs
Get all jobs with optional filtering.

**Query Parameters:**
- `search` - Search in title, company, or tags
- `location` - Filter by location
- `type` - Filter by job type (full-time, part-time, contract)

**Response:**
\`\`\`json
{
  "jobs": [
    {
      "id": 1,
      "title": "Senior Frontend Developer",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA",
      "type": "Full-time",
      "salary": "$120k - $150k",
      "description": "Job description...",
      "requirements": "Job requirements...",
      "tags": ["React", "TypeScript", "Next.js"],
      "postedDate": "2024-01-15",
      "applicants": 45,
      "isActive": true
    }
  ],
  "total": 1
}
\`\`\`

#### POST /api/jobs
Create a new job posting (employers only).

**Request Body:**
\`\`\`json
{
  "jobTitle": "Senior Frontend Developer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "salaryMin": "120000",
  "salaryMax": "150000",
  "description": "Job description...",
  "requirements": "Job requirements...",
  "skills": "React, TypeScript, Next.js",
  "isRemote": true
}
\`\`\`

### Applications Endpoints

#### GET /api/applications
Get user applications.

**Query Parameters:**
- `userId` - Filter by user ID

#### POST /api/applications
Submit a job application.

**Request Body:**
\`\`\`json
{
  "jobId": 1,
  "userId": 1,
  "jobTitle": "Senior Frontend Developer",
  "company": "TechCorp Inc.",
  "coverLetter": "Cover letter text...",
  "resumeUrl": "/path/to/resume.pdf"
}
\`\`\`

## 🎨 Theme System

The application supports both light and dark themes with automatic system preference detection.

### Theme Provider Setup
\`\`\`tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

### Using Theme Toggle
\`\`\`tsx
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
\`\`\`

## 🎭 Animation System

The project includes a comprehensive animation system with custom CSS classes:

### Animation Classes
- `animate-fade-in-up` - Elements fade in from bottom
- `animate-fade-in-left` - Elements slide in from left
- `animate-fade-in-right` - Elements slide in from right
- `stagger-item` - Sequential animation delays
- `hover-lift` - Cards lift on hover
- `loading-spinner` - Custom loading animation
- `gradient-animation` - Animated background gradients

### Usage Example
\`\`\`tsx
<div className="animate-fade-in-up stagger-item hover-lift">
  <Card>Content</Card>
</div>
\`\`\`

## 🗄️ Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('jobseeker', 'employer')),
  profile_picture_url VARCHAR(500),
  phone VARCHAR(20),
  location VARCHAR(200),
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Jobs Table
\`\`\`sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  posted_by INTEGER REFERENCES users(id),
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  location VARCHAR(200) NOT NULL,
  job_type VARCHAR(50) NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  is_remote BOOLEAN DEFAULT false,
  skills TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Applications Table
\`\`\`sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  user_id INTEGER REFERENCES users(id),
  cover_letter TEXT,
  resume_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(job_id, user_id)
);
\`\`\`

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Animation utilities
- Component-specific styles
- Dark mode support

### Next.js Configuration
- App Router enabled
- TypeScript support
- Image optimization
- API routes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
\`\`\`env
JWT_SECRET=your-production-jwt-secret
DATABASE_URL=your-production-database-url
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## 🧪 Testing

### Demo Credentials
For testing the application, use these demo credentials:

**Job Seeker Account:**
- Email: `john@example.com`
- Password: `password123`

**Employer Account:**
- Email: `sarah@techcorp.com`
- Password: `password123`

## 🔮 Future Enhancements

### Planned Features
- [ ] Real database integration (PostgreSQL + Prisma)
- [ ] File upload for resumes and company logos
- [ ] Email notifications for applications
- [ ] Real-time chat between employers and candidates
- [ ] Advanced search filters (salary range, experience level)
- [ ] Company profiles and pages
- [ ] Job recommendations based on user profile
- [ ] Application status tracking
- [ ] Interview scheduling system
- [ ] Skills assessment tests

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] PWA capabilities
- [ ] Internationalization (i18n)
- [ ] Analytics integration
- [ ] Error monitoring (Sentry)
- [ ] Rate limiting for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add proper error handling
- Include proper TypeScript types
- Follow the existing code style
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

If you have any questions or need help with the project:

1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/your-username/jobportal/issues)
3. Create a new issue if needed
4. Contact the maintainers

---

**Built with ❤️ using Next.js and modern web technologies**
