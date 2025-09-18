"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import SearchIcon from "@/components/dashboard/icons/Search.svg";
import ShortCuticon from "@/components/dashboard/icons/Shortcut.svg";

interface Request {
	id: string;
	name: string;
	client: string;
	status: string;
	type: string;
}

interface DashboardRequestsProps {
	requests: Request[];
}

// 👇 Dummy Data (for testing)
const dummyRequests: Request[] = [
	{
		id: "REQ-001",
		name: "Nike Summer Campaign",
		client: "Nike Inc",
		status: "BM-12345",
		type: "share_remove",
	},
	{
		id: "REQ-002",
		name: "Apple Holiday Ads",
		client: "Apple Inc",
		status: "BM-67890",
		type: "share_remove",
	},
	{
		id: "REQ-003",
		name: "Coca-Cola Q4 Push",
		client: "Coca-Cola Co",
		status: "BM-24680",
		type: "ad_account",
	},
];

const DashboardRequests: React.FC<DashboardRequestsProps> = ({
	requests = dummyRequests,
}) => {
	const [search, setSearch] = useState<string>("");
	const [activeTab, setActiveTab] = useState<string>("share_remove");

	// Modal States
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalType, setModalType] = useState<"success" | "decline" | "form">(
		"success"
	);
	const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
	// Tooltip state
	const [tooltipTarget, setTooltipTarget] = useState<string | null>(null); // e.g., "REQ-001"
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	// Show tooltip + copy text
	const handleCopyClick = (text: string, e: React.MouseEvent) => {
		// Copy to clipboard
		navigator.clipboard.writeText(text).catch(console.error);

		// Show tooltip
		setTooltipTarget(text);

		// Position tooltip above click
		const rect = e.currentTarget.getBoundingClientRect();
		setTooltipPosition({
			x: rect.left + rect.width / 2 - 57, // 114px/2 = 57
			y: rect.top - 40, // above the cell
		});

		// Auto hide after 1.5s
		setTimeout(() => {
			setTooltipTarget(null);
		}, 1500);
	};
	const tabs = [
		{
			key: "ad_accounts",
			label: "Ad Accounts",
			count: requests.filter((r) => r.type === "ad_account").length,
		},
		{
			key: "clients",
			label: "Clients",
			count: requests.filter((r) => r.type === "client").length,
		},
		{
			key: "deposits",
			label: "Deposits",
			count: requests.filter((r) => r.type === "deposit").length,
		},
		{
			key: "share_remove",
			label: "Share & Remove BM",
			count: requests.filter((r) => r.type === "share_remove").length,
			active: true,
			highlight: true,
		},
		{
			key: "account_review",
			label: "Account Review",
			count: requests.filter((r) => r.type === "account_review").length,
		},
		{
			key: "vendor_transfer",
			label: "Vendor Transfer",
			count: requests.filter((r) => r.type === "vendor_transfer").length,
		},
		{
			key: "withdrawal",
			label: "Withdrawal",
			count: requests.filter((r) => r.type === "withdrawal").length,
		},
	];

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleTabClick = (key: string) => {
		setActiveTab(key);
	};

	const filteredRequests = requests
		.filter((r) => r.type === activeTab)
		.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

	// Modal Handlers
	const openSuccessModal = (req: Request) => {
		setSelectedRequest(req);
		setModalType("success");
		setIsModalOpen(true);
	};

	const openDeclineModal = (req: Request) => {
		setSelectedRequest(req);
		setModalType("decline");
		setIsModalOpen(true);
	};

	const openDeclineFormModal = (req: Request) => {
		setSelectedRequest(req);
		setModalType("form");
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedRequest(null);
	};

	// Close modal on Escape key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<div className='w-full mt-8 relative'>
			{/* Header */}
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-[16px] font-semibold text-gray-900'>
					Pending Requests
				</h2>
				<div className='flex items-center gap-2'>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search...'
							value={search}
							onChange={handleSearchChange}
							className='w-72 h-10 pl-8 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
						/>
						<span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
							<SearchIcon />
						</span>
						<span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
							<ShortCuticon className='w-7 h-7' />
						</span>
					</div>
					<button className='px-4 h-10 bg-blue-100 text-blue-600 text-[14px] font-medium rounded-lg hover:bg-blue-200'>
						See All
					</button>
				</div>
			</div>

			{/* Segmented Control */}
			<div className='flex items-center justify-between flex-wrap p-1 gap-1 w-full min-h-9 bg-gray-100 border border-gray-200 rounded-xl mb-4'>
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => handleTabClick(tab.key)}
						className={`
							flex items-center justify-center gap-1.5
							px-4 py-1.5
							rounded-lg
							text-[14px] font-medium transition-all
							${
								activeTab === tab.key
									? tab.highlight
										? "bg-white text-gray-900 shadow-sm border border-gray-200"
										: "bg-blue-50 text-blue-700"
									: "text-gray-500 hover:text-gray-700"
							}
						`}
						style={{
							boxShadow:
								activeTab === tab.key && tab.highlight
									? "0px 6px 10px rgba(14, 18, 27, 0.06), 0px 2px 4px rgba(14, 18, 27, 0.03)"
									: "none",
						}}
					>
						{tab.label}
						<div
							className={`
								flex items-center justify-center
								w-4 h-4 rounded-full text-[11px] font-medium text-white
								${activeTab === tab.key && tab.highlight ? "bg-orange-500" : "bg-gray-500"}
							`}
						>
							{tab.count}
						</div>
					</button>
				))}
			</div>

			{/* Table */}
			<div className='w-full overflow-hidden flex flex-col gap-1'>
				<div className='flex bg-dashboard-card text-gray-600 border border-dashboard-border text-sm font-medium rounded-lg'>
					<div className='text-sm flex-1 p-3'>Ad Account</div>
					<div className='text-sm flex-1 p-3'>Connected BM</div>
					<div className='text-sm flex-1 p-3'>Requested BM ID</div>
					<div className='text-sm w-1/3 p-3 flex  items-center gap-1'>
						<span>Action Type</span>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M14.1666 7.91667L9.99992 3.75L5.83325 7.91667H14.1666ZM14.1666 12.0833L9.99992 16.25L5.83325 12.0833H14.1666Z'
								fill='#A4A4A4'
							/>
						</svg>
					</div>
				</div>

				{requests.map((req) => (
					<div
						key={req.id}
						className='h-[64px] bg-white flex items-center border-b border-gray-200 hover:bg-gray-50'
					>
						<div className='flex-1 p-3 flex flex-col'>
							<div
								className='text-dashboard-dark text-sm cursor-pointer hover:text-blue-600'
								onClick={(e) => handleCopyClick(req.name, e)}
							>
								{req.name}
							</div>
							<div
								className='text-dashboard-title text-sm cursor-pointer hover:text-blue-600'
								onClick={(e) => handleCopyClick(req.id, e)}
							>
								{req.id}
							</div>
						</div>
						<div className='flex-1 p-3 flex flex-col'>
							<div
								className='text-dashboard-dark text-sm cursor-pointer hover:text-blue-600'
								onClick={(e) => handleCopyClick(req.client, e)}
							>
								{req.client}
							</div>
							<div
								className='text-dashboard-title text-sm cursor-pointer hover:text-blue-600'
								onClick={(e) => handleCopyClick(req.id, e)}
							>
								{req.id}
							</div>
						</div>
						<div
							className='flex-1 p-3 cursor-pointer hover:text-blue-600'
							onClick={(e) => handleCopyClick(req.status, e)}
						>
							{req.status}
						</div>
						<div className='w-1/3 p-3 flex items-center justify-between gap-3'>
							{/* Pill Button */}
							<div
								className={`
					flex items-center gap-1.5
					px-2 py-1
					border rounded-full
					font-medium text-xs
					transition-all
					${
						req.type === "share_remove"
							? "border-green-100 text-green-600 bg-green-50"
							: "border-red-500 text-red-600 bg-red-100"
					}
				`}
								style={{ width: 69, height: 20 }}
							>
								<div
									style={{
										width: "4px",
										height: "4px",
										borderRadius: "9999px",
										backgroundColor:
											req.type === "share_remove" ? "#16a34a" : "#dc2626",
										flexShrink: 0,
									}}
								></div>
								<span>{req.type === "share_remove" ? "Share" : "Remove"}</span>
							</div>

							{/* Action Icons */}
							<div className='flex items-center gap-1 mr-10'>
								{/* Approve */}
								<button
									onClick={() => openSuccessModal(req)}
									className='w-9 h-9 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors'
									title='Approve'
								>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M16.6667 5L7.50004 14.1667L3.33337 10'
											stroke='#1FC16B'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>

								{/* Decline (opens form) */}
								<button
									onClick={() => openDeclineFormModal(req)}
									className='w-9 h-9 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors'
									title='Decline'
								>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M15.0001 5L5.00006 15M5.00006 5L15.0001 15'
											stroke='#FB3748'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>

								{/* View (opens decline modal for demo) */}
								<button
									onClick={() => openDeclineModal(req)}
									className='w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'
									title='View Details'
								>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<g clipPath='url(#clip0_70_1009)'>
											<path
												d='M1.71841 10.29C1.64896 10.1029 1.64896 9.8971 1.71841 9.71C2.39483 8.06988 3.543 6.66754 5.01738 5.68075C6.49176 4.69397 8.22595 4.16718 10.0001 4.16718C11.7742 4.16718 13.5084 4.69397 14.9828 5.68075C16.4571 6.66754 17.6053 8.06988 18.2817 9.71C18.3512 9.8971 18.3512 10.1029 18.2817 10.29C17.6053 11.9301 16.4571 13.3325 14.9828 14.3193C13.5084 15.306 11.7742 15.8328 10.0001 15.8328C8.22595 15.8328 6.49176 15.306 5.01738 14.3193C3.543 13.3325 2.39483 11.9301 1.71841 10.29Z'
												stroke='#7B7B7B'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M10.0001 12.5C11.3808 12.5 12.5001 11.3807 12.5001 10C12.5001 8.61929 11.3808 7.5 10.0001 7.5C8.61936 7.5 7.50008 8.61929 7.50008 10C7.50008 11.3807 8.61936 12.5 10.0001 12.5Z'
												stroke='#7B7B7B'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</g>
										<defs>
											<clipPath id='clip0_70_1009'>
												<rect width='20' height='20' fill='white' />
											</clipPath>
										</defs>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}

				{filteredRequests.length === 0 && (
					<div className='p-4 text-center text-gray-500'>No requests found</div>
				)}
			</div>

			{/* MODALS */}
			{isModalOpen && selectedRequest && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					{/* Success Modal */}
					{modalType === "success" && (
						<div className='w-full max-w-[440px] h-[228px] bg-white border border-gray-200 rounded-2xl shadow-lg relative'>
							<button
								onClick={closeModal}
								className='absolute right-4 top-4 w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100'
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14 6L6 14M6 6L14 14'
										stroke='#5C5C5C'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
							<div className='flex flex-col items-center p-10 gap-4'>
								{/* Green Circle */}
								<svg
									width='64'
									height='64'
									viewBox='0 0 64 64'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M64 32C64 27.4773 61.7067 23.4907 58.2187 21.1387C59.0213 17.0107 57.824 12.5707 54.6267 9.37068C51.4293 6.17334 46.9893 4.97601 42.8587 5.77868C40.5067 2.29068 36.52 -0.00265503 31.9973 -0.00265503C27.4747 -0.00265503 23.488 2.29068 21.136 5.77868C17.008 4.97601 12.5653 6.17334 9.368 9.37068C6.17067 12.568 4.97333 17.008 5.776 21.1387C2.288 23.4907 -0.00533295 27.4773 -0.00533295 32C-0.00533295 36.5227 2.288 40.5093 5.776 42.8613C4.97333 46.9893 6.17067 51.432 9.368 54.6293C12.5653 57.8267 17.0053 59.024 21.136 58.2213C23.488 61.7093 27.4747 64.0027 31.9973 64.0027C36.52 64.0027 40.5067 61.7093 42.8587 58.2213C46.9867 59.024 51.4293 57.8267 54.6267 54.6293C57.824 51.432 59.0213 46.992 58.2187 42.8613C61.7067 40.5093 64 36.5227 64 32ZM31.7573 41.1173C30.7253 42.1493 29.368 42.664 28.0053 42.664C26.6427 42.664 25.272 42.144 24.2293 41.104L16.8107 33.9147L20.5253 30.0827L27.9733 37.3013L43.464 22.0987L47.208 25.8987L31.7573 41.1173Z'
										fill='#16BC2E'
									/>
									<path
										d='M31.7573 41.1173C30.7253 42.1493 29.368 42.664 28.0053 42.664C26.6427 42.664 25.272 42.144 24.2293 41.104L16.8107 33.9147L20.5253 30.0827L27.9733 37.3013L43.464 22.0987L47.208 25.8987L31.7573 41.1173Z'
										fill='white'
									/>
								</svg>

								<div className='text-center'>
									<h3 className='text-lg font-medium text-gray-900'>
										Request Approved
									</h3>
									<p className='text-sm text-gray-500 mt-1'>
										{selectedRequest.name}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Decline Modal (Simple) */}
					{modalType === "decline" && (
						<div className='w-full max-w-[440px] h-[228px] bg-white border border-gray-200 rounded-2xl shadow-lg relative'>
							<button
								onClick={closeModal}
								className='absolute right-4 top-4 w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100'
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14 6L6 14M6 6L14 14'
										stroke='#5C5C5C'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
							<div className='flex flex-col items-center p-10 gap-4'>
								{/* Red Circle with X */}
								<svg
									width='64'
									height='64'
									viewBox='0 0 64 64'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M64 32C64 27.4773 61.7066 23.4907 58.2186 21.1387C59.0213 17.0107 57.824 12.5707 54.6266 9.37068C51.4293 6.17334 46.9893 4.97601 42.8586 5.77868C40.5066 2.29068 36.52 -0.00265503 31.9973 -0.00265503C27.4746 -0.00265503 23.488 2.29068 21.136 5.77868C17.008 4.97601 12.5653 6.17334 9.36796 9.37068C6.17063 12.568 4.9733 17.008 5.77596 21.1387C2.28796 23.4907 -0.00537109 27.4773 -0.00537109 32C-0.00537109 36.5227 2.28796 40.5093 5.77596 42.8613C4.9733 46.9893 6.17063 51.432 9.36796 54.6293C12.5653 57.8267 17.0053 59.024 21.136 58.2213C23.488 61.7093 27.4746 64.0027 31.9973 64.0027C36.52 64.0027 40.5066 61.7093 42.8586 58.2213C46.9866 59.024 51.4293 57.8267 54.6266 54.6293C57.824 51.432 59.0213 46.992 58.2186 42.8613C61.7066 40.5093 64 36.5227 64 32Z'
										fill='#FB3748'
									/>
									<path
										d='M42 22L22 42M22 22L42 42'
										stroke='white'
										stroke-width='5'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
								</svg>

								<div className='text-center'>
									<h3 className='text-lg font-medium text-gray-900'>
										Declined Confirmed
									</h3>
									<p className='text-sm text-gray-500 mt-1'>
										{selectedRequest.name}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Decline Form Modal */}
					{modalType === "form" && (
						<div className='w-full max-w-[440px] h-[424px] bg-white border border-gray-200 rounded-2xl shadow-lg relative'>
							<button
								onClick={closeModal}
								className='absolute right-4 top-4 w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100'
							>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14 6L6 14M6 6L14 14'
										stroke='#5C5C5C'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>

							{/* Header */}
							<div className='p-4 pb-2 border-b border-gray-200 bg-gray-50 rounded-t-2xl'>
								<h3 className='text-lg font-medium text-gray-900'>
									Decline Request
								</h3>
								<p className='text-sm text-gray-500'>
									Please provide a reason for declining this request.
								</p>
							</div>

							{/* Form Content */}
							<div className='p-6 flex flex-col gap-4 h-[280px]'>
								{/* Reason Select */}
								<div className='flex flex-col gap-1'>
									<label className='text-sm font-medium text-gray-700'>
										Reason
									</label>
									<select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'>
										<option value=''>Select a reason</option>
										<option value='policy'>Violates Policy</option>
										<option value='incomplete'>Incomplete Information</option>
										<option value='duplicate'>Duplicate Request</option>
										<option value='other'>Other</option>
									</select>
								</div>

								{/* Note Textarea */}
								<div className='flex flex-col gap-1 flex-grow'>
									<label className='text-sm font-medium text-gray-700'>
										Note (Optional)
									</label>
									<textarea
										className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
										rows={4}
										placeholder='Add additional notes here...'
									></textarea>
									<div className='text-right text-xs text-gray-400'>0/200</div>
								</div>
							</div>

							{/* Footer */}
							<div className='p-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl'>
								<button
									onClick={closeModal}
									className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
								>
									Cancel
								</button>
								<button
									onClick={() => {
										// Handle decline logic here
										openDeclineModal(selectedRequest); // Show confirmation
									}}
									className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
								>
									Decline Request
								</button>
							</div>
						</div>
					)}
				</div>
			)}
			{/* COPY TOOLTIP */}
			{tooltipTarget && (
				<div
					className='fixed z-[999] bg-gray-900 text-white text-sm font-normal rounded-lg shadow-lg px-2.5 py-1 flex items-center gap-1.5'
					style={{
						width: 130,
						height: 28,
						left: tooltipPosition.x,
						top: tooltipPosition.y,
						boxShadow:
							"0px 12px 24px rgba(14, 18, 27, 0.06), 0px 1px 2px rgba(14, 18, 27, 0.03)",
						borderRadius: 6,
						fontFamily: "'Outfit', sans-serif",
						fontSize: 14,
						letterSpacing: "-0.006em",
					}}
				>
					<span>Copy BM ID</span>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							x='4'
							y='4'
							width='8'
							height='8'
							stroke='white'
							strokeWidth='1.3'
						/>
						<rect
							x='6'
							y='2'
							width='8'
							height='8'
							stroke='white'
							strokeWidth='1.3'
						/>
					</svg>
				</div>
			)}
		</div>
	);
};

export default DashboardRequests;
