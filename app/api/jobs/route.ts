import { type NextRequest, NextResponse } from "next/server"

// Mock data - In a real app, this would come from a database
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹15-25 LPA",
    description:
      "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications for the Indian market.",
    requirements:
      "5+ years of React experience, TypeScript proficiency, strong CSS skills, experience with Indian e-commerce platforms",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    postedDate: "2024-01-15",
    applicants: 45,
    isActive: true,
    benefits: "Health Insurance, PF, Flexible Hours, Work from Home",
    experienceLevel: "Senior",
    isRemote: false,
    applicationDeadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ India",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description:
      "Lead product strategy and development for our growing fintech platform. Work with cross-functional teams to deliver exceptional user experiences in the Indian market.",
    requirements:
      "3+ years of product management experience, strong analytical skills, experience with agile methodologies, understanding of Indian fintech landscape",
    tags: ["Product Strategy", "Agile", "Analytics", "User Research", "Fintech"],
    postedDate: "2024-01-14",
    applicants: 32,
    isActive: true,
    benefits: "Health Insurance, PF, Stock Options, Learning Budget",
    experienceLevel: "Mid-level",
    isRemote: true,
    applicationDeadline: "2024-02-10",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "InnovateTech Solutions",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹8-15 LPA",
    description:
      "Join our dynamic team to build scalable web applications using modern technologies. Work on exciting projects for clients across India.",
    requirements:
      "3+ years of full-stack development experience, proficiency in Node.js, React, MongoDB, experience with cloud platforms",
    tags: ["Node.js", "React", "MongoDB", "AWS", "Docker"],
    postedDate: "2024-01-13",
    applicants: 28,
    isActive: true,
    benefits: "Health Insurance, PF, Flexible Hours, Training Programs",
    experienceLevel: "Mid-level",
    isRemote: false,
    applicationDeadline: "2024-02-20",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const location = searchParams.get("location")
  const type = searchParams.get("type")

  let filteredJobs = jobs

  if (search) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
    )
  }

  if (location) {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === type.toLowerCase())
  }

  return NextResponse.json({
    jobs: filteredJobs,
    total: filteredJobs.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["jobTitle", "company", "location", "jobType", "description", "requirements"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          {
            error: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`,
          },
          { status: 400 },
        )
      }
    }

    // Validate salary range if provided
    if (body.salaryMin && body.salaryMax) {
      const minSalary = Number.parseInt(body.salaryMin.replace(/[^\d]/g, ""))
      const maxSalary = Number.parseInt(body.salaryMax.replace(/[^\d]/g, ""))

      if (minSalary >= maxSalary) {
        return NextResponse.json(
          {
            error: "Maximum salary must be greater than minimum salary",
          },
          { status: 400 },
        )
      }
    }

    // Create new job object
    const newJob = {
      id: Math.max(...jobs.map((j) => j.id)) + 1,
      title: body.jobTitle.trim(),
      company: body.company.trim(),
      location: body.location.trim(),
      type: body.jobType,
      salary:
        body.salaryMin && body.salaryMax
          ? `₹${body.salaryMin}-${body.salaryMax} LPA`
          : body.salaryMin
            ? `₹${body.salaryMin}+ LPA`
            : "Competitive",
      description: body.description.trim(),
      requirements: body.requirements.trim(),
      tags: body.skills
        ? body.skills
            .split(",")
            .map((skill: string) => skill.trim())
            .filter((skill: string) => skill.length > 0)
        : [],
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
      isActive: true,
      benefits: body.benefits ? body.benefits.trim() : "Health Insurance, PF",
      experienceLevel: body.experienceLevel || "Mid-level",
      isRemote: body.isRemote || false,
      applicationDeadline: body.applicationDeadline || null,
    }

    // Add to jobs array (in a real app, save to database)
    jobs.push(newJob)

    return NextResponse.json(
      {
        success: true,
        message: "Job posted successfully! Your job listing is now live.",
        job: newJob,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating job posting:", error)
    return NextResponse.json(
      {
        error: "Failed to create job posting. Please try again.",
      },
      { status: 500 },
    )
  }
}
