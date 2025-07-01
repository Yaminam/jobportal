"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Briefcase, Building, MapPin, DollarSign, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    skills: "",
    benefits: "",
    experienceLevel: "",
    isRemote: false,
    applicationDeadline: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.jobType) newErrors.jobType = "Job type is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.requirements.trim()) newErrors.requirements = "Requirements are required"

    // Validate salary range
    if (formData.salaryMin && formData.salaryMax) {
      const minSalary = Number.parseInt(formData.salaryMin)
      const maxSalary = Number.parseInt(formData.salaryMax)

      if (isNaN(minSalary) || isNaN(maxSalary)) {
        newErrors.salary = "Please enter valid salary numbers"
      } else if (minSalary >= maxSalary) {
        newErrors.salary = "Maximum salary must be greater than minimum salary"
      }
    }

    // Validate application deadline
    if (formData.applicationDeadline) {
      const deadline = new Date(formData.applicationDeadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (deadline <= today) {
        newErrors.applicationDeadline = "Application deadline must be in the future"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors below and try again." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: data.message })

        // Reset form
        setFormData({
          jobTitle: "",
          company: "",
          location: "",
          jobType: "",
          salaryMin: "",
          salaryMax: "",
          description: "",
          requirements: "",
          skills: "",
          benefits: "",
          experienceLevel: "",
          isRemote: false,
          applicationDeadline: "",
        })

        // Redirect to jobs page after 2 seconds
        setTimeout(() => {
          router.push("/jobs")
        }, 2000)
      } else {
        setMessage({ type: "error", text: data.error || "Failed to post job. Please try again." })
      }
    } catch (error) {
      console.error("Error posting job:", error)
      setMessage({ type: "error", text: "Network error. Please check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">JobPortal</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
                Find Jobs
              </Link>
              <Link href="/companies" className="text-gray-600 hover:text-gray-900">
                Companies
              </Link>
              <Link href="/post-job" className="font-medium text-blue-600">
                Post Job
              </Link>
            </nav>
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Find the perfect candidate for your position</p>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.jobTitle ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.company ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
              </div>

              {/* Location & Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Karnataka"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange("jobType", e.target.value)}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.jobType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                  {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Experience Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select experience level</option>
                  <option value="Entry-level">Entry-level (0-2 years)</option>
                  <option value="Mid-level">Mid-level (2-5 years)</option>
                  <option value="Senior">Senior (5+ years)</option>
                  <option value="Lead">Lead/Manager (8+ years)</option>
                </select>
              </div>

              {/* Remote Option */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  checked={formData.isRemote}
                  onChange={(e) => handleInputChange("isRemote", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isRemote" className="text-sm text-gray-700">
                  This is a remote position
                </label>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Salary Range (LPA - Lakhs Per Annum)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Min (e.g. 8)"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Max (e.g. 15)"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Application Deadline</label>
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.applicationDeadline ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.applicationDeadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="List required qualifications, experience, and skills..."
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.requirements ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Required Skills</label>
                <input
                  type="text"
                  placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Benefits</label>
                <input
                  type="text"
                  placeholder="e.g. Health Insurance, PF, Flexible Hours, Work from Home"
                  value={formData.benefits}
                  onChange={(e) => handleInputChange("benefits", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" disabled={isSubmitting}>
                  Save as Draft
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
