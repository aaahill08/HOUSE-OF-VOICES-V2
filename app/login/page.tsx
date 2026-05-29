"use client";

import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          House of Voices
        </h1>

        <GoogleLoginButton />
      </div>
    </main>
  );
}