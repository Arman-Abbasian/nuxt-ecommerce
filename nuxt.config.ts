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

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          tagPosition: "bodyClose",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css", "bootstrap-icons/font/bootstrap-icons.css"],
});
