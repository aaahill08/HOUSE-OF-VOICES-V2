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
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-[#F6F1EA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-[#1E3D30]"
        >
          House of Voices
        </Link>

        <div className="hidden gap-8 font-medium md:flex">

          <Link href="/">
            Home
          </Link>

          <Link href="/blogs">
            Blogs
          </Link>

          <Link href="/search">
            Search
          </Link>

          <Link href="/saved">
            Saved
          </Link>

          <Link href="/events">
            Events
          </Link>

          <Link href="/community">
            Community
          </Link>

        </div>

        {!user ? (
          <Link
            href="/login"
            className="rounded-xl bg-[#1E3D30] px-5 py-2 text-white"
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
  <Link href={`/profile/${user.uid}`}>
    <Image
      src={user.photoURL}
      alt="Profile"
      width={40}
      height={40}
      className="cursor-pointer rounded-full"
    />
  </Link>
)}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}