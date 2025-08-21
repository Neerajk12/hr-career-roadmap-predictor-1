export type RoadmapInput = {
  fullName: string
  email: string
  currentRole: string
  yearsExperience: number
  skills: string[]
  responsibilities: string
}

export type RoadmapStep = {
  timeframe: string
  title: string
  reason: string
  skillsImpacted: string[]
}

export type Roadmap = {
  track: string
  confidence: number
  summary: string
  nextSteps: RoadmapStep[]
  skillsToDevelop: string[]
  certifications: string[]
  resources: { title: string; url: string }[]
  kekaCourses: { title: string; url: string }[]
  monthlyPlan: { month: number; learning: string; practicing: string; implementing: string }[]
}

const TRACKS = [
  { id: "ta", name: "Talent Acquisition", keywords: ["recruit", "sourc", "hiring", "interview", "employer branding"] },
  { id: "hrbp", name: "HR Business Partner", keywords: ["employee relations", "business partner", "stakeholder", "workforce planning", "org design", "performance"] },
  { id: "cb", name: "Compensation & Benefits", keywords: ["compensation", "benefit", "payroll", "salary", "benchmark", "job grading"] },
  { id: "ld", name: "Learning & Development", keywords: ["learning", "training", "facilitation", "coaching", "enablement", "onboarding"] },
  { id: "pa", name: "People Analytics", keywords: ["analytics", "data", "excel", "sql", "bi", "dashboard", "metrics"] },
  { id: "ops", name: "HR Operations / HRIS", keywords: ["hris", "workday", "sap", "system", "process", "policy", "ops", "operations"] },
]

const CORE_BY_TRACK: Record<string, string[]> = {
  ta: ["sourcing", "interviewing", "stakeholder mgmt", "employer branding", "candidate experience"],
  hrbp: ["employee relations", "org design", "workforce planning", "performance mgmt", "change mgmt"],
  cb: ["salary benchmarking", "job architecture", "pay equity", "benefits design", "reward strategy"],
  ld: ["needs analysis", "curriculum design", "facilitation", "lms admin", "evaluation (kirkpatrick)"],
  pa: ["excel / sheets", "sql or no-sql", "data visualization", "people metrics", "experimentation"],
  ops: ["hris admin", "process design", "policy writing", "payroll coordination", "compliance"]
}

const CERTS_BY_TRACK: Record<string, string[]> = {
  ta: ["LinkedIn Talent Solutions Cert", "Social Talent TA", "SHRM-CP"],
  hrbp: ["PHR / SHRM-CP", "SHRM-SCP (later)", "CIPD Level 5"],
  cb: ["WorldatWork C1-C4", "Excel/SQL for HR", "SHRM-SCP"],
  ld: ["ATD CPLP / APTD", "Instructional Design", "Facilitation Skills"],
  pa: ["Google Data Analytics", "People Analytics (Wharton)", "SQL Basics"],
  ops: ["Workday / SAP module", "Payroll Foundations", "Lean / Six Sigma Yellow"]
}

