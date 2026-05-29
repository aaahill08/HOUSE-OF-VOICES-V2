import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F1EA]">
      <Navbar />

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-7xl font-bold text-[#1E3D30]">
          House of Voices
        </h1>

        <p className="mt-6 max-w-2xl text-2xl text-gray-700">
          Every voice matters. Every story inspires.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-[#1E3D30] px-8 py-4 text-white hover:opacity-90">
            Explore Blogs
          </button>

          <button className="rounded-xl border-2 border-[#1E3D30] px-8 py-4 text-[#1E3D30]">
            Join Community
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-[#1E3D30]">
            Our Mission
          </h2>

          <p className="mt-8 text-xl text-gray-600 leading-relaxed">
            House of Voices is a platform dedicated to empowering young minds
            through stories, ideas, and meaningful conversations. Every voice
            deserves to be heard, and every story has the power to inspire.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-[#F6F1EA]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-[#1E3D30] mb-16">
            Featured Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold">
                The Paradox of Connection
              </h3>

              <p className="mt-4 text-gray-600">
                Exploring how technology connects us while simultaneously
                creating emotional distance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold">
                The Uncertainty of Life
              </h3>

              <p className="mt-4 text-gray-600">
                Understanding unpredictability and learning how to grow through
                it.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-[#1E3D30] mb-16">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
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
      <footer className="bg-[#1E3D30] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
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