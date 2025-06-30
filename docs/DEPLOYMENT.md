# Deployment Guide

## Overview

This guide covers deploying the JobPortal application to various platforms including Vercel (recommended), Netlify, and custom servers.

## Vercel Deployment (Recommended)

Vercel provides the best experience for Next.js applications with zero-configuration deployment.

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)
- Project pushed to a Git repository

### Step-by-Step Deployment

#### 1. Connect Repository to Vercel

1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your JobPortal code

#### 2. Configure Project Settings

Vercel will automatically detect Next.js and configure most settings:

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

#### 3. Environment Variables

Add the following environment variables in the Vercel dashboard:

\`\`\`env
# Required
JWT_SECRET=your-production-jwt-secret-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Database (when implemented)
DATABASE_URL=your-production-database-url

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
SENTRY_DSN=your-sentry-dsn
\`\`\`

#### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

### Custom Domain Setup

#### 1. Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

#### 2. DNS Configuration
Add these DNS records to your domain provider:

\`\`\`
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
\`\`\`

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Build Optimization

#### 1. Next.js Configuration
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Image optimization
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),
}

export default nextConfig
\`\`\`

#### 2. Performance Monitoring
\`\`\`bash
# Install Vercel Analytics
npm install @vercel/analytics

# Install Vercel Speed Insights
npm install @vercel/speed-insights
\`\`\`

Add to your layout:
\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
\`\`\`

## Netlify Deployment

### Prerequisites
- Netlify account
- Project in Git repository

### Deployment Steps

#### 1. Connect Repository
1. Log in to Netlify
2. Click "New site from Git"
3. Choose your Git provider and repository

#### 2. Build Settings
\`\`\`
Build command: npm run build
Publish directory: .next
\`\`\`

#### 3. Environment Variables
Add in Netlify dashboard under Site Settings → Environment Variables:

\`\`\`env
JWT_SECRET=your-production-jwt-secret
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
\`\`\`

#### 4. Netlify Configuration
Create `netlify.toml` in project root:

\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
\`\`\`

## Docker Deployment

### Dockerfile
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - JWT_SECRET=your-jwt-secret
      - DATABASE_URL=postgresql://user:password@db:5432/jobportal
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=jobportal
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
\`\`\`

### Build and Run
\`\`\`bash
# Build image
docker build -t jobportal .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app
\`\`\`

## AWS Deployment

### Using AWS Amplify

#### 1. Install Amplify CLI
\`\`\`bash
npm install -g @aws-amplify/cli
amplify configure
\`\`\`

#### 2. Initialize Amplify
\`\`\`bash
amplify init
\`\`\`

#### 3. Add Hosting
\`\`\`bash
amplify add hosting
# Choose: Amazon CloudFront and S3
\`\`\`

#### 4. Deploy
\`\`\`bash
amplify publish
\`\`\`

### Using AWS ECS (Container)

#### 1. Build and Push to ECR
\`\`\`bash
# Create ECR repository
aws ecr create-repository --repository-name jobportal

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag image
docker build -t jobportal .
docker tag jobportal:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/jobportal:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/jobportal:latest
\`\`\`

#### 2. Create ECS Task Definition
\`\`\`json
{
  "family": "jobportal",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "jobportal",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/jobportal:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "JWT_SECRET",
          "value": "your-jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/jobportal",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
\`\`\`

## Database Deployment

### PostgreSQL on Railway

#### 1. Create Railway Account
Visit [railway.app](https://railway.app) and sign up

#### 2. Create PostgreSQL Database
1. Click "New Project"
2. Select "PostgreSQL"
3. Note the connection details

#### 3. Update Environment Variables
\`\`\`env
DATABASE_URL=postgresql://username:password@hostname:port/database
\`\`\`

### Supabase Database

#### 1. Create Supabase Project
1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Wait for setup to complete

#### 2. Run Database Migrations
\`\`\`sql
-- Copy contents from scripts/create-database.sql
-- Run in Supabase SQL editor
\`\`\`

#### 3. Update Environment Variables
\`\`\`env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
\`\`\`

## Environment-Specific Configurations

### Production Environment Variables
\`\`\`env
# Security
JWT_SECRET=complex-production-secret-key
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=JobPortal

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Email (when implemented)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Storage (when implemented)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
\`\`\`

### Staging Environment
\`\`\`env
# Use staging database and services
DATABASE_URL=postgresql://staging-db-url
NEXT_PUBLIC_APP_URL=https://staging.yourdomain.com
\`\`\`

## Monitoring and Logging

### Error Monitoring with Sentry
\`\`\`bash
npm install @sentry/nextjs
\`\`\`

\`\`\`javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
\`\`\`

### Performance Monitoring
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  sentry: {
    hideSourceMaps: true,
  },
}
\`\`\`

### Health Checks
Create health check endpoint:

\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  })
}
\`\`\`

## Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use different secrets for each environment
- Rotate secrets regularly
- Use secret management services for production

### HTTPS Configuration
- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies

### Content Security Policy
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
\`\`\`

## Backup and Recovery

### Database Backups
\`\`\`bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
\`\`\`

### Automated Backups
Set up automated backups using your cloud provider's backup services or cron jobs.

## Troubleshooting

### Common Deployment Issues

#### Build Failures
\`\`\`bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
\`\`\`

#### Environment Variable Issues
- Verify all required variables are set
- Check for typos in variable names
- Ensure proper escaping of special characters

#### Memory Issues
- Increase memory allocation in deployment platform
- Optimize bundle size
- Use dynamic imports for large components

#### Database Connection Issues
- Verify connection string format
- Check firewall settings
- Ensure database is accessible from deployment platform

This deployment guide covers the most common deployment scenarios. Choose the platform that best fits your needs and infrastructure requirements.
