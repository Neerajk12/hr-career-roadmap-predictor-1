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
  "HR Manager": [
    {
      id: "1",
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
    },
    {
      id: "2", 
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
  "HR Business Partner (HRBP)": [
    {
      id: "3",
      name: "Priya Sharma", 
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
  ],
  "Talent Acquisition Manager": [
    {
      id: "4",
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
  "L&D Manager": [
    {
      id: "5",
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
  "Compensation & Benefits Manager": [
    {
      id: "6",
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
            <p className="text-muted-foreground">
              Specializing in <Badge variant="secondary" className="mx-1">{nextRole}</Badge> roles
            </p>
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