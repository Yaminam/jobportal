"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Briefcase,
  Calendar,
  Eye,
  Heart,
  FileText,
  Users,
  TrendingUp,
  Search,
  ArrowRight,
  BarChart3,
} from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [applications, setApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [stats, setStats] = useState({
    applications: 0,
    saved: 0,
    views: 0,
    interviews: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (!userData) {
        window.location.href = "/login"
        return
      }

      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      const userApplications = JSON.parse(localStorage.getItem("applications") || "[]")
      const userSavedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]")

      setApplications(userApplications)
      setSavedJobs(userSavedJobs)

      setStats({
        applications: userApplications.length,
        saved: userSavedJobs.length,
        views: Math.floor(Math.random() * 50) + 20,
        interviews: Math.floor(Math.random() * 5) + 1,
      })
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("applications")
      localStorage.removeItem("savedJobs")
      window.location.href = "/"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
      case "Interview":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-muted-foreground animate-pulse-slow">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
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
            <Link href="/dashboard" className="font-medium text-primary">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Welcome back, {user.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">Here's what's happening with your job search</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover-lift stagger-item relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-5 w-5 animate-pulse-slow" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.applications}</div>
              <p className="text-xs opacity-80">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover-lift stagger-item relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
              <Heart className="h-5 w-5 animate-bounce-slow" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.saved}</div>
              <p className="text-xs opacity-80">+1 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover-lift stagger-item relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-5 w-5 animate-pulse-slow" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.views}</div>
              <p className="text-xs opacity-80">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover-lift stagger-item relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Users className="h-5 w-5 animate-bounce-slow" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{stats.interviews}</div>
              <p className="text-xs opacity-80">1 scheduled this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Applications
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12 animate-fade-in-up">
                    <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                    <p className="text-muted-foreground mb-6">Start applying to jobs to see them here</p>
                    <Button asChild className="hover:scale-105 transition-all duration-200 group">
                      <Link href="/jobs">
                        Browse Jobs
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app, index) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-all duration-200 stagger-item group"
                      >
                        <div className="space-y-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">
                            {app.jobTitle}
                          </h3>
                          <p className="text-muted-foreground">{app.company}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied on {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 group"
                  asChild
                >
                  <Link href="/jobs">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Jobs
                    <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:scale-105 transition-all duration-200 group bg-transparent"
                  asChild
                >
                  <Link href="/profile">
                    <Users className="h-4 w-4 mr-2" />
                    Update Profile
                    <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:scale-105 transition-all duration-200 group bg-transparent"
                  asChild
                >
                  <Link href="/resume">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Resume
                    <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 stagger-item group">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full group-hover:scale-110 transition-transform duration-200">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm group-hover:text-primary transition-colors duration-200">
                        Applied to Senior Developer position
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 stagger-item group">
                    <div className="p-2 bg-green-100 dark:bg-green-950 rounded-full group-hover:scale-110 transition-transform duration-200">
                      <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm group-hover:text-primary transition-colors duration-200">
                        Saved UX Designer job
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 stagger-item group">
                    <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-full group-hover:scale-110 transition-transform duration-200">
                      <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm group-hover:text-primary transition-colors duration-200">
                        Profile viewed by 5 employers
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile completeness</span>
                    <span className="font-medium text-primary">75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 stagger-item">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                      <span>Basic information</span>
                    </div>
                    <div className="flex items-center space-x-3 stagger-item">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                      <span>Work experience</span>
                    </div>
                    <div className="flex items-center space-x-3 stagger-item">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span>Skills assessment</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 hover:scale-105 transition-all duration-200 group bg-transparent"
                  >
                    Complete Profile
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
