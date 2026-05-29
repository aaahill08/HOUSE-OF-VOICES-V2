"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

interface Story {
  id: string;
  title: string;
  authorName: string;
  content: string;
}

export default function SearchPage() {
  const [stories, setStories] =
    useState<Story[]>([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    const fetchStories = async () => {
      const snapshot =
        await getDocs(
          collection(db, "stories")
        );

      const data =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];

      setStories(data);
    };

    fetchStories();
  }, []);

  const filteredStories =
    stories.filter((story) => {
      const term =
        searchTerm.toLowerCase();

      return (
        story.title
          .toLowerCase()
          .includes(term) ||
        story.authorName
          .toLowerCase()
          .includes(term)
      );
    });

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-5xl font-bold text-[#1E3D30]">
          Search Stories
        </h1>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="mb-10 w-full rounded-xl border bg-white p-4 text-lg"
        />

        <div className="grid gap-6">

          {filteredStories.map(
            (story) => (
              <Link
                key={story.id}
                href={`/blogs/${story.id}`}
                className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h2 className="text-2xl font-bold">
                  {story.title}
                </h2>

                <p className="mt-2 text-gray-500">
                  By {story.authorName}
                </p>

                <p className="mt-4 text-gray-700">
                  {story.content.slice(
                    0,
                    120
                  )}
                  ...
                </p>
              </Link>
            )
          )}

        </div>

      </div>

    </main>
  );
}