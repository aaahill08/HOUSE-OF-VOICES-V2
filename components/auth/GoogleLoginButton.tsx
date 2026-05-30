"use client";

import { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/firebase/config";

export default function GoogleLoginButton() {
  const [loading, setLoading] =
    useState(false);

  const handleGoogleLogin =
    async () => {
      if (loading) return;

      try {
        setLoading(true);

        const provider =
          new GoogleAuthProvider();

        provider.setCustomParameters({
          prompt: "select_account",
        });

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        console.log(
          "LOGIN SUCCESS:",
          result.user.uid
        );
      } catch (error) {
        console.error(
          "GOOGLE LOGIN ERROR:",
          error
        );

        alert(
          "Google login failed."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <button
      onClick={
        handleGoogleLogin
      }
      disabled={loading}
      className="rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
    >
      {loading
        ? "Signing In..."
        : "Continue with Google"}
    </button>
  );
}