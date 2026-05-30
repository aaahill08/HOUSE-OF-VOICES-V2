"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { db, auth } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

interface Story {
  id: string;
  title: string;
  likes?: number;
}

export default function Dashboard() {
  const { user, loading } =
    useAuth();

  const router = useRouter();

  const [stories, setStories] =
    useState<Story[]>([]);

  const [followers, setFollowers] =
    useState(0);

  const [likes, setLikes] =
    useState(0);

  const [pendingStories, setPendingStories] =
    useState(0);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, [user, loading]);

  const fetchDashboardData =
    async () => {
      if (!user) return;

      const storiesSnapshot =
        await getDocs(
          query(
            collection(
              db,
              "stories"
            ),
            where(
              "authorId",
              "==",
              user.uid
            )
          )
        );

      const storyData =
        storiesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Story[];

      setStories(storyData);

      let totalLikes = 0;

      storyData.forEach(
        (story) => {
          totalLikes +=
            story.likes || 0;
        }
      );

      setLikes(totalLikes);

      const followersSnapshot =
        await getDocs(
          query(
            collection(
              db,
              "follows"
            ),
            where(
              "followingId",
              "==",
              user.uid
            )
          )
        );

      setFollowers(
        followersSnapshot.size
      );

      const pendingSnapshot =
        await getDocs(
          query(
            collection(
              db,
              "pendingStories"
            ),
            where(
              "authorId",
              "==",
              user.uid
            )
          )
        );

      setPendingStories(
        pendingSnapshot.size
      );
    };

  const deleteStory =
    async (
      storyId: string
    ) => {
      const confirmDelete =
        window.confirm(
          "Delete this story?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "stories",
            storyId
          )
        );

        fetchDashboardData();

        alert(
          "Story deleted successfully!"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to delete story"
        );
      }
    };

  const handleLogout =
    async () => {
      await signOut(auth);

      router.push("/login");
    };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] p-8">

      <div className="mx-auto max-w-6xl">

        <div className="rounded-2xl bg-white p-8 shadow">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-4xl font-bold text-[#1E3D30]">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-500">
                Welcome back,
                {" "}
                {user?.displayName}
              </p>
            </div>

            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-20 w-20 rounded-full"
              />
            )}

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">

            <div className="rounded-xl bg-gray-100 p-6">
              <p className="text-gray-500">
                Stories
              </p>

              <p className="text-3xl font-bold">
                {stories.length}
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <p className="text-gray-500">
                Followers
              </p>

              <p className="text-3xl font-bold">
                {followers}
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <p className="text-gray-500">
                Likes
              </p>

              <p className="text-3xl font-bold">
                ❤️ {likes}
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-6">
              <p className="text-gray-500">
                Pending
              </p>

              <p className="text-3xl font-bold">
                {pendingStories}
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/create-story"
              className="rounded-xl bg-[#1E3D30] px-6 py-3 text-white"
            >
              Submit Story
            </Link>

            <Link
              href="/saved"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white"
            >
              Saved Stories
            </Link>

            <Link
              href="/edit-profile"
              className="rounded-xl bg-purple-600 px-6 py-3 text-white"
            >
              Edit Profile
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="rounded-xl bg-red-500 px-6 py-3 text-white"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="mb-6 text-3xl font-bold">
            My Stories
          </h2>

          <div className="grid gap-6">

            {stories.map(
              (story) => (
                <div
                  key={story.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <h3 className="text-xl font-bold">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    ❤️ {story.likes || 0}
                  </p>

                  <div className="mt-4 flex gap-4">

                    <Link
                      href={`/blogs/${story.id}`}
                      className="rounded-lg bg-[#1E3D30] px-4 py-2 text-white"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        deleteStory(
                          story.id
                        )
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-white"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )}

            {stories.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center shadow">
                <p className="text-gray-500">
                  No stories published yet.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}