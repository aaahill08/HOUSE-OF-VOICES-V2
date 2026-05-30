"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

interface Story {
  id: string;
  title: string;
  content: string;
  authorName: string;
  category?: string;
  likes?: number;
}

export default function BlogsPage() {
  const [stories, setStories] =
    useState<Story[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");
    const trendingStories =
  [...stories]
    .sort(
      (a, b) =>
        (b.likes || 0) -
        (a.likes || 0)
    )
    .slice(0, 3);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const q = query(
      collection(db, "stories"),
      orderBy("createdAt", "desc")
    );

    const snapshot =
      await getDocs(q);

    const storyData =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Story[];

    setStories(storyData);
  };

  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter(
          (story) =>
            story.category ===
            selectedCategory
        );

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-5xl font-bold text-[#1E3D30]">
          Stories
        </h1>
        <div className="mb-12 rounded-2xl bg-white p-8 shadow">
  <h2 className="mb-6 text-3xl font-bold text-[#1E3D30]">
    🔥 Trending Stories
  </h2>

  <div className="space-y-4">
    {trendingStories.map(
      (story, index) => (
        <div
          key={story.id}
          className="flex items-center justify-between border-b pb-4"
        >
          <div>
            <p className="font-bold">
              #{index + 1} {story.title}
            </p>

            <p className="text-sm text-gray-500">
              By {story.authorName}
            </p>
          </div>

          <div className="font-semibold">
            ❤️ {story.likes || 0}
          </div>
        </div>
      )
    )}
  </div>
</div>

        <div className="mb-10 flex flex-wrap gap-3">

          {[
            "All",
            "Life",
            "Technology",
            "Gaming",
            "Education",
            "Mental Health",
            "Poetry",
            "Other",
          ].map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`rounded-full px-4 py-2 transition ${
                selectedCategory ===
                category
                  ? "bg-[#1E3D30] text-white"
                  : "bg-white"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {filteredStories.map(
            (story) => (
              <Link
                href={`/blogs/${story.id}`}
                key={story.id}
                className="block rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
              >
                <p className="mb-2 text-sm font-semibold text-blue-600">
                  {story.category}
                </p>

                <h2 className="text-2xl font-bold">
                  {story.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  By {story.authorName}
                </p>

                <p className="mt-4 text-gray-700">
                  {story.content.slice(
                    0,
                    150
                  )}
                  ...
                </p>

                <p className="mt-6 font-semibold text-[#1E3D30]">
                  Read More →
                </p>
              </Link>
            )
          )}

        </div>

      </div>

    </main>
  );
}