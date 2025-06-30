# API Documentation

## Overview

The JobPortal API provides RESTful endpoints for managing users, jobs, and applications. All endpoints return JSON responses and use standard HTTP status codes.

## Base URL
\`\`\`
http://localhost:3000/api (development)
https://your-domain.com/api (production)
\`\`\`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Response Format

All API responses follow this format:

### Success Response
\`\`\`json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Success message"
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
\`\`\`

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

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
    "userType": "jobseeker",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "isActive": true
  }
}
\`\`\`

**Error Responses:**
- `400` - Validation errors (missing fields, password mismatch)
- `409` - User already exists

### Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

## Jobs Endpoints

### Get All Jobs
Retrieve jobs with optional filtering.

**Endpoint:** `GET /api/jobs`

**Query Parameters:**
- `search` (string) - Search in title, company, or tags
- `location` (string) - Filter by location
- `type` (string) - Filter by job type
- `page` (number) - Page number for pagination
- `limit` (number) - Number of jobs per page

**Example Request:**
\`\`\`
GET /api/jobs?search=frontend&location=san francisco&type=full-time&page=1&limit=10
\`\`\`

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
      "description": "We're looking for an experienced frontend developer...",
      "requirements": "5+ years of React experience...",
      "tags": ["React", "TypeScript", "Next.js"],
      "postedDate": "2024-01-15",
      "applicants": 45,
      "isActive": true,
      "isRemote": true,
      "benefits": "Health insurance, 401k matching...",
      "experienceLevel": "senior"
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
\`\`\`

### Get Single Job
Retrieve details for a specific job.

**Endpoint:** `GET /api/jobs/[id]`

**Response:**
\`\`\`json
{
  "job": {
    "id": 1,
    "title": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "location": "San Francisco, CA",
    "type": "Full-time",
    "salary": "$120k - $150k",
    "description": "Detailed job description...",
    "requirements": "Detailed requirements...",
    "tags": ["React", "TypeScript", "Next.js"],
    "postedDate": "2024-01-15",
    "applicants": 45,
    "isActive": true,
    "benefits": "Health insurance, 401k matching...",
    "applicationDeadline": "2024-02-15"
  }
}
\`\`\`

**Error Responses:**
- `404` - Job not found

### Create Job
Create a new job posting (employers only).

**Endpoint:** `POST /api/jobs`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "jobTitle": "Senior Frontend Developer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "salaryMin": "120000",
  "salaryMax": "150000",
  "description": "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications.",
  "requirements": "5+ years of React experience, TypeScript proficiency, strong CSS skills",
  "skills": "React, TypeScript, Next.js, Tailwind CSS",
  "benefits": "Health insurance, 401k matching, flexible work hours",
  "experienceLevel": "senior",
  "isRemote": true,
  "applicationDeadline": "2024-02-15"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Job posted successfully",
  "job": {
    "id": 2,
    "title": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "location": "San Francisco, CA",
    "type": "full-time",
    "salary": "$120000 - $150000",
    "description": "We're looking for an experienced frontend developer...",
    "requirements": "5+ years of React experience...",
    "tags": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    "postedDate": "2024-01-16",
    "applicants": 0,
    "isActive": true
  }
}
\`\`\`

**Error Responses:**
- `400` - Validation errors
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not an employer)

### Update Job
Update an existing job posting.

**Endpoint:** `PUT /api/jobs/[id]`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
Content-Type: application/json
\`\`\`

**Request Body:** Same as Create Job

**Error Responses:**
- `400` - Validation errors
- `401` - Unauthorized
- `403` - Forbidden (not job owner)
- `404` - Job not found

### Delete Job
Delete a job posting.

**Endpoint:** `DELETE /api/jobs/[id]`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Job deleted successfully"
}
\`\`\`

## Applications Endpoints

### Get User Applications
Retrieve applications for the authenticated user.

**Endpoint:** `GET /api/applications`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
\`\`\`

**Query Parameters:**
- `status` (string) - Filter by application status
- `page` (number) - Page number
- `limit` (number) - Applications per page

**Response:**
\`\`\`json
{
  "applications": [
    {
      "id": 1,
      "jobId": 1,
      "userId": 1,
      "jobTitle": "Senior Frontend Developer",
      "company": "TechCorp Inc.",
      "appliedDate": "2024-01-15",
      "status": "Under Review",
      "coverLetter": "I am excited to apply for this position...",
      "resumeUrl": "/resumes/john-doe-resume.pdf"
    }
  ],
  "total": 1
}
\`\`\`

### Submit Application
Apply for a job.

**Endpoint:** `POST /api/applications`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "jobId": 1,
  "coverLetter": "I am excited to apply for this position because...",
  "resumeUrl": "/uploads/resumes/resume.pdf"
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Application submitted successfully",
  "application": {
    "id": 2,
    "jobId": 1,
    "userId": 1,
    "jobTitle": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "appliedDate": "2024-01-16",
    "status": "Applied",
    "coverLetter": "I am excited to apply for this position...",
    "resumeUrl": "/uploads/resumes/resume.pdf"
  }
}
\`\`\`

**Error Responses:**
- `400` - Missing required fields or already applied
- `401` - Unauthorized
- `404` - Job not found

### Update Application Status
Update the status of an application (employers only).

**Endpoint:** `PUT /api/applications/[id]`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "status": "interview_scheduled" // applied, under_review, interview_scheduled, rejected, accepted
}
\`\`\`

## User Profile Endpoints

### Get User Profile
Retrieve user profile information.

**Endpoint:** `GET /api/users/profile`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "jobseeker",
    "profilePictureUrl": "/uploads/profiles/john-doe.jpg",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "bio": "Full-stack developer with 5+ years of experience",
    "websiteUrl": "https://johndoe.dev",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "githubUrl": "https://github.com/johndoe",
    "skills": [
      {
        "name": "React",
        "proficiencyLevel": "expert",
        "yearsOfExperience": 5
      }
    ],
    "workExperience": [
      {
        "companyName": "Previous Tech Co",
        "jobTitle": "Frontend Developer",
        "description": "Developed and maintained React applications",
        "startDate": "2019-01-01",
        "endDate": "2023-12-31",
        "isCurrent": false,
        "location": "San Francisco, CA"
      }
    ],
    "education": [
      {
        "institutionName": "University of California",
        "degree": "Bachelor of Science",
        "fieldOfStudy": "Computer Science",
        "startDate": "2015-09-01",
        "endDate": "2019-06-01",
        "grade": "3.8 GPA"
      }
    ]
  }
}
\`\`\`

### Update User Profile
Update user profile information.

**Endpoint:** `PUT /api/users/profile`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "bio": "Updated bio...",
  "websiteUrl": "https://johndoe.dev",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe"
}
\`\`\`

## Saved Jobs Endpoints

### Get Saved Jobs
Retrieve user's saved jobs.

**Endpoint:** `GET /api/users/saved-jobs`

**Headers:**
\`\`\`
Authorization: Bearer <jwt-token>
\`\`\`

### Save Job
Save a job for later.

**Endpoint:** `POST /api/users/saved-jobs`

**Request Body:**
\`\`\`json
{
  "jobId": 1
}
\`\`\`

### Remove Saved Job
Remove a job from saved list.

**Endpoint:** `DELETE /api/users/saved-jobs/[jobId]`

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `CONFLICT` | Resource already exists |
| `INTERNAL_ERROR` | Server error |

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- Authentication endpoints: 5 requests per minute
- Job creation: 10 requests per hour
- General endpoints: 100 requests per minute

Rate limit headers are included in responses:
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
\`\`\`

## Pagination

List endpoints support pagination with these parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Pagination info is included in responses:
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
\`\`\`

## Webhooks

For real-time updates, the API supports webhooks for certain events:

### Supported Events
- `application.created` - New job application
- `application.status_changed` - Application status updated
- `job.created` - New job posted
- `user.registered` - New user registration

### Webhook Payload
\`\`\`json
{
  "event": "application.created",
  "timestamp": "2024-01-16T10:30:00Z",
  "data": {
    // Event-specific data
  }
}
\`\`\`

## SDK and Libraries

### JavaScript/TypeScript SDK
\`\`\`bash
npm install @jobportal/api-client
\`\`\`

\`\`\`typescript
import { JobPortalAPI } from '@jobportal/api-client'

const api = new JobPortalAPI({
  baseURL: 'https://api.jobportal.com',
  apiKey: 'your-api-key'
})

// Get jobs
const jobs = await api.jobs.list({ search: 'frontend' })

// Apply for job
const application = await api.applications.create({
  jobId: 1,
  coverLetter: 'Cover letter...'
})
\`\`\`

This API documentation provides comprehensive information for integrating with the JobPortal API. For additional support, please refer to the main documentation or contact the development team.
