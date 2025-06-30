"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, MapPin, Search, DollarSign, Clock, Heart, Filter, ArrowRight } from "lucide-react"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      description:
        "We're looking for an experienced frontend developer to join our team and build amazing user experiences.",
      tags: ["React", "TypeScript", "Next.js"],
      postedDate: "2 days ago",
      applicants: 45,
      remote: true,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $130k",
      description: "Lead product strategy and development for our growing platform with millions of users.",
      tags: ["Strategy", "Agile", "Analytics"],
      postedDate: "1 day ago",
      applicants: 32,
      remote: true,
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Contract",
      salary: "$80k - $100k",
      description: "Create beautiful and intuitive user experiences for our digital products.",
      tags: ["Figma", "Research", "Prototyping"],
      postedDate: "3 days ago",
      applicants: 28,
      remote: false,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "InnovateTech",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Join our engineering team to build scalable web applications using modern technologies.",
      tags: ["Node.js", "React", "MongoDB"],
      postedDate: "1 day ago",
      applicants: 67,
      remote: true,
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataCorp",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $160k",
      description: "Analyze complex datasets and build machine learning models to drive business insights.",
      tags: ["Python", "Machine Learning", "SQL"],
      postedDate: "4 days ago",
      applicants: 89,
      remote: true,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudFirst",
      location: "Denver, CO",
      type: "Full-time",
      salary: "$110k - $140k",
      description: "Manage cloud infrastructure and implement CI/CD pipelines for our development teams.",
      tags: ["AWS", "Docker", "Kubernetes"],
      postedDate: "2 days ago",
      applicants: 34,
      remote: true,
    },
    {
      id: 7,
      title: "Mobile App Developer",
      company: "MobileFirst",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$95k - $125k",
      description: "Develop native mobile applications for iOS and Android platforms.",
      tags: ["React Native", "Swift", "Kotlin"],
      postedDate: "5 days ago",
      applicants: 56,
      remote: false,
    },
    {
      id: 8,
      title: "Marketing Manager",
      company: "GrowthCo",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$70k - $90k",
      description: "Lead marketing campaigns and drive user acquisition for our B2B SaaS platform.",
      tags: ["Digital Marketing", "SEO", "Analytics"],
      postedDate: "3 days ago",
      applicants: 42,
      remote: true,
    },
    {
      id: 9,
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Washington, DC",
      type: "Full-time",
      salary: "$85k - $115k",
      description: "Protect our systems and data from cyber threats through monitoring and analysis.",
      tags: ["Security", "Network", "Compliance"],
      postedDate: "1 day ago",
      applicants: 23,
      remote: false,
    },
    {
      id: 10,
      title: "AI/ML Engineer",
      company: "FutureTech",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140k - $170k",
      description: "Build and deploy machine learning models to solve complex business problems.",
      tags: ["TensorFlow", "PyTorch", "Python"],
      postedDate: "2 days ago",
      applicants: 78,
      remote: true,
    },
    {
      id: 11,
      title: "Sales Representative",
      company: "SalesForce Pro",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$60k - $80k + Commission",
      description: "Drive revenue growth by building relationships with potential clients.",
      tags: ["Sales", "CRM", "Communication"],
      postedDate: "4 days ago",
      applicants: 31,
      remote: false,
    },
    {
      id: 12,
      title: "Content Writer",
      company: "ContentHub",
      location: "Remote",
      type: "Part-time",
      salary: "$25 - $35/hour",
      description: "Create engaging content for blogs, social media, and marketing materials.",
      tags: ["Writing", "SEO", "Content Strategy"],
      postedDate: "6 days ago",
      applicants: 19,
      remote: true,
    },
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const searchParam = urlParams.get("search")
      const locationParam = urlParams.get("location")

      if (searchParam) setSearchTerm(searchParam)
      if (locationParam) setLocation(locationParam)
    }

    setTimeout(() => {
      setJobs(mockJobs)
      setFilteredJobs(mockJobs)
      setIsLoading(false)
    }, 1000)

    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]")
      setSavedJobs(new Set(saved))
    }
  }, [])

  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (location) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (jobType) {
      filtered = filtered.filter((job) => job.type.toLowerCase() === jobType.toLowerCase())
    }

    setFilteredJobs(filtered)
  }, [searchTerm, location, jobType, jobs])

  const handleSaveJob = (jobId) => {
    if (typeof window !== "undefined") {
      const newSavedJobs = new Set(savedJobs)
      if (savedJobs.has(jobId)) {
        newSavedJobs.delete(jobId)
      } else {
        newSavedJobs.add(jobId)
      }
      setSavedJobs(newSavedJobs)
      localStorage.setItem("savedJobs", JSON.stringify([...newSavedJobs]))
    }
  }

  const handleApply = (jobId) => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("user")
      if (!isLoggedIn) {
        alert("Please login to apply for jobs")
        window.location.href = "/login"
        return
      }

      const applications = JSON.parse(localStorage.getItem("applications") || "[]")
      const job = jobs.find((j) => j.id === jobId)
      applications.push({
        id: Date.now(),
        jobId,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString(),
        status: "Applied",
      })
      localStorage.setItem("applications", JSON.stringify(applications))

      alert(`Applied to ${job.title} successfully!`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-muted-foreground animate-pulse-slow">Loading amazing jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              JobPortal
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/jobs" className="font-medium text-primary">
              Find Jobs
            </Link>
            <Link href="/companies" className="hover:text-primary transition-colors duration-200">
              Companies
            </Link>
            <Link href="/post-job" className="hover:text-primary transition-colors duration-200">
              Post Job
            </Link>
            <Link href="/pricing" className="hover:text-primary transition-colors duration-200">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hover:scale-105 transition-transform duration-200">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="hover:scale-105 transition-all duration-200">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-1/4">
            <Card className="sticky top-24 hover-lift bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Keywords</label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder="Job title"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Location</label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder="City, state"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                  >
                    <option value="">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-8 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Job Listings
                </h1>
                <p className="text-muted-foreground mt-1">Discover your next career opportunity</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{filteredJobs.length}</p>
                <p className="text-sm text-muted-foreground">jobs found</p>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 group stagger-item relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                          {job.title}
                        </CardTitle>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.remote && (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600/50 bg-green-50 dark:bg-green-950"
                          >
                            Remote
                          </Badge>
                        )}
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.postedDate}
                        </div>
                      </div>

                      <p className="text-muted-foreground">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveJob(job.id)}
                            className={`transition-all duration-200 hover:scale-105 ${
                              savedJobs.has(job.id)
                                ? "text-red-500 border-red-500/50 bg-red-50 dark:bg-red-950"
                                : "hover:border-primary/50"
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 mr-1 transition-all duration-200 ${savedJobs.has(job.id) ? "fill-current" : ""}`}
                            />
                            {savedJobs.has(job.id) ? "Saved" : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 group"
                            onClick={() => handleApply(job.id)}
                          >
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
