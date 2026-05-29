"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <div className="flex items-center gap-6">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-24 w-24 rounded-full"
              />
            )}

            <div>
              <h1 className="text-3xl font-bold text-[#1E3D30]">
                {user?.displayName}
              </h1>

              <p className="text-gray-600">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-100 p-6">
              <h2 className="text-xl font-semibold">
                Stories
              </h2>
              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <h2 className="text-xl font-semibold">
                Followers
              </h2>
              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <h2 className="text-xl font-semibold">
                Likes
              </h2>
              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>
          </div>

          <div className="mt-8">
            <button className="rounded-xl bg-[#1E3D30] px-6 py-3 text-white">
              <a
  href="/create-story"
  className="inline-block rounded-xl bg-[#1E3D30] px-6 py-3 text-white"
>
  Create Story
</a>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}