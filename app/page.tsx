"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
} from "lucide-react"
import Link from "next/link"
import NetworkBackground from "@/components/network-background"
import ThemeToggle from "@/components/theme-toggle"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { motion } from "framer-motion"
import NeuralNetwork from "@/components/neural-network"
import AIParticles from "@/components/ai-particles"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast.success("Message sent successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <NeuralNetwork />
      <AIParticles />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Aayush Ujjwal</span>
            <Badge variant="outline" className="ml-2">
              Data Scientist
            </Badge>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#experience" className="transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="#projects" className="transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="#skills" className="transition-colors hover:text-primary">
              Skills
            </Link>
            <Link href="#education" className="transition-colors hover:text-primary">
              Education
            </Link>
            <Link href="#contact" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="hidden md:flex">
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container relative grid items-center gap-6 pb-8 pt-24 md:pt-32 md:pb-12"
      >
        <div className="flex max-w-[980px] flex-col items-start gap-4">
          <div className="animate-fade-in">
            <Badge className="mb-4" variant="outline">
              Available for opportunities
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Hi, I'm <span className="text-primary">Aayush Ujjwal</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-xl text-muted-foreground">Data Science Enthusiast & AI Specialist</p>
            <p className="mt-4 max-w-[700px] text-lg text-muted-foreground">
              Transforming complex data into actionable insights and building intelligent solutions.
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <Button asChild size="lg" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
          <div className="mt-8 flex gap-4 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com/in/aayush-ujjwal" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Aayush-ujjwal" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:aayushujjwal@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://instagram.com/aayush.ujjwal" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="about"
        className="container py-12 md:py-24 lg:py-32 relative"
      >
        <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">About Me</h2>
            <p className="text-muted-foreground leading-relaxed">
              I am a recent Data Science graduate with a specialization in AI and Data Science from KR Mangalam
              University (2024). Through academic projects and internships, I have gained experience in machine
              learning, data analytics, and programming.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I am eager to apply my skills in Python, JavaScript, and frameworks like TensorFlow and React.js to
              real-world challenges. I bring a passion for learning, problem-solving, and a strong foundation in
              data-driven decision-making.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-medium">Patna, India</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="font-medium">aayushujjwal@gmail.com</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="font-medium">+91 7857907674</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Availability</span>
                <span className="font-medium">Open to opportunities</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src="/images/profile.png" alt="Aayush Ujjwal" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="experience"
        className="container py-12 md:py-24 lg:py-32 bg-muted/30 relative"
      >
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            Work Experience
          </h2>
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Junior Data Scientist</CardTitle>
                  <CardDescription>Devout Growth Media Pvt Ltd</CardDescription>
                </div>
                <Badge>July 2024 - Present</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <span className="font-medium">Customer Segmentation and Personalization:</span> Analyzed customer data
                  to build segmentation models that allowed for hyper-personalized marketing strategies, which led to a
                  improvement in customer engagement and conversion rates.
                </li>
                <li>
                  <span className="font-medium">A/B Testing and Campaign Analysis:</span> Conducted A/B testing and
                  multivariate experiments to measure campaign effectiveness and optimize ad spend, achieving a
                  reduction in cost per acquisition (CPA).
                </li>
                <li>
                  <span className="font-medium">Lead Scoring Model Development:</span> Designed and deployed lead
                  scoring models that identified high-value prospects, increasing lead-to-customer conversion and
                  driving more efficient use of sales resources.
                </li>
                <li>
                  <span className="font-medium">Data-Driven Insights for Content Strategy:</span> Provided insights
                  through data analysis on consumer behavior and content engagement, leading to a boost in organic
                  traffic and SEO performance.
                </li>
                <li>
                  <span className="font-medium">Dashboard Creation and Reporting:</span> Created interactive dashboards
                  for stakeholders to visualize key metrics and performance indicators.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="projects"
        className="container py-12 md:py-24 lg:py-32 relative"
      >
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src="/images/talent-scout.png"
                  alt="Talent Scout Hiring Assistant"
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Talent Scout Hiring Assistant</CardTitle>
                <CardDescription>AI-powered recruitment tool</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  An intelligent hiring assistant that streamlines the recruitment process by analyzing resumes,
                  matching candidates to job descriptions, and providing insights to help make better hiring decisions.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">AI</Badge>
                  <Badge variant="secondary">NLP</Badge>
                  <Badge variant="secondary">Machine Learning</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="https://github.com/Aayush-ujjwal/talentscout-hiring-assistant"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link
                    href="https://talent-scout-hiring-assistant-ten.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src="/images/ev-battery.png"
                  alt="EV Battery Performance"
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Smart Strategies for EV Battery Performance</CardTitle>
                <CardDescription>Battery optimization research</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Developed strategies to enhance electric vehicle battery performance through data analysis and machine
                  learning algorithms, focusing on extending battery life and improving efficiency.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Data Analysis</Badge>
                  <Badge variant="secondary">Machine Learning</Badge>
                  <Badge variant="secondary">Predictive Modeling</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link
                    href="https://github.com/Aayush-ujjwal/Smart-Strategies-for-Enhanced-Electric-Vehicle-Battery-Performance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src="/images/fake-news.png"
                  alt="Fake News Detection"
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Fake News Detection</CardTitle>
                <CardDescription>NLP-based classification system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Built a machine learning model to identify and classify fake news articles using natural language
                  processing techniques, text analysis, and classification algorithms.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">NLP</Badge>
                  <Badge variant="secondary">Machine Learning</Badge>
                  <Badge variant="secondary">Text Classification</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link
                    href="https://github.com/Aayush-ujjwal/Fake-news-detection"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="skills"
        className="container py-12 md:py-24 lg:py-32 bg-muted/30 relative"
      >
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 text-center">Technical Skills</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Python
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    JavaScript
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>R
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    C++
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center">Frameworks/Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    React.js
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Node.js
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Express.js
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    TensorFlow
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center">Database</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    MySQL
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    SQL
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-center">Coursework</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    DBMS
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Machine Learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Deep Learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full bg-primary"></Badge>
                    Data Visualization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">R Programming for Data Science</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://verify.netcredential.com/roy8g3LxbW" target="_blank" rel="noopener noreferrer">
                      Verify Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Deep Learning and Neural Network</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://verify.netcredential.com/roy89njcvt" target="_blank" rel="noopener noreferrer">
                      Verify Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Machine Learning and Pattern Recognition</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://verify.netcredential.com/roy84TipnN" target="_blank" rel="noopener noreferrer">
                      Verify Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Data Visualization and Story Telling</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://verify.netcredential.com/roy8i70tTs" target="_blank" rel="noopener noreferrer">
                      Verify Certificate
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="mt-6 text-center">
              <button 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                View All Skills Certificates
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="education"
        className="container py-12 md:py-24 lg:py-32 relative"
      >
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>BCA (Specialization of AI and Data Science)</CardTitle>
                    <CardDescription>KR Mangalam University</CardDescription>
                  </div>
                  <Badge>2022 - 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Specialized in Artificial Intelligence and Data Science, focusing on machine learning algorithms, data
                  analysis techniques, and AI applications.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Bachelor in Data Science</CardTitle>
                    <CardDescription>SP Jain School of Global Management</CardDescription>
                  </div>
                  <Badge>2021 - 2022</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Studied foundational concepts in data science, statistics, and programming, building a strong base for
                  advanced studies in AI and machine learning.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Achievements
            </h3>
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle>2nd Rank in Robofest Competition</CardTitle>
                <CardDescription>Dr Zakir Hussain Institute</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Achieved second place in the prestigious Robofest Competition, demonstrating skills in robotics,
                  programming, and problem-solving.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="contact"
        className="container py-12 md:py-24 lg:py-32 bg-muted/30 relative"
      >
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 text-center">Get In Touch</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>aayushujjwal@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <Link
                    href="https://linkedin.com/in/aayush-ujjwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    linkedin.com/in/aayush-ujjwal
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <Link
                    href="https://github.com/Aayush-ujjwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    github.com/Aayush-ujjwal
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      {...form.register("name")}
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      {...form.register("email")}
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      {...form.register("subject")}
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Subject"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      {...form.register("message")}
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-t py-6 md:py-0"
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Aayush Ujjwal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Aayush-ujjwal" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com/in/aayush-ujjwal" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:aayushujjwal@gmail.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://instagram.com/aayush.ujjwal" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

