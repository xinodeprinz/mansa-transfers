import { Product } from "@/types";

export const mobileCarriers = {
  mtn: [
    ["67", "68"],
    ["650", "651", "652", "653", "654"],
  ],
  orange: [["69"], ["655", "656", "657", "658", "659"]],
};

export const mockUser = {
  first_name: "Nfor",
  last_name: "Nde",
  email: "nfor.nde@ndetek.com",
};

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "Leather Bracelet",
    imageUrl:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1935&auto=format&fit=crop",
    description: "Minimal premium bracelet for daily wear.",
    price: 12990,
    quantity: 12,
    created_at: "2026-01-12T10:24:00Z",
  },
  {
    id: "p2",
    title: "Silver Ring",
    imageUrl:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1935&auto=format&fit=crop",
    description: null,
    price: 8990,
    quantity: null,
    created_at: "2026-01-15T19:02:00Z",
  },
];
