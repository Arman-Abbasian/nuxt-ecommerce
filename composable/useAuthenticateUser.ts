import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { UserType } from "~/types/user";
import { useCheckUser } from "./useCheckUser";

const useAuthenticateUser = () => {
  const isLoggedIn = ref(false);
  const user = ref<UserType | null>(null);
  const route = useRoute();

  const checkUser = async () => {
    const { checkUserData, checkUserError } = await useCheckUser();
    if (checkUserError.value || !checkUserData.value) {
      isLoggedIn.value = false;
      user.value = null;
    } else {
      isLoggedIn.value = true;
      const data = checkUserData.value.data.data;
      user.value = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        avatar: data.avatar,
      };
    }
  };

  // Watch route changes and check user
  watch(route, async () => {
    await checkUser();
  });

  // Check user on initial load
  onMounted(async () => {
    await checkUser();
  });

  return { isLoggedIn, user };
};

export default useAuthenticateUser;
