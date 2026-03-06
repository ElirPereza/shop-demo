// Generate a tailwind 3 config file with custom colors
//  {
//   --font-size: 16px;
//   --background: #ffffff;
//   --foreground: oklch(0.145 0 0);
//   --card: #ffffff;
//   --card-foreground: oklch(0.145 0 0);
//   --popover: oklch(1 0 0);
//   --popover-foreground: oklch(0.145 0 0);
//   --primary: #030213;
//   --primary-foreground: oklch(1 0 0);
//   --secondary: oklch(0.95 0.0058 264.53);
//   --secondary-foreground: #030213;
//   --muted: #ececf0;
//   --muted-foreground: #717182;
//   --accent: #e9ebef;
//   --accent-foreground: #030213;
//   --destructive: #d4183d;
//   --destructive-foreground: #ffffff;
//   --border: rgba(0, 0, 0, 0.1);
//   --input: transparent;
//   --input-background: #f3f3f5;
//   --switch-background: #cbced4;
//   --font-weight-medium: 500;
//   --font-weight-normal: 400;
//   --ring: oklch(0.708 0 0);
//   --chart-1: oklch(0.646 0.222 41.116);
//   --chart-2: oklch(0.6 0.118 184.704);
//   --chart-3: oklch(0.398 0.07 227.392);
//   --chart-4: oklch(0.828 0.189 84.429);
//   --chart-5: oklch(0.769 0.188 70.08);
//   --radius: 0.625rem;
//   --sidebar: oklch(0.985 0 0);
//   --sidebar-foreground: oklch(0.145 0 0);
//   --sidebar-primary: #030213;
//   --sidebar-primary-foreground: oklch(0.985 0 0);
//   --sidebar-accent: oklch(0.97 0 0);
//   --sidebar-accent-foreground: oklch(0.205 0 0);
//   --sidebar-border: oklch(0.922 0 0);
//   --sidebar-ring: oklch(0.708 0 0);
// }
import plugin from "tailwindcss/plugin.js";

export default {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "#C9A962",
        "primary-foreground": "#1A1A1A",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        "input-background": "var(--input-background)",
        "switch-background": "var(--switch-background)",
        ring: {
          DEFAULT: "var(--ring)",
          50: "var(--ring-50)",
          100: "var(--ring-100)",
          200: "var(--ring-200)",
        },
        chart1: "var(--chart-1)",
        chart2: "var(--chart-2)",
        chart3: "var(--chart-3)",
        chart4: "var(--chart-4)",
        chart5: "var(--chart-5)",
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      fontSize: {
        base: "var(--font-size)",
      },
      fontWeight: {
        medium: "var(--font-weight-medium)",
        normal: "var(--font-weight-normal)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        ".outline-ring\\/50": {
          outline: `2px solid ${theme("colors.ring.50")}`,
        },
        ".outline-ring\\/100": {
          outline: `2px solid ${theme("colors.ring.100")}`,
        },
        ".outline-ring\\/200": {
          outline: `2px solid ${theme("colors.ring.200")}`,
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
