"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookOpen, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter.";
    }

    return "";
  };

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    const error = validatePassword(password);
    setPasswordError(error);

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-up failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25231F] text-white">
              <BookOpen size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-[#25231F]">
              BookNook
            </span>
          </Link>
          <p className="text-sm text-[#77716A]">
            A little corner for your next favorite book.
          </p>
        </div>

        <Card className="rounded-2xl border-[#25231F]/10 bg-white shadow-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="font-serif text-2xl font-bold text-[#25231F]">
              Welcome to BookNook
            </CardTitle>
            <CardDescription className="text-[#77716A]">
              Create your account and begin your reading journey.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="h-11 border-[#25231F]/15"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-11 border-[#25231F]/15"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                  <Input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    required
                    className="h-11 border-[#25231F]/15"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                    placeholder="Create a password"
                    required
                    className="h-11 border-[#25231F]/15"
                  />
                  {passwordError && (
                    <p className="text-sm text-red-600">{passwordError}</p>
                  )}
                  <p className="text-xs text-[#77716A]">
                    At least 6 characters, with uppercase and lowercase letters.
                  </p>
                </Field>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-[#25231F] text-white hover:bg-[#B58A62]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>

                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#25231F]/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-[#77716A]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  disabled={googleLoading}
                  onClick={handleGoogleSignup}
                  className="h-11 w-full border-[#25231F]/15 text-[#25231F] hover:bg-[#F7F3EE]"
                >
                  {googleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.09-1.92 3.27-4.74 3.27-8.1Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.44.34-2.11V7.05H2.15A11 11 0 0 0 1 12c0 1.78.43 3.46 1.15 4.95l3.69-2.84Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.85 6.05l3.69 2.84C6.71 7.29 9.14 5.36 12 5.36Z"
                        fill="#EA4335"
                      />
                    </svg>
                  )}
                  Sign up with Google
                </Button>

                <p className="text-center text-sm text-[#77716A]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#B58A62] underline-offset-4 hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}