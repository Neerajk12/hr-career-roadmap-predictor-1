import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Users, Calendar, BookOpen, Network, Crown, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareerBuddyPremium = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    
    // Razorpay integration would go here
    // For now, we'll simulate the payment process
    try {
      // In a real implementation, you would:
      // 1. Create an order on your backend
      // 2. Initialize Razorpay with the order details
      // 3. Handle the payment success/failure
      
      const options = {
        key: 'rzp_test_xxxxxxxxxxxxxxxx', // Replace with your Razorpay key
        amount: 2000000, // Amount in paise (₹20,000)
        currency: 'INR',
        name: 'HR Career Roadmap',
        description: 'Career Buddy Premium - 3 Month Program',
        handler: function(response: any) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Handle successful payment
          navigate('/payment-success');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '+919999999999'
        },
        theme: {
          color: '#3B82F6'
        }
      };

      // For demo purposes, we'll just show an alert
      alert('Razorpay integration would be implemented here. Amount: ₹20,000');
      
      // Uncomment below for actual Razorpay integration
      // const rzp = new (window as any).Razorpay(options);
      // rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Career Buddy Premium | 3-Month HR Career Mentorship Program</title>
        <meta
          name="description"
          content="Join our premium 3-month HR career mentorship program with weekly connects, exclusive workshops, networking opportunities, and lifetime access to knowledge hub."
        />
        <link rel="canonical" href="/career-buddy-premium" />
      </Helmet>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="text-gradient">Career Buddy Premium</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Transform your HR career with our comprehensive 3-month mentorship program
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ₹20,000 - One Time Investment
            </Badge>
          </header>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Program Overview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">2 Weekly Connects for 3 Months</h3>
                    <p className="text-sm text-muted-foreground">
                      24 one-on-one sessions with experienced HR professionals tailored to your career goals
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Exclusive Workshops & Webinars</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to premium content, industry insights, and skills development sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Network className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Networking Introductions</h3>
                    <p className="text-sm text-muted-foreground">
                      Direct connections to relevant industry professionals and potential employers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Lifetime Knowledge Hub Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Tools, templates, case studies, and resources to accelerate your career growth
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Benefits */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Program Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Personalized career roadmap and milestone tracking",
                    "Interview preparation and mock interview sessions",
                    "Resume and LinkedIn profile optimization",
                    "Salary negotiation strategies and techniques",
                    "Industry-specific insights and market trends",
                    "Leadership and soft skills development",
                    "Performance review and promotion guidance",
                    "Access to exclusive job opportunities",
                    "Monthly progress assessments and feedback",
                    "Certification guidance and exam preparation",
                    "Work-life balance and stress management tips",
                    "Personal branding and thought leadership development"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Card */}
          <Card className="glass-card border-2 border-primary/20 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">₹20,000</div>
                <p className="text-muted-foreground">One-time payment for 3-month program</p>
                <p className="text-sm text-muted-foreground">
                  That's just ₹833 per session (24 sessions total)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold">Duration</div>
                  <div className="text-muted-foreground">3 Months</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Sessions</div>
                  <div className="text-muted-foreground">24 Total</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full max-w-sm mx-auto flex items-center gap-2"
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                <CreditCard className="w-5 h-5" />
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Secure payment powered by Razorpay. Your investment is protected.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How are the sessions scheduled?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll be matched with a dedicated career buddy who will work with your schedule. Sessions are typically 45-60 minutes each.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What if I need to reschedule a session?</h3>
                <p className="text-sm text-muted-foreground">
                  You can reschedule sessions up to 24 hours in advance. Missed sessions without notice cannot be rescheduled.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a money-back guarantee?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day satisfaction guarantee. If you're not satisfied after your first 4 sessions, we'll provide a full refund.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What happens after the 3 months?</h3>
                <p className="text-sm text-muted-foreground">
                  You retain lifetime access to the knowledge hub and can continue with individual sessions at member rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default CareerBuddyPremium;