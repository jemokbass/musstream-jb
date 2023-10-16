"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { uploadModalSchema } from "@/utils/validation";
import { Form } from "@/components/Form";
import { useUser, useUploadModal } from "@/hooks";

import { Modal } from "../Modal";
import { FormikHelpers } from "formik";

const initialValues = {
  title: { value: "", placeholder: "Song title" },
  author: { value: "", placeholder: "Song author" },
  song: { value: "", type: "file", placeholder: "Select a song file", accept: ".mp3" },
  image: { value: "", type: "file", placeholder: "Select a image file", accept: "image/*" },
};

export const UploadModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useUploadModal();
  const { user } = useUser();
  const supabeseClient = useSupabaseClient();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmitHandler = async (
    values: Record<keyof typeof initialValues, any>,
    actions?: FormikHelpers<Record<keyof typeof initialValues, any>>
  ) => {
    try {
      const songFile = values.song;
      const imageFile = values.image;
      const uniqueId = uniqid();

      if (!user) {
        actions?.setSubmitting(false);
        return toast.error("You're not user");
      }
      const [{ data: songData, error: songError }, { data: imageData, error: imageError }] =
        await Promise.all([
          supabeseClient.storage
            .from("songs")
            .upload(`song-${values.title}${uniqueId}`, songFile, { cacheControl: "3600", upsert: false }),
          supabeseClient.storage
            .from("images")
            .upload(`image-${values.title}${uniqueId}`, imageFile, { cacheControl: "3600", upsert: false }),
        ]);

      if (imageError) {
        return toast.error("Failed song upload");
      }
      if (songError) {
        return toast.error("Failed image upload");
      }
      const { error: supabaseError } = await supabeseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData?.path,
        song_path: songData?.path,
      });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success("Song created!");
      actions?.resetForm();
      onClose();
    } catch (error) {}
  };

  return (
    <Modal title="Add a song" description="Upload an mp3 file" isOpen={isOpen} onChange={onChange}>
      <Form values={initialValues} schema={uploadModalSchema} onSubmitForm={onSubmitHandler} />
    </Modal>
  );
};
