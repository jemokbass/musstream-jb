"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value?: number;
  className?: string;
  onChange?: (value: number) => void;
  maxValue?: number;
  step?: number;
  defaultValue?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  withThumb?: boolean;
};

export const Slider = ({
  className,
  onChange,
  onClick,
  value = 1,
  maxValue = 1,
  step = 0.1,
  defaultValue = 1,
  withThumb,
}: Props) => {
  const handleChange = (newValue: number[]) => {
    onChange && onChange(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className={twMerge("relative flex items-center select-none touch-none w-full h-10", className)}
      defaultValue={[defaultValue]}
      value={[value]}
      onValueChange={handleChange}
      max={maxValue}
      step={step}
      aria-label="Volume"
      onClick={onClick}
      data-value={value}
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full"></RadixSlider.Range>
      </RadixSlider.Track>
      {withThumb && <RadixSlider.Thumb className="w-[10px] h-[10px] block bg-white rounded-full" />}
    </RadixSlider.Root>
  );
};
