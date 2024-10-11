// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    vue: {
      include: [/\.vue$/],
    },
  },
  modules: ["@nuxt/ui"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  devServer: {
    port: 5000,
  },
  css: ["~/assets/css/main.css"],
});
