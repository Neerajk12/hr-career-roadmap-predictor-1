import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
});

type FormValues = z.infer<typeof schema>;

function randomPassword(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => chars[x % chars.length]).join("");
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "", company: "" } });

  const onSubmit = async (values: FormValues) => {
    const tempPassword = randomPassword();
    const redirectUrl = `${window.location.origin}/auth/first-login`;
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: tempPassword,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name: values.name, phone: values.phone, company_name: values.company },
      },
    });

    if (error) {
      toast({ title: "Sign up failed", description: error.message });
      return;
    }

    toast({ title: "Check your email", description: "We sent a confirmation link. After confirming, set your password." });
    navigate("/auth/login");
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Sign up to save your details and access your roadmap"
      imageSrc="/images/hr-studying.jpg"
      imageAlt="HR professional studying and planning career steps"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Doe"
                    className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Primary Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jane@company.com"
                    className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone no</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 555 123 4567"
                    className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Corp"
                    className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" variant="hero" className="w-full">Create account</Button>
          </div>

          <p className="text-xs text-muted-foreground">By signing up you consent to email communications.</p>
        </form>
      </Form>

      <div className="mt-4 text-sm">
        Already have an account? <a className="underline" href="/auth/login">Log in</a>
      </div>
    </AuthLayout>
  );
};

export default Signup;
