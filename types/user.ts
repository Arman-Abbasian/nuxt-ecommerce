export type UserType = {
  id: number;
  email: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
};
export type CheckUserResponseType = { data: { data: UserType } };
