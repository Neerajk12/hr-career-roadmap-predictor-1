import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildRoadmap, type Roadmap } from "@/components/roadmap/engine";

const SKILL_OPTIONS = [
  "Recruitment",
  "HR Operations",
  "Payroll",
  "Talent Acquisition",
  "Learning Dev",
  "Employee Relations",
  "Compliance",
  "Recruitment Strategy",
  "Stakeholder Management",
  "Analytics",
  "Team Leadership",
  "Talent Management",
  "HR Strategy",
  "Payroll Processing",
  "Data Management",
  "Payroll System Management",
  "C&B Strategy",
  "Salary Benchmarking",
  "Compensation Design",
  "Benefits Strategy",
  "Learning & Development",
  "Performance Management",
  "Employee Engagement",
  "L&D Strategy",
  "Program Management",
  "Labor Law",
  "Grievance Handling",
  "Conflict Resolution",
  "Leadership",
  "Organizational Development",
  "Strategy",
  "HR Transformation",
  "Business Leadership",
  "Project Management",
  "HR Tech",
  "Data Analysis",
  "Reporting",
  "HR Tech Strategy",
  "Succession Planning",
  "Career Development",
  "Change Management",
  "Culture",
  "Training",
  "DEI Strategy",
  "Policy",
  "Recruitment Metrics",
  "Data Analytics",
  "Talent Market Research",
  "Sourcing Analytics",
] as const;

const RESPONSIBILITY_OPTIONS = [
  "Interview scheduling",
  "Onboarding",
  "Sourcing",
  "Documentation",
  "Interviewing",
  "Training coordination",
  "Payroll",
  "Policy administration",
  "Full cycle hiring",
  "Leading recruitment campaigns",
  "Employer branding",
  "Managing teams",
  "Planning workforce strategy",
  "Payroll calculations",
  "Statutory reporting",
  "Oversee payroll processes",
  "Audits",
  "Team management",
  "Benefits administration",
  "Salary analysis",
  "Employee queries",
  "Design pay structures",
  "Manage benefits",
  "Engagement programs",
  "Lead L&D programs",
  "Content curation",
  "Evaluation",
  "Grievance handling",
  "Union relations",
  "Compliance",
  "Investigations",
  "Compliance audits",
  "Team leadership",
  "Policy planning",
  "Overseeing department functions",
  "Business integration",
  "HR vision",
  "People strategy",
  "Board liaison",
  "Advising organizations",
  "Solution design",
  "HR system management",
  "Reporting",
  "Manage tech implementation",
  "User training",
  "Manage talent pipelines",
  "Development plans",
  "Drive change initiatives",
  "Culture programs",
  "Implement diversity initiatives",
  "Track compliance",
  "Track hiring KPIs",
  "Analyze candidate funnel",
  "Analyze recruitment data",
  "Market mapping",
] as const;

const ROLE_OPTIONS = [
  "HR Assistant / HR Executive",
  "Recruitment Coordinator",
  "Talent Acquisition Executive",
  "HR Generalist/Operations Specialist",
  "Recruiter/Recruitment Manager",
  "Senior Recruiter",
  "Talent Acquisition Manager",
  "Payroll Executive",
  "Payroll Manager",
  "Compensation & Benefits Specialist",
  "Compensation & Benefits Manager",
  "Learning & Development Specialist",
  "L&D Manager",
  "Employee/Labor Relations Specialist",
  "Employee Relations Manager",
  "HR Business Partner (HRBP)",
  "HR Manager",
  "HR Consultant",
  "HRIS Analyst",
  "HRIS Manager",
  "Talent Management Specialist",
  "Org Development Specialist",
  "Diversity & Inclusion Specialist",
  "Recruitment Analyst",
  "Talent Acquisition Analyst",
] as const;

const schema = z.object({
  fullName: z.string().min(1, "Please fill the necessary field"),
  email: z.string().min(1, "Please fill the necessary field").email("Please enter a valid email"),
  currentRole: z.string().min(1, "Please fill the necessary field"),
  yearsExperience: z
    .string()
    .min(1, "Please fill the necessary field")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 50, "Enter 0–50"),
  skills: z.array(z.string()).min(3, "Select at least 3 skills"),
  responsibilities: z.array(z.string()).min(3, "Select at least 3 responsibilities"),
});

type FormValues = z.infer<typeof schema>;

