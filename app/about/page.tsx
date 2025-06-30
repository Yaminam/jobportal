"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, Users, Target, Award, Heart, Globe, Zap, Shield, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Priya Sharma",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Former VP of Engineering at TCS with 15+ years in the Indian tech industry.",
    },
    {
      name: "Arjun Patel",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Full-stack developer and AI enthusiast, previously at Infosys and Wipro.",
    },
    {
      name: "Sneha Reddy",
      role: "Head of Product",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Product strategist with a passion for user experience and growth in Indian markets.",
    },
    {
      name: "Rahul Kumar",
      role: "Head of Sales",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Sales leader with expertise in B2B SaaS and enterprise solutions across India.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "People First",
      description:
        "We believe great companies are built by great people. Every decision we make puts people at the center.",
    },
    {
      icon: Globe,
      title: "India-Focused",
      description: "Connecting talent across India to create opportunities that transcend geographical boundaries.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible in recruitment technology for India.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data and privacy are paramount. We maintain the highest security standards.",
    },
  ]

  const stats = [
    { number: "5,00,000+", label: "Active Job Seekers" },
    { number: "50,000+", label: "Partner Companies" },
    { number: "10,00,000+", label: "Successful Matches" },
    { number: "95%", label: "Customer Satisfaction" },
  ]

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

      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-animation opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              About JobPortal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to connect India's talent with the best opportunities, making career growth accessible
              to everyone, everywhere across the country.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="stagger-item">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              JobPortal was founded in 2020 with a simple yet powerful vision: to democratize access to career
              opportunities across India and help people find work they love. What started as a small team of passionate
              technologists in Bangalore has grown into a nationwide platform connecting millions of job seekers with
              thousands of companies across India.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              We recognized that the traditional job search process in India was broken – it was time-consuming,
              inefficient, and often favored those with existing networks over those with the best skills. We set out to
              build something different: a platform that would level the playing field and make great opportunities
              accessible to everyone, from tier-1 cities to smaller towns.
            </p>

            <p className="text-lg leading-relaxed">
              Today, JobPortal is proud to be the bridge between ambitious Indian professionals and forward-thinking
              companies. We've facilitated over 10 lakh successful job placements and continue to innovate in the
              recruitment space, always with our core mission in mind: connecting the right people with the right
              opportunities across India.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 text-center stagger-item"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">The passionate people behind JobPortal</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 text-center stagger-item"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <Target className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            To create an India where everyone has access to meaningful work opportunities, where companies can easily
            find the talent they need, and where the job search process is transparent, efficient, and fair for all
            Indians.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="hover:scale-105 transition-all duration-200">
              <Link href="/jobs">
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Recognition & Awards
            </h2>
            <p className="text-muted-foreground">We're honored to be recognized by industry leaders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best HR Tech Startup 2023</h3>
                <p className="text-muted-foreground">Economic Times Startup Awards</p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Top 50 Indian SaaS Companies</h3>
                <p className="text-muted-foreground">NASSCOM 2023</p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-card/80 backdrop-blur-sm border border-border/50 text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation in Recruitment</h3>
                <p className="text-muted-foreground">India HR Excellence Awards 2023</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
