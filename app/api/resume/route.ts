import { type NextRequest, NextResponse } from "next/server"

// Mock resume storage - In a real app, this would be a database and file storage service
const userResumes: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const resumes = userResumes.filter((r) => r.userId === Number.parseInt(userId))

  return NextResponse.json({
    resumes,
    total: resumes.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF, DOC, or DOCX files only." },
        { status: 400 },
      )
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Please upload files smaller than 5MB." }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Upload file to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // 2. Get the file URL
    // 3. Save file metadata to database

    // For demo purposes, we'll simulate this
    const resumeData = {
      id: Date.now().toString(),
      userId: Number.parseInt(userId),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      url: `/api/resume/download/${Date.now()}`, // Mock URL
      isActive: userResumes.filter((r) => r.userId === Number.parseInt(userId)).length === 0, // First resume is active
    }

    userResumes.push(resumeData)

    return NextResponse.json(
      {
        message: "Resume uploaded successfully",
        resume: resumeData,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resumeId = searchParams.get("resumeId")
    const userId = searchParams.get("userId")

    if (!resumeId || !userId) {
      return NextResponse.json({ error: "Resume ID and User ID are required" }, { status: 400 })
    }

    const resumeIndex = userResumes.findIndex((r) => r.id === resumeId && r.userId === Number.parseInt(userId))

    if (resumeIndex === -1) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    // In a real app, you would also delete the file from cloud storage
    userResumes.splice(resumeIndex, 1)

    return NextResponse.json({ message: "Resume deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
