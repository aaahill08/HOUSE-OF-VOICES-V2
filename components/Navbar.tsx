"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#F6F1EA]/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-2xl text-[#1E3D30]"
        >
          House of Voices
        </Link>

        <div className="hidden md:flex gap-8 font-medium">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/events">Events</Link>
          <Link href="/community">Community</Link>
        </div>

        {!user ? (
          <Link
            href="/login"
            className="bg-[#1E3D30] text-white px-5 py-2 rounded-xl"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="font-medium"
            >
              Dashboard
            </Link>

            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}