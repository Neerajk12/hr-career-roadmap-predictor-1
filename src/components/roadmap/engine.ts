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
    rolePatterns: ["hr admin", "hr administrator"],
    keySkills: ["hr operations", "data management", "communication", "payroll", "documentation", "hris", "organization", "time management"],
    responsibilities: [
      "maintain employee records",
      "assist recruitment process", 
      "coordinate interviews",
      "support onboarding and orientation process"
    ],
    minExp: 0,
    maxExp: 2,
    nextRole: "HR Coordinator",
    trackId: "ops",
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

  const getMonthlyLearningPlan = (currentRole: string): { month: number; learning: string; practicing: string; implementing: string }[] => {
    const role = currentRole.toLowerCase();
    
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
    
    if (role.includes("chro") || role.includes("vp hr") || role.includes("director")) {
      return [
        { month: 1, learning: "Lead executive leadership strategy", practicing: "Host annual HR vision and goal setting", implementing: "Communicate vision to all HR teams" },
        { month: 2, learning: "Attend global HR conferences", practicing: "Align HR with business-wide strategic plan", implementing: "Get CEO and board feedback" },
        { month: 3, learning: "Study global compliance & integrations", practicing: "Oversee global HR policy integrations", implementing: "Report status to board" },
        { month: 4, learning: "Mentor senior leaders & executives", practicing: "Lead diversity & inclusion global initiatives", implementing: "Analyze participation and impact" },
        { month: 5, learning: "Research emerging workforce trends", practicing: "Oversee digital transformation in HR", implementing: "Track digital adoption" },
        { month: 6, learning: "Host quarterly HR leadership forums", practicing: "Drive culture change programs", implementing: "Conduct culture surveys" },
        { month: 7, learning: "Pilot innovative employee engagement", practicing: "Manage budget and resource allocation", implementing: "Report financial & engagement outcomes" },
        { month: 8, learning: "Lead talent acquisition strategy", practicing: "Approve senior hires and succession planning", implementing: "Evaluate pipeline depth" },
        { month: 9, learning: "Guide organizational development", practicing: "Approve leadership development programs", implementing: "Monitor ROI and success metrics" },
        { month: 10, learning: "Participate in industry leadership committees", practicing: "Lead quarterly HR business reviews", implementing: "Use insights for strategy" },
        { month: 11, learning: "Self-reflect and peer review", practicing: "Present quarterly HRBP business impact report", implementing: "Plan next steps for career growth" },
        { month: 12, learning: "Review annual HR outcomes plan next year", practicing: "Complete personal leadership review", implementing: "Set advisory or consultant goals" }
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

  const monthlyPlan = getMonthlyLearningPlan(input.currentRole);

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
