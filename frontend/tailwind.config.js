//apparently tailwind doesnt use this anymore?

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  extend: {
    colors: {
      forge: {
        bg: "#0f1117",
        sidebar: "#161b22",
        border: "#21262d",
        hover: "#1c2128",
        accent: "#2563eb",
        muted: "#8b949e",
      },
    },
  },
},
  plugins: [],
}