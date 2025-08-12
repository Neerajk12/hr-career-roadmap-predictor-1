import React from "react";
import { Helmet } from "react-helmet-async";

interface AuthLayoutProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, description, imageSrc, imageAlt, children }) => {
  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <Helmet>
        <title>{title} | HR Career Roadmap</title>
        <meta name="description" content={description ?? `${title} for HR Career Roadmap`} />
        <link rel="canonical" href={window.location.pathname} />
      </Helmet>

      <aside className="hidden md:block relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </aside>

      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            )}
          </header>

          <div className="glass-card p-6 rounded-lg">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
