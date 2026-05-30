"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { user } = useAuth();

  const router =
    useRouter();

  useEffect(() => {
    if (user) {
      router.push(
        "/dashboard"
      );
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">

        <h1 className="text-4xl font-bold">
          House of Voices
        </h1>

        <GoogleLoginButton />

      </div>
    </main>
  );
}