"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useAuthModal, useUser } from "@/hooks";

type Props = {
  id: string;
};

export const LikeButton = ({ id }: Props) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { onOpen } = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    (async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    })();
  }, [user?.id, supabaseClient, id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const onHandleClick = async () => {
    if (!user) {
      return onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({ song_id: id, user_id: user.id });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Song added to favorites!");
      }
    }

    router.refresh();
  };

  return (
    <button type="button" className="cursor-pointer hover:opacity-75 transition" onClick={onHandleClick}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};
