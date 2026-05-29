"use client";

import { use, useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

interface Story {
  id: string;
  title: string;
  likes?: number;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = use(params);

  const [stories, setStories] =
    useState<Story[]>([]);

  const [authorName, setAuthorName] =
    useState("");

  const [totalLikes, setTotalLikes] =
    useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const q = query(
        collection(db, "stories"),
        where("authorId", "==", uid)
      );

      const snapshot =
        await getDocs(q);

      const storyData =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];

      setStories(storyData);

      if (storyData.length > 0) {
        setAuthorName(
          snapshot.docs[0].data()
            .authorName
        );
      }

      let likes = 0;

      storyData.forEach((story) => {
        likes += story.likes || 0;
      });

      setTotalLikes(likes);
    };

    fetchProfile();
  }, [uid]);

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-2xl bg-white p-10 shadow">

          <h1 className="text-5xl font-bold text-[#1E3D30]">
            {authorName || "Author"}
          </h1>

          <div className="mt-6 flex gap-8">

            <div>
              <p className="text-gray-500">
                Stories
              </p>

              <p className="text-2xl font-bold">
                {stories.length}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Total Likes
              </p>

              <p className="text-2xl font-bold">
                ❤️ {totalLikes}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-10">

          <h2 className="mb-6 text-3xl font-bold">
            Published Stories
          </h2>

          <div className="grid gap-6">

            {stories.map((story) => (
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
              </div>
            ))}

          </div>

        </div>

      </div>
    </main>
  );
}