import { Field as FormikField } from "formik";
import { ElementType, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type AllowedElements = "input" | "textarea";

type Props = {
  as?: (AllowedElements & ElementType) | "formikField";
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = ({ className, as: Component = "input", ...props }: Props) => {
  const baseClassName =
    "flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none";

  if (Component === "formikField") {
    return <FormikField className={twMerge(baseClassName, className)} {...props} />;
  }

  return <Component className={twMerge(baseClassName, className)} {...props} />;
};
