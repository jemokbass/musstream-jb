"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { Price, ProductWithPrice } from "@/types";
import { useSubscribeModal, useUser } from "@/hooks";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { formatPrice } from "./helpers";

import { Button } from "@/components/Button";
import { Modal } from "../Modal";

type Props = {
  products: ProductWithPrice[];
};

export const SubscribeModal = ({ products }: Props) => {
  const { isOpen, onClose, onOpen } = useSubscribeModal();
  const [priceIdLoading, setPriceIdLoading] = useState("");
  const { isLoading, user, subscription } = useUser();

  const onChange = (open: boolean) => {
    if (!open) {
      return onClose();
    }
    onOpen();
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading("");
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading("");
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading("");
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (subscription) {
    content = <div className="text-center">ALready subscribed</div>;
  }

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map(productPrice => (
            <Button
              onClick={() => handleCheckout(productPrice)}
              disabled={isLoading || productPrice.id === priceIdLoading}
              className="mb-4"
              key={productPrice.id}
            >{`Subscribe for ${formatPrice(productPrice)} a ${productPrice.interval}`}</Button>
          ));
        })}
      </div>
    );
  }

  return (
    <Modal
      title="Only for Premium users"
      description="Listen to music with Musstream Premium"
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};
