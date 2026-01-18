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

export function formatCurrencyXaf(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " XAF";
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
