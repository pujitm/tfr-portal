import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Makes it easier to conditionally add Tailwind CSS classes
 * 
 * From https://ui.shadcn.com/docs/installation
 * @param inputs 
 * @returns 
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
