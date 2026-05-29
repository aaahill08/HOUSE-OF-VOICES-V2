"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log("Logged in:", result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      Continue with Google
    </button>
  );
}