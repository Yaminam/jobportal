# Setup Guide

## Development Environment Setup

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+**: [Download from nodejs.org](https://nodejs.org/)
- **Git**: [Download from git-scm.com](https://git-scm.com/)
- **Code Editor**: VS Code recommended with these extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

### 2. Project Setup

#### Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/jobportal.git
cd jobportal
\`\`\`

#### Install Dependencies
\`\`\`bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
\`\`\`

#### Environment Configuration
Create a `.env.local` file in the root directory:

\`\`\`env
# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Database (for future implementation)
DATABASE_URL=postgresql://username:password@localhost:5432/jobportal

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=JobPortal

# Optional: Third-party services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
\`\`\`

### 3. Running the Application

#### Development Mode
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Build
\`\`\`bash
npm run build
npm run start
\`\`\`

### 4. Database Setup (Future Implementation)

When implementing the database, follow these steps:

#### Install Database Dependencies
\`\`\`bash
npm install @prisma/client prisma pg
npm install -D @types/pg
\`\`\`

#### Initialize Prisma
\`\`\`bash
npx prisma init
\`\`\`

#### Run Database Migrations
\`\`\`bash
# Create and run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed the database
npx prisma db seed
\`\`\`

### 5. Development Workflow

#### Code Style and Linting
\`\`\`bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
\`\`\`

#### Type Checking
\`\`\`bash
# Run TypeScript type checking
npm run type-check
\`\`\`

#### Building for Production
\`\`\`bash
# Create production build
npm run build

# Test production build locally
npm run start
\`\`\`

## IDE Configuration

### VS Code Settings
Create `.vscode/settings.json`:

\`\`\`json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\$$([^)]*)\$$", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
\`\`\`

### VS Code Extensions
Install these recommended extensions:

\`\`\`json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
\`\`\`

## Troubleshooting

### Common Issues

#### Port Already in Use
\`\`\`bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
\`\`\`

#### Node Modules Issues
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### TypeScript Errors
\`\`\`bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"

# Or run type checking
npm run type-check
\`\`\`

#### Styling Issues
\`\`\`bash
# Rebuild Tailwind CSS
npm run build:css

# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

### Performance Tips

1. **Use Next.js Image Optimization**
   \`\`\`tsx
   import Image from 'next/image'
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     priority // for above-the-fold images
   />
   \`\`\`

2. **Optimize Bundle Size**
   \`\`\`bash
   # Analyze bundle size
   npm run analyze
   \`\`\`

3. **Use Dynamic Imports**
   \`\`\`tsx
   import dynamic from 'next/dynamic'
   
   const DynamicComponent = dynamic(() => import('./Component'), {
     loading: () => <p>Loading...</p>,
   })
   \`\`\`

## Git Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical fixes
- `chore/task-description` - Maintenance tasks

### Commit Message Format
\`\`\`
type(scope): description

[optional body]

[optional footer]
\`\`\`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
\`\`\`
feat(auth): add password reset functionality

- Add forgot password form
- Implement email sending logic
- Add reset password page

Closes #123
\`\`\`

### Pre-commit Hooks
Set up Husky for pre-commit hooks:

\`\`\`bash
npm install -D husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
\`\`\`

## Deployment Setup

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Environment Variables for Production
\`\`\`env
JWT_SECRET=production-jwt-secret
DATABASE_URL=production-database-url
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

### Custom Domain Setup
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Enable HTTPS (automatic with Vercel)

## Monitoring and Analytics

### Error Monitoring
\`\`\`bash
# Install Sentry (optional)
npm install @sentry/nextjs
\`\`\`

### Performance Monitoring
\`\`\`bash
# Install Vercel Analytics
npm install @vercel/analytics
\`\`\`

### Usage Analytics
\`\`\`bash
# Install Google Analytics
npm install gtag
\`\`\`

This setup guide should get you up and running with the JobPortal project. For additional help, refer to the main documentation or create an issue in the repository.
