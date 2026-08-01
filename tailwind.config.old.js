export default {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        // Brand colors from @theme in style.css
        brand: {
          bg: "#eeeeee",
          "bg-alt": "#f5f5f5",
          bar: "#cfcfcf",
          button: "#bdbdbd",
          text: "#2e2e2e",
          primary: "#3b82f6",
          border: "#d1d5db",
        },
        // Legacy colors (can be migrated to brand.*)
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        surface: "#ffffff",
        background: "#f5f7fb",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};
