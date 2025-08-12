import React, { useEffect, useState } from "react";
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
  email: z.string().email("Enter a valid email"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

const FirstLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [hasSession, setHasSession] = useState<boolean>(false);

  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "", newPassword: "" } });

  useEffect(() => {
    const setup = async () => {
      const { data } = await supabase.auth.getSession();
      const current = data.session;
      if (current?.user) {
        setHasSession(true);
        setEmail(current.user.email ?? "");
        form.setValue("email", current.user.email ?? "");
      } else {
        setHasSession(false);
      }
    };
    setup();
  }, [form]);

  const onSubmit = async (values: FormValues) => {
    if (!hasSession) {
      toast({ title: "Not authenticated", description: "Open the email link first or log in." });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: values.newPassword });
    if (error) {
      toast({ title: "Could not set password", description: error.message });
      return;
    }
    toast({ title: "Password set", description: "You can now continue." });
    navigate("/main");
  };

  return (
    <AuthLayout
      title="First-time setup"
      description="Confirm your email and set a password to secure your account"
      imageSrc="/images/upskilling.jpg"
      imageAlt="Upskilling for first login"
    >
      {hasSession ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input readOnly value={email} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Set Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" className={cn(fieldState.error && "border-destructive focus-visible:ring-destructive")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" variant="hero" className="w-full">Save and continue</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            You need to open the email confirmation link from your inbox to continue. If you haven't signed up, please do so first.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="outline"><a href="/auth/login">Go to Login</a></Button>
            <Button asChild variant="secondary"><a href="/auth/signup">Create account</a></Button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default FirstLogin;
