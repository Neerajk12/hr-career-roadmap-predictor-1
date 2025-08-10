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
}

export type Roadmap = {
  track: string
  confidence: number
  summary: string
  nextSteps: RoadmapStep[]
  skillsToDevelop: string[]
  certifications: string[]
  resources: { title: string; url: string }[]
  actionItems: string[]
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

function tokenize(input: string | string[]): string[] {
  const text = Array.isArray(input) ? input.join(",") : input
  return text
    .split(/[,\n]/g)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const skills = tokenize(input.skills)
  const resp = tokenize(input.responsibilities)
  const all = [...skills, ...resp]

  // Infer track and confidence
  let bestTrack = TRACKS[0]
  let bestScore = -1
  for (const t of TRACKS) {
    const score = t.keywords.reduce((acc, k) => acc + (all.some((w) => w.includes(k)) ? 1 : 0), 0)
    if (score > bestScore) {
      bestTrack = t
      bestScore = score
    }
  }
  const confidence = Math.min(1, Math.max(0.3, bestScore / 5))

  // Compute gaps
  const core = CORE_BY_TRACK[bestTrack.id]
  const gaps = core.filter((c) => !all.some((w) => w.includes(c.split(" ")[0])))

  // Next steps timeline based on experience
  const y = input.yearsExperience
  const baseRole = input.currentRole || bestTrack.name
  const nextSteps: RoadmapStep[] = []
  if (y < 3) {
    nextSteps.push(
      { timeframe: "0–6 months", title: `Strengthen ${bestTrack.name} foundations`, reason: `Solidify fundamentals and ship 2–3 portfolio examples in ${bestTrack.name}.` },
      { timeframe: "6–18 months", title: `Progress to Senior ${baseRole.includes(bestTrack.name) ? baseRole : bestTrack.name}`, reason: "Own end-to-end initiatives and mentor juniors." },
      { timeframe: "18–36 months", title: `${bestTrack.id === 'hrbp' ? 'HRBP' : 'Lead'} role readiness`, reason: "Demonstrate measurable business impact; lead cross-functional projects." },
    )
  } else if (y < 7) {
    nextSteps.push(
      { timeframe: "0–6 months", title: `Own a core pillar in ${bestTrack.name}`, reason: "Define KPIs and deliver a playbook for repeatability." },
      { timeframe: "6–18 months", title: `${bestTrack.name} Lead / Manager`, reason: "Lead small team or programs across regions/business units." },
      { timeframe: "18–36 months", title: `Head of ${bestTrack.name} (scope expansion)`, reason: "Expand remit, budget, and stakeholder complexity." },
    )
  } else {
    nextSteps.push(
      { timeframe: "0–6 months", title: `Sharpen strategic narrative in ${bestTrack.name}`, reason: "Create a 12–18 month strategy with ROI model." },
      { timeframe: "6–18 months", title: `Head/Director of ${bestTrack.name}`, reason: "Define operating model and governance; scale team." },
      { timeframe: "18–36 months", title: `VP People – ${bestTrack.name} focus`, reason: "Own multi-pillar strategy aligned to business outcomes." },
    )
  }

  const certifications = CERTS_BY_TRACK[bestTrack.id]
  const resources = RESOURCES_BY_TRACK[bestTrack.id]

  const summary = `${input.fullName.split(" ")[0]}, based on your ${y} years in ${input.currentRole || 'HR'}, your strongest trajectory is ${bestTrack.name}. The plan below focuses on clear next roles, skill gaps, and high-ROI learning.`

  const actionItems = [
    `Create a one-page growth plan with 3 OKRs tied to ${bestTrack.name} outcomes`,
    `Ship one measurable win in the next 60 days (define baseline & target)`,
    `Block 2×60min weekly deep-work sessions for upskilling (${bestTrack.name})`,
    `Schedule monthly mentor sync in ${bestTrack.name}`,
  ]

  return {
    track: bestTrack.name,
    confidence: Math.round(confidence * 100) / 100,
    summary,
    nextSteps,
    skillsToDevelop: gaps.slice(0, 5),
    certifications,
    resources,
    actionItems,
  }
}
