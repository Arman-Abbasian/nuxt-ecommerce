import type { CategoryType } from "./category";

export interface productType {
  id: null | number;
  title: string;
  price: null | number;
  description: string;
  category: null | CategoryType;
  images: [] | string[];
}

export type FilterOptionsTypes = {
  title: string;
  categoryId: number | null;
  price_min: number;
  price_max: number;
};
