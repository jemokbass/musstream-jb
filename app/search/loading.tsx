"use client";

import { Box } from "@/components/Box";
import { BounceLoader } from "react-spinners";

export default function Loading() {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#0ea5e9" size={40} />
    </Box>
  );
}
