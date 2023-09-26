"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "@/components/modals/AuthModal/AuthModal";
import { UploadModal } from "@/components/modals/UploadModal/UploadModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UploadModal />
      <AuthModal />
    </>
  );
};
