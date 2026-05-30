"use client";

import { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

import { auth } from "@/firebase/config";

export default function GoogleLoginButton() {
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log(
            "REDIRECT LOGIN SUCCESS:",
            result.user.uid
          );
        }
      })
      .catch((error) => {
        console.error(
          "REDIRECT ERROR:",
          error
        );
      });
  }, []);

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

        const isMobile =
          /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
          );

        console.log(
          "IS MOBILE:",
          isMobile
        );

        if (isMobile) {
          await signInWithRedirect(
            auth,
            provider
          );
          return;
        }

        await signInWithPopup(
          auth,
          provider
        );
      } catch (error) {
        console.error(
          "GOOGLE LOGIN ERROR:",
          error
        );

        alert(
          "Google login failed. Check console."
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