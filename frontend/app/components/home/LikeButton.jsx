"use client";

import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { likeProject } from "@/app/services/portfolio.service";

export default function LikeButton({ projectId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    try {
      const res = await likeProject(projectId);
      if (res?.success) {
        setLikes(res.data.likes);
        setLiked(true);
      }
    } catch {}
  };

  return (
    <button
      onClick={handleLike}
      className={`text-[13px] font-medium flex items-center gap-1.25 cursor-pointer transition-colors duration-300 ${
        liked ? "text-(--color-brand)" : "text-(--color-primary) hover:text-(--color-brand)"
      }`}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
      {likes}
    </button>
  );
}
