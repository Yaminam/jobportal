import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock user storage - In a real app, this would be a database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "password", "userType"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === body.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12)

    // Create new user
    const newUser = {
      id: users.length + 1,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      userType: body.userType,
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    // Save user (in real app, save to database)
    users.push(newUser)

    // Remove password from response
    const { password, ...userResponse } = newUser

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
