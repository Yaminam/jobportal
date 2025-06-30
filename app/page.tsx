"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, MapPin, Search, Users, Building, ArrowRight, Star, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $150k",
        description: "We're looking for an experienced frontend developer to join our team...",
        tags: ["React", "TypeScript", "Next.js"],
        featured: true,
      },
      {
        id: 2,
        title: "Product Manager",
        company: "StartupXYZ",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $130k",
        description: "Lead product strategy and development for our growing platform...",
        tags: ["Strategy", "Agile", "Analytics"],
        featured: true,
      },
      {
        id: 3,
        title: "UX Designer",
        company: "Design Studio",
        location: "New York, NY",
        type: "Contract",
        salary: "$80k - $100k",
        description: "Create beautiful and intuitive user experiences...",
        tags: ["Figma", "Research", "Prototyping"],
        featured: true,
      },
    ]

    setTimeout(() => {
      setFeaturedJobs(mockJobs)
      setIsLoaded(true)
    }, 500)
  }, [])

  const handleSearch = () => {
    let url = "/jobs"
    const params = []
    if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`)
    if (location) params.push(`location=${encodeURIComponent(location)}`)
    if (params.length > 0) url += `?${params.join("&")}`

    window.location.href = url
  }

  const handleApply = (jobId) => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("user")
      if (!isLoggedIn) {
        alert("Please login to apply for jobs")
        window.location.href = "/login"
        return
      }
      alert(`Applied to job ${jobId} successfully!`)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2 animate-fade-in-left">
            <div className="relative">
              <Briefcase className="h-8 w-8 text-primary transition-transform duration-300 hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              JobPortal
            </span>
          </div>

          <nav className="hidden md:flex gap-6 animate-fade-in-up">
            <Link href="/jobs" className="hover:text-primary transition-colors duration-200 hover:scale-105 transform">
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className="hover:text-primary transition-colors duration-200 hover:scale-105 transform"
            >
              Companies
            </Link>
            <Link
              href="/post-job"
              className="hover:text-primary transition-colors duration-200 hover:scale-105 transform"
            >
              Post Job
            </Link>
            <Link
              href="/pricing"
              className="hover:text-primary transition-colors duration-200 hover:scale-105 transform"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3 animate-fade-in-right">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hover:scale-105 transition-transform duration-200">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="hover:scale-105 transition-all duration-200 hover:shadow-lg">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-animation opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Connect with top companies and discover opportunities that match your skills
            </p>
          </div>

          {/* Search */}
          <div
            className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-border/50 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto animate-fade-in-up hover-lift"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="Job title or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex-1 relative group">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group"
            >
              Search Jobs
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 stagger-item hover-lift bg-card rounded-2xl border border-border/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Briefcase className="h-8 w-8 text-primary animate-bounce-slow" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                10,000+
              </h3>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div className="p-6 stagger-item hover-lift bg-card rounded-2xl border border-border/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <Building className="h-8 w-8 text-green-500 animate-pulse-slow" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                5,000+
              </h3>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div className="p-6 stagger-item hover-lift bg-card rounded-2xl border border-border/50">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-500/10 rounded-full">
                  <Users className="h-8 w-8 text-purple-500 animate-bounce-slow" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                50,000+
              </h3>
              <p className="text-muted-foreground">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Featured Jobs
            </h2>
            <p className="text-muted-foreground text-lg">Discover amazing opportunities from top companies</p>
          </div>

          {!isLoaded ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className="hover-lift bg-card border border-border/50 backdrop-blur-sm stagger-item group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                          {job.title}
                        </CardTitle>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">{job.salary}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {job.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs hover:bg-primary/10 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 group-hover:scale-105 transition-all duration-200"
                        onClick={() => handleApply(job.id)}
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12 animate-fade-in-up">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg group bg-transparent"
            >
              <Link href="/jobs">
                View All Jobs
                <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-left">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  JobPortal
                </span>
              </div>
              <p className="text-muted-foreground">Connecting talent with opportunity worldwide.</p>
            </div>
            <div className="stagger-item">
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/jobs" className="hover:text-primary transition-colors duration-200">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="hover:text-primary transition-colors duration-200">
                    Companies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="stagger-item">
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/post-job" className="hover:text-primary transition-colors duration-200">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="stagger-item">
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground animate-fade-in-up">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
