import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(value: Date) {
  const seconds = Math.floor((new Date().getTime() - value.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  let interval
  interval = seconds / 31536000
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "year")
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "month")
  }
  interval = seconds / 86400
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "day")
  }
  interval = seconds / 3600
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "hour")
  }
  interval = seconds / 60
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "minute")
  }
  return rtf.format(-Math.floor(interval), "second")
}

export function paginate<T>(array: T[], pageNumber: number, pageSize: number) {
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return array.slice(start, end);
}