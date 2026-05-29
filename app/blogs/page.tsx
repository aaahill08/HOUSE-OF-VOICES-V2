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
}

export default function BlogsPage() {
  const [stories, setStories] =
    useState<Story[]>([]);

  useEffect(() => {
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

    fetchStories();
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-5xl font-bold text-[#1E3D30]">
          Stories
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {stories.map((story) => (
            <Link
              href={`/blogs/${story.id}`}
              key={story.id}
              className="block rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {story.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                By {story.authorName}
              </p>

              <p className="mt-4 text-gray-700">
                {story.content.slice(0, 150)}
                ...
              </p>

              <p className="mt-6 font-semibold text-[#1E3D30]">
                Read More →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}