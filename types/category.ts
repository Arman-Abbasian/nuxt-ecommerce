export interface CategoryType {
  id: number;
  label: string;
  avatar: { src: string };
}
export interface GetCategoryRes {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}