const RESOURCES_BY_TRACK: Record<string, { title: string; url: string }[]> = {
  ta: [
    { title: "Social Talent - Recruiting", url: "https://www.socialtalent.com/" },
    { title: "Boolean basics", url: "https://booleanstrings.com/" },
  ],
  hrbp: [
    { title: "Josh Bersin - HRBP", url: "https://joshbersin.com/" },
    { title: "Org Design Basics", url: "https://hbr.org/topic/subject/organizational-structure" },
  ],
  cb: [
    { title: "WorldatWork", url: "https://worldatwork.org/" },
    { title: "Radford Surveys", url: "https://radford.aon.com/" },
  ],
  ld: [
    { title: "ATD", url: "https://www.td.org/" },
    { title: "Instructional Design 101", url: "https://www.coursera.org/" },
  ],
  pa: [
    { title: "Google Data Analytics", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
    { title: "People Analytics Intro", url: "https://www.coursera.org/learn/wharton-people-analytics" },
  ],
  ops: [
    { title: "Workday Learning", url: "https://www.workday.com/" },
    { title: "Lean Basics", url: "https://www.coursera.org/learn/lean-six-sigma" },
  ],
}

const KEKA_COURSES_BY_TRACK: Record<string, { title: string; url: string }[]> = {
  ta: [
    { title: "Keka ATS Certification course", url: "https://academy.keka.com/courses/keka-hire-ats-certification/" },
    { title: "HR BootCamp Masterclass Certification", url: "https://academy.keka.com/courses/hr-bootcamp/" },
  ],
  hrbp: [
    { title: "HR Generalist Certification Course", url: "https://academy.keka.com/courses/hr-generalist-certification-course/" },
    { title: "Employee Engagement Certification Course", url: "https://academy.keka.com/courses/employee-engagement-course/" },
    { title: "PMS (Performance Management) Certification Course", url: "https://academy.keka.com/courses/performance-management/" },
    { title: "POSH Certification Course", url: "https://academy.keka.com/courses/posh-certification-fundamentals-for-hr/" },
  ],
  cb: [
    { title: "Compensation and Benefits Certification Course", url: "https://academy.keka.com/courses/compensation-and-benefits/" },
    { title: "India Payroll Certification Course", url: "https://academy.keka.com/courses/indian-payroll/" },
  ],
  ld: [
    { title: "HR BootCamp Masterclass Certification", url: "https://academy.keka.com/courses/hr-bootcamp/" },
    { title: "AI in HR Certification Course", url: "https://academy.keka.com/courses/ai-in-hr/" },
    { title: "Employee Engagement Certification Course", url: "https://academy.keka.com/courses/employee-engagement-course/" },
  ],
  pa: [
    { title: "People Analytics Certification Course", url: "https://academy.keka.com/courses/people-analytics-certification/" },
    { title: "AI in HR Certification Course", url: "https://academy.keka.com/courses/ai-in-hr/" },
  ],
  ops: [
    { title: "Core HR Certification Course", url: "https://academy.keka.com/courses/core-hr/" },
    { title: "India Payroll Certification Course", url: "https://academy.keka.com/courses/indian-payroll/" },
    { title: "HR Generalist Certification Course", url: "https://academy.keka.com/courses/hr-generalist-certification-course/" },
  ],
}

type RoleCombo = {
  rolePatterns: string[]
  keySkills: string[]
  responsibilities: string[]
  minExp: number
  maxExp?: number
  nextRole: string
  trackId?: string
}

const ROLE_COMBINATIONS: RoleCombo[] = [
  {
    rolePatterns: ["hr generalist", "hr operations specialist", "hr operations"],
    keySkills: ["hr operations", "employee relations", "compliance"],
    responsibilities: ["onboarding", "policy administration", "training coordination", "payroll support"],
    minExp: 2,
    maxExp: 7,
    nextRole: "HR Manager / Employee Relations Manager",
    trackId: "ops",
  },
  {
    rolePatterns: ["recruiter", "recruitment manager", "talent acquisition"],
    keySkills: ["recruitment", "talent acquisition", "hr operations"],
    responsibilities: ["sourcing candidates", "interview scheduling", "onboarding", "policy administration"],
    minExp: 2,
    maxExp: 7,
    nextRole: "Senior Recruiter / Talent Acquisition Director",
    trackId: "ta",
  },
  {
    rolePatterns: [
      "learning & development specialist",
      "l&d specialist",
      "learning and development",
    ],
    keySkills: ["learning & development", "performance management", "hr operations"],
    responsibilities: ["training coordination", "onboarding", "engagement programs"],
    minExp: 2,
    maxExp: 7,
    nextRole: "HRBP / L&D Manager",
    trackId: "ld",
  },
  {
    rolePatterns: [
      "employee relations specialist",
      "labor relations specialist",
      "employee/labor relations specialist",
    ],
    keySkills: ["employee relations", "labor relations", "compliance"],
    responsibilities: [
      "grievance handling",
      "union/labor relations",
      "compliance & audits",
      "policy administration",
    ],
    minExp: 2,
    maxExp: 7,
    nextRole: "Employee Relations Manager / HR Manager",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["hr assistant", "hr executive"],
    keySkills: ["recruitment", "hr operations", "payroll"],
    responsibilities: [
      "interview scheduling",
      "onboarding",
      "sourcing candidates",
      "employee documentation",
    ],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruitment Coordinator / Talent Acquisition Executive",
    trackId: "ops",
  },
  {
    rolePatterns: ["recruitment coordinator"],
    keySkills: ["recruitment", "talent acquisition", "hr operations"],
    responsibilities: [
      "sourcing candidates",
      "interview scheduling",
      "onboarding",
    ],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruiter / HR Generalist",
    trackId: "ta",
  },
  {
    rolePatterns: ["talent acquisition executive"],
    keySkills: ["recruitment", "talent acquisition", "learning & development"],
    responsibilities: [
      "sourcing candidates",
      "interview scheduling",
      "onboarding",
      "training coordination",
    ],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruiter / Talent Acquisition Manager",
    trackId: "ta",
  },
  {
    rolePatterns: ["hr manager", "hr director"],
    keySkills: [
      "hr operations",
      "employee relations",
      "compliance",
      "performance management",
    ],
    responsibilities: [
      "policy administration",
      "compliance & audits",
      "training coordination",
      "employee documentation",
    ],
    minExp: 8,
    maxExp: 12,
    nextRole: "HR Director / CHRO / VP HR",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["hr business partner", "hrbp"],
    keySkills: ["performance management", "hr operations", "employee relations"],
    responsibilities: [
      "engagement programs",
      "policy administration",
      "compliance & audits",
    ],
    minExp: 7,
    maxExp: 10,
    nextRole: "Director HR / CHRO",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["chro", "vp hr", "director of hr"],
    keySkills: [
      "hr operations",
      "performance management",
      "compliance",
      "compensation & benefits",
    ],
    responsibilities: [
      "policy administration",
      "engagement programs",
      "compliance & audits",
      "training coordination",
    ],
    minExp: 12,
    maxExp: 40,
    nextRole: "Top-most HR Executive",
    trackId: "hrbp",
  },
]

function scoreRoleCombo(input: RoadmapInput, skills: string[], resp: string[], combo: RoleCombo) {
  const role = (input.currentRole || '').toLowerCase()
  const inExpRange = input.yearsExperience >= combo.minExp && (combo.maxExp == null || input.yearsExperience <= combo.maxExp)
  const nearExp = Math.abs(input.yearsExperience - combo.minExp) <= 1 || (combo.maxExp != null && Math.abs(input.yearsExperience - combo.maxExp) <= 1)
  const roleHit = combo.rolePatterns.some((p) => role.includes(p)) ? 3 : 0
  const skillHits = combo.keySkills.reduce((acc, s) => acc + (skills.some((k) => k.includes(s.toLowerCase())) ? 1 : 0), 0)
  const respHits = combo.responsibilities.reduce((acc, r) => acc + (resp.some((rr) => rr.includes(r.toLowerCase())) ? 0.8 : 0), 0)
  const expScore = inExpRange ? 2 : nearExp ? 1 : 0
  return roleHit + skillHits + respHits + expScore
}

function tokenize(input: string | string[]): string[] {
  const text = Array.isArray(input) ? input.join(",") : input
  return text
    .split(/[\,\n]/g)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const skills = tokenize(input.skills)
  const resp = tokenize(input.responsibilities)
  const all = [...skills, ...resp]

  // Try to match explicit role/skill/responsibility + experience combinations (from reference grid)
  const comboScores = ROLE_COMBINATIONS.map((c) => ({ c, score: scoreRoleCombo(input, skills, resp, c) }))
  comboScores.sort((a, b) => b.score - a.score)
  const bestCombo = comboScores[0]

  // Infer track from keywords as a baseline
  let bestTrack = TRACKS[0]
  let bestScore = -1
  for (const t of TRACKS) {
    const score = t.keywords.reduce((acc, k) => acc + (all.some((w) => w.includes(k)) ? 1 : 0), 0)
    if (score > bestScore) {
      bestTrack = t
      bestScore = score
    }
  }

  // If the combo strongly matches and suggests a track, prefer it
  if (bestCombo && bestCombo.score >= 3 && bestCombo.c.trackId) {
    const override = TRACKS.find((t) => t.id === bestCombo.c.trackId)
    if (override) bestTrack = override
  }

  // Confidence blends keyword match and combo match
  const keywordConf = Math.min(1, Math.max(0.3, bestScore / 5))
  const comboConf = bestCombo ? Math.min(1, bestCombo.score / 6) : 0
  const confidence = Math.min(1, Math.max(0.3, 0.6 * keywordConf + 0.4 * comboConf))

  // Compute gaps
  const core = CORE_BY_TRACK[bestTrack.id]
  const gaps = core.filter((c) => !all.some((w) => w.includes(c.split(" ")[0])))

  // Map role to development plan
  const getPlanForRole = (role: string): string => {
    const earlyFoundations = ["HR Assistant/Human Resources Assistant", "HR Administrator", "Recruitment Coordinator", "Recruiter"];
    const coreOperations = ["HR Specialist/Human Resource Specialist", "HR Generalist", "Employee Relations Specialist", "Learning & Development Specialist"];
    const strategicLeadership = ["HR Business Partner (HRBP)", "HR Manager", "Senior Recruiter/Talent Acquisition Manager"];
    const executiveLeadership = ["Director of Human Resources/HR Director", "Vice President, Human Resources (VP HR)", "Chief Human Resources Officer (CHRO)/Chief People Officer", "HR Consultant"];

    if (earlyFoundations.includes(role)) return "Early HR Foundations";
    if (coreOperations.includes(role)) return "Core HR Operations";
    if (strategicLeadership.includes(role)) return "Strategic HR & Leadership";
    if (executiveLeadership.includes(role)) return "Executive HR Leadership & Consulting";
    return "Core HR Operations"; // default
  };

  const getMonthlyLearningPlan = (trackName: string): { month: number; learning: string; practicing: string; implementing: string }[] => {
    const track = trackName.toLowerCase();
    
    // Map track names to appropriate learning plans
    if (track.includes("talent acquisition")) {
      // HR Co-ordinator plan for Talent Acquisition track
      return [
        { month: 1, learning: "Understand core HR functions and HR admin duties", practicing: "Assist with employee data management and document filing", implementing: "Ensure accurate and organized employee records" },
        { month: 2, learning: "Study recruitment basics and interview coordination", practicing: "Support scheduling interviews and candidate communication", implementing: "Track scheduling accuracy and candidate feedback" },
        { month: 3, learning: "Learn onboarding processes and documentation", practicing: "Help onboard new hires and prepare orientation materials", implementing: "Collect and report new hire feedback" },
        { month: 4, learning: "Study HR policies and compliance requirements", practicing: "Review and organize policy documents", implementing: "Update records and ensure compliance alignment" },
        { month: 5, learning: "Take basic HRIS training", practicing: "Enter and maintain employee data in HRIS", implementing: "Audit HRIS entries for accuracy and report issues" },
        { month: 6, learning: "Understand payroll process basics", practicing: "Support payroll data collection and validation", implementing: "Report payroll discrepancies to HR coordinator" },
        { month: 7, learning: "Develop communication and interpersonal skills", practicing: "Handle employee queries and assist with HR communications", implementing: "Improve employee satisfaction through clear communication" },
        { month: 8, learning: "Participate in HR meetings and team discussions", practicing: "Share insights or assist in note-taking during meetings", implementing: "Enhance team collaboration and follow-up execution" },
        { month: 9, learning: "Learn basic Excel and data tracking skills", practicing: "Maintain recruitment and onboarding trackers", implementing: "Ensure data integrity and generate status reports" },
        { month: 10, learning: "Study candidate sourcing methods and tools", practicing: "Assist in sourcing and maintaining candidate database", implementing: "Improve candidate pipeline quality and data accuracy" },
        { month: 11, learning: "Join HR forums and online communities", practicing: "Engage in discussions and share HR best practices", implementing: "Apply learned ideas to streamline HR admin tasks" },
        { month: 12, learning: "Review yearly performance and set new goals", practicing: "Request feedback from supervisors and peers", implementing: "Draft a transition plan for role upgrade to HR Coordinator" }
      ];
    }
    
    // Default fallback
    return [
      { month: 1, learning: "Study core HR concepts", practicing: "Apply learnings in daily work", implementing: "Track progress and improvements" },
      { month: 2, learning: "Develop specialized skills", practicing: "Lead small HR projects", implementing: "Measure project outcomes" },
      { month: 3, learning: "Build stakeholder relationships", practicing: "Collaborate across departments", implementing: "Gather feedback from partners" },
      { month: 4, learning: "Learn new HR technologies", practicing: "Implement process improvements", implementing: "Document efficiency gains" },
      { month: 5, learning: "Attend industry events", practicing: "Share insights with team", implementing: "Apply best practices learned" },
      { month: 6, learning: "Focus on data and analytics", practicing: "Create meaningful HR reports", implementing: "Use data to drive decisions" },
      { month: 7, learning: "Develop leadership skills", practicing: "Mentor junior colleagues", implementing: "Track mentoring outcomes" },
      { month: 8, learning: "Study compliance requirements", practicing: "Conduct compliance audits", implementing: "Address any gaps found" },
      { month: 9, learning: "Explore strategic HR topics", practicing: "Contribute to strategic planning", implementing: "Present strategic recommendations" },
      { month: 10, learning: "Build external network", practicing: "Participate in HR communities", implementing: "Share learnings with organization" },
      { month: 11, learning: "Review year's accomplishments", practicing: "Prepare for next role transition", implementing: "Create development roadmap" },
      { month: 12, learning: "Plan next year's growth", practicing: "Set challenging new goals", implementing: "Align goals with career path" }
    ];
  };

  // Build next steps based on experience, then tailor first step to the predicted next role if available
  const y = input.yearsExperience
  const baseRole = input.currentRole || bestTrack.name
  const nextLikelyRole = bestCombo && bestCombo.score >= 3 ? bestCombo.c.nextRole : undefined
  const nextSteps: RoadmapStep[] = []
  if (y < 3) {
    nextSteps.push(
      { 
        timeframe: "Stage 1", 
        title: `Strengthen ${bestTrack.name} foundations`, 
        reason: `Solidify fundamentals and ship 2–3 portfolio examples in ${bestTrack.name}.`,
        skillsImpacted: ["Core HR competencies", "Process efficiency", "Stakeholder communication"]
      },
      { 
        timeframe: "Stage 2", 
        title: `Progress to Senior ${baseRole.includes(bestTrack.name) ? baseRole : bestTrack.name}`, 
        reason: "Own end-to-end initiatives and mentor juniors.",
        skillsImpacted: ["Technical expertise", "Leadership skills", "Project management"]
      },
      { 
        timeframe: "Stage 3", 
        title: `${bestTrack.id === 'hrbp' ? 'HRBP' : 'Lead'} role readiness`, 
        reason: "Demonstrate measurable business impact; lead cross-functional projects.",
        skillsImpacted: ["Strategic thinking", "Business acumen", "Change leadership"]
      },
    )
  } else if (y < 7) {
    nextSteps.push(
      { 
        timeframe: "Stage 1", 
        title: `Own a core pillar in ${bestTrack.name}`, 
        reason: "Define KPIs and deliver a playbook for repeatability.",
        skillsImpacted: ["Subject matter expertise", "Process optimization", "Analytics"]
      },
      { 
        timeframe: "Stage 2", 
        title: `${bestTrack.name} Lead / Manager`, 
        reason: "Lead small team or programs across regions/business units.",
        skillsImpacted: ["People management", "Cross-functional collaboration", "Strategic planning"]
      },
      { 
        timeframe: "Stage 3", 
        title: `Head of ${bestTrack.name} (scope expansion)`, 
        reason: "Expand remit, budget, and stakeholder complexity.",
        skillsImpacted: ["Executive presence", "Budget management", "Organizational design"]
      },
    )
  } else {
    nextSteps.push(
      { 
        timeframe: "Stage 1", 
        title: `Sharpen strategic narrative in ${bestTrack.name}`, 
        reason: "Create a 12–18 month strategy with ROI model.",
        skillsImpacted: ["Strategic vision", "Financial acumen", "Executive communication"]
      },
      { 
        timeframe: "Stage 2", 
        title: `Head/Director of ${bestTrack.name}`, 
        reason: "Define operating model and governance; scale team.",
        skillsImpacted: ["Organizational transformation", "Governance design", "Talent management"]
      },
      { 
        timeframe: "Stage 3", 
        title: `VP People – ${bestTrack.name} focus`, 
        reason: "Own multi-pillar strategy aligned to business outcomes.",
        skillsImpacted: ["Business partnership", "Cultural transformation", "Board-level influence"]
      },
    )
  }

  if (nextLikelyRole) {
    nextSteps[0] = {
      timeframe: nextSteps[0].timeframe,
      title: `Target next role: ${nextLikelyRole}`,
      reason: "Based on your role, experience, and selected skills/responsibilities.",
      skillsImpacted: nextSteps[0].skillsImpacted
    }
  }

  const monthlyPlan = getMonthlyLearningPlan(bestTrack.name);

  const certifications = CERTS_BY_TRACK[bestTrack.id]
  const resources = RESOURCES_BY_TRACK[bestTrack.id]
  const kekaCourses = KEKA_COURSES_BY_TRACK[bestTrack.id] ?? []
  const summaryBase = `${input.fullName.split(" ")[0]}, based on your ${y} years in ${input.currentRole || 'HR'}, your strongest trajectory is ${bestTrack.name}.`
  const summary = nextLikelyRole
    ? `${summaryBase} Likely next role: ${nextLikelyRole}. The plan below focuses on clear next roles, skill gaps, and high-ROI learning.`
    : `${summaryBase} The plan below focuses on clear next roles, skill gaps, and high-ROI learning.`


  return {
    track: bestTrack.name,
    confidence: Math.round(confidence * 100) / 100,
    summary,
    nextSteps,
    skillsToDevelop: gaps.slice(0, 5),
    certifications,
    resources,
    kekaCourses,
    monthlyPlan,
  }
}