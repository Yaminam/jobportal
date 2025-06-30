import { type NextRequest, NextResponse } from "next/server"

// Mock data - In a real app, this would come from a database
const applications = [
  {
    id: 1,
    jobId: 1,
    userId: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2024-01-15",
    status: "Under Review",
    coverLetter: "I am excited to apply for this position...",
    resumeUrl: "/resumes/john-doe-resume.pdf",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let userApplications = applications

  if (userId) {
    userApplications = applications.filter((app) => app.userId === Number.parseInt(userId))
  }

  return NextResponse.json({
    applications: userApplications,
    total: userApplications.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.jobId || !body.userId) {
      return NextResponse.json({ error: "Job ID and User ID are required" }, { status: 400 })
    }

    // Check if user already applied to this job
    const existingApplication = applications.find((app) => app.jobId === body.jobId && app.userId === body.userId)

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied to this job" }, { status: 400 })
    }

    // Create new application
    const newApplication = {
      id: applications.length + 1,
      jobId: body.jobId,
      userId: body.userId,
      jobTitle: body.jobTitle,
      company: body.company,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      coverLetter: body.coverLetter || "",
      resumeUrl: body.resumeUrl || "",
    }

    // In a real app, save to database
    applications.push(newApplication)

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
