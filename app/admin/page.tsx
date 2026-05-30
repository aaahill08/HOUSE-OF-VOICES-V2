"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

interface PendingStory {
  id: string;
  title: string;
  content: string;
  category?: string;
  authorName: string;
  authorId: string;
  authorPhoto?: string;
}

export default function AdminPage() {
  const { user } = useAuth();

  const [stories, setStories] =
    useState<PendingStory[]>([]);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [checkingAdmin, setCheckingAdmin] =
    useState(true);

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    if (!user) {
      setCheckingAdmin(false);
      return;
    }

    try {
      const adminRef = doc(
        db,
        "admin",
        user.uid
      );

      const adminSnap =
        await getDoc(adminRef);

      if (adminSnap.exists()) {
        setIsAdmin(true);
        fetchStories();
      }

      setCheckingAdmin(false);
    } catch (error) {
      console.error(error);
      setCheckingAdmin(false);
    }
  };

  const fetchStories = async () => {
    const snapshot =
      await getDocs(
        collection(
          db,
          "pendingStories"
        )
      );

    const data =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PendingStory[];

    setStories(data);
  };

  const approveStory = async (
    story: PendingStory
  ) => {
    try {
      await addDoc(
        collection(db, "stories"),
        {
          title: story.title,

          content:
            story.content,

          category:
            story.category ||
            "Other",

          authorName:
            story.authorName,

          authorId:
            story.authorId,

          authorPhoto:
            story.authorPhoto ||
            "",

          createdAt:
            serverTimestamp(),

          likes: 0,

          likedBy: [],

          commentsCount: 0,
        }
      );

      await deleteDoc(
        doc(
          db,
          "pendingStories",
          story.id
        )
      );

      fetchStories();

      alert(
        "Story approved successfully!"
      );
    } catch (error) {
      console.error(
        "APPROVE ERROR:",
        error
      );

      alert(
        "Failed to approve story"
      );
    }
  };

  const rejectStory = async (
    storyId: string
  ) => {
    try {
      await deleteDoc(
        doc(
          db,
          "pendingStories",
          storyId
        )
      );

      fetchStories();

      alert(
        "Story rejected successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to reject story"
      );
    }
  };

  if (checkingAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">
          Access Denied
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-5xl font-bold text-[#1E3D30]">
          Admin Review Panel
        </h1>

        <div className="space-y-8">

          {stories.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl bg-white p-8 shadow"
            >
              <h2 className="text-3xl font-bold">
                {story.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-blue-600">
                {story.category ||
                  "Other"}
              </p>

              <p className="mt-2 text-gray-500">
                By {story.authorName}
              </p>

              <p className="mt-6 whitespace-pre-wrap">
                {story.content}
              </p>

              <div className="mt-8 flex gap-4">

                <button
                  onClick={() =>
                    approveStory(
                      story
                    )
                  }
                  className="rounded-xl bg-green-600 px-6 py-3 text-white hover:opacity-90"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectStory(
                      story.id
                    )
                  }
                  className="rounded-xl bg-red-600 px-6 py-3 text-white hover:opacity-90"
                >
                  Reject
                </button>

              </div>
            </div>
          ))}

          {stories.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              No pending stories.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}