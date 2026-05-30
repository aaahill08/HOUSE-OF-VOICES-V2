"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

interface Bookmark {
  id: string;
  storyId: string;
  title: string;
  authorName: string;
}

export default function SavedPage() {
  const { user } = useAuth();

  const [savedStories, setSavedStories] =
    useState<Bookmark[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchBookmarks =
      async () => {
        if (!user) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "bookmarks"),
          where(
            "userId",
            "==",
            user.uid
          )
        );

        const snapshot =
          await getDocs(q);

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Bookmark[];

        setSavedStories(data);

        setLoading(false);
      };

    fetchBookmarks();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-10 text-5xl font-bold text-[#1E3D30]">
          Saved Stories
        </h1>

        {savedStories.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-lg text-gray-500">
              No saved stories yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {savedStories.map(
              (story) => (
                <Link
                  key={story.id}
                  href={`/blogs/${story.storyId}`}
                  className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
                >
                  <h2 className="text-2xl font-bold">
                    {story.title}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    By {story.authorName}
                  </p>

                  <p className="mt-4 font-semibold text-[#1E3D30]">
                    Read Story →
                  </p>
                </Link>
              )
            )}

          </div>
        )}

      </div>
    </main>
  );
}