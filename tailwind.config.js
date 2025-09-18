/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dashboard: {
					card: "var(--dashboard-card)",
					border: "var(--dashboard-border)",
					divider: "var(--dashboard-divider)",
					text: {
						secondary: "var(--dashboard-text-secondary)",
					},
					primary: "var(--dashboard-primary)",
					success: "var(--dashboard-success)",
					danger: "var(--dashboard-danger)",
					accent: "var(--dashboard-accent)",
					white: "var(--dashboard-white)",
					offcolor: "var(--dashboard-offcolor)",
					thin_blue: "var(--dashboard-thin-blue)",
					title: "var(--dashboard-title)",
					dark: "var(--dashboard-dark)",
				},
			},
			boxShadow: {
				"dashboard-sm": "0px 1px 2px rgba(10, 13, 20, 0.03)",
			},
		},
	},
	plugins: [],
};
