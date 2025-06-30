"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, MapPin, Search, Users, Building, Star, ArrowRight, Globe, Filter } from "lucide-react"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [industry, setIndustry] = useState("")
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const mockCompanies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "1000-5000",
      description: "Leading technology company building innovative solutions for the future.",
      openJobs: 15,
      rating: 4.8,
      founded: 2010,
      website: "techcorp.com",
      benefits: ["Health Insurance", "Remote Work", "Stock Options", "Unlimited PTO"],
    },
    {
      id: 2,
      name: "StartupXYZ",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "SaaS",
      location: "Austin, TX",
      size: "50-200",
      description: "Fast-growing startup revolutionizing how businesses manage their operations.",
      openJobs: 8,
      rating: 4.6,
      founded: 2018,
      website: "startupxyz.com",
      benefits: ["Equity", "Flexible Hours", "Learning Budget", "Team Retreats"],
    },
    {
      id: 3,
      name: "Design Studio",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Design",
      location: "New York, NY",
      size: "10-50",
      description: "Creative agency specializing in digital experiences and brand identity.",
      openJobs: 5,
      rating: 4.9,
      founded: 2015,
      website: "designstudio.com",
      benefits: ["Creative Freedom", "Mac Setup", "Conference Budget", "Flexible PTO"],
    },
    {
      id: 4,
      name: "InnovateTech",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Technology",
      location: "Seattle, WA",
      size: "500-1000",
      description: "Innovation-driven company creating cutting-edge software solutions.",
      openJobs: 12,
      rating: 4.7,
      founded: 2012,
      website: "innovatetech.com",
      benefits: ["Health & Dental", "401k Match", "Remote Work", "Professional Development"],
    },
    {
      id: 5,
      name: "DataCorp",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Data & Analytics",
      location: "Boston, MA",
      size: "200-500",
      description: "Data analytics company helping businesses make informed decisions.",
      openJobs: 7,
      rating: 4.5,
      founded: 2014,
      website: "datacorp.com",
      benefits: ["Stock Options", "Learning Stipend", "Gym Membership", "Catered Meals"],
    },
    {
      id: 6,
      name: "CloudFirst",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Cloud Computing",
      location: "Denver, CO",
      size: "100-500",
      description: "Cloud infrastructure company providing scalable solutions for enterprises.",
      openJobs: 9,
      rating: 4.6,
      founded: 2016,
      website: "cloudfirst.com",
      benefits: ["Remote First", "Unlimited PTO", "Tech Stipend", "Health Insurance"],
    },
    {
      id: 7,
      name: "MobileFirst",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Mobile Development",
      location: "Los Angeles, CA",
      size: "50-200",
      description: "Mobile app development company creating award-winning applications.",
      openJobs: 6,
      rating: 4.4,
      founded: 2017,
      website: "mobilefirst.com",
      benefits: ["Device Allowance", "Flexible Schedule", "Team Events", "Health Coverage"],
    },
    {
      id: 8,
      name: "GrowthCo",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Marketing",
      location: "Chicago, IL",
      size: "100-500",
      description: "Growth marketing agency helping startups scale their user acquisition.",
      openJobs: 4,
      rating: 4.3,
      founded: 2019,
      website: "growthco.com",
      benefits: ["Performance Bonus", "Marketing Budget", "Conference Tickets", "Flexible Hours"],
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setCompanies(mockCompanies)
      setFilteredCompanies(mockCompanies)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = companies

    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (industry) {
      filtered = filtered.filter((company) => company.industry.toLowerCase() === industry.toLowerCase())
    }

    setFilteredCompanies(filtered)
  }, [searchTerm, industry, companies])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-muted-foreground animate-pulse-slow">Loading amazing companies...</p>
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
            <Link href="/jobs" className="hover:text-primary transition-colors duration-200">
              Find Jobs
            </Link>
            <Link href="/companies" className="font-medium text-primary">
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
                  <label className="block text-sm font-medium">Company Name</label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder="Search companies"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200 hover:border-primary/50"
                  >
                    <option value="">All Industries</option>
                    <option value="technology">Technology</option>
                    <option value="saas">SaaS</option>
                    <option value="design">Design</option>
                    <option value="data & analytics">Data & Analytics</option>
                    <option value="cloud computing">Cloud Computing</option>
                    <option value="mobile development">Mobile Development</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Listings */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-8 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Top Companies
                </h1>
                <p className="text-muted-foreground mt-1">Discover amazing companies to work for</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{filteredCompanies.length}</p>
                <p className="text-sm text-muted-foreground">companies</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCompanies.map((company, index) => (
                <Card
                  key={company.id}
                  className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 group stagger-item relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <Building className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                          {company.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {company.industry}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{company.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">{company.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{company.size} employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{company.website}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{company.openJobs} open jobs</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {company.benefits.slice(0, 3).map((benefit) => (
                            <Badge
                              key={benefit}
                              variant="outline"
                              className="text-xs hover:bg-primary/10 transition-colors duration-200"
                            >
                              {benefit}
                            </Badge>
                          ))}
                          {company.benefits.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{company.benefits.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 hover:border-primary/50 transition-all duration-200 bg-transparent"
                        >
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 group"
                        >
                          View Jobs
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
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
