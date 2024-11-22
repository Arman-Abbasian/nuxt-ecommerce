import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "~/composable/useAuth";
import { useCheckUser } from "~/composable/useCheckUser";

const useAuthenticateUser = () => {
  const { authUser } = useAuth();
  const route = useRoute();

  const checkUser = async () => {
    const { checkUserData, checkUserError } = await useCheckUser();
    if (checkUserError.value || !checkUserData.value) {
      authUser.value = null;
    } else {
      const data = checkUserData.value.data.data;
      authUser.value = {
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
};

export default useAuthenticateUser;
