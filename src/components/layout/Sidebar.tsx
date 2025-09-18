"use client";

import React, { useState } from "react";
import Image from "next/image";

// ✅ SVGR React components
import DashboardIcon from "@/components/dashboard/icons/Dashboard.svg";
import AdAccountIcon from "@/components/dashboard/icons/Meta.svg";
import TopupIcon from "@/components/dashboard/icons/Topup.svg";
import FinanceIcon from "@/components/dashboard/icons/Finance.svg";
import ClientRefundIcon from "@/components/dashboard/icons/ClientRefund.svg";
import AnalyticsIcon from "@/components/dashboard/icons/Analysis.svg";
import ClientsIcon from "@/components/dashboard/icons/Clients.svg";
import VendorsIcon from "@/components/dashboard/icons/Vendors.svg";
import BanksIcon from "@/components/dashboard/icons/Banks.svg";
import AdminsIcon from "@/components/dashboard/icons/Admins.svg";
import SettingsIcon from "@/components/dashboard/icons/Settings.svg";
import SupportIcon from "@/components/dashboard/icons/Support.svg";

type IconComp = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type SidebarItem = { submenu: boolean; name: string; icon?: IconComp | null };
type SidebarSection = { title: string; items: SidebarItem[] };

const sidebarSections: SidebarSection[] = [
	{
		title: "Main",
		items: [
			{ submenu: false, name: "Dashboard", icon: DashboardIcon },
			{ submenu: false, name: "Ad Account", icon: AdAccountIcon },
			{ submenu: false, name: "Topup", icon: TopupIcon },
			{ submenu: true, name: "Finance", icon: FinanceIcon },
			{ submenu: true, name: "Client Refund", icon: ClientRefundIcon },
			{ submenu: false, name: "Analytics", icon: AnalyticsIcon },
		],
	},
	{
		title: "Manage",
		items: [
			{ submenu: false, name: "Clients", icon: ClientsIcon },
			{ submenu: false, name: "Vendors", icon: VendorsIcon },
			{ submenu: true, name: "Banks", icon: BanksIcon },
		],
	},
	{
		title: "Others",
		items: [
			{ submenu: false, name: "Admins", icon: AdminsIcon },
			{ submenu: false, name: "Settings", icon: SettingsIcon },
			{ submenu: false, name: "Support", icon: SupportIcon },
		],
	},
];

export default function Sidebar() {
	const [activeItem, setActiveItem] = useState<string>("Dashboard");
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div
			className={`flex flex-col bg-dashboard-white border-r border-dashboard-border h-screen transition-all duration-300 ease-in-out ${
				isCollapsed ? "w-[72px]" : "w-[274px]"
			}`}
		>
			{/* Top Logo & Collapse Button — PRESERVE YOUR PADDING */}
			<div
				className={`flex items-center ${
					isCollapsed ? "justify-center" : "justify-between"
				} p-8 h-[88px] border-b border-dashboard-border`}
			>
				{!isCollapsed ? (
					<Image width={90} height={20} src='/logo.png' alt='Logo' priority />
				) : (
					<div className='w-1'></div> // Keep space for alignment
				)}

				<button
					onClick={toggleCollapse}
					className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
					aria-label={isCollapsed ? "Expand sidebar mr-3" : "Collapse sidebar"}
				>
					{isCollapsed ? (
						<svg
							className=''
							width='40'
							height='40'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12.7958 11.9992L9.08325 8.28673L10.1438 7.22623L14.9168 11.9992L10.1438 16.7722L9.08325 15.7117L12.7958 11.9992Z'
								fill='#5C5C5C'
							/>
						</svg>
					) : (
						<Image src='/colapse.svg' alt='Collapse' width={24} height={24} />
					)}
				</button>
			</div>

			{/* Sections — PRESERVE YOUR PADDING & SPACING */}
			<div className='flex-1 overflow-y-auto py-4'>
				{sidebarSections.map((section) => (
					<div key={section.title} className='mb-6'>
						{/* Section title — only show in expanded mode */}
						{!isCollapsed && (
							<h3 className='text-dashboard-offcolor uppercase text-xs px-6 mb-2'>
								{section.title}
							</h3>
						)}

						<ul className='py-2'>
							{section.items.map((item) => {
								const Icon = item.icon;
								const isActive = item.name === activeItem;

								return (
									<li
										key={item.name}
										onClick={() => setActiveItem(item.name)}
										className={`relative px-4 ${
											isActive
												? [
														"before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2",
														"before:w-[4px] before:h-[calc(80%-8px)]",
														"before:bg-dashboard-primary",
														"before:rounded-[0_6px_6px_0]",
												  ].join(" ")
												: [
														"before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2",
														"before:w-[4px] before:h-[calc(80%-8px)]",
														"before:bg-transparent",
														"before:rounded-[0_6px_6px_0]",
												  ].join(" ")
										}`}
									>
										<div
											className={`flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer transition-colors ${
												isActive
													? "bg-dashboard-thin_blue text-dashboard-primary"
													: "hover:bg-dashboard-border"
											} ${
												isCollapsed
													? "justify-center px-2" // Center icon, reduce padding
													: "" // Keep your original padding
											}`}
										>
											{Icon ? (
												<Icon
													className={`w-5 h-5 flex-shrink-0 ${
														isActive
															? "text-dashboard-primary"
															: "text-dashboard-text-secondary"
													}`}
													fill='currentColor'
													stroke='currentColor'
													aria-hidden
												/>
											) : (
												<div
													className={`w-5 h-5 rounded flex-shrink-0 ${
														isActive ? "bg-dashboard-primary" : "bg-gray-200"
													}`}
													aria-hidden
												/>
											)}

											{/* Only show text + arrow in expanded mode */}
											{!isCollapsed && (
												<div className='w-full flex justify-between'>
													<span
														className={`font-outfit font-medium text-[14px] leading-[20px] tracking-[-0.006em] ${
															isActive
																? "text-dashboard-primary"
																: "text-dashboard-title"
														}`}
													>
														{item.name}
													</span>
													{item.submenu && (
														<svg
															className='rotate-90'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																d='M12.7958 11.9992L9.08325 8.28673L10.1438 7.22623L14.9168 11.9992L10.1438 16.7722L9.08325 15.7117L12.7958 11.9992Z'
																fill='#5C5C5C'
															/>
														</svg>
													)}
												</div>
											)}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</div>

			{/* Bottom Profile — PRESERVE YOUR PADDING */}
			<div className='flex items-center p-5 gap-3 border-t border-dashboard-border'>
				<Image
					src='/Avatar.png'
					alt='Profile'
					width={40}
					height={40}
					className='rounded-full'
				/>
				{/* Only show profile text in expanded mode */}
				{!isCollapsed && (
					<div className='flex-1'>
						<div className='text-dashboard-dark font-semibold'>John Doe</div>
						<div className='text-dashboard-text-secondary text-[14px]'>
							john@example.com
						</div>
					</div>
				)}
				{/* Keep collapse button visible only in expanded mode */}
				{!isCollapsed && (
					<button className='text-dashboard-title'>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12.7958 11.9992L9.08325 8.28673L10.1438 7.22623L14.9168 11.9992L10.1438 16.7722L9.08325 15.7117L12.7958 11.9992Z'
								fill='#5C5C5C'
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}
