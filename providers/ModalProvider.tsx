"use client";

import { useEffect, useState } from "react";

import { AuthModal } from "@/components/modals/AuthModal";
import { UploadModal } from "@/components/modals/UploadModal";
import { SubscribeModal } from "@/components/modals/SubscribeModal";
import { ProductWithPrice } from "@/types";

type Props = {
  products: ProductWithPrice[];
};

export const ModalProvider = ({ products }: Props) => {
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
      <SubscribeModal products={products} />
    </>
  );
};
