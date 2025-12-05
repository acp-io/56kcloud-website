/* eslint-disable @typescript-eslint/no-require-imports */
import colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// Brand colors (Red)
				brand: {
					100: "#FEE7EC",
					600: "#F00F40",
					800: "#900926",
					DEFAULT: "#F00F40",
				},
				// Primary colors (Grays/Anthrazit)
				primary: {
					100: "#F9FAFB",
					200: "#EBECED",
					300: "#C1C5C8",
					400: "#889096",
					500: "#636074",
					600: "#3D4A52", // Anthrazit
					700: "#313842",
					800: "#252C31",
					900: "#181E21",
					1000: "#121619",
					DEFAULT: "#3D4A52",
					lighter: "#F9FAFB",
					light: "#EBECED",
					medium: "#3D4A52",
					dark: "#121619",
				},
				// Success colors (Green)
				success: {
					200: "#C4E9C2",
					600: "#388535",
					900: "#184815",
				},
				// Warning colors (Yellow)
				warning: {
					200: "#FCF5D6",
					600: "#F0CC30",
					1000: "#483D0E",
				},
				// Warning colors (Orange)
				warningOrange: {
					200: "#FFEBCC",
					600: "#FF9900",
					900: "#7A4A00",
				},
				// Accent colors
				accent: {
					teal: "#1F27A0",
					blue: "#4F81BD",
				},
				// Secondary colors (for text, typically white or primary)
				secondary: {
					50: "#FFFFFF",
					100: "#F9FAFB",
					200: "#EBECED",
					300: "#C1C5C8",
					400: "#889096",
					500: "#3D4A52", // Anthrazit for dark text, white for light backgrounds
					600: "#313842",
					700: "#252C31",
					800: "#181E21",
					900: "#121619",
					DEFAULT: "#3D4A52",
				},
				// Legacy grey support (mapped to primary)
				grey: {
					50: "#F9FAFB",
					100: "#EBECED",
					200: "#C1C5C8",
					300: "#889096",
					400: "#636074",
					500: "#3D4A52",
					600: "#313842",
					700: "#252C31",
					800: "#181E21",
					900: "#121619",
					950: "#121619",
					light: "#889096",
					medium: "#3D4A52",
					dark: "#252C31",
				},
				error: colors.red,
				background: "#FFFFFF",
				// Override slate colors to match primary palette
				slate: {
					50: "#F9FAFB", // primary-100
					100: "#EBECED", // primary-200
					200: "#C1C5C8", // primary-300
					300: "#889096", // primary-400
					400: "#636074", // primary-500
					500: "#3D4A52", // primary-600 (Anthrazit)
					600: "#313842", // primary-700
					700: "#252C31", // primary-800
					800: "#181E21", // primary-900
					900: "#121619", // primary-1000
					950: "#121619", // primary-1000
				},
				// Override sky colors to use brand red for accents
				sky: {
					50: "#FEE7EC", // brand-100
					100: "#FEE7EC", // brand-100
					200: "#FEE7EC", // brand-100
					300: "#FEE7EC", // brand-100
					400: "#F00F40", // brand-600
					500: "#F00F40", // brand-600
					600: "#F00F40", // brand-600
					700: "#900926", // brand-800
					800: "#900926", // brand-800
					900: "#900926", // brand-800
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			backgroundImage: {
				"text-gradient-gray":
					"linear-gradient(to left, rgba(248, 250, 252, 0.7) 10%, rgba(248, 250, 252, 1), rgba(248, 250, 252, 0.7) 90%)",
				"text-gradient-blue":
					"linear-gradient(to left, #F0F9FF 0%, #0EA5E9 80%)",
				"radial-gradient":
					"radial-gradient(40% 90% at 50% 0%, rgba(14, 165, 233, 0.64) 0%, rgba(15, 23, 42, 0.00) 180%)",
				"brand-gradient":
					"linear-gradient(to bottom, #F00F40 0%, #900926 100%)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("tailwindcss-animate"),
	],
} satisfies Config;

export default config;
