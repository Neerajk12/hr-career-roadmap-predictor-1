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
  currentRole: string
  confidence: number
  summary: string
  nextSteps: RoadmapStep[]
  skillsToDevelop: string[]
  certifications: string[]
  resources: { title: string; url: string }[]
  kekaCourses: { title: string; url: string }[]
  monthlyPlan: { month: number; learning: string; practicing: string; implementing: string }[]
  nextLikelyRole?: string
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

const ROLE_SPECIFIC_DATA: Record<string, {
  kekaCourses: { title: string; url: string }[]
  skillsToDevelop: string[]
  resources: { title: string; url: string }[]
}> = {
  "Recruitment Coordinator": {
    kekaCourses: [
      { title: "Core HR Certification", url: "https://academy.keka.com/courses/core-hr-certification" },
      { title: "Keka Hire ATS Certification", url: "https://academy.keka.com/courses/keka-hire-ats-certification" }
    ],
    skillsToDevelop: ["Communication", "ATS use", "Recruitment coordination"],
    resources: [
      { title: "HR Foundations", url: "https://www.linkedin.com/learning/hr-foundations" },
      { title: "Recruitment Foundations", url: "https://www.linkedin.com/learning/recruitment-foundations" }
    ]
  },
  "Recruiter": {
    kekaCourses: [
      { title: "Keka Hire ATS Certification", url: "https://academy.keka.com/courses/keka-hire-ats-certification" }
    ],
    skillsToDevelop: ["Candidate screening", "CV writing", "Interview scheduling"],
    resources: [
      { title: "Recruitment Strategies", url: "https://www.linkedin.com/learning/recruitment-strategies" }
    ]
  },
  "Recruiter/TA Manager": {
    kekaCourses: [
      { title: "HR Generalist Certification", url: "https://academy.keka.com/courses/hr-generalist-certification" }
    ],
    skillsToDevelop: ["Employer branding", "Negotiation", "TA metrics"],
    resources: [
      { title: "Advanced Interviewing Techniques", url: "https://www.linkedin.com/learning/advanced-interviewing-techniques" }
    ]
  },
  "HR Manager/Employee Relations": {
    kekaCourses: [
      { title: "Core HR Certification", url: "https://academy.keka.com/courses/core-hr-certification" }
    ],
    skillsToDevelop: ["Employee relations", "Policy", "Conflict resolution"],
    resources: [
      { title: "HR Business Partner Foundations", url: "https://www.linkedin.com/learning/hr-business-partner-foundations" }
    ]
  },
  "Senior Recruiter": {
    kekaCourses: [
      { title: "Performance Management System", url: "https://academy.keka.com/courses/performance-management-system" }
    ],
    skillsToDevelop: ["Strategic sourcing", "Analytics", "Leadership"],
    resources: [
      { title: "Recruitment Analytics and Reporting", url: "https://www.linkedin.com/learning/recruitment-analytics-and-reporting" }
    ]
  },
  "TA Manager": {
    kekaCourses: [
      { title: "Keka Hire ATS Sol-in-HR", url: "https://academy.keka.com/courses/sol-in-hr" }
    ],
    skillsToDevelop: ["Sourcing teams", "Influencing", "Analytics"],
    resources: [
      { title: "Talent Sourcing Techniques", url: "https://www.linkedin.com/learning/talent-sourcing-techniques" }
    ]
  },
  "Head TA/HRBP": {
    kekaCourses: [
      { title: "HR Generalist Certification", url: "https://academy.keka.com/courses/hr-generalist-certification" }
    ],
    skillsToDevelop: ["Leadership", "Strategy", "Analytics"],
    resources: [
      { title: "Strategic Talent Acquisition", url: "https://www.linkedin.com/learning/strategic-talent-acquisition" }
    ]
  },
  "Payroll Manager": {
    kekaCourses: [
      { title: "Crafting Pay in India Master Payroll", url: "https://academy.keka.com/courses/crafting-pay-in-india-master-payroll" }
    ],
    skillsToDevelop: ["Payroll tech", "Accuracy", "Tax knowledge"],
    resources: [
      { title: "Payroll Fundamentals", url: "https://www.linkedin.com/learning/payroll-fundamentals" }
    ]
  },
  "HR Manager": {
    kekaCourses: [
      { title: "Core HR Certification", url: "https://academy.keka.com/courses/core-hr-certification" }
    ],
    skillsToDevelop: ["Leadership", "Audit", "Systems integration"],
    resources: [
      { title: "Advanced Payroll Management", url: "https://www.linkedin.com/learning/advanced-payroll-management" }
    ]
  },
  "Compensation Manager": {
    kekaCourses: [
      { title: "Compensation and Benefits", url: "https://academy.keka.com/courses/compensation-and-benefits" }
    ],
    skillsToDevelop: ["Salary design", "Negotiation", "Data analysis"],
    resources: [
      { title: "Compensation and Benefits", url: "https://www.linkedin.com/learning/compensation-and-benefits" }
    ]
  },
  "HR Director": {
    kekaCourses: [
      { title: "Performance Management System", url: "https://academy.keka.com/courses/performance-management-system" }
    ],
    skillsToDevelop: ["Strategy", "Change management", "Leadership"],
    resources: [
      { title: "Strategic Compensation", url: "https://www.linkedin.com/learning/strategic-compensation" }
    ]
  },
  "L&D Manager": {
    kekaCourses: [
      { title: "Performance Management System", url: "https://academy.keka.com/courses/performance-management-system" }
    ],
    skillsToDevelop: ["Instructional design", "Engagement", "Soft skills"],
    resources: [
      { title: "Learning and Development Foundations", url: "https://www.linkedin.com/learning/learning-and-development-foundations" }
    ]
  },
  "Head L&D": {
    kekaCourses: [
      { title: "Keka Hire ATS Sol-in-HR", url: "https://academy.keka.com/courses/sol-in-hr" }
    ],
    skillsToDevelop: ["Strategy", "Vendor management", "Data interpretation"],
    resources: [
      { title: "Learning and Development", url: "https://www.linkedin.com/learning/learning-and-development" }
    ]
  },
  "Employee Relations Mgr": {
    kekaCourses: [
      { title: "HR Generalist Certification", url: "https://academy.keka.com/courses/hr-generalist-certification" }
    ],
    skillsToDevelop: ["Negotiation", "Legal knowledge", "Mediation"],
    resources: [
      { title: "Employee Relations", url: "https://www.linkedin.com/learning/employee-relations" }
    ]
  },
  "Director/CHRO": {
    kekaCourses: [
      { title: "AI in HR", url: "https://academy.keka.com/courses/ai-in-hr" }
    ],
    skillsToDevelop: ["Strategic partnership", "Data literacy", "Digital HR"],
    resources: [
      { title: "HR Business Partner Foundations", url: "https://www.linkedin.com/learning/hr-business-partner-foundations" }
    ]
  },
  "VP HR": {
    kekaCourses: [
      { title: "Performance Management System", url: "https://academy.keka.com/courses/performance-management-system" }
    ],
    skillsToDevelop: ["Executive coaching", "Business strategy", "Risk management"],
    resources: [
      { title: "Executive Leadership", url: "https://www.linkedin.com/learning/executive-leadership" }
    ]
  },
  "CHRO": {
    kekaCourses: [],
    skillsToDevelop: ["Enterprise leadership", "Transformation management"],
    resources: [
      { title: "Leading People Through Change", url: "https://www.linkedin.com/learning/leading-people-through-change" }
    ]
  },
  "Group CHRO": {
    kekaCourses: [],
    skillsToDevelop: ["Leadership", "Decision-making", "Governance"],
    resources: [
      { title: "Strategic Human Resources Planning", url: "https://www.linkedin.com/learning/strategic-human-resources-planning" }
    ]
  },
  "Senior Consultant": {
    kekaCourses: [],
    skillsToDevelop: ["Client management", "Business analysis", "Agile HR"],
    resources: [
      { title: "Business Consulting Foundations", url: "https://www.linkedin.com/learning/business-consulting-foundations" }
    ]
  },
  "HRIS Manager": {
    kekaCourses: [
      { title: "Fundamentals of People Analytics", url: "https://academy.keka.com/courses/fundamentals-of-people-analytics" }
    ],
    skillsToDevelop: ["System Configuration", "Data Visualization"],
    resources: [
      { title: "HR Technology", url: "https://www.linkedin.com/learning/hr-technology" }
    ]
  },
  "Talent Management Manager": {
    kekaCourses: [],
    skillsToDevelop: ["Project Management", "Leadership"],
    resources: [
      { title: "Project Management Foundations", url: "https://www.linkedin.com/learning/project-management-foundations" }
    ]
  },
  "Head of Org Development": {
    kekaCourses: [],
    skillsToDevelop: ["Strategic HR", "Communication"],
    resources: [
      { title: "Organizational Change Management", url: "https://www.linkedin.com/learning/organizational-change-management" }
    ]
  },
  "D&I Manager": {
    kekaCourses: [],
    skillsToDevelop: ["Advocacy", "Program Management"],
    resources: [
      { title: "Diversity and Inclusion in the Workplace", url: "https://www.linkedin.com/learning/diversity-and-inclusion-in-the-workplace" }
    ]
  },
  "Recruitment Manager": {
    kekaCourses: [],
    skillsToDevelop: ["Reporting", "Data Interpretation"],
    resources: [
      { title: "Hiring Analytics and Reporting", url: "https://www.linkedin.com/learning/hiring-analytics-and-reporting" }
    ]
  },
  "Talent Acquisition Manager": {
    kekaCourses: [],
    skillsToDevelop: ["Strategic Sourcing", "Communication"],
    resources: [
      { title: "Strategic Talent Acquisition", url: "https://www.linkedin.com/learning/strategic-talent-acquisition" }
    ]
  }
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
  // Entry Level (0-2 years)
  {
    rolePatterns: ["hr assistant", "hr executive"],
    keySkills: ["recruitment", "hr operations", "payroll"],
    responsibilities: ["interview scheduling", "onboarding", "sourcing", "documentation"],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruitment Coordinator",
    trackId: "ops",
  },
  {
    rolePatterns: ["recruitment coordinator"],
    keySkills: ["recruitment", "talent acquisition", "hr operations"],
    responsibilities: ["sourcing", "interview scheduling", "onboarding"],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruiter",
    trackId: "ta",
  },
  {
    rolePatterns: ["talent acquisition executive"],
    keySkills: ["recruitment", "talent acquisition", "learning dev"],
    responsibilities: ["sourcing", "interview scheduling", "onboarding", "training coordination"],
    minExp: 0,
    maxExp: 2,
    nextRole: "Recruiter/TA Manager",
    trackId: "ta",
  },
  
  // Mid Level (2-7 years)
  {
    rolePatterns: ["hr generalist", "operations specialist"],
    keySkills: ["hr operations", "employee relations", "compliance"],
    responsibilities: ["onboarding", "policy administration", "training coordination", "payroll"],
    minExp: 2,
    maxExp: 7,
    nextRole: "HR Manager/Employee Relations",
    trackId: "ops",
  },
  {
    rolePatterns: ["recruiter", "recruitment manager"],
    keySkills: ["recruitment", "talent acquisition", "hr operations"],
    responsibilities: ["full cycle hiring", "onboarding", "policy administration"],
    minExp: 2,
    maxExp: 7,
    nextRole: "Senior Recruiter",
    trackId: "ta",
  },
  {
    rolePatterns: ["senior recruiter"],
    keySkills: ["recruitment strategy", "stakeholder management", "analytics"],
    responsibilities: ["leading recruitment campaigns", "employer branding"],
    minExp: 4,
    maxExp: 8,
    nextRole: "TA Manager",
    trackId: "ta",
  },
  {
    rolePatterns: ["talent acquisition manager"],
    keySkills: ["team leadership", "talent management", "hr strategy"],
    responsibilities: ["managing recruitment teams", "planning workforce strategy"],
    minExp: 5,
    maxExp: 10,
    nextRole: "Head TA/HRBP",
    trackId: "ta",
  },
  {
    rolePatterns: ["payroll executive"],
    keySkills: ["payroll processing", "compliance", "data management"],
    responsibilities: ["payroll calculations", "statutory reporting"],
    minExp: 1,
    maxExp: 4,
    nextRole: "Payroll Manager",
    trackId: "ops",
  },
  {
    rolePatterns: ["payroll manager"],
    keySkills: ["payroll system management", "compliance"],
    responsibilities: ["oversee payroll processes", "audits", "team management"],
    minExp: 5,
    maxExp: 10,
    nextRole: "HR Manager",
    trackId: "ops",
  },
  {
    rolePatterns: ["compensation", "benefits specialist"],
    keySkills: ["c&b strategy", "salary benchmarking", "compliance"],
    responsibilities: ["benefits administration", "salary analysis", "employee queries"],
    minExp: 3,
    maxExp: 7,
    nextRole: "Compensation Manager",
    trackId: "cb",
  },
  {
    rolePatterns: ["compensation", "benefits manager"],
    keySkills: ["compensation design", "benefits strategy"],
    responsibilities: ["design pay structures", "manage benefits"],
    minExp: 8,
    maxExp: 12,
    nextRole: "HR Director",
    trackId: "cb",
  },
  {
    rolePatterns: ["learning", "development specialist"],
    keySkills: ["learning & development", "performance management", "employee engagement"],
    responsibilities: ["training coordination", "onboarding", "engagement programs"],
    minExp: 2,
    maxExp: 7,
    nextRole: "L&D Manager",
    trackId: "ld",
  },
  {
    rolePatterns: ["l&d manager"],
    keySkills: ["l&d strategy", "program management"],
    responsibilities: ["lead l&d programs", "content curation", "evaluation"],
    minExp: 5,
    maxExp: 10,
    nextRole: "Head L&D",
    trackId: "ld",
  },
  {
    rolePatterns: ["employee relations specialist", "labor relations specialist"],
    keySkills: ["labor law", "grievance handling", "compliance"],
    responsibilities: ["grievance handling", "union relations", "compliance"],
    minExp: 2,
    maxExp: 7,
    nextRole: "Employee Relations Mgr",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["employee relations manager"],
    keySkills: ["conflict resolution", "employee relations", "leadership"],
    responsibilities: ["lead employee relations", "investigations"],
    minExp: 5,
    maxExp: 10,
    nextRole: "HR Manager",
    trackId: "hrbp",
  },
  
  // Senior Level (7-15 years)
  {
    rolePatterns: ["hr business partner", "hrbp"],
    keySkills: ["performance management", "hr operations", "employee relations"],
    responsibilities: ["engagement programs", "policy administration", "compliance audits"],
    minExp: 7,
    maxExp: 10,
    nextRole: "Director/CHRO",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["hr manager"],
    keySkills: ["hr operations", "employee relations", "compliance"],
    responsibilities: ["policy administration", "compliance", "team leadership"],
    minExp: 7,
    maxExp: 12,
    nextRole: "HR Director",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["hr director"],
    keySkills: ["strategic hr", "leadership", "compliance"],
    responsibilities: ["policy planning", "hr department leadership"],
    minExp: 10,
    maxExp: 15,
    nextRole: "VP HR",
    trackId: "hrbp",
  },
  
  // Executive Level (12+ years)
  {
    rolePatterns: ["vice president hr", "vp hr"],
    keySkills: ["organizational development", "leadership", "strategy"],
    responsibilities: ["overseeing hr functions", "business integration"],
    minExp: 12,
    maxExp: 18,
    nextRole: "CHRO",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["chief hr officer", "chro"],
    keySkills: ["hr transformation", "business leadership"],
    responsibilities: ["hr vision", "people strategy", "compliance", "board liaison"],
    minExp: 15,
    maxExp: 25,
    nextRole: "Group CHRO",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["hr consultant"],
    keySkills: ["hr strategy", "compliance", "project management"],
    responsibilities: ["advising organizations", "solution design"],
    minExp: 10,
    maxExp: 20,
    nextRole: "Senior Consultant",
    trackId: "hrbp",
  },
  
  // Specialist Roles
  {
    rolePatterns: ["hris analyst"],
    keySkills: ["hr tech", "data analysis", "reporting"],
    responsibilities: ["hr system management", "reporting"],
    minExp: 1,
    maxExp: 4,
    nextRole: "HRIS Manager",
    trackId: "ops",
  },
  {
    rolePatterns: ["hris manager"],
    keySkills: ["hr tech strategy", "team leadership"],
    responsibilities: ["manage hr tech implementation", "user training"],
    minExp: 5,
    maxExp: 10,
    nextRole: "HR Manager",
    trackId: "ops",
  },
  {
    rolePatterns: ["talent management specialist"],
    keySkills: ["succession planning", "career development"],
    responsibilities: ["manage talent pipelines", "development plans"],
    minExp: 3,
    maxExp: 7,
    nextRole: "Talent Management Manager",
    trackId: "ld",
  },
  {
    rolePatterns: ["org development specialist"],
    keySkills: ["change management", "culture", "training"],
    responsibilities: ["drive change initiatives", "culture programs"],
    minExp: 5,
    maxExp: 10,
    nextRole: "Head of Org Development",
    trackId: "ld",
  },
  {
    rolePatterns: ["diversity", "inclusion specialist"],
    keySkills: ["dei strategy", "policy", "training"],
    responsibilities: ["implement diversity initiatives", "track compliance"],
    minExp: 3,
    maxExp: 7,
    nextRole: "D&I Manager",
    trackId: "hrbp",
  },
  {
    rolePatterns: ["recruitment analyst"],
    keySkills: ["recruitment metrics", "data analytics"],
    responsibilities: ["track hiring kpis", "analyze candidate funnel"],
    minExp: 1,
    maxExp: 4,
    nextRole: "Recruitment Manager",
    trackId: "ta",
  },
  {
    rolePatterns: ["talent acquisition analyst"],
    keySkills: ["talent market research", "sourcing analytics"],
    responsibilities: ["analyze recruitment data", "market mapping"],
    minExp: 2,
    maxExp: 5,
    nextRole: "Talent Acquisition Manager",
    trackId: "ta",
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

  const getMonthlyLearningPlan = (currentRole: string): { month: number; learning: string; practicing: string; implementing: string }[] => {
    const role = currentRole.toLowerCase();
    
    if (role.includes("hr coordinator") || role.includes("hr co-ordinator")) {
      return [
        { month: 1, learning: "Understand core HR functions and HR admin duties", practicing: "Assist with employee data management and document filing", implementing: "Ensure accurate and organized employee records" },
        { month: 2, learning: "Study recruitment basics and interview coordination", practicing: "Support scheduling interviews and candidate communication", implementing: "Track scheduling accuracy and candidate feedback" },
        { month: 3, learning: "Learn onboarding processes and documentation", practicing: "Help onboard new hires and prepare orientation materials", implementing: "Collect and report new hire feedback" },
        { month: 4, learning: "Study HR policies and compliance requirements", practicing: "Review and organize policy documents", implementing: "Update records and ensure compliance alignment" },
        { month: 5, learning: "Take basic HRIS training", practicing: "Enter and maintain employee data in HRIS", implementing: "Audit HRIS entries for accuracy and report issues" },
        { month: 6, learning: "Understand payroll process basics", practicing: "Support payroll data collection and validation", implementing: "Report payroll discrepancies to HR coordinator" },
        { month: 7, learning: "Develop communication and interpersonal skills", practicing: "Handle employee queries and assist with HR communication", implementing: "Improve employee satisfaction through clear communication" },
        { month: 8, learning: "Participate in HR meetings and team discussions", practicing: "Share insights or assist in note-taking during meetings", implementing: "Enhance team collaboration and follow-up execution" },
        { month: 9, learning: "Learn basic Excel and data tracking skills", practicing: "Maintain recruitment and onboarding trackers", implementing: "Ensure data integrity and generate status reports" },
        { month: 10, learning: "Study candidate sourcing methods and tools", practicing: "Assist in sourcing and maintaining candidate database", implementing: "Improve candidate pipeline quality and data accuracy" },
        { month: 11, learning: "Join HR forums and online communities", practicing: "Engage in discussions and share HR best practices", implementing: "Apply learned ideas to streamline HR admin tasks" },
        { month: 12, learning: "Review yearly performance and set new goals", practicing: "Request feedback from supervisors and peers", implementing: "Draft a transition plan for role upgrade to HR Coordinator" }
      ];
    }

    if (role.includes("hr assistant") || role.includes("hr executive")) {
      return [
        { month: 1, learning: "Study HR basics (recruitment payroll)", practicing: "Assist interview scheduling & documentation", implementing: "Track new processes learned" },
        { month: 2, learning: "Learn onboarding best practices", practicing: "Support onboarding of 1-2 new hires", implementing: "Collect new hire feedback" },
        { month: 3, learning: "Take HRIS basics course", practicing: "Enter/update employee data into system", implementing: "Audit for data errors" },
        { month: 4, learning: "Read blog documentation & compliance", practicing: "Organize employee files", implementing: "Cross-check organization vs. checklist" },
        { month: 5, learning: "Study basic HR policies", practicing: "Draft template for onboarding docs", implementing: "Review/check with supervisor" },
        { month: 6, learning: "Understand payroll fundamentals", practicing: "Support payroll processing", implementing: "Report discrepancies, suggest improvement" },
        { month: 7, learning: "Attend HR webinars", practicing: "Summarize learnings for team", implementing: "Email summary, ask for feedback" },
        { month: 8, learning: "Shadow a senior HR executive", practicing: "Note best practices in onboarding", implementing: "Suggest 1 improvement for policy" },
        { month: 9, learning: "Complete basic job design Excel training", practicing: "Complete an employee onboarding tracker", implementing: "Check for 100% completion, adjust" },
        { month: 10, learning: "Read about recruitment trends", practicing: "Research and test new sourcing channels", implementing: "Present findings in team meeting" },
        { month: 11, learning: "Join HR community group", practicing: "Discuss a challenge, post question online", implementing: "Share answers with manager" },
        { month: 12, learning: "Review the year & set next job goals", practicing: "Request formal feedback from manager", implementing: "Draft transition document for Coordinator" }
      ];
    }
    
    if (role.includes("recruitment coordinator")) {
      return [
        { month: 1, learning: "Take course on talent sourcing", practicing: "Source resumes for 2 open roles", implementing: "Log and update tracker weekly" },
        { month: 2, learning: "Study JD writing", practicing: "Write/review at least 2 job descriptions", implementing: "Track quality of applications" },
        { month: 3, learning: "Learn phone screening techniques", practicing: "Conduct 3 candidate screenings", implementing: "Create screening script, compare outcomes" },
        { month: 4, learning: "Shadow recruiter on interviews", practicing: "Schedule and coordinate 5+ interviews", implementing: "Minimize scheduling errors" },
        { month: 5, learning: "Read blog candidate experience", practicing: "Collect post-interview candidate feedback", implementing: "Report insights to team" },
        { month: 6, learning: "Begin LinkedIn/recruitment networking", practicing: "Refer 2 candidates via referrals", implementing: "Share response rate" },
        { month: 7, learning: "Take compliance & documentation mini-course", practicing: "Prepare hiring docs for new joiners", implementing: "Audit docs for errors" },
        { month: 8, learning: "Learn ATS tracking features", practicing: "Tag 10 new candidates, rate them", implementing: "Share updates with supervisor" },
        { month: 9, learning: "Study metrics for recruitment process", practicing: "Maintain recruitment dashboard", implementing: "Present summary mid-month" },
        { month: 10, learning: "Plan & run a small hiring campaign", practicing: "Measure campaign success", implementing: "Analyze gaps, write improvement plan" },
        { month: 11, learning: "Peer review another Coordinator's work", practicing: "Give/receive process feedback", implementing: "Implement 1 process change" },
        { month: 12, learning: "Review YTD metrics", practicing: "Compile lessons learned", implementing: "Update resume, plan path to Recruiter" }
      ];
    }
    
    if (role.includes("talent acquisition executive")) {
      return [
        { month: 1, learning: "Study advanced sourcing (Boolean, niche)", practicing: "Source for a challenging open role", implementing: "Log results, share sourcing report" },
        { month: 2, learning: "Research campus recruitment", practicing: "Attend/assist in campus drive", implementing: "Assess process, suggest one improvement" },
        { month: 3, learning: "L&D onboard training coordination", practicing: "Organize new joiner orientation session", implementing: "Gather new hire feedback" },
        { month: 4, learning: "Study employer branding blogs", practicing: "Recommend improvements for job posts", implementing: "Test one creative job post" },
        { month: 5, learning: "Run reference checks independently", practicing: "Structure reference templates", implementing: "Report compliance rate" },
        { month: 6, learning: "Manage a mini project schedule 40+ interviews", practicing: "Track candidate drop-off points", implementing: "Analyze, suggest solutions" },
        { month: 7, learning: "Study offer & negotiation techniques", practicing: "Participate in 2 offer negotiations", implementing: "Analyze acceptance/rejection reasons" },
        { month: 8, learning: "Shadow TA Manager on analytics review", practicing: "Build TA activity report with metrics", implementing: "Compare with team avg, present ideas" },
        { month: 9, learning: "Head retention blog posts", practicing: "Survey new joiners on recruitment process", implementing: "Suggest process change" },
        { month: 10, learning: "Coordinate with L&D on hiring feedback", practicing: "Sit in L&D module for a learning module", implementing: "Document integration areas" },
        { month: 11, learning: "Join recruiter networking group", practicing: "Attend 1 networking event", implementing: "Share learning with TA team" },
        { month: 12, learning: "Review annual sourcing and recruitment data", practicing: "Reflect with supervisor on next career step", implementing: "Chart your path to TA Manager" }
      ];
    }
    
    if (role.includes("hr generalist") || role.includes("hr specialist")) {
      return [
        { month: 1, learning: "Deep dive HR compliance and laws", practicing: "Do mini-audit of existing HR policies", implementing: "Write audit report to supervisor" },
        { month: 2, learning: "Study engagement survey methods", practicing: "Draft, send, and analyze pulse survey", implementing: "Present engagement summary" },
        { month: 3, learning: "Learn basic benefits admin", practicing: "Prepare data for payroll run, benefits", implementing: "Support review and correction" },
        { month: 4, learning: "Attend conflict resolution workshop", practicing: "Assist in 1 ER/HR issue", implementing: "Write meeting notes, update SOP" },
        { month: 5, learning: "HRIS: learn advanced features", practicing: "Generate HR reports from system", implementing: "Spot/report system data errors" },
        { month: 6, learning: "Take basic L&D planning course", practicing: "Track learning activity completions", implementing: "Suggest training calendar improvement" },
        { month: 7, learning: "Write/update onboarding policy", practicing: "Share with new hires from another function", implementing: "Gather feedback, log for manager" },
        { month: 8, learning: "Study HR analytics basics", practicing: "Build monthly attrition report", implementing: "Track and analyze trends" },
        { month: 9, learning: "Understand payroll dispute handling", practicing: "Resolve 1 real or mock payroll issue", implementing: "Document fix process, share outcome" },
        { month: 10, learning: "Review compliance documentation", practicing: "Ensure 100% audit compliance for dept", implementing: "Close gaps, suggest one new control" },
        { month: 11, learning: "Study digital HR transformation blogs", practicing: "Automate one manual HR process", implementing: "Present efficiency results" },
        { month: 12, learning: "Self-review and manager feedback", practicing: "Summarize yearly contributions", implementing: "Prepare for move to HR Manager role" }
      ];
    }
    
    if (role.includes("recruiter") || role.includes("recruitment manager")) {
      return [
        { month: 1, learning: "Study advanced interview frameworks", practicing: "Lead 2+ panel interviews", implementing: "Gather structured feedback" },
        { month: 2, learning: "Learn advanced sourcing (niche, referrals)", practicing: "Lead team refresher on sourcing tactics", implementing: "Track ROI by channel, write summary" },
        { month: 3, learning: "Shadow hiring manager on 3D question", practicing: "Lead first round screening", implementing: "Compare outcomes to role profile" },
        { month: 4, learning: "Review latest recruitment analytics tools", practicing: "Deploy one new metric/tracker", implementing: "Share dashboard/monthly metrics report" },
        { month: 5, learning: "Study offer management best practices", practicing: "Negotiate at least 1 senior hire", implementing: "Analyze negotiation result" },
        { month: 6, learning: "Lead early-career hiring days", practicing: "Report feedback and improvement ideas", implementing: "Implement 1 new step in next event" },
        { month: 7, learning: "Take compliance course on recruiting", practicing: "Review all candidate records for audit", implementing: "Address/document any compliance risks" },
        { month: 8, learning: "Mentor a junior recruiter", practicing: "Share interview feedback with them", implementing: "Track mentee growth" },
        { month: 9, learning: "Share sourcing success in HR team meet", practicing: "Pilot social sourcing campaign", implementing: "Measure applications generated" },
        { month: 10, learning: "Study employer branding tactics", practicing: "Lead 1 employer brand project", implementing: "Measure digital engagement" },
        { month: 11, learning: "Join online recruiter group", practicing: "Attend 1 knowledge sharing session", implementing: "Share insight with management" },
        { month: 12, learning: "Complete annual recruitment report", practicing: "Review performance with director", implementing: "Set path for Talent Acquisition Director" }
      ];
    }
    
    if (role.includes("learning & development")) {
      return [
        { month: 1, learning: "Take L&D strategy course", practicing: "Redesign 1 training session", implementing: "Collect feedback, modify slides" },
        { month: 2, learning: "Study adult learning theory", practicing: "Survey employees on development needs", implementing: "Analyze/segment needs" },
        { month: 3, learning: "Shadow L&D manager on a coaching session", practicing: "Observe learner engagement/recovery", implementing: "List improvement actions" },
        { month: 4, learning: "Attend digital learning workshop", practicing: "Deploy a microlearning pilot", implementing: "Measure and present engagement stats" },
        { month: 5, learning: "Learn about ROI on training methods", practicing: "Build ROI tracker for a learning module", implementing: "Report ROI, iterate" },
        { month: 6, learning: "Read best practices in content creation", practicing: "Create 1 new e-learning module", implementing: "Collect usage/quiz scores" },
        { month: 7, learning: "Build feedback loop with participants", practicing: "Gather midpoint pulse-check", implementing: "Share trends with management" },
        { month: 8, learning: "Join virtual L&D community", practicing: "Attend 1 external L&D event", implementing: "Present external insight" },
        { month: 9, learning: "Study performance improvement tools", practicing: "Coach 2 employees post-training", implementing: "Share coaching outcomes" },
        { month: 10, learning: "Implement blended learning approaches", practicing: "A/B test two module formats", implementing: "Survey learners, track preference" },
        { month: 11, learning: "Review reward/recognition systems", practicing: "Integrate into L&D experience", implementing: "Share increased engagement data" },
        { month: 12, learning: "Complete annual L&D impact report", practicing: "Review feedback, set next year's strategy", implementing: "Prepare for HRBP or L&D Manager" }
      ];
    }
    
    if (role.includes("employee relations") || role.includes("labor relations")) {
      return [
        { month: 1, learning: "Study advanced labor laws & union rules", practicing: "Review active grievances/cases", implementing: "Write summary report for resolution trends" },
        { month: 2, learning: "Learn conflict mediation techniques", practicing: "Participate in grievance handling", implementing: "Draft 1 conflict resolution case" },
        { month: 3, learning: "Read compliance and audit processes", practicing: "Assist in workplace inspections", implementing: "Note compliance gaps, suggest fixes" },
        { month: 4, learning: "Attend webinar on labor relation updates", practicing: "Meet union representatives if possible", implementing: "Prepare briefing document" },
        { month: 5, learning: "Study employee handbook policies", practicing: "Review policy adherence in 1 department", implementing: "Present compliance improvement plan" },
        { month: 6, learning: "Learn negotiation techniques", practicing: "Observe 1 collective bargaining session", implementing: "Document lessons learned" },
        { month: 7, learning: "Take course on workplace psychology", practicing: "Design engagement survey for unionized staff", implementing: "Analyze feedback and report" },
        { month: 8, learning: "Study labor market trends", practicing: "Research competitor labor policies", implementing: "Present benchmarking report" },
        { month: 9, learning: "Shadow senior ER manager", practicing: "Manage case from start to finish", implementing: "Log outcome and feedback" },
        { month: 10, learning: "Assist in team training on ER best practices", practicing: "Lead 1 email labor relations training", implementing: "Gather training effectiveness data" },
        { month: 11, learning: "Read court rulings related to labor law", practicing: "Update HR team on new regulations", implementing: "Circulate concise labor update newsletter" },
        { month: 12, learning: "Conduct annual ER effectiveness review", practicing: "Prepare and submit year-end-report", implementing: "Plan next year's ER initiatives" }
      ];
    }
    
    if (role.includes("hr manager") || role.includes("hr director")) {
      return [
        { month: 1, learning: "Enroll in executive leadership program", practicing: "Conduct HR strategy review", implementing: "Set HR goals aligned with company vision" },
        { month: 2, learning: "Study advanced compliance & legal issues", practicing: "Review departmental audit reports", implementing: "Present audit outcomes & action plan" },
        { month: 3, learning: "Learn cutting-edge HR technology trends", practicing: "Pilot HR tech innovation", implementing: "Measure KPIs for efficiency gains" },
        { month: 4, learning: "Mentor multiple junior and mid-level HR", practicing: "Develop leadership workshops", implementing: "Collect feedback & iterate" },
        { month: 5, learning: "Attend diversity & inclusion certification", practicing: "Lead company-wide DEI initiatives", implementing: "Measure participation & impact" },
        { month: 6, learning: "Study global HR best practices", practicing: "Benchmark HR policies with competitors", implementing: "Present comparison report" },
        { month: 7, learning: "Work on change management certifications", practicing: "Lead change management pilot project", implementing: "Report on project milestones" },
        { month: 8, learning: "Alter reward and benefit schemes", practicing: "Rework performance management policy", implementing: "Assess employee satisfaction post-change" },
        { month: 9, learning: "Study labor market & talent retention strategies", practicing: "Forecast workforce needs", implementing: "Present 3-year talent roadmap" },
        { month: 10, learning: "Join C-suite roundtable or HR leadership forum", practicing: "Lead quarterly HR business review", implementing: "Use insights for strategy" },
        { month: 11, learning: "Coach 1-2 emerging HR leaders", practicing: "Develop succession plans", implementing: "Report on readiness" },
        { month: 12, learning: "Complete unit annual performance review", practicing: "Set personal development goals", implementing: "Plan roadmap to Director to CHRO transition" }
      ];
    }
    
    if (role.includes("hr business partner") || role.includes("hrbp")) {
      return [
        { month: 1, learning: "Take advanced HRBP certification course", practicing: "Shadow leadership meetings", implementing: "Note priorities and business challenges" },
        { month: 2, learning: "Study performance management systems", practicing: "Design solution for critical team issues", implementing: "Present solution & receive feedback" },
        { month: 3, learning: "Complete stakeholder management training", practicing: "Facilitate cross-team HR programs", implementing: "Track engagement and adoption" },
        { month: 4, learning: "Learn analytics tools for HRBP", practicing: "Develop HR dashboards for business units", implementing: "Analyze and improve HR impact" },
        { month: 5, learning: "Explore organizational development methods", practicing: "Assess one department's culture", implementing: "Propose interventions" },
        { month: 6, learning: "Join leadership strategy webinars", practicing: "Influence HR strategy changes", implementing: "Get executive feedback" },
        { month: 7, learning: "Attend inspiration and influence workshop", practicing: "Coach managers on people management", implementing: "Log progress and feedback" },
        { month: 8, learning: "Study conflict resolution for HRBPs", practicing: "Handle escalated employee relations issues", implementing: "Document resolutions and improvements" },
        { month: 9, learning: "Research latest workforce planning methods", practicing: "Build talent pipeline strategies", implementing: "Present talent strategy roadmap" },
        { month: 10, learning: "Participate in industry HRBP forums", practicing: "Lead leadership training sessions", implementing: "Measure leadership development success" },
        { month: 11, learning: "Self-reflect and peer review", practicing: "Present quarterly HRBP business impact report", implementing: "Plan next steps for career growth" },
        { month: 12, learning: "Review succession plans and team readiness", practicing: "Align with CHRO/director on future needs", implementing: "Set goals for Director/CHRO progression" }
      ];
    }
    
    if (role.includes("hr director")) {
      return [
        { month: 1, learning: "Study organizational strategy", practicing: "Analyze current HR strategic plans", implementing: "Identify gaps for improvement" },
        { month: 2, learning: "Change management frameworks", practicing: "Lead small change projects", implementing: "Present change impact reports" },
        { month: 3, learning: "Executive leadership skills", practicing: "Coach HR managers", implementing: "Improve leadership feedback scores" },
        { month: 4, learning: "Workforce planning strategy", practicing: "Develop multi-year talent plans", implementing: "Align HR planning with business goals" },
        { month: 5, learning: "Talent management frameworks", practicing: "Oversee leadership development", implementing: "Measure leadership readiness" },
        { month: 6, learning: "HR analytics advanced concepts", practicing: "Use workforce data for decision-making", implementing: "Present predictive insights to C-suite" },
        { month: 7, learning: "Diversity and inclusion strategy", practicing: "Lead DEI strategic initiatives", implementing: "Track organization-wide DEI metrics" },
        { month: 8, learning: "Communication and Engagement", practicing: "Design employee engagement initiatives", implementing: "Improve engagement scores" },
        { month: 9, learning: "HR governance and compliance", practicing: "Review HR policies for compliance", implementing: "Update and implement policies" },
        { month: 10, learning: "Executive decision-making", practicing: "Facilitate executive HR sessions", implementing: "Improve decision timeliness and efficiency" },
        { month: 11, learning: "Coaching and mentoring senior leaders", practicing: "Conduct executive coaching", implementing: "Record progress of coached leaders" },
        { month: 12, learning: "Strategic plan presentation", practicing: "Compile annual HR business review", implementing: "Set goals with C-suite approval" }
      ];
    }
    
    if (role.includes("l&d manager")) {
      return [
        { month: 1, learning: "Study instructional design basics", practicing: "Design sample training modules", implementing: "Present modules for peer review" },
        { month: 2, learning: "Adult learning theory", practicing: "Develop interactive learning activities", implementing: "Pilot training session" },
        { month: 3, learning: "Employee engagement techniques", practicing: "Conduct surveys", implementing: "Analyze and report engagement results" },
        { month: 4, learning: "Communication and presentation skills", practicing: "Run workshops", implementing: "Increase participant satisfaction" },
        { month: 5, learning: "Technology for e-learning", practicing: "Use LMS software", implementing: "Launch digital training" },
        { month: 6, learning: "Training needs analysis", practicing: "Conduct department assessments", implementing: "Create tailored learning plans" },
        { month: 7, learning: "Coaching & feedback methods", practicing: "Provide coaching sessions", implementing: "Measure participant progress" },
        { month: 8, learning: "Content creation best practices", practicing: "Write engaging content", implementing: "Publish course materials" },
        { month: 9, learning: "Soft skills development", practicing: "Facilitate soft skills workshops", implementing: "Track skill adoption" },
        { month: 10, learning: "Evaluation of training impact", practicing: "Develop training ROI metrics", implementing: "Present impact metrics to leadership" },
        { month: 11, learning: "Vendor management", practicing: "Manage external training vendors", implementing: "Ensure vendor adherence to quality standards" },
        { month: 12, learning: "Annual L&D review and planning", practicing: "Report annual L&D outcomes", implementing: "Set improvement goals and growth path" }
      ];
    }
    
    if (role.includes("head l&d")) {
      return [
        { month: 1, learning: "Study L&D strategic frameworks", practicing: "Review current strategy", implementing: "Identify areas for strategic enhancement" },
        { month: 2, learning: "Data analytics for measuring learning impact", practicing: "Analyze training metrics", implementing: "Present actionable insights" },
        { month: 3, learning: "Advanced vendor management", practicing: "Review vendor contracts", implementing: "Negotiate improvements or renewals" },
        { month: 4, learning: "Change management in L&D", practicing: "Lead rollout of new initiatives", implementing: "Measure adoption and feedback" },
        { month: 5, learning: "Leadership and influence", practicing: "Coach L&D managers", implementing: "Track leadership progress" },
        { month: 6, learning: "Budgeting and resource allocation", practicing: "Plan annual L&D budget", implementing: "Align spend with business priorities" },
        { month: 7, learning: "Digital learning trends", practicing: "Pilot new learning technologies", implementing: "Evaluate user engagement and satisfaction" },
        { month: 8, learning: "Learning culture development", practicing: "Drive employee engagement campaigns", implementing: "Increase participation rates" },
        { month: 9, learning: "Collaboration with business leaders", practicing: "Facilitate cross-functional workshops", implementing: "Improve stakeholder buy-in" },
        { month: 10, learning: "Talent development", practicing: "Design leadership development plans", implementing: "Track talent pipeline improvements" },
        { month: 11, learning: "HR data literacy", practicing: "Train team on interpreting data", implementing: "Enhance team decision-making" },
        { month: 12, learning: "Strategic L&D report & roadmap", practicing: "Present year-end strategy", implementing: "Gain leadership approval for next phase" }
      ];
    }
    
    if (role.includes("employee relations manager")) {
      return [
        { month: 1, learning: "Study advanced labor laws", practicing: "Review current employee relations cases", implementing: "Develop case strategies" },
        { month: 2, learning: "Mediation and conflict resolution", practicing: "Facilitate mock mediation sessions", implementing: "Incident resolution success rate" },
        { month: 3, learning: "Crisis management frameworks", practicing: "Lead crisis scenario simulations", implementing: "Improve crisis response preparedness" },
        { month: 4, learning: "Communication in sensitive situations", practicing: "Conduct sensitive employee communications", implementing: "Increase employee trust and transparency" },
        { month: 5, learning: "Employee engagement strategies", practicing: "Implement engagement interventions", implementing: "Increase morale scores" },
        { month: 6, learning: "Data analytics for employee relations", practicing: "Analyze turnover and dispute data", implementing: "Identify key risk factors" },
        { month: 7, learning: "Policy review and correction", practicing: "Audit ER policies", implementing: "Implement necessary updates" },
        { month: 8, learning: "Leadership skills", practicing: "Coach ER team", implementing: "Raise team effectiveness scores" },
        { month: 9, learning: "Change management", practicing: "Lead change in policy enforcement", implementing: "Achieve smoother transitions" },
        { month: 10, learning: "Diversity & inclusion impact", practicing: "Lead D&I initiatives", implementing: "Improve workplace inclusivity" },
        { month: 11, learning: "Stakeholder management", practicing: "Engage leadership and unions", implementing: "strengthen labor relations" },
        { month: 12, learning: "Annual ER effectiveness review", practicing: "Lead comprehensive ER review", implementing: "Plan next steps for continuous improvement" }
      ];
    }
    
    if (role.includes("director") && role.includes("chro")) {
      return [
        { month: 1, learning: "Study enterprise HR strategy", practicing: "Review organizational HR strategy", implementing: "Identify strategic gaps" },
        { month: 2, learning: "Data literacy & analytics", practicing: "Analyze workforce and business data", implementing: "Present strategic insights" },
        { month: 3, learning: "Digital HR tools & transformation", practicing: "Evaluate digital HR initiatives", implementing: "Recommend technology upgrades" },
        { month: 4, learning: "Executive leadership", practicing: "Lead senior leadership meetings", implementing: "Influence organizational decision-making" },
        { month: 5, learning: "Change management", practicing: "Sponsor HR transformation projects", implementing: "Measure adoption and impact" },
        { month: 6, learning: "Talent management strategy", practicing: "Build succession plans", implementing: "Strengthen leadership pipelines" },
        { month: 7, learning: "Diversity & inclusion strategy", practicing: "Develop enterprise-wide DEI programs", implementing: "Track inclusion metrics" },
        { month: 8, learning: "Stakeholder engagement", practicing: "Manage C-suite relationships", implementing: "Improve strategic partnerships" },
        { month: 9, learning: "Governance & compliance", practicing: "Ensure HR policies meet regulatory standards", implementing: "Implement risk mitigation" },
        { month: 10, learning: "Business partnership", practicing: "Collaborate cross-functionally", implementing: "Align HR with business goals" },
        { month: 11, learning: "Mergers & acquisitions HR", practicing: "Lead HR due diligence & integration", implementing: "Ensure smooth workforce transitions" },
        { month: 12, learning: "Annual strategy review", practicing: "Present CHRO report to board", implementing: "Set vision and goals for next fiscal year" }
      ];
    }
    
    if (role.includes("vp hr")) {
      return [
        { month: 1, learning: "Executive coaching certification", practicing: "Coach HR leaders", implementing: "Collect feedback from coachees" },
        { month: 2, learning: "Business strategy fundamentals", practicing: "Contribute to executive strategy", implementing: "Present HRs role in business strategy" },
        { month: 3, learning: "Risk identification and mitigation", practicing: "Lead HR risk assessment", implementing: "Create HR risk mitigation plans" },
        { month: 4, learning: "Leadership influence", practicing: "Develop executive presence", implementing: "Improve stakeholder relationships" },
        { month: 5, learning: "Change leadership", practicing: "Sponsor large-scale organizational change", implementing: "Monitor outcomes and adjust as needed" },
        { month: 6, learning: "Talent development", practicing: "Design leadership development programs", implementing: "Track leadership bench strength" },
        { month: 7, learning: "Diversity and inclusion", practicing: "Lead enterprise-wide D&I initiatives", implementing: "Improve cultural inclusivity" },
        { month: 8, learning: "Workforce analytics", practicing: "Provide data-driven workforce insights", implementing: "Influence leadership decision-making" },
        { month: 9, learning: "HR governance", practicing: "Review and improve HR policy compliance", implementing: "Reduce governance risks" },
        { month: 10, learning: "Executive communications", practicing: "Lead corporate-wide HR communications", implementing: "Improve message clarity and engagement" },
        { month: 11, learning: "Succession planning", practicing: "Finalize succession plans", implementing: "Ensure readiness of key roles" },
        { month: 12, learning: "Annual strategic review", practicing: "Present HR achievements to board", implementing: "Set priorities for next fiscal year" }
      ];
    }
    
    if (role.includes("chro") && !role.includes("group")) {
      return [
        { month: 1, learning: "Enterprise leadership skills", practicing: "Lead executive team HR strategy", implementing: "Align enterprise HR vision" },
        { month: 2, learning: "Transformation management frameworks", practicing: "Oversee HR transformation program", implementing: "Achieve project milestones" },
        { month: 3, learning: "Corporate governance", practicing: "Develop governance policies", implementing: "Improve compliance and transparency" },
        { month: 4, learning: "Culture and change leadership", practicing: "Drive cultural transformation", implementing: "Increase employee engagement" },
        { month: 5, learning: "Talent strategy", practicing: "Lead enterprise talent review", implementing: "Strengthen talent pipelines" },
        { month: 6, learning: "Risk and compliance management", practicing: "Manage HR regulatory risks", implementing: "Implement risk controls" },
        { month: 7, learning: "Digital HR strategy", practicing: "Oversee HR technology upgrades", implementing: "Meet digital transformation goals" },
        { month: 8, learning: "Executive coaching & development", practicing: "Mentor senior executives", implementing: "Measure leadership effectiveness" },
        { month: 9, learning: "Workforce analytics", practicing: "Present high-level analytics", implementing: "Inform strategic decisions" },
        { month: 10, learning: "Stakeholder partnership", practicing: "Build relationships with board and leadership", implementing: "Enhance HR influence" },
        { month: 11, learning: "Succession management", practicing: "Ensure leadership readiness", implementing: "Maintain talent continuity" },
        { month: 12, learning: "Year-end strategy review", practicing: "Deliver enterprise HR report", implementing: "Set vision for upcoming year" }
      ];
    }
    
    if (role.includes("group chro")) {
      return [
        { month: 1, learning: "Advanced leadership development", practicing: "Facilitate executive retreats", implementing: "Improve leadership cohesion" },
        { month: 2, learning: "Corporate governance", practicing: "Oversee group-wide compliance", implementing: "Align regional HR policies" },
        { month: 3, learning: "Decision-making frameworks", practicing: "Lead HR strategic decisions", implementing: "Increase decision speed and effectiveness" },
        { month: 4, learning: "Workforce planning at scale", practicing: "Coordinate multi-business unit planning", implementing: "Achieve cross-unit talent alignment" },
        { month: 5, learning: "Change leadership", practicing: "Manage complex organizational change", implementing: "Ensure change adoption across units" },
        { month: 6, learning: "Enterprise risk management", practicing: "Oversee enterprise HR risk", implementing: "Implement mitigation strategies" },
        { month: 7, learning: "Diversity, equity & inclusion", practicing: "Lead global D&I strategy", implementing: "Drive measurable inclusion targets" },
        { month: 8, learning: "HR analytics for groups", practicing: "Aggregate HR data across divisions", implementing: "Present group-wide HR metrics" },
        { month: 9, learning: "Corporate culture", practicing: "Foster unified culture", implementing: "Measure cultural integration" },
        { month: 10, learning: "Executive coaching", practicing: "Coach group leadership teams", implementing: "Track leadership development" },
        { month: 11, learning: "Stakeholder engagement", practicing: "Partner with regional leaders", implementing: "Enhance trust and collaboration" },
        { month: 12, learning: "Strategic planning", practicing: "Develop next three-year HR strategy", implementing: "Gain consensus across group" }
      ];
    }
    
    if (role.includes("senior consultant")) {
      return [
        { month: 1, learning: "Study client management fundamentals", practicing: "Support client meetings", implementing: "Improve client satisfaction" },
        { month: 2, learning: "Learn business analysis techniques", practicing: "Analyze HR business processes", implementing: "Deliver analysis reports" },
        { month: 3, learning: "Understand Agile HR principles", practicing: "Participate in Agile HR projects", implementing: "Apply Agile in project tasks" },
        { month: 4, learning: "Develop consulting skills", practicing: "Draft proposals for clients", implementing: "Gain peer review and improve" },
        { month: 5, learning: "Communication and negotiation", practicing: "Lead client workshops", implementing: "Receive positive feedback from clients" },
        { month: 6, learning: "Advanced business process mapping", practicing: "Map client HR processes", implementing: "Identify optimization opportunities" },
        { month: 7, learning: "Change management frameworks", practicing: "Support change initiatives", implementing: "Measure change impact" },
        { month: 8, learning: "Data analysis and visualization", practicing: "Build client HR dashboards", implementing: "Present actionable insights" },
        { month: 9, learning: "Coaching and facilitation", practicing: "Facilitate client training sessions", implementing: "Achieve high participant satisfaction" },
        { month: 10, learning: "Stakeholder engagement", practicing: "Manage multiple client relationships", implementing: "Strengthen client partnerships" },
        { month: 11, learning: "Industry HR trends", practicing: "Share insights in consulting forums", implementing: "Enhance consulting relevance" },
        { month: 12, learning: "Review annual client feedback", practicing: "Develop consulting improvement plan", implementing: "Increase repeat business" }
      ];
    }

    if (role.includes("hris manager")) {
      return [
        { month: 1, learning: "Study HRIS system architecture", practicing: "Explore current HRIS configurations", implementing: "Document system configurations" },
        { month: 2, learning: "Data visualization basics", practicing: "Create HR reports using visualization tools", implementing: "Improve report clarity and usability" },
        { month: 3, learning: "Master system configuration", practicing: "Test and modify system workflows", implementing: "Implement process improvements" },
        { month: 4, learning: "Learn data security and privacy", practicing: "Audit HRIS data access controls", implementing: "Address security gaps" },
        { month: 5, learning: "Analyze user feedback", practicing: "Collect and prioritize system enhancement requests", implementing: "Improve user satisfaction" },
        { month: 6, learning: "Reporting automation", practicing: "Develop automated report solutions", implementing: "Reduce report turnaround time" },
        { month: 7, learning: "Integration with other HR systems", practicing: "Coordinate integration projects", implementing: "Achieve seamless data flow during upgrades" },
        { month: 8, learning: "System upgrade planning", practicing: "Plan system upgrades", implementing: "Minimize disruption during upgrades" },
        { month: 9, learning: "Compliance in HR data", practicing: "Ensure system meets data regulations", implementing: "Achieve zero compliance issues" },
        { month: 10, learning: "User training", practicing: "Document training materials", implementing: "Train HR users effectively" },
        { month: 11, learning: "Project management", practicing: "Lead HRIS projects", implementing: "Deliver projects on time" },
        { month: 12, learning: "Review HRIS strategy", practicing: "Present system performance and upgrade plan", implementing: "Align HRIS strategy with organizational goals" }
      ];
    }

    if (role.includes("talent management manager")) {
      return [
        { month: 1, learning: "Study talent management strategy", practicing: "Review current programs", implementing: "Identify improvement areas" },
        { month: 2, learning: "Leadership coaching fundamentals", practicing: "Coach high-potential employees", implementing: "Document coaching outcomes" },
        { month: 3, learning: "Workforce planning and talent review", practicing: "Conduct skills gap analysis", implementing: "Develop talent development plans" },
        { month: 4, learning: "Succession planning", practicing: "Create succession plans for key roles", implementing: "Strengthen leadership bench" },
        { month: 5, learning: "Performance management", practicing: "Oversee appraisal processes", implementing: "Increase performance review completion rate" },
        { month: 6, learning: "Employee engagement", practicing: "Launch talent engagement initiatives", implementing: "Measure engagement improvements" },
        { month: 7, learning: "Learning and development strategy", practicing: "Align learning with talent needs", implementing: "Improve program participation" },
        { month: 8, learning: "Change management", practicing: "Support organizational development efforts", implementing: "Facilitate smoother talent transitions" },
        { month: 9, learning: "Data-driven talent decisions", practicing: "Use analytics for talent insights", implementing: "Present talent dashboards" },
        { month: 10, learning: "Coaching advanced techniques", practicing: "Group coaching sessions", implementing: "Improve leadership capabilities" },
        { month: 11, learning: "Diversity and inclusion in talent", practicing: "Promote inclusive talent initiatives", implementing: "Improve diversity metrics" },
        { month: 12, learning: "Year-end talent review", practicing: "Present talent management report", implementing: "Set next year's talent strategy" }
      ];
    }

    if (role.includes("head of org development") || role.includes("organizational development")) {
      return [
        { month: 1, learning: "Study organizational development strategy", practicing: "Analyze organizational effectiveness", implementing: "Identify focus areas" },
        { month: 2, learning: "Develop communication skills", practicing: "Facilitate stakeholder meetings", implementing: "Improve message clarity" },
        { month: 3, learning: "Change diagnostics", practicing: "Conduct change readiness assessments", implementing: "Report findings" },
        { month: 4, learning: "Leadership development", practicing: "Design leadership programs", implementing: "Increase participation" },
        { month: 5, learning: "Culture assessment", practicing: "Lead cultural surveys", implementing: "Develop culture change plans" },
        { month: 6, learning: "Coaching and mentoring", practicing: "Coach leaders on organizational development", implementing: "Track leader growth" },
        { month: 7, learning: "Performance management systems", practicing: "Optimize performance evaluation processes", implementing: "Enhance feedback culture" },
        { month: 8, learning: "Talent mobility", practicing: "Develop job rotation programs", implementing: "Support skill diversification" },
        { month: 9, learning: "Data interpretation", practicing: "Analyze OD program data", implementing: "Present impact reports" },
        { month: 10, learning: "Stakeholder engagement", practicing: "Manage cross-functional collaboration", implementing: "Improve organizational alignment" },
        { month: 11, learning: "Facilitation skills", practicing: "Lead OD workshops", implementing: "Increase employee involvement" },
        { month: 12, learning: "Strategy review", practicing: "Prepare annual OD strategic report", implementing: "Set direction for next year" }
      ];
    }

    if (role.includes("d&i manager") || role.includes("diversity") || role.includes("inclusion")) {
      return [
        { month: 1, learning: "Study D&I frameworks and laws", practicing: "Review current D&I policies", implementing: "Identify gaps" },
        { month: 2, learning: "Develop advocacy skills", practicing: "Lead awareness campaigns", implementing: "Increase employee participation" },
        { month: 3, learning: "Program management basics", practicing: "Design new D&I programs", implementing: "Obtain stakeholder feedback" },
        { month: 4, learning: "Communication for inclusion", practicing: "Facilitate inclusive communication", implementing: "Boost inclusiveness in messages" },
        { month: 5, learning: "Data collection & analysis", practicing: "Collect diversity metrics", implementing: "Report progress" },
        { month: 6, learning: "Leadership engagement", practicing: "Conduct trainings for leaders", implementing: "Gain leadership buy-in" },
        { month: 7, learning: "Handling bias and microaggressions", practicing: "Conduct workshops", implementing: "Improve awareness scores" },
        { month: 8, learning: "Inclusive recruitment", practicing: "Revise hiring practices", implementing: "Improve diverse candidate pools" },
        { month: 9, learning: "Collaborate with ER teams", practicing: "Address employee concerns", implementing: "Reduce bias-related grievances" },
        { month: 10, learning: "Program evaluation", practicing: "Analyze program outcomes", implementing: "Adjust initiatives" },
        { month: 11, learning: "External partnership development", practicing: "Build relationships with NGOs", implementing: "Leverage external expertise" },
        { month: 12, learning: "Annual D&I report", practicing: "Present D&I impact", implementing: "Plan next year" }
      ];
    }

    if (role.includes("recruitment manager")) {
      return [
        { month: 1, learning: "Study recruitment KPIs", practicing: "Collect recruitment data", implementing: "Ensure data accuracy" },
        { month: 2, learning: "Reporting tools training", practicing: "Build recruitment reports", implementing: "Present monthly reports to leadership" },
        { month: 3, learning: "Data interpretation basics", practicing: "Analyze recruitment data", implementing: "Identify trends and issues" },
        { month: 4, learning: "Stakeholder communication", practicing: "Share insights with hiring managers", implementing: "Improve decision-making" },
        { month: 5, learning: "Recruitment process optimization", practicing: "Facilitate process improvements", implementing: "Reduce time-to-fill and cost-per-hire" },
        { month: 6, learning: "Talent pipeline management", practicing: "Develop sourcing forecasts", implementing: "Improve candidate flow" },
        { month: 7, learning: "Team leadership", practicing: "Coordinate recruitment team efforts", implementing: "Boost team performance" },
        { month: 8, learning: "Candidate experience strategies", practicing: "Implement candidate feedback", implementing: "Increase satisfaction scores" },
        { month: 9, learning: "ATS optimization", practicing: "Streamline ATS usage", implementing: "Improve system efficiency" },
        { month: 10, learning: "Recruitment marketing", practicing: "Run employer branding campaigns", implementing: "Monitor campaign impact" },
        { month: 11, learning: "Budgeting & resource allocation", practicing: "Monitor recruitment budgets", implementing: "Optimize spend" },
        { month: 12, learning: "Annual performance review", practicing: "Summarize recruitment metrics", implementing: "Set targets for next year" }
      ];
    }

    if (role.includes("talent acquisition manager")) {
      return [
        { month: 1, learning: "Develop strategic sourcing plans", practicing: "Map sourcing channels", implementing: "Identify high-yield sources" },
        { month: 2, learning: "Enhance communication skills", practicing: "Lead recruiter communication", implementing: "Improve candidate engagement" },
        { month: 3, learning: "Market research", practicing: "Analyze labor market trends", implementing: "Adjust sourcing strategies" },
        { month: 4, learning: "Employer branding techniques", practicing: "Lead social recruiting campaigns", implementing: "Increase brand visibility" },
        { month: 5, learning: "Negotiation skills", practicing: "Conduct offer negotiations", implementing: "Improve acceptance rate" },
        { month: 6, learning: "Stakeholder management", practicing: "Collaborate with hiring managers", implementing: "Align hiring needs" },
        { month: 7, learning: "Data-driven decision making", practicing: "Use analytics for sourcing decisions", implementing: "Present findings" },
        { month: 8, learning: "Diversity sourcing strategies", practicing: "Expand underrepresented candidate pools", implementing: "Increase diversity hires" },
        { month: 9, learning: "Talent pipeline development", practicing: "Build long-term sourcing plans", implementing: "Maintain candidate pools" },
        { month: 10, learning: "Technology utilization", practicing: "Pilot sourcing automation tools", implementing: "Increase recruitment efficiency" },
        { month: 11, learning: "Coaching and mentoring", practicing: "Mentor recruiting team members", implementing: "Track team skill improvements" },
        { month: 12, learning: "Annual review and goal setting", practicing: "Report yearly sourcing outcomes", implementing: "Set strategic sourcing goals" }
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

  // Use specific 12-month plan for the recommended next role if available, otherwise use current role plan
  const monthlyPlan = nextLikelyRole 
    ? getMonthlyLearningPlan(nextLikelyRole) || getMonthlyLearningPlan(input.currentRole)
    : getMonthlyLearningPlan(input.currentRole);

  let certifications = CERTS_BY_TRACK[bestTrack.id]
  let resources = RESOURCES_BY_TRACK[bestTrack.id]
  let kekaCourses = KEKA_COURSES_BY_TRACK[bestTrack.id] ?? []
  let skillsToDevelop = gaps.slice(0, 5)

  // Check if we have specific data for the predicted next role
  if (nextLikelyRole && ROLE_SPECIFIC_DATA[nextLikelyRole]) {
    const roleData = ROLE_SPECIFIC_DATA[nextLikelyRole]
    kekaCourses = roleData.kekaCourses
    skillsToDevelop = roleData.skillsToDevelop
    resources = roleData.resources
  }

  const summaryBase = `${input.fullName.split(" ")[0]}, based on your ${y} years in ${input.currentRole || 'HR'}, your strongest trajectory is ${bestTrack.name}.`
  const summary = nextLikelyRole
    ? `${summaryBase} Likely next role: ${nextLikelyRole}. The plan below focuses on clear next roles, skill gaps, and high-ROI learning.`
    : `${summaryBase} The plan below focuses on clear next roles, skill gaps, and high-ROI learning.`


  return {
    currentRole: bestTrack.name,
    confidence: Math.round(confidence * 100) / 100,
    summary,
    nextSteps,
    skillsToDevelop,
    certifications,
    resources,
    kekaCourses,
    monthlyPlan,
    nextLikelyRole,
  }
}
