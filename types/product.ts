import type { CategoryType } from "./category";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
};

export type FilterOptionsTypes = {
  title: string;
  categoryId: number;
  price_min: number;
  price_max: number;
};