const Index = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [result, setResult] = useState<Roadmap | null>(null);
  const [showExpertConnect, setShowExpertConnect] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      currentRole: "",
      yearsExperience: "3",
      skills: [],
      responsibilities: [],
    },
  });

  // Signature interaction: pointer-reactive gradient
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${Math.max(10, y)}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const onSubmit = (values: FormValues) => {
    const roadmap = buildRoadmap({
      fullName: values.fullName,
      email: values.email,
      currentRole: values.currentRole,
      yearsExperience: Number(values.yearsExperience),
      skills: values.skills,
      responsibilities: values.responsibilities.join(", "),
    });
    setResult(roadmap);
    
    // Start 30-second timer to show expert connect option
    setTimeout(() => {
      setShowExpertConnect(true);
    }, 30000);
  };

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "HR Career Roadmap Predictor",
      applicationCategory: "BusinessApplication",
      description:
        "Generate a personalized HR career roadmap from your skills, experience, and role.",
      url: "/",
      author: { "@type": "Organization", name: "Lovable" },
    }),
    []
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-hero">
      <Helmet>
        <title>HR Career Roadmap Predictor | Plan Your HR Growth</title>
        <meta
          name="description"
          content="Generate a personalized HR career roadmap from your skills, experience, and role. Plan next steps, skills, and certifications."
        />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <header className="text-center mb-10 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">HR Career Roadmap</span> Predictor
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              Enter your HR skills, responsibilities, experience, and role. We’ll generate a clear, practical career roadmap.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Tell us about you</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" aria-label="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@company.com" aria-label="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current role</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <SelectTrigger aria-label="Current role">
                                  <SelectValue placeholder="Select your current role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ROLE_OPTIONS.map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of experience</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} max={50} placeholder="3" aria-label="Years of experience" {...field} />
                            </FormControl>
                            <FormDescription>0–50 years</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key HR skills</FormLabel>
                          <FormDescription>Select at least 3</FormDescription>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {SKILL_OPTIONS.map((opt, idx) => {
                              const id = `skill-${idx}`;
                              const selected = Array.isArray(field.value) && field.value.includes(opt);
                              return (
                                <div key={opt} className="flex items-center gap-2">
                                  <Checkbox
                                    id={id}
                                    checked={selected}
                                    onCheckedChange={(checked) => {
                                      const prev = Array.isArray(field.value) ? field.value : [];
                                      if (checked === true) field.onChange([...prev, opt]);
                                      else field.onChange(prev.filter((v) => v !== opt));
                                    }}
                                    aria-label={`Select skill ${opt}`}
                                  />
                                  <label htmlFor={id} className="text-sm">
                                    {opt}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main responsibilities</FormLabel>
                          <FormDescription>Select at least 3</FormDescription>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {RESPONSIBILITY_OPTIONS.map((opt, idx) => {
                              const id = `resp-${idx}`;
                              const selected = Array.isArray(field.value) && field.value.includes(opt);
                              return (
                                <div key={opt} className="flex items-center gap-2">
                                  <Checkbox
                                    id={id}
                                    checked={selected}
                                    onCheckedChange={(checked) => {
                                      const prev = Array.isArray(field.value) ? field.value : [];
                                      if (checked === true) field.onChange([...prev, opt]);
                                      else field.onChange(prev.filter((v) => v !== opt));
                                    }}
                                    aria-label={`Select responsibility ${opt}`}
                                  />
                                  <label htmlFor={id} className="text-sm">
                                    {opt}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2 flex gap-3">
                      <Button type="submit" variant="hero" className="px-6 h-12">Generate roadmap</Button>
                      <Button type="button" variant="outline" onClick={() => { form.reset(); setResult(null); }}>Reset</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {!result ? (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Your personalized plan appears here</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      After you submit the form, we’ll show your predicted HR track, skill gaps, certifications, resources, and a 12-month step-by-step roadmap.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <RoadmapView result={result} showExpertConnect={showExpertConnect} />
              )}
            </div>
          </div>

          {/* Full-width sections */}
          {result && (
            <div className="mt-12 space-y-8">
              <KekaCoursesSection result={result} />
              <SkillsAndCertificationsSection result={result} />
              <AnnualLearningPlanSection result={result} />
              <RecommendedResourcesSection result={result} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

function RoadmapView({ result, showExpertConnect }: { result: Roadmap; showExpertConnect: boolean }) {
  return (
    <div className="space-y-4">
      {result.nextLikelyRole && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Next Job Role: {result.nextLikelyRole}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
            <p>{result.summary}</p>
            <div className="flex gap-3 pt-1">
              <Button variant="secondary" onClick={() => window.print()}>Print</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showExpertConnect && result.nextLikelyRole && (
        <Card className="glass-card border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">🎯</span>
              Connect with a {result.nextLikelyRole} Expert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Ready to accelerate your journey to <strong>{result.nextLikelyRole}</strong>? 
              Get personalized guidance from industry experts who've walked this path.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => window.open(`mailto:experts@hrcareer.com?subject=Expert Consultation Request - ${result.nextLikelyRole}&body=Hi! I just completed my HR career roadmap and I'm interested in connecting with a ${result.nextLikelyRole} expert for personalized guidance.%0A%0ANext Role: ${result.nextLikelyRole}%0AConfidence: ${(result.confidence * 100).toFixed(0)}%%0A%0APlease let me know available consultation slots.`, '_blank')}
              >
                Schedule Expert Call
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('/main', '_blank')}
              >
                Browse All Experts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Career Development Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {result.nextSteps.map((s, i) => (
              <li key={i} className="rounded-md border p-3">
                <div className="text-sm text-muted-foreground">{s.timeframe}</div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-muted-foreground mb-2">{s.reason}</div>
                <div className="text-xs text-muted-foreground">
                  <strong>Skills impacted:</strong> {s.skillsImpacted.join(", ")}
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

    </div>
  );
}

// Full-width section components
function KekaCoursesSection({ result }: { result: Roadmap }) {
  return (
    <div className="flex justify-center">
      <Card className="glass-card w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle>Keka Academy Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {result.kekaCourses && result.kekaCourses.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {result.kekaCourses.map((r, i) => (
                <li key={i}>
                  <a href={r.url} className="underline" target="_blank" rel="noreferrer" aria-label={`Open Keka Academy course ${r.title}`}>
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center">No specific Keka Academy courses found for this role.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SkillsAndCertificationsSection({ result }: { result: Roadmap }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Top skills to develop</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {result.skillsToDevelop.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {result.certifications.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnnualLearningPlanSection({ result }: { result: Roadmap }) {
  return (
    <div className="flex justify-center">
      <Card className="glass-card w-full max-w-6xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-primary">Annual Achievable Learning Plan</CardTitle>
          <p className="text-sm text-muted-foreground">12-month detailed task list based on your next role progression</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.monthlyPlan.map((month, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {month.month}
                  </div>
                  <h4 className="font-semibold text-foreground">Month {month.month}</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium text-blue-600">Learning</div>
                    <div className="text-muted-foreground">{month.learning}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-green-600">Practicing</div>
                    <div className="text-muted-foreground">{month.practicing}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-purple-600">Implementing & Checking Results</div>
                    <div className="text-muted-foreground">{month.implementing}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecommendedResourcesSection({ result }: { result: Roadmap }) {
  const getResourcesContent = (currentRole: string) => {
    switch (currentRole) {
      case "HR Assistant":
        return {
          title: "Here are the 5 most important recommended links (including websites and YouTube) that cover all the key topics from your learning list:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Comprehensive HR basics, onboarding, policies, payroll, compliance, and career resources.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on HRIS, payroll fundamentals, Excel for HR, recruitment, and general HR skills.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars, blogs, and podcasts focused on recruitment trends, onboarding, career growth, and HR best practices.",
              url: "workology.com"
            },
            {
              title: "Consultivo (HR Compliance - India)",
              description: "Indian labor law, documentation compliance, and legal HR training courses.",
              url: "consultivo.in/training/hr-legal-compliance-training"
            },
            {
              title: "YouTube: \"Human Resources 101\"",
              description: "Clear, beginner-friendly video on HR basics, including recruitment and payroll.",
              url: "#",
              linkText: "Watch here"
            }
          ],
          footer: "These five cover foundational knowledge, compliance, technology, skills development, and real-world HR practices comprehensively."
        };

      case "Recruitment Coordinator":
        return {
          title: "Here are 5 key resources where you can learn the recruitment and coordination skills you listed:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Extensive resources on talent sourcing, JD writing, candidate experience, compliance, and recruitment metrics.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on phone screening techniques, recruitment networking, ATS usage, hiring campaigns, and recruitment analytics.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Blogs, webinars, and podcasts focused on candidate experience, recruitment best practices, compliance, and peer reviews.",
              url: "workology.com"
            },
            {
              title: "Recruit BPM Blog: Top YouTube Recruitment Channels",
              description: "Curated YouTube channels teaching ATS tools, hiring campaigns, candidate screening, and recruitment processes.",
              url: "#",
              linkText: "Recruit BPM Blog"
            },
            {
              title: "YouTube: \"HR Series: How to become a Human Resources Assistant\"",
              description: "Includes practical tips on phone screening, interviewing, and recruitment coordination.",
              url: "#",
              linkText: "Watch here"
            }
          ],
          footer: "These resources cover tactical skills, compliance, tools, and strategic approaches for effective recruitment coordination."
        };

      case "Talent Acquisition Executive":
        return {
          title: "For learning the advanced talent acquisition and recruitment skills you listed, here are 5 important resources covering sourcing, campus recruitment, onboarding, employer branding, negotiation, analytics, and more:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Comprehensive guides on sourcing techniques (including Boolean), offer negotiation, campus recruiting, retention strategies, and employer branding.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on advanced sourcing, recruitment analytics, project management for recruiters, L&D coordination, and networking strategies.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Blogs, podcasts, and webinars covering reference checks, retention, recruitment projects, and employer branding in-depth.",
              url: "workology.com"
            },
            {
              title: "YouTube: \"Talent Acquisition Explained\"",
              description: "A clear and practical video on all aspects of talent acquisition including sourcing, employer branding, analytics, and negotiation.",
              url: "#",
              linkText: "Watch here"
            },
            {
              title: "Recruit BPM Blog: Top YouTube Recruitment Channels",
              description: "Curated channels teaching niche sourcing, campus recruitment, offer management, and recruitment data analysis.",
              url: "#",
              linkText: "Recruit BPM Blog"
            }
          ],
          footer: "These resources combined provide strategic knowledge and tactical skills to excel in advanced talent acquisition and recruitment management."
        };

      case "HR Generalist":
        return {
          title: "For mastering the HR compliance, employee engagement, benefits administration, HRIS, learning & development, and HR analytics skills you listed, here are 5 key resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Deep resources on HR compliance, labor laws, payroll dispute handling, benefits administration, and digital HR transformation.",
              url: "shrm.org"
            },
            {
              title: "Consultivo (India)",
              description: "Specialized training and blogs on Indian HR compliance, labor law, dispute resolution, and policy documentation.",
              url: "consultivo.in/training/hr-legal-compliance-training"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on engagement survey design, conflict resolution, HRIS advanced features, L&D planning, onboarding policies, and HR analytics.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars, podcasts, and articles on employee engagement, conflict resolution, digital HR, compliance reviews, and feedback culture.",
              url: "workology.com"
            },
            {
              title: "YouTube: HR.com Channel",
              description: "Practical video workshops on compliance, HRIS, conflict resolution, and HR analytics.",
              url: "#",
              linkText: "HR.com YouTube"
            }
          ],
          footer: "These resources provide legal compliance depth, surveys, HR systems knowledge, learning & development strategies, and modern HR transformation insights to build your expertise."
        };

      case "HR Operation Specialist":
        return {
          title: "Here are 5 important resources where you can learn the HR skills you listed:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "In-depth resources on HR compliance, laws, benefits administration, payroll disputes, onboarding policy, engagement surveys, compliance reviews, and digital HR transformation.",
              url: "shrm.org"
            },
            {
              title: "Consultivo (India)",
              description: "Focused training and articles on Indian HR compliance, labor laws, policy documentation, and conflict resolution.",
              url: "consultivo.in/training/hr-legal-compliance-training"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on engagement survey methods, conflict resolution, HRIS advanced features, L&D planning, onboarding policies, HR analytics, and self/manager feedback techniques.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Blogs, webinars, and podcasts covering employee engagement, conflict resolution workshops, digital HR transformation, compliance documentation, and feedback culture.",
              url: "workology.com"
            },
            {
              title: "YouTube: HR.com Channel",
              description: "Video tutorials and workshops on compliance, payroll dispute handling, HRIS advanced features, conflict resolution, onboarding policy, and HR analytics.",
              url: "#",
              linkText: "HR.com YouTube"
            }
          ],
          footer: "These cover legal depth, engagement methods, HR tech, compliance, learning & development, and feedback essentials for HR professionals."
        };

      case "HR Executive":
        return {
          title: "For learning the HR foundational and operational skills you listed, here are 5 essential resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Covers recruitment basics, payroll, onboarding, HR policies, compliance, and career planning.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Offers courses on HRIS basics, Excel training for HR, onboarding practices, and recruitment trends.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars, blogs, and podcasts on recruitment trends, onboarding, compliance, and HR networking.",
              url: "workology.com"
            },
            {
              title: "CiteHR Community",
              description: "A helpful forum and community for HR professionals focusing on policy, compliance, and peer advice.",
              url: "citehr.com"
            },
            {
              title: "YouTube: \"Human Resources 101\"",
              description: "Beginner-friendly video covering recruitment, payroll, onboarding basics, and HR fundamentals.",
              url: "#",
              linkText: "Watch here"
            }
          ],
          footer: "These resources collectively provide foundational content, practical guides, community support, and learning programs tailored for HR professionals starting and growing in their careers."
        };

      case "Recruiter":
        return {
          title: "For the advanced recruitment skills you listed, here are 5 important resources to learn from:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Extensive resources on interview frameworks, sourcing strategies, JD creation, offer management, compliance, and employer branding.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on advanced sourcing techniques, recruitment analytics, compliance training, mentoring, and employer branding.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Blogs, webinars, and podcasts covering recruitment best practices, early-career hiring, team collaboration, and analytics reporting.",
              url: "workology.com"
            },
            {
              title: "Recruit BPM Blog: Top YouTube Recruitment Channels",
              description: "Videos and tutorials on advanced sourcing, recruitment campaigns, employer branding, and compliance practices.",
              url: "#",
              linkText: "Recruit BPM Blog"
            },
            {
              title: "YouTube: \"Talent Acquisition Explained\"",
              description: "Practical explanations of interviewing frameworks, employer branding, sourcing, and recruitment reporting.",
              url: "#",
              linkText: "Watch here"
            }
          ],
          footer: "These resources provide deep strategic and tactical knowledge suited for advanced recruiters and hiring managers."
        };

      case "Recruitment Manager":
        return {
          title: "To master these advanced recruitment skills, here are 5 highly valuable learning resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Offers comprehensive articles, templates, and guides on interview frameworks, sourcing, JD creation, compliance, offer management, employer branding, and recruitment analytics.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Online courses covering advanced sourcing techniques, recruitment analytics, compliance in hiring, leadership in early-career programs, mentoring, and employer branding strategies.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars, blogs, and podcasts providing actionable insights into recruitment best practices, team collaboration, talent engagement, and recruitment reporting.",
              url: "workology.com"
            },
            {
              title: "Recruit BPM Blog: Top YouTube Recruitment Channels",
              description: "A curated collection of YouTube channels with tutorials on advanced sourcing, compliance, employer branding, recruiting analytics, and candidate experience.",
              url: "#",
              linkText: "Recruit BPM Blog"
            },
            {
              title: "YouTube: \"Talent Acquisition Explained\"",
              description: "Detailed video walkthroughs of advanced recruitment topics including offer negotiation, sourcing strategies, and recruitment process analytics.",
              url: "#",
              linkText: "Watch here"
            }
          ],
          footer: "These platforms combine strategic knowledge, practical how-tos, and up-to-date industry insights to help you build excellence in talent acquisition and recruitment leadership."
        };

      case "Learning & Development Specialist":
        return {
          title: "For learning the Learning & Development (L&D) skills you listed, here are 5 key resources:",
          resources: [
            {
              title: "LinkedIn Learning",
              description: "Courses on L&D strategy, adult learning theory, digital learning workshops, content creation, blended learning, and performance improvement.",
              url: "linkedin.com/learning"
            },
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Research and articles covering L&D best practices, ROI on training, coaching, reward systems, and impact measurement.",
              url: "shrm.org"
            },
            {
              title: "Workology",
              description: "Blogs, podcasts, and webinars on learning strategy, participant feedback, coaching methods, and recognition programs.",
              url: "workology.com"
            },
            {
              title: "YouTube: \"Learning and Development Strategy\" Channels",
              description: "Search for channels providing workshops and tutorials on L&D management, performance improvement tools, and blended learning approaches.",
              url: "#",
              linkText: "eLearning Industry YouTube"
            },
            {
              title: "ATD (Association for Talent Development)",
              description: "Offers resources, courses, and communities focused on adult learning theories, L&D impact measurement, and digital learning trends.",
              url: "td.org"
            }
          ],
          footer: "These resources provide structured learning, practical insights, and community interaction to build expertise in all critical areas of Learning & Development."
        };

      case "Employee Relations Specialist":
        return {
          title: "To learn the Employee Relations (ER) and labor law skills you listed, here are 5 important resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Comprehensive resources on labor laws, union relations, conflict mediation, negotiation, employee handbook policies, and court rulings.",
              url: "shrm.org"
            },
            {
              title: "Consultivo (India)",
              description: "Specialized courses and updates on Indian labor laws, compliance processes, and labor relations training.",
              url: "consultivo.in/training/hr-legal-compliance-training"
            },
            {
              title: "Workology",
              description: "Webinars, blogs, and podcasts on conflict resolution, labor market trends, negotiation techniques, and ER policy training.",
              url: "workology.com"
            },
            {
              title: "HR.com Webinars and Videos",
              description: "Live and recorded sessions on labor relations, audit processes, workplace psychology, and ER best practices.",
              url: "#",
              linkText: "HR.com YouTube"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on workplace psychology, labor law updates, conflict mediation, negotiation, and labor market analysis.",
              url: "linkedin.com/learning"
            }
          ],
          footer: "These platforms cover legal depth, mediation skills, labor market insights, policy training, and hands-on ER management techniques comprehensively."
        };

      case "Labour Relations Specialist":
        return {
          title: "To learn the Labour Relations and labor law skills you listed, here are 5 important resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Comprehensive resources on labor laws, union relations, conflict mediation, negotiation, employee handbook policies, and court rulings.",
              url: "shrm.org"
            },
            {
              title: "Consultivo (India)",
              description: "Specialized courses and updates on Indian labor laws, compliance processes, and labor relations training.",
              url: "consultivo.in/training/hr-legal-compliance-training"
            },
            {
              title: "Workology",
              description: "Webinars, blogs, and podcasts on conflict resolution, labor market trends, negotiation techniques, and ER policy training.",
              url: "workology.com"
            },
            {
              title: "HR.com Webinars and Videos",
              description: "Live and recorded sessions on labor relations, audit processes, workplace psychology, and ER best practices.",
              url: "#",
              linkText: "HR.com YouTube"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on workplace psychology, labor law updates, conflict mediation, negotiation, and labor market analysis.",
              url: "linkedin.com/learning"
            }
          ],
          footer: "These platforms cover legal depth, mediation skills, labor market insights, policy training, and hands-on ER management techniques comprehensively."
        };

      case "HR Manager":
        return {
          title: "For learning these advanced HR leadership and strategic skills, here are 5 key resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management) Leadership & Compliance Programs",
              description: "Executive leadership development, compliance updates, diversity & inclusion certifications, reward and benefits strategies, and HR best practices.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on executive leadership, change management, HR technology trends, talent retention, and coaching emerging leaders.",
              url: "linkedin.com/learning"
            },
            {
              title: "Harvard Business Review – HR Leadership",
              description: "Articles and insights on global HR strategies, leadership forums, talent retention, and change management.",
              url: "hbr.org/topic/human-resourcemanagement"
            },
            {
              title: "Workology",
              description: "Webinars, podcasts, and blogs focused on mentoring, executive coaching, diversity & inclusion, and strategic HR leadership.",
              url: "workology.com"
            },
            {
              title: "Association for Change Management Professionals (ACMP)",
              description: "Certification programs and resources on change management methodologies relevant to HR leaders.",
              url: "acmpglobal.org"
            }
          ],
          footer: "These platforms offer deep practical knowledge, certifications, leadership networking, and strategic insights to excel as an HR leader and mentor."
        };

      case "HR Director":
        return {
          title: "Here are 5 important resources to learn the advanced HR leadership and strategic skills you listed:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Executive leadership programs, legal compliance, diversity & inclusion certification, rewards & benefits strategies, and global HR best practices.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on HR technology trends, executive coaching, change management, talent retention, and leadership development.",
              url: "linkedin.com/learning"
            },
            {
              title: "Harvard Business Review (HBR) – HR Leadership",
              description: "Thought leadership on executive HR strategy, change management, retention, and HR performance measurement.",
              url: "hbr.org/topic/human-resourcemanagement"
            },
            {
              title: "Workology",
              description: "Webinars, podcasts, and articles about mentoring, coaching, diversity, inclusion, and leadership forums.",
              url: "workology.com"
            },
            {
              title: "Association for Change Management Professionals (ACMP)",
              description: "Change management certification and resources tailored for HR leaders managing transformation.",
              url: "acmpglobal.org"
            }
          ],
          footer: "These platforms offer comprehensive learning, certification, and practical insights to advance your HR leadership and strategic capabilities."
        };

      case "HRBP":
        return {
          title: "To learn these advanced HR Business Partner (HRBP) skills, here are 5 important resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Advanced HRBP certifications, performance management, organizational development, conflict resolution, and workforce planning.",
              url: "shrm.org"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on stakeholder management, HR analytics tools, negotiation, influence, leadership strategy, and succession planning.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars, podcasts, and articles covering HRBP best practices, peer review techniques, workforce planning, and conflict resolution.",
              url: "workology.com"
            },
            {
              title: "HR.com Webinars and Forums",
              description: "Industry-specific HRBP forums, leadership strategy sessions, negotiation workshops, and networking events.",
              url: "#",
              linkText: "HR.com YouTube"
            },
            {
              title: "Association for Talent Development (ATD)",
              description: "Training and resources on organizational development theories, HR analytics, and leadership development for HRBPs.",
              url: "td.org"
            }
          ],
          footer: "These platforms provide certifications, practical tools, collaborative forums, and strategic insights for elevating HRBP expertise and leadership."
        };

      case "CHRO":
        return {
          title: "To learn these advanced CHRO leadership skills, here are 5 important resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Executive leadership strategy, global compliance, governance, workforce trends, talent acquisition strategy, and crisis management.",
              url: "shrm.org"
            },
            {
              title: "Harvard Business Review (HBR) – HR Leadership",
              description: "Insightful articles and research on executive HR strategy, organizational development, leadership mentoring, and HR crisis response.",
              url: "hbr.org/topic/human-resourcemanagement"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on executive leadership, global compliance, talent acquisition strategies, workforce trends, and organizational development.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars and podcasts focused on executive HR leadership, employee engagement pilots, mentoring senior leaders, and committee leadership.",
              url: "workology.com"
            },
            {
              title: "WorldatWork",
              description: "Resources and certifications on compensation, talent management, organizational development, and leadership effectiveness for executives.",
              url: "worldatwork.org"
            }
          ],
          footer: "These resources combine strategic frameworks, executive insights, and leadership development aimed at high-level HR professionals driving organizational success."
        };

      case "VP of HR":
        return {
          title: "To learn these advanced VP-HR leadership skills, here are 5 important resources:",
          resources: [
            {
              title: "SHRM (Society for Human Resource Management)",
              description: "Executive leadership strategy, global compliance, governance, workforce trends, talent acquisition strategy, and crisis management.",
              url: "shrm.org"
            },
            {
              title: "Harvard Business Review (HBR) – HR Leadership",
              description: "Insightful articles and research on executive HR strategy, organizational development, leadership mentoring, and HR crisis response.",
              url: "hbr.org/topic/human-resourcemanagement"
            },
            {
              title: "LinkedIn Learning",
              description: "Courses on executive leadership, global compliance, talent acquisition strategies, workforce trends, and organizational development.",
              url: "linkedin.com/learning"
            },
            {
              title: "Workology",
              description: "Webinars and podcasts focused on executive HR leadership, employee engagement pilots, mentoring senior leaders, and committee leadership.",
              url: "workology.com"
            },
            {
              title: "WorldatWork",
              description: "Resources and certifications on compensation, talent management, organizational development, and leadership effectiveness for executives.",
              url: "worldatwork.org"
            }
          ],
          footer: "These resources combine strategic frameworks, executive insights, and leadership development aimed at high-level HR professionals driving organizational success."
        };

      default:
        return null;
    }
  };

  const content = getResourcesContent(result.currentRole);

  if (!content) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <Card className="glass-card w-full max-w-6xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-primary">Resource Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">{content.title}</p>
          
          <div className="space-y-4">
            {content.resources.map((resource, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="font-semibold text-foreground">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="text-sm">
                      {resource.url !== "#" ? (
                        <a 
                          href={`https://${resource.url}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {resource.url}
                        </a>
                      ) : (
                        <span className="text-primary">{resource.linkText}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {content.footer && (
            <p className="text-sm text-muted-foreground italic border-t pt-4">
              {content.footer}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;
