"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks";

import { Field } from "../Field";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = qs.stringifyUrl({ url: "/search", query });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Field
      type="search"
      placeholder="What do you wanna listen to?"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};
