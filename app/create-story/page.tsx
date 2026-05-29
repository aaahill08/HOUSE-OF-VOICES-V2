"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateStory() {
  const { user } = useAuth();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const publishStory = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(
        collection(db, "stories"),
        {
          title,
          content,

          authorName:
            user?.displayName || "Anonymous",

          authorId:
            user?.uid || "",

          authorPhoto:
            user?.photoURL || "",

          createdAt:
            serverTimestamp(),

          likes: 0,

          likedBy: [],

          commentsCount: 0,
        }
      );

      alert(
        "Story published successfully!"
      );

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);

      alert("Failed to publish story");
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-4xl font-bold text-[#1E3D30]">
          Create Story
        </h1>

        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mb-4 w-full rounded-xl border p-4"
        />

        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows={10}
          className="mb-6 w-full rounded-xl border p-4"
        />

        <button
          onClick={publishStory}
          className="rounded-xl bg-[#1E3D30] px-6 py-3 text-white hover:opacity-90"
        >
          Publish Story
        </button>
      </div>
    </main>
  );
}