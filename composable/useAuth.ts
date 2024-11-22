import type { UserType } from "~/types/user";

export const useAuth = () => {
  const authUser = useState<UserType | null>("auth_user", () => null);

  return { authUser };
};
