import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
return ( <main className="min-h-screen bg-[#F6F1EA]"> <Navbar />

  {/* Hero Section */}
  <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">

    <h1 className="text-5xl font-bold text-[#1E3D30] md:text-7xl">
      House of Voices
    </h1>

    <p className="mt-6 max-w-2xl text-xl text-gray-700 md:text-2xl">
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

  {/* Mission Section */}
  <section className="bg-white py-24">

    <div className="mx-auto max-w-4xl px-6 text-center">

      <h2 className="text-4xl font-bold text-[#1E3D30] md:text-5xl">
        Our Mission
      </h2>

      <p className="mt-8 text-lg leading-relaxed text-gray-600 md:text-xl">
        House of Voices is a platform dedicated to empowering young minds
        through stories, ideas, and meaningful conversations. Every voice
        deserves to be heard, and every story has the power to inspire.
      </p>

    </div>

  </section>

  {/* Featured Articles */}
  <section className="bg-[#F6F1EA] py-24">

    <div className="mx-auto max-w-6xl px-6">

      <h2 className="mb-16 text-center text-4xl font-bold text-[#1E3D30] md:text-5xl">
        Featured Articles
      </h2>

      <div className="grid gap-8 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold">
            The Paradox of Connection
          </h3>

          <p className="mt-4 text-gray-600">
            Exploring how technology connects us while simultaneously
            creating emotional distance.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold">
            The Uncertainty of Life
          </h3>

          <p className="mt-4 text-gray-600">
            Understanding unpredictability and learning how to grow through
            it.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold">
            Freedom
          </h3>

          <p className="mt-4 text-gray-600">
            A reflection on personal freedom, responsibility, and
            self-expression.
          </p>
        </div>

      </div>

    </div>

  </section>

  {/* Impact Section */}
  <section className="bg-white py-24">

    <div className="mx-auto max-w-6xl px-6">

      <h2 className="mb-16 text-center text-4xl font-bold text-[#1E3D30] md:text-5xl">
        Our Impact
      </h2>

      <div className="grid gap-8 text-center md:grid-cols-3">

        <div>
          <h3 className="text-5xl font-bold text-[#1E3D30]">
            500+
          </h3>

          <p className="mt-2 text-gray-600">
            Readers
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-[#1E3D30]">
            50+
          </h3>

          <p className="mt-2 text-gray-600">
            Stories
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-[#1E3D30]">
            10+
          </h3>

          <p className="mt-2 text-gray-600">
            Contributors
          </p>
        </div>

      </div>

    </div>

  </section>

  {/* Footer */}
  <footer className="bg-[#1E3D30] py-12 text-white">

    <div className="mx-auto max-w-6xl px-6 text-center">

      <h3 className="text-3xl font-bold">
        House of Voices
      </h3>

      <p className="mt-4 text-gray-300">
        Every Voice Matters. Every Story Inspires.
      </p>

      <div className="mt-6 flex justify-center gap-6">
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
        <a href="#">Contact</a>
      </div>

    </div>

  </footer>

</main>

);
}
