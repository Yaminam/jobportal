import { type NextRequest, NextResponse } from "next/server"

// Mock user profiles storage - In a real app, this would be a database
const userProfiles: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const profile = userProfiles.find((p) => p.id === Number.parseInt(userId))

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  return NextResponse.json({ profile })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["id", "name", "email"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if profile exists
    const existingProfileIndex = userProfiles.findIndex((p) => p.id === body.id)

    const profileData = {
      id: body.id,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      location: body.location || "",
      title: body.title || "",
      bio: body.bio || "",
      experience: body.experience || "",
      education: body.education || "",
      skills: body.skills || [],
      languages: body.languages || [],
      certifications: body.certifications || [],
      portfolio: body.portfolio || "",
      linkedin: body.linkedin || "",
      github: body.github || "",
      userType: body.userType || "job_seeker",
      updatedAt: new Date().toISOString(),
    }

    if (existingProfileIndex >= 0) {
      // Update existing profile
      userProfiles[existingProfileIndex] = profileData
    } else {
      // Create new profile
      profileData.createdAt = new Date().toISOString()
      userProfiles.push(profileData)
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        profile: profileData,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return POST(request) // Alias PUT to POST for profile updates
}
