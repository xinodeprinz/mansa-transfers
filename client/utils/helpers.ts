import { mobileCarriers } from "@/utils";

export function normalizeCameroonPhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) return digits.slice(3);
  return digits;
}

export function isMtnOrOrangeCameroon(phoneLocal9: string) {
  if (!/^\d{9}$/.test(phoneLocal9)) return false;
  if (!phoneLocal9.startsWith("6")) return false;

  const p2 = phoneLocal9.slice(0, 2);
  const p3 = phoneLocal9.slice(0, 3);
  const { mtn, orange } = mobileCarriers;

  return (
    mtn[0].includes(p2) ||
    orange[0].includes(p2) ||
    mtn[1].includes(p3) ||
    orange[1].includes(p3)
  );
}
