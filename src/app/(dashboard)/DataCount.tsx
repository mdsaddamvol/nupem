import React from "react";

const dataCounts = [
	{ title: "Clients", count: 248, color: "text-blue-600" },
	{ title: "Ad Accounts", count: 186, color: "text-green-600" },
	{ title: "Unsettled Ad Account", count: 0, color: "text-red-600" },
	{ title: "Admins", count: 26, color: "text-purple-600" },
];

export default function DataCountsSection() {
	return (
		<div className='flex bg-dashboard-border border border-gray-200 rounded-lg overflow-hidden w-full max-w-[1104px]'>
			{dataCounts.map((item, idx) => (
				<div
					key={idx}
					className='flex-1 flex flex-col justify-between p-6 relative'
				>
					{/* Title */}
					<div className='text-dashboard-title text-sm'>{item.title}</div>

					{/* Bottom Row */}
					<div className='flex justify-between items-center mt-2'>
						<span className={`text-2xl font-semibold ${item.color}`}>
							{item.count}
						</span>
						<button className='bg-white border border-dashboard-divider shadow-sm rounded-[8px] px-3 py-1 text-dashboard-title text-sm font-medium hover:bg-gray-50'>
							View All
						</button>
					</div>

					{/* Divider except last */}
					{idx < dataCounts.length - 1 && (
						<div className='absolute  top-5 bottom-5 right-0 w-px bg-dashboard-divider'></div>
					)}
				</div>
			))}
		</div>
	);
}
