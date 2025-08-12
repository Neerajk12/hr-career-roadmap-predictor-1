import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MainPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-hero">
      <Helmet>
        <title>Main | HR Career Roadmap</title>
        <meta name="description" content="Choose between the HR Career Roadmap Predictor tool or expert consultation." />
        <link rel="canonical" href="/main" />
      </Helmet>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Welcome</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Choose how you want to move forward.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>HR Career Roadmap Predictor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Use the interactive tool to generate a personalized HR career roadmap.</p>
              <Button asChild variant="hero"><a href="/">Open the tool</a></Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Consult with an Expert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Prefer a human touch? Get tailored guidance from an HR career expert.</p>
              <Button asChild variant="secondary"><a href="mailto:consult@yourdomain.com?subject=HR%20Consultation%20Request">Request consultation</a></Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
