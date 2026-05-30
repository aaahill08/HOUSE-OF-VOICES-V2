"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-[#F6F1EA]/90 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#1E3D30]"
        >
          House of Voices
        </Link>

        {/* Desktop Menu */}
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

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl md:hidden"
        >
          ☰
        </button>

        {/* Desktop User Section */}
        {!user ? (
          <Link
            href="/login"
            className="hidden rounded-xl bg-[#1E3D30] px-5 py-2 text-white md:block"
          >
            Login
          </Link>
        ) : (
          <div className="hidden items-center gap-4 md:flex">

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
                  className="cursor-pointer rounded-full border-2 border-[#1E3D30]"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-[#F6F1EA] md:hidden">

          <div className="flex flex-col gap-4 p-4">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/blogs"
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </Link>

            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>

            <Link
              href="/saved"
              onClick={() => setMenuOpen(false)}
            >
              Saved
            </Link>

            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  href={`/profile/${user.uid}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-fit rounded-lg bg-red-500 px-4 py-2 text-white"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}