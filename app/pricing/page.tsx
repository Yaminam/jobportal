"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, Check, Star, Zap, Crown, ArrowRight } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small businesses just getting started",
      features: [
        "Post up to 3 jobs per month",
        "Basic job posting features",
        "Email support",
        "30-day job visibility",
        "Basic analytics",
      ],
      buttonText: "Get Started",
      popular: false,
      icon: Briefcase,
    },
    {
      name: "Professional",
      price: "₹7,999",
      period: "/month",
      description: "Ideal for growing companies with regular hiring needs",
      features: [
        "Post unlimited jobs",
        "Featured job listings",
        "Advanced filtering options",
        "Priority support",
        "60-day job visibility",
        "Detailed analytics",
        "Company branding",
        "Candidate management tools",
      ],
      buttonText: "Start Free Trial",
      popular: true,
      icon: Zap,
    },
    {
      name: "Enterprise",
      price: "₹24,999",
      period: "/month",
      description: "For large organizations with complex hiring requirements",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
        "90-day job visibility",
        "White-label solution",
        "API access",
        "Custom workflows",
        "Bulk operations",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
      popular: false,
      icon: Crown,
    },
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
            <Link href="/pricing" className="font-medium text-primary">
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the perfect plan for your hiring needs. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative hover-lift bg-card/80 backdrop-blur-sm border transition-all duration-300 ${
                  plan.popular
                    ? "border-primary shadow-2xl scale-105 bg-gradient-to-b from-primary/5 to-purple-500/5"
                    : "border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${plan.popular ? "bg-primary/10" : "bg-muted"}`}>
                      <plan.icon className={`h-8 w-8 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full transition-all duration-200 hover:scale-105 group ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "variant-outline hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 14-day free trial for the Professional plan. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, UPI, Net Banking, and bank transfers for Enterprise plans.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 30-day money-back guarantee for all paid plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground text-sm">
                  No setup fees for any plan. You only pay the monthly subscription fee.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can cancel your subscription at any time. No long-term contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of Indian companies already using JobPortal to find great talent.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="hover:scale-105 transition-all duration-200">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-200 bg-transparent">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
