"use client";

import { use, useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

interface Story {
  title: string;
  content: string;
  authorName: string;
  likes: number;
  likedBy?: string[];
}

interface Comment {
  id: string;
  name: string;
  comment: string;
}

export default function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { user } = useAuth();

  const [story, setStory] =
    useState<Story | null>(null);

  const [liked, setLiked] =
    useState(false);

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [newComment, setNewComment] =
    useState("");

  useEffect(() => {
    const fetchStory = async () => {
      const docRef = doc(
        db,
        "stories",
        id
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {
        const data =
          docSnap.data() as Story;

        setStory(data);

        if (
          user &&
          data.likedBy?.includes(
            user.uid
          )
        ) {
          setLiked(true);
        }
      }
    };

    const fetchComments = async () => {
      const snapshot =
        await getDocs(
          collection(
            db,
            "stories",
            id,
            "comments"
          )
        );

      const commentData =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];

      setComments(commentData);
    };

    fetchStory();
    fetchComments();
  }, [id, user]);

  const handleLike = async () => {
    if (!user || !story || liked)
      return;

    const docRef = doc(
      db,
      "stories",
      id
    );

    await updateDoc(docRef, {
      likes:
        (story.likes || 0) + 1,

      likedBy: arrayUnion(
        user.uid
      ),
    });

    setStory({
      ...story,
      likes:
        (story.likes || 0) + 1,
    });

    setLiked(true);
  };

  const postComment = async () => {
    if (!user || !newComment)
      return;

    await addDoc(
      collection(
        db,
        "stories",
        id,
        "comments"
      ),
      {
        name:
          user.displayName ||
          "Anonymous",

        uid: user.uid,

        photoURL:
          user.photoURL || "",

        comment: newComment,

        createdAt:
          serverTimestamp(),
      }
    );

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        name:
          user.displayName ||
          "Anonymous",
        comment: newComment,
      },
    ]);

    setNewComment("");
  };

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow">

        <h1 className="text-5xl font-bold text-[#1E3D30]">
          {story.title}
        </h1>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-500">
            By {story.authorName}
          </p>

          <button
            onClick={handleLike}
            disabled={liked}
            className={`rounded-xl px-4 py-2 ${
              liked
                ? "bg-red-500 text-white"
                : "bg-gray-100"
            }`}
          >
            ❤️ {story.likes || 0}
          </button>
        </div>

        <div className="mt-10 whitespace-pre-wrap text-lg leading-relaxed">
          {story.content}
        </div>

        <div className="mt-16 border-t pt-10">
          <h2 className="text-3xl font-bold">
            Comments ({comments.length})
          </h2>

          <div className="mt-6 space-y-4">
            {comments.map(
              (comment) => (
                <div
                  key={comment.id}
                  className="rounded-xl bg-gray-100 p-4"
                >
                  <p className="font-semibold">
                    {comment.name}
                  </p>

                  <p className="mt-2">
                    {comment.comment}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-8">
            <textarea
              value={newComment}
              onChange={(e) =>
                setNewComment(
                  e.target.value
                )
              }
              placeholder="Write a comment..."
              className="w-full rounded-xl border p-4"
              rows={4}
            />

            <button
              onClick={postComment}
              className="mt-4 rounded-xl bg-[#1E3D30] px-6 py-3 text-white"
            >
              Post Comment
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}