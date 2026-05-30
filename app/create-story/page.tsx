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

  const [category, setCategory] =
    useState("Life");

  const submitStory = async () => {
    if (
      !title ||
      !content ||
      !category
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(
          db,
          "pendingStories"
        ),
        {
          title,
          content,

          category,

          authorName:
            user?.displayName ||
            "Anonymous",

          authorId:
            user?.uid || "",

          authorPhoto:
            user?.photoURL || "",

          submittedAt:
            serverTimestamp(),

          status: "pending",

          likes: 0,

          likedBy: [],

          commentsCount: 0,
        }
      );

      console.log(
        "SUCCESS:",
        docRef.id
      );

      alert(
        "Story submitted for review successfully!"
      );

      setTitle("");
      setContent("");
      setCategory("Life");
    } catch (error) {
      console.error(
        "FIRESTORE ERROR:",
        error
      );

      alert(
        "Failed to submit story"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-2 text-4xl font-bold text-[#1E3D30]">
          Submit Story
        </h1>

        <p className="mb-8 text-gray-600">
          Your story will be reviewed by an admin before publication.
        </p>

        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border p-4"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border p-4"
        >
          <option value="Life">
            Life
          </option>

          <option value="Technology">
            Technology
          </option>

          <option value="Mental Health">
            Mental Health
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Gaming">
            Gaming
          </option>

          <option value="Poetry">
            Poetry
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={10}
          className="mb-6 w-full rounded-xl border p-4"
        />

        <button
          onClick={submitStory}
          className="rounded-xl bg-[#1E3D30] px-6 py-3 text-white hover:opacity-90"
        >
          Submit For Review
        </button>

      </div>
    </main>
  );
}