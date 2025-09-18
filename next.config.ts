import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// ✅ Webpack config (kept for production builds and when not using Turbopack)
	webpack(config) {
		// Exclude .svg from Next's default asset rule
		const assetRule = config.module.rules.find(
			// @ts-ignore
			(rule) => typeof rule === "object" && rule?.test?.test?.(".svg")
		);
		if (assetRule && typeof assetRule === "object") {
			// @ts-ignore
			assetRule.exclude = /\.svg$/i;
		}

		// SVGR loader
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
						svgo: true,
						svgoConfig: {
							plugins: [
								{ name: "removeViewBox", active: false },
								{ name: "convertColors", params: { currentColor: true } },
							],
						},
					},
				},
			],
		});

		return config;
	},

	// ✅ Turbopack equivalent (silences the warning and enables inline SVGs in dev/build with Turbopack)
	turbopack: {
		rules: {
			"*.svg": {
				loaders: [
					{
						loader: "@svgr/webpack",
						options: { icon: true },
					},
				],
				// Important: tell Turbopack the transformed output is JS
				as: "*.js",
			},
		},
	},
};

export default nextConfig;
