"use client";

import { useState,useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
const Passwords=true;
  const { data: session ,status} = useSession();
  const user = session?.user;
  const router = useRouter();

  const [username, setUsername] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState(user?.image || "");
  //console.log(username);
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);
  // useEffect(() => { 

  //   // const fetchUserData = async () => {
  //   //   const res = await fetch("/api/user");
  //   //   const data = await res.json();
  //   //   if (res.ok) {
  //   //     setUsername(data.name);
  //   //     setImage(data.image);
  //   //   }
  //   // };
  //   // fetchUserData();
  //   session?.user && setUsername(session.user.name);
  //   //session?.user && setImage(session.user.image);

  // }, []);

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/user/upload-avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.error);
    setImage(data.imageUrl);
    toast.success("Profile picture updated!");
  };

  // Handle username change
  const handleUsernameChange = async () => {
    const res = await fetch("/api/user/update-username", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.error);
    toast.success("Username updated!");
  };

  // Handle password change
  const handlePasswordChange = async () => {
    const res = await fetch("/api/user/update-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.error);
    toast.success("Password updated!");
    setPassword("");
  };

  // Handle account deletion
  const handleAccountDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    const res = await fetch("/api/user/delete", {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Account deleted.");
      signOut();
    } else {
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src={image || "https://www.svgrepo.com/show/452030/avatar-default.svg"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border"
        />
        <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={handleImageUpload}
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full border p-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleUsernameChange}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Username
        </button>
      </div>

      {/* Password */}
      {/* Current Password */}
      {Passwords ? <div className="mb-4">
        <label className="block font-medium mb-1">New Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="block font-medium mb-1">Repeat Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button
          onClick={handlePasswordChange}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          
          Change Password
        </button>
      </div> :<div className="mb-4">
        <label className="block font-medium mb-1">Current Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>}
      

      {/* Delete Account */}
      <div className="mt-6">
        <button
          onClick={handleAccountDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}