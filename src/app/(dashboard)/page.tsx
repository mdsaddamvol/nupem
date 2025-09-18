"use client";

import FinanceCard from "@/components/common/FinananceCard";
import "../globals.css";

import DataCountsSection from "./DataCount";
import DashboardRequests from "./requesttable";

export default function Home() {
	// Example data for the 4 cards
	const financeData = [
		{
			title: "Client Balance",
			balance: 12480,
			change: 5.2,
			chartData: [12000, 12150, 12280, 12400, 12470, 12520], // smooth increase like sine wave
			growth: "success",
		},
		{
			title: "Ad Account Balance",
			balance: 8670,
			change: -2.3,
			chartData: [15000, 8950, 8900, 8850, 8700, 8600], // smooth decrease
			growth: "danger",
		},
		{
			title: "Vendor Balance",
			balance: 15200,
			change: 3.8,
			chartData: [15000, 15060, 15120, 15180, 15220, 15250], // gradual uptrend
			growth: "success",
		},
		{
			title: "Pending Deposite",
			balance: 20340,
			change: 0.8,
			chartData: [20000, 15030, 20060, 20090, 20340, 20400], // slow wave with final increase
			growth: "normal",
		},
	];

	const sampleRequests = [
		{
			id: "1",
			type: "account_review",
			name: "Acme Corp",
			client: "John Doe",
			status: "Pending",
		},
		{
			id: "2",
			type: "account_review",
			name: "Beta Ltd",
			client: "Jane Smith",
			status: "Approved",
		},
		{
			id: "3",
			type: "share_remove",
			name: "Gamma Inc",
			client: "Alice Johnson",
			status: "Rejected",
		},
		{
			id: "4",
			type: "account_review",
			name: "Delta Co",
			client: "Bob Williams",
			status: "Pending",
		},
	];

	return (
		<div className='flex flex-col  justify-start min-h-screen p-8 space-y-8'>
			{/* Section Title */}
			<h2 className='text-lg font-semibold text-dashboard-dark self-start'>
				Overview
			</h2>

			{/* Top Row - 4 Finance Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]'>
				{financeData.map((item, idx) => (
					<FinanceCard key={idx} {...item} />
				))}
			</div>

			{/* Middle Row - Data Counts */}
			<div className='w-full max-w-[1200px]'>
				<DataCountsSection />
			</div>
			<div className='w-full max-w-[1200px]'>
				<DashboardRequests requests={sampleRequests} />
			</div>
		</div>
	);
}
