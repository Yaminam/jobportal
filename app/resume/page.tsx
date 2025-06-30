"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "@/hooks/use-toast"
import {
  Briefcase,
  Upload,
  FileText,
  Download,
  Trash2,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Cloud,
} from "lucide-react"

interface ResumeFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  url: string
  isActive: boolean
}

export default function ResumePage() {
  const [user, setUser] = useState(null)
  const [resumes, setResumes] = useState<ResumeFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user")
      if (!userData) {
        window.location.href = "/login"
        return
      }

      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load existing resumes
      const savedResumes = localStorage.getItem("userResumes")
      if (savedResumes) {
        setResumes(JSON.parse(savedResumes))
      }
    }
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file upload with progress
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create file URL (in real app, this would be from your file storage service)
      const fileUrl = URL.createObjectURL(file)

      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        url: fileUrl,
        isActive: resumes.length === 0, // First resume is active by default
      }

      const updatedResumes = [...resumes, newResume]
      setResumes(updatedResumes)
      localStorage.setItem("userResumes", JSON.stringify(updatedResumes))

      setUploadProgress(100)

      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully uploaded.",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const setActiveResume = (id: string) => {
    const updatedResumes = resumes.map((resume) => ({
      ...resume,
      isActive: resume.id === id,
    }))
    setResumes(updatedResumes)
    localStorage.setItem("userResumes", JSON.stringify(updatedResumes))

    toast({
      title: "Active Resume Updated",
      description: "This resume will now be used for job applications.",
    })
  }

  const deleteResume = (id: string) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== id)

    // If we deleted the active resume, make the first remaining resume active
    if (updatedResumes.length > 0 && !updatedResumes.some((r) => r.isActive)) {
      updatedResumes[0].isActive = true
    }

    setResumes(updatedResumes)
    localStorage.setItem("userResumes", JSON.stringify(updatedResumes))

    toast({
      title: "Resume Deleted",
      description: "Resume has been successfully deleted.",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />
    }
    return <FileText className="h-8 w-8 text-blue-500" />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
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
            <Link href="/dashboard" className="hover:text-primary transition-colors duration-200">
              Dashboard
            </Link>
            <Link href="/resume" className="font-medium text-primary">
              Resume
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              asChild
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Resume Management
          </h1>
          <p className="text-muted-foreground text-lg">Upload and manage your resumes for job applications</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Cloud className="h-12 w-12 text-primary animate-bounce" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Uploading Resume...</p>
                    <Progress value={uploadProgress} className="mt-2 max-w-xs mx-auto" />
                    <p className="text-sm text-muted-foreground mt-1">{uploadProgress}% complete</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drop your resume here</p>
                    <p className="text-muted-foreground">or click to browse files</p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Resume List */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Your Resumes ({resumes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No resumes uploaded</h3>
                <p className="text-muted-foreground mb-6">Upload your first resume to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:bg-muted/30 ${
                      resume.isActive ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {getFileIcon(resume.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{resume.name}</h3>
                          {resume.isActive && (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatFileSize(resume.size)}</span>
                          <span>Uploaded {new Date(resume.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(resume.url, "_blank")}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = resume.url
                          link.download = resume.name
                          link.click()
                        }}
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {!resume.isActive && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveResume(resume.id)}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Set Active
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteResume(resume.id)}
                        className="hover:scale-105 transition-transform duration-200 hover:text-destructive hover:border-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Resume Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Best Practices</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Keep it to 1-2 pages maximum</li>
                  <li>• Use a clean, professional format</li>
                  <li>• Include relevant keywords from job descriptions</li>
                  <li>• Quantify your achievements with numbers</li>
                  <li>• Proofread for spelling and grammar errors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">File Guidelines</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• PDF format is preferred for compatibility</li>
                  <li>• Use a descriptive filename (e.g., "John_Doe_Resume.pdf")</li>
                  <li>• Keep file size under 5MB</li>
                  <li>• Ensure text is selectable (not just an image)</li>
                  <li>• Test opening on different devices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
