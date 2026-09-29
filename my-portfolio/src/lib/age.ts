import { BIRTHDAY } from "./content";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Age in whole years; it goes up on Nov 30 each year. */
export function ageOn(now: Date): number {
  const { year, month, day } = BIRTHDAY;
  const hadBirthday =
    now.getMonth() + 1 > month || (now.getMonth() + 1 === month && now.getDate() >= day);
  return now.getFullYear() - year - (hadBirthday ? 0 : 1);
}

/** Whole days until the next birthday (0 on the birthday itself). */
export function daysToNextBirthday(now: Date): number {
  const { month, day } = BIRTHDAY;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next < today) next = new Date(now.getFullYear() + 1, month - 1, day);
  return Math.round((next.getTime() - today.getTime()) / DAY_MS);
}
