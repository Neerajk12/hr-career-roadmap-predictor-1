import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Calendar, MessageCircle, Video } from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: number;
  specializations: string[];
  rating: number;
  reviews: number;
  image: string;
  price: string;
  availability: string;
  description: string;
}

const EXPERT_DATABASE: Record<string, Expert[]> = {
  "Recruitment Coordinator": [
    {
      id: "1",
      name: "Arjun Sharma",
      title: "Senior Recruitment Coordinator",
      company: "Tech Solutions Ltd",
      experience: 3,
      specializations: ["ATS Management", "Interview Coordination", "Candidate Experience"],
      rating: 4.6,
      reviews: 45,
      image: "/images/expert-placeholder.jpg",
      price: "₹1,500/session",
      availability: "Available this week",
      description: "Expert in streamlining recruitment processes and enhancing candidate experience."
    }
  ],
  "Recruiter": [
    {
      id: "2",
      name: "Neha Gupta",
      title: "Senior Recruiter",
      company: "Growth Enterprises",
      experience: 5,
      specializations: ["Technical Recruiting", "Sourcing Strategy", "Interview Skills"],
      rating: 4.7,
      reviews: 78,
      image: "/images/expert-placeholder.jpg",
      price: "₹1,800/session",
      availability: "Available today",
      description: "Specialized in technical recruitment with strong sourcing and evaluation skills."
    }
  ],
  "Recruiter/TA Manager": [
    {
      id: "3",
      name: "Rahul Verma",
      title: "Talent Acquisition Manager",
      company: "Innovation Labs",
      experience: 6,
      specializations: ["Team Management", "Recruitment Strategy", "Stakeholder Management"],
      rating: 4.8,
      reviews: 92,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,200/session",
      availability: "Available next week",
      description: "Experienced in managing recruitment teams and developing strategic hiring plans."
    }
  ],
  "HR Manager/Employee Relations": [
    {
      id: "4",
      name: "Sarah Johnson",
      title: "Senior HR Manager",
      company: "Tech Innovations Ltd",
      experience: 12,
      specializations: ["Team Leadership", "Policy Development", "Performance Management"],
      rating: 4.9,
      reviews: 127,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,500/session",
      availability: "Available this week",
      description: "Seasoned HR Manager with expertise in scaling HR operations and building high-performance teams."
    }
  ],
  "Senior Recruiter": [
    {
      id: "5",
      name: "Kiran Patel",
      title: "Senior Recruiter - Tech",
      company: "Digital Solutions",
      experience: 7,
      specializations: ["Executive Search", "Technical Hiring", "Team Building"],
      rating: 4.8,
      reviews: 105,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,000/session",
      availability: "Available this week",
      description: "Specialist in executive search and building high-performing technical teams."
    }
  ],
  "TA Manager": [
    {
      id: "6",
      name: "Amit Patel",
      title: "Talent Acquisition Manager",
      company: "Growth Ventures",
      experience: 7,
      specializations: ["Recruitment Strategy", "Talent Pipeline", "Employer Branding"],
      rating: 4.6,
      reviews: 203,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,200/session",
      availability: "Available this week",
      description: "Expert in building robust talent acquisition processes and innovative recruitment strategies."
    }
  ],
  "Head TA/HRBP": [
    {
      id: "7",
      name: "Priya Sharma", 
      title: "Head of Talent Acquisition",
      company: "Enterprise Corp",
      experience: 10,
      specializations: ["Strategic Hiring", "Team Leadership", "Business Partnership"],
      rating: 4.8,
      reviews: 156,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,500/session",
      availability: "Available today",
      description: "Strategic leader with proven track record in scaling talent acquisition and HR business partnership."
    }
  ],
  "Payroll Manager": [
    {
      id: "8",
      name: "Deepak Singh",
      title: "Payroll Manager",
      company: "Finance Corp",
      experience: 8,
      specializations: ["Payroll Processing", "Compliance", "System Management"],
      rating: 4.7,
      reviews: 89,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,300/session",
      availability: "Available next week",
      description: "Expert in payroll systems, compliance, and process optimization."
    }
  ],
  "HR Manager": [
    {
      id: "9",
      name: "Rajesh Kumar",
      title: "HR Manager",
      company: "Global Solutions Inc",
      experience: 8,
      specializations: ["HR Operations", "Employee Relations", "Compliance"],
      rating: 4.7,
      reviews: 89,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,000/session",
      availability: "Available next week",
      description: "Results-driven HR Manager specializing in streamlining HR processes and improving employee satisfaction."
    }
  ],
  "Compensation Manager": [
    {
      id: "10",
      name: "Anita Desai",
      title: "Compensation Manager",
      company: "Financial Group",
      experience: 9,
      specializations: ["Salary Benchmarking", "Pay Equity", "Job Architecture"],
      rating: 4.8,
      reviews: 112,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,800/session",
      availability: "Available this week",
      description: "Specialist in designing fair and competitive compensation structures."
    }
  ],
  "L&D Manager": [
    {
      id: "11",
      name: "Meera Reddy",
      title: "Learning & Development Manager",
      company: "Skills Academy",
      experience: 9,
      specializations: ["Training Programs", "Leadership Development", "Performance Coaching"],
      rating: 4.9,
      reviews: 134,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,800/session",
      availability: "Available next week",
      description: "Passionate L&D professional focused on creating impactful learning experiences and developing future leaders."
    }
  ],
  "Head L&D": [
    {
      id: "12",
      name: "Sanjay Gupta",
      title: "Head of Learning & Development",
      company: "Edu Tech Solutions",
      experience: 12,
      specializations: ["L&D Strategy", "Digital Learning", "Change Management"],
      rating: 4.9,
      reviews: 145,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,500/session",
      availability: "Available this week",
      description: "Strategic L&D leader with expertise in digital transformation and organizational learning."
    }
  ],
  "Employee Relations Mgr": [
    {
      id: "13",
      name: "Kavya Nair",
      title: "Employee Relations Manager",
      company: "People First Corp",
      experience: 7,
      specializations: ["Conflict Resolution", "Policy Development", "Employee Engagement"],
      rating: 4.7,
      reviews: 98,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,400/session",
      availability: "Available next week",
      description: "Expert in managing employee relations and creating positive workplace cultures."
    }
  ],
  "HR Director": [
    {
      id: "14",
      name: "Vikash Agarwal",
      title: "HR Director",
      company: "Enterprise Solutions",
      experience: 15,
      specializations: ["Strategic HR", "Organizational Development", "Leadership"],
      rating: 4.9,
      reviews: 178,
      image: "/images/expert-placeholder.jpg",
      price: "₹4,000/session",
      availability: "Available this week",
      description: "Senior HR executive with extensive experience in strategic HR transformation."
    }
  ],
  "VP HR": [
    {
      id: "15",
      name: "Sunita Mehta",
      title: "VP Human Resources",
      company: "Global Tech Inc",
      experience: 18,
      specializations: ["Executive Leadership", "HR Strategy", "Business Transformation"],
      rating: 4.9,
      reviews: 201,
      image: "/images/expert-placeholder.jpg",
      price: "₹5,000/session",
      availability: "Available today",
      description: "Executive leader specializing in HR strategy and organizational transformation."
    }
  ],
  "CHRO": [
    {
      id: "16",
      name: "Ravi Krishnan",
      title: "Chief Human Resources Officer",
      company: "Fortune 500 Corp",
      experience: 20,
      specializations: ["Executive Strategy", "Board Relations", "Cultural Transformation"],
      rating: 5.0,
      reviews: 89,
      image: "/images/expert-placeholder.jpg",
      price: "₹8,000/session",
      availability: "Available next week",
      description: "Chief HR executive with proven track record in large-scale organizational transformation."
    }
  ],
  "Director/CHRO": [
    {
      id: "17",
      name: "Aditi Bansal",
      title: "HR Director",
      company: "Innovation Group",
      experience: 16,
      specializations: ["Digital HR", "Analytics", "Strategic Planning"],
      rating: 4.8,
      reviews: 134,
      image: "/images/expert-placeholder.jpg",
      price: "₹4,500/session",
      availability: "Available this week",
      description: "Forward-thinking HR leader focused on digital transformation and data-driven decisions."
    }
  ],
  "Group CHRO": [
    {
      id: "18",
      name: "Manish Joshi",
      title: "Group CHRO",
      company: "Multinational Conglomerate",
      experience: 22,
      specializations: ["Global HR", "M&A Integration", "Leadership Development"],
      rating: 5.0,
      reviews: 67,
      image: "/images/expert-placeholder.jpg",
      price: "₹10,000/session",
      availability: "Available next week",
      description: "Global HR leader with expertise in complex organizational structures and M&A integration."
    }
  ],
  "Senior Consultant": [
    {
      id: "19",
      name: "Pooja Sharma",
      title: "Senior HR Consultant",
      company: "Consulting Partners",
      experience: 11,
      specializations: ["HR Consulting", "Process Improvement", "Change Management"],
      rating: 4.8,
      reviews: 156,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,200/session",
      availability: "Available today",
      description: "Independent consultant specializing in HR process optimization and organizational change."
    }
  ],
  "HRIS Manager": [
    {
      id: "20",
      name: "Rohit Agrawal",
      title: "HRIS Manager",
      company: "Tech Systems Ltd",
      experience: 6,
      specializations: ["HR Technology", "System Implementation", "Data Analytics"],
      rating: 4.7,
      reviews: 87,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,600/session",
      availability: "Available this week",
      description: "HRIS specialist with expertise in system implementations and HR analytics."
    }
  ],
  "Talent Management Manager": [
    {
      id: "21",
      name: "Shreya Kapoor",
      title: "Talent Management Manager",
      company: "People Excellence",
      experience: 8,
      specializations: ["Succession Planning", "Performance Management", "Career Development"],
      rating: 4.8,
      reviews: 123,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,700/session",
      availability: "Available next week",
      description: "Expert in talent management strategies and leadership development programs."
    }
  ],
  "Head of Org Development": [
    {
      id: "22",
      name: "Arun Kumar",
      title: "Head of Organizational Development",
      company: "Growth Partners",
      experience: 13,
      specializations: ["Organizational Design", "Culture Transformation", "Leadership Coaching"],
      rating: 4.9,
      reviews: 98,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,800/session",
      availability: "Available this week",
      description: "OD specialist focused on organizational design and cultural transformation initiatives."
    }
  ],
  "D&I Manager": [
    {
      id: "23",
      name: "Ritu Singh",
      title: "Diversity & Inclusion Manager",
      company: "Inclusive Corp",
      experience: 6,
      specializations: ["D&I Strategy", "Unconscious Bias Training", "Inclusive Leadership"],
      rating: 4.8,
      reviews: 76,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,500/session",
      availability: "Available today",
      description: "D&I expert passionate about creating inclusive workplaces and driving cultural change."
    }
  ],
  "Recruitment Manager": [
    {
      id: "24",
      name: "Vishal Gupta",
      title: "Recruitment Manager",
      company: "Talent Solutions",
      experience: 9,
      specializations: ["Recruitment Analytics", "Team Management", "Process Optimization"],
      rating: 4.7,
      reviews: 145,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,400/session",
      availability: "Available this week",
      description: "Recruitment manager with strong focus on analytics and process improvement."
    }
  ],
  "Talent Acquisition Manager": [
    {
      id: "25",
      name: "Nisha Reddy",
      title: "Talent Acquisition Manager",
      company: "Startup Hub",
      experience: 7,
      specializations: ["Startup Hiring", "Employer Branding", "Cultural Fit Assessment"],
      rating: 4.6,
      reviews: 89,
      image: "/images/expert-placeholder.jpg",
      price: "₹2,300/session",
      availability: "Available next week",
      description: "TA specialist with expertise in startup hiring and building strong employer brands."
    }
  ],
  "Compensation & Benefits Manager": [
    {
      id: "26",
      name: "Vikram Singh",
      title: "Compensation & Benefits Manager",
      company: "Financial Services Ltd",
      experience: 11,
      specializations: ["Compensation Design", "Benefits Strategy", "Salary Benchmarking"],
      rating: 4.7,
      reviews: 98,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,200/session",
      availability: "Available this week",
      description: "Expert in designing competitive compensation packages and comprehensive benefits programs."
    }
  ],
  "HR Business Partner (HRBP)": [
    {
      id: "27",
      name: "Lakshmi Iyer",
      title: "Senior HR Business Partner",
      company: "Enterprise Corp",
      experience: 10,
      specializations: ["Business Partnership", "Strategic HR", "Organizational Development"],
      rating: 4.8,
      reviews: 156,
      image: "/images/expert-placeholder.jpg",
      price: "₹3,000/session",
      availability: "Available today",
      description: "Strategic HRBP with proven track record of aligning HR initiatives with business objectives."
    }
  ]
};

