import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        "afacad-flux": ["Afacad Flux", "sans-serif"],
      },
      colors: {
        success: "#15803d",
        warning: "#eab308",
        error: "#991b1b",
      },
    },
  },
};
