export interface productType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

interface CategoryType {
  id: number;
  name: string;
  image: string;
}
