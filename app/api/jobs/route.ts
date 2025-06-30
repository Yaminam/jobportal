import { type NextRequest, NextResponse } from "next/server"

// Mock data - In a real app, this would come from a database
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    description:
      "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications.",
    requirements: "5+ years of React experience, TypeScript proficiency, strong CSS skills",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    postedDate: "2024-01-15",
    applicants: 45,
    isActive: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    description:
      "Lead product strategy and development for our growing platform. Work with cross-functional teams to deliver exceptional user experiences.",
    requirements:
      "3+ years of product management experience, strong analytical skills, experience with agile methodologies",
    tags: ["Product Strategy", "Agile", "Analytics", "User Research"],
    postedDate: "2024-01-14",
    applicants: 32,
    isActive: true,
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
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new job object
    const newJob = {
      id: jobs.length + 1,
      title: body.jobTitle,
      company: body.company,
      location: body.location,
      type: body.jobType,
      salary: body.salaryMin && body.salaryMax ? `$${body.salaryMin} - $${body.salaryMax}` : "Competitive",
      description: body.description,
      requirements: body.requirements,
      tags: body.skills ? body.skills.split(",").map((skill: string) => skill.trim()) : [],
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
      isActive: true,
      benefits: body.benefits || "",
      experienceLevel: body.experienceLevel || "",
      isRemote: body.isRemote || false,
      applicationDeadline: body.applicationDeadline || null,
    }

    // In a real app, save to database
    jobs.push(newJob)

    return NextResponse.json(
      {
        message: "Job posted successfully",
        job: newJob,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job posting" }, { status: 500 })
  }
}
