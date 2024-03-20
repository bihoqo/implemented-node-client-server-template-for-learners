import clsx, {ClassValue} from "clsx";
import {extendTailwindMerge} from "tailwind-merge";

const customTwMerge = extendTailwindMerge({});

export const cn = (...classes: ClassValue[]) => customTwMerge(clsx(...classes));


