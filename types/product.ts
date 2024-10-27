import type { CategoryType } from "./category";

export interface productType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

export type FilterOptionsTypes = {
  title: string;
  categoryId: number;
  price_min: number;
  price_max: number;
};
