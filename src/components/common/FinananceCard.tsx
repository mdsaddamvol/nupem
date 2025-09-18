"use client";
import { useEffect, useRef } from "react";

export interface FinanceCardProps {
	title: string;
	balance: number;
	change: number;
	growth?: "success" | "normal" | "danger" | string;
}

export default function FinanceCard({
	title,
	balance,
	change,
	growth = "normal",
}: FinanceCardProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const growthColor =
		growth === "success"
			? "rgb(28, 156, 78)"
			: growth === "danger"
			? "rgb(251, 55, 72)"
			: "rgb(51, 92, 255)";

	const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
	const points = 40;

	// Parse RGB for gradient
	const parseColor = (color: string) => {
		const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (!match) return { r: 51, g: 92, b: 255 };
		return {
			r: parseInt(match[1], 10),
			g: parseInt(match[2], 10),
			b: parseInt(match[3], 10),
		};
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const { width, height } = canvas;
		const { r, g, b } = parseColor(growthColor);

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Generate smooth sine wave points
		const wavePoints: { x: number; y: number }[] = [];

		// Natural hill parameters
		const baseOffset = height * 0.6; // Base level of hills
		const maxAmplitude = height * 0.22; // Max hill height
		const minAmplitude = height * 0.06; // Min hill height

		for (let i = 0; i < points; i++) {
			const t = i / (points - 1); // 0 to 1
			const x = t * width;

			// Layer multiple sine waves with different frequencies and amplitudes
			let y = baseOffset;

			// Big slow hills (low frequency)
			y += maxAmplitude * 0.6 * Math.sin(t * Math.PI * 2 * 1.1);

			// Medium rolling bumps
			y += maxAmplitude * 0.3 * Math.sin(t * Math.PI * 2 * 2.7);

			// Small quick ripples
			y += maxAmplitude * 0.2 * Math.sin(t * Math.PI * 2 * 5.3);

			// Tiny noise for organic feel
			y += 0.5 * minAmplitude * 0.5;

			// Clamp vertically — leave space for labels at bottom
			y = Math.max(height * 0.4, Math.min(height * 0.75, y));

			wavePoints.push({ x, y });
		}

		// Create vertical gradient (top → bottom)
		const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.8); // Stop before label zone
		gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
		gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

		// Clip to wave shape and fill
		ctx.beginPath();
		wavePoints.forEach((p, i) => {
			if (i === 0) ctx.moveTo(p.x, p.y);
			else ctx.lineTo(p.x, p.y);
		});
		ctx.lineTo(width, height * 0.8); // Close above label zone
		ctx.lineTo(0, height * 0.8);
		ctx.closePath();

		ctx.fillStyle = gradient;
		ctx.fill();

		// Draw the wave line
		ctx.strokeStyle = growthColor;
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.beginPath();
		wavePoints.forEach((p, i) => {
			if (i === 0) ctx.moveTo(p.x, p.y);
			else ctx.lineTo(p.x, p.y);
		});
		ctx.stroke();

		// Draw dashed vertical separators (month boundaries)
		ctx.strokeStyle = "#00000020";
		ctx.lineWidth = 1;
		ctx.setLineDash([4, 4]);
		const monthStep = width / 6;
		for (let m = 1; m < 6; m++) {
			const x = m * monthStep;
			ctx.beginPath();
			ctx.moveTo(x, height * 0.3); // Start from top of wave area
			ctx.lineTo(x, height * 0.8); // Stop before labels
			ctx.stroke();
		}
		ctx.setLineDash([]);

		// Draw month labels — BELOW wave, in safe zone
		ctx.fillStyle = "#666";
		ctx.font = "14px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		monthLabels.forEach((label, i) => {
			const x = (i + 0.5) * monthStep;
			ctx.fillText(label, x, height * 0.85); // 85% down — safe under wave
		});
	}, [balance, growthColor]);

	// Icon mapping
	const renderIcon = () => {
		if (title === "Client Balance")
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9'
						stroke='#335CFF'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z'
						stroke='#335CFF'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M5.5 19.5001L6.0604 18.5194C6.95061 16.9616 8.60733 16.0001 10.4017 16.0001H13.5984C15.3927 16.0001 17.0494 16.9616 17.9396 18.5194L18.5 19.5001'
						stroke='#335CFF'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M18.9737 2.02148C18.9795 1.99284 19.0205 1.99284 19.0263 2.02148C19.3302 3.50808 20.4919 4.66984 21.9785 4.97368C22.0072 4.97954 22.0072 5.02046 21.9785 5.02632C20.4919 5.33016 19.3302 6.49192 19.0263 7.97852C19.0205 8.00716 18.9795 8.00716 18.9737 7.97852C18.6698 6.49192 17.5081 5.33016 16.0215 5.02632C15.9928 5.02046 15.9928 4.97954 16.0215 4.97368C17.5081 4.66984 18.6698 3.50808 18.9737 2.02148Z'
						stroke='#335CFF'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		if (title === "Ad Account Balance")
			return (
				<svg
					width='25'
					height='24'
					viewBox='0 0 25 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M21.4427 16.8354C20.7864 12.8866 18.7432 9.94613 16.967 8.219C16.4501 7.71642 16.1917 7.46513 15.6208 7.23257C15.0499 7 14.5592 7 13.5778 7H11.4222C10.4408 7 9.9501 7 9.37922 7.23257C8.80834 7.46513 8.54991 7.71642 8.03304 8.219C6.25682 9.94613 4.21361 12.8866 3.55727 16.8354C3.06893 19.7734 5.77927 22 8.80832 22H16.1917C19.2207 22 21.9311 19.7734 21.4427 16.8354Z'
						stroke='#1FC16B'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M7.75662 4.44287C7.55031 4.14258 7.25128 3.73499 7.86899 3.64205C8.50392 3.54651 9.16321 3.98114 9.80855 3.97221C10.3924 3.96413 10.6898 3.70519 11.0089 3.33548C11.3449 2.94617 11.8652 2 12.5 2C13.1348 2 13.6551 2.94617 13.9911 3.33548C14.3102 3.70519 14.6076 3.96413 15.1914 3.97221C15.8368 3.98114 16.4961 3.54651 17.131 3.64205C17.7487 3.73499 17.4497 4.14258 17.2434 4.44287L16.3105 5.80064C15.9115 6.38146 15.712 6.67187 15.2944 6.83594C14.8769 7 14.3373 7 13.2582 7H11.7418C10.6627 7 10.1231 7 9.70556 6.83594C9.28802 6.67187 9.0885 6.38146 8.68945 5.80064L7.75662 4.44287Z'
						stroke='#1FC16B'
						strokeWidth='1.5'
						strokeLinejoin='round'
					/>
					<path
						d='M14.1267 12.9191C13.9105 12.121 12.8101 11.4008 11.4892 11.9396C10.1683 12.4783 9.95847 14.2118 11.9565 14.396C12.8595 14.4792 13.4483 14.2994 13.9873 14.8081C14.5264 15.3167 14.6265 16.7313 13.2485 17.1125C11.8705 17.4937 10.506 16.8981 10.3574 16.0522M12.3417 10.9932V11.7536M12.3417 17.2298V17.9932'
						stroke='#1FC16B'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		if (title === "Vendor Balance")
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11Z'
						stroke='#FB3748'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M5.07026 15C4.38958 13.8233 4 12.4571 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11C20 12.4571 19.6104 13.8233 18.9297 15'
						stroke='#FB3748'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M18 21C18 17.6863 15.3137 15 12 15C8.68629 15 6 17.6863 6 21'
						stroke='#FB3748'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		if (title === "Pending Deposite")
			return (
				<svg
					width='25'
					height='24'
					viewBox='0 0 25 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M2.51758 13.5C4.71715 13.5 6.50026 15.2831 6.50026 17.4827'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M6.50026 3.51758C6.50026 5.71715 4.71715 7.50026 2.51758 7.50026'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M18.5 3.51758C18.5 5.6979 20.269 7.46901 22.4423 7.49985'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M22.5 10V9.5C22.5 6.67157 22.5 5.25736 21.6213 4.37868C20.7426 3.5 19.3284 3.5 16.5 3.5H8.5C5.67157 3.5 4.25736 3.5 3.37868 4.37868C2.5 5.25736 2.5 6.67157 2.5 9.5V11.5C2.5 14.3284 2.5 15.7426 3.37868 16.6213C4.25736 17.5 5.67157 17.5 8.5 17.5H13.5'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15.5 10.5C15.5 12.1569 14.1569 13.5 12.5 13.5C10.8431 13.5 9.5 12.1569 9.5 10.5C9.5 8.84315 10.8431 7.5 12.5 7.5C14.1569 7.5 15.5 8.84315 15.5 10.5Z'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M16.5 15.5C16.5 14.9477 16.9477 14.5 17.5 14.5H22.5L21 12.5M22.5 17.5C22.5 18.0523 22.0523 18.5 21.5 18.5H16.5L18 20.5'
						stroke='#7D52F4'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		return null;
	};

	return (
		<div className='flex flex-col justify-between w-68 h-[200px] bg-dashboard-white rounded-xl p-4 shadow-dashboard-sm'>
			{/* Top: Icon + Title */}
			<div className='flex flex-col gap-[6px]'>
				<div className='flex items-center gap-2'>
					<div className='w-10 h-10 my-auto flex items-center justify-center border border-dashboard-border rounded-full text-dashboard-primary'>
						{renderIcon()}
					</div>
					<h3 className='font-medium text-sm text-dashboard-title'>{title}</h3>
				</div>

				{/* Middle: Balance + Badge */}
				<div className='flex items-center justify-between h-8'>
					<span className='font-semibold text-2xl text-dashboard-dark'>
						${balance.toLocaleString()}
					</span>
					<span
						className={`text-xs font-medium px-2 py-0.5 rounded-full ${
							change >= 0
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{change >= 0 ? `+${change}%` : `${change}%`}
					</span>
				</div>
			</div>

			{/* Bottom: Custom Canvas Wave Chart — 80px height */}
			<div className='w-full h-20 relative'>
				<canvas
					ref={canvasRef}
					width={300}
					height={80}
					className='w-full h-full'
					style={{
						background: "transparent",

						borderRadius: "8px",
					}}
				/>
			</div>
		</div>
	);
}
