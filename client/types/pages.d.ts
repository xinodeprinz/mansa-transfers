export type Product = {
  id: string;
  title: string;
  imageUrl: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  created_at: string;
};
