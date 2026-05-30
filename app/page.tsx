import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F1EA]">
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1E3D30]">
  House of Voices
</h1>

        <p className="mt-6 max-w-2xl text-2xl text-gray-700">
          Every voice matters. Every story inspires.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
  <Link
    href="/blogs"
    className="rounded-xl bg-[#1E3D30] px-8 py-4 text-white hover:opacity-90"
  >
    Explore Blogs
  </Link>

  <Link
    href="/login"
    className="rounded-xl border-2 border-[#1E3D30] px-8 py-4 text-[#1E3D30]"
  >
    Join Community
  </Link>
</div>
      </section>

      {/* Rest of your page stays exactly the same */}
    </main>
  );
}