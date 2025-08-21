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
  "Talent Acquisition",
  "Employee Relations",
  "Labor Relations",
  "Learning & Development",
  "Compensation & Benefits",
  "Payroll",
  "HR Operations",
  "Compliance",
  "HRIS",
  "Performance Management",
] as const;

const RESPONSIBILITY_OPTIONS = [
  "Sourcing candidates",
  "Interview scheduling",
  "Onboarding",
  "Employee documentation",
  "Payroll support",
  "Policy administration",
  "Training coordination",
  "Grievance handling",
  "Union/labor relations",
  "Engagement programs",
  "Compliance & audits",
] as const;

const ROLE_OPTIONS = [
  "HR Assistant/Human Resources Assistant",
  "Recruitment Coordinator",
  "HR Specialist/Human Resource Specialist",
  "HR Generalist",
  "HR Administrator",
  "Recruiter",
  "Learning & Development Specialist",
  "Employee Relations Specialist",
  "HR Business Partner (HRBP)",
  "HR Manager",
  "Senior Recruiter/Talent Acquisition Manager",
  "Director of Human Resources/HR Director",
  "Vice President, Human Resources (VP HR)",
  "Chief Human Resources Officer (CHRO)/Chief People Officer",
  "HR Consultant",
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
                      After you submit the form, we’ll show your predicted HR track, skill gaps, certifications, resources, and a 36-month step-by-step roadmap.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <RoadmapView result={result} />
              )}
            </div>
          </div>

          {/* Full-width sections */}
          {result && (
            <div className="mt-12 space-y-8">
              <KekaCoursesSection result={result} />
              <AnnualLearningPlanSection result={result} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

function RoadmapView({ result }: { result: Roadmap }) {
  return (
    <div className="space-y-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recommended Track: {result.track}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
          <p>{result.summary}</p>
          <div className="flex gap-3 pt-1">
            <Button variant="secondary" onClick={() => window.print()}>Print</Button>
          </div>
        </CardContent>
      </Card>

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

      <div className="flex justify-end">
        <Card className="glass-card w-full md:w-1/2">
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
            <p className="text-sm text-muted-foreground text-center">No specific Keka Academy courses found for this track.</p>
          )}
        </CardContent>
      </Card>
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

export default Index;