const Experts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { nextRole, currentRole } = location.state || {};
  
  useEffect(() => {
    if (!nextRole) {
      navigate('/');
    }
  }, [nextRole, navigate]);

  const experts = useMemo(() => {
    return EXPERT_DATABASE[nextRole] || [];
  }, [nextRole]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `HR Experts for ${nextRole}`,
      description: `Connect with experienced HR professionals specializing in ${nextRole} roles for career guidance and mentorship.`,
      url: "/experts",
      author: { "@type": "Organization", name: "Lovable" },
    }),
    [nextRole]
  );

  if (!nextRole) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{`HR Experts for ${nextRole} | Connect with Industry Professionals`}</title>
        <meta
          name="description"
          content={`Connect with experienced HR professionals specializing in ${nextRole} roles. Get personalized career guidance and mentorship.`}
        />
        <link rel="canonical" href="/experts" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roadmap
            </Button>
          </div>

          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Connect with HR Experts</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Get personalized guidance from experienced professionals
            </p>
            <p className="text-muted-foreground mb-6">
              Specializing in <Badge variant="secondary" className="mx-1">{nextRole}</Badge> roles
            </p>
            
            {/* Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <Card className="glass-card border-2 border-primary/20">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">Free Consultation</CardTitle>
                  <div className="text-2xl font-bold text-primary">FREE</div>
                  <p className="text-sm text-muted-foreground">10 minutes</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm mb-4">Quick career guidance and initial assessment</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Basic career advice</li>
                    <li>• Quick Q&A session</li>
                    <li>• Resource recommendations</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-2 border-secondary/20">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">Guidance Session</CardTitle>
                  <div className="text-2xl font-bold text-secondary">₹500</div>
                  <p className="text-sm text-muted-foreground">30 minutes</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm mb-4">Detailed career planning and skill development</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Personalized roadmap</li>
                    <li>• Skill gap analysis</li>
                    <li>• Industry insights</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-2 border-accent/20">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">Career Buddy</CardTitle>
                  <div className="text-2xl font-bold text-accent">₹2,000</div>
                  <p className="text-sm text-muted-foreground">2 months support</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm mb-4">Ongoing mentorship and career support</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Weekly check-ins</li>
                    <li>• Progress tracking</li>
                    <li>• Interview preparation</li>
                  </ul>
                  <Button 
                    className="mt-4 w-full" 
                    variant="outline"
                    onClick={() => window.open('/career-buddy-premium', '_blank')}
                  >
                    Get Career Planner Buddy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </header>

          {experts.length === 0 ? (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <p className="text-lg mb-4">No experts available for this role yet</p>
                <p className="text-muted-foreground mb-6">
                  We're constantly expanding our network of HR professionals. 
                  Check back soon or contact us to suggest experts.
                </p>
                <Button onClick={() => navigate('/')}>
                  Return to Roadmap
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard = ({ expert }: ExpertCardProps) => {
  const handleBookSession = () => {
    // This would typically open a booking modal or redirect to a booking platform
    alert(`Booking session with ${expert.name}. In a real application, this would open a booking interface.`);
  };

  const handleSendMessage = () => {
    // This would typically open a messaging interface
    alert(`Starting conversation with ${expert.name}. In a real application, this would open a messaging interface.`);
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white text-2xl font-bold">
          {expert.name.split(' ').map(n => n[0]).join('')}
        </div>
        <CardTitle className="text-lg">{expert.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{expert.title}</p>
        <p className="text-sm font-medium">{expert.company}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Experience</span>
          <span className="font-medium">{expert.experience} years</span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{expert.rating}</span>
          <span className="text-sm text-muted-foreground">({expert.reviews} reviews)</span>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-1">
            {expert.specializations.map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{expert.description}</p>

        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {expert.availability}
            </span>
            <span className="font-medium text-primary">{expert.price}</span>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleBookSession} 
              className="flex-1 flex items-center gap-1"
              variant="default"
            >
              <Video className="w-4 h-4" />
              Book Session
            </Button>
            <Button 
              onClick={handleSendMessage}
              variant="outline" 
              className="flex items-center gap-1 px-3"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Experts;