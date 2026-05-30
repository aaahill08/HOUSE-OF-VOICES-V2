"use client";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useAuth } from "@/contexts/AuthContext";

export default function EditProfilePage() {
  const { user } = useAuth();

  const [displayName, setDisplayName] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [photoURL, setPhotoURL] =
    useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {
        const data =
          userSnap.data();

        setDisplayName(
          data.displayName || ""
        );

        setBio(
          data.bio || ""
        );

        setPhotoURL(
          data.photoURL || ""
        );
      } else {
        setDisplayName(
          user.displayName || ""
        );

        setPhotoURL(
          user.photoURL || ""
        );
      }
    };

    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;

    try {
      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        {
          displayName,
          bio,
          photoURL,
        },
        { merge: true }
      );

      alert(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-8 text-4xl font-bold text-[#1E3D30]">
          Edit Profile
        </h1>

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) =>
            setDisplayName(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border p-4"
        />

        <input
          type="text"
          placeholder="Profile Picture URL"
          value={photoURL}
          onChange={(e) =>
            setPhotoURL(
              e.target.value
            )
          }
          className="mb-4 w-full rounded-xl border p-4"
        />

        <textarea
          placeholder="Write your bio..."
          value={bio}
          onChange={(e) =>
            setBio(
              e.target.value
            )
          }
          rows={5}
          className="mb-6 w-full rounded-xl border p-4"
        />

        <button
          onClick={saveProfile}
          className="rounded-xl bg-[#1E3D30] px-6 py-3 text-white hover:opacity-90"
        >
          Save Profile
        </button>

      </div>
    </main>
  );
}