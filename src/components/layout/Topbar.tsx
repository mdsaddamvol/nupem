import { useState } from "react";
import DashboardIcon from "@/components/dashboard/icons/Dashboard.svg";
import NotificationIcon from "@/components/dashboard/icons/Notification.svg";
import SearchIcon from "@/components/dashboard/icons/Search.svg";
import Image from "next/image";
export default function TopBar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<div
			className='flex w-full justify-between items-center  h-22 px-8 py-5 gap-3 bg-white'
			style={{ height: "88px" }}
		>
			{/* Left side: Icon + Title + Tagline */}
			<div className='flex items-center gap-4'>
				{/* Dashboard Icon */}

				<DashboardIcon
					className='w-6 h-6 text-dashboard-title'
					fill='currentColor'
					stroke='currentColor'
				/>

				{/* Title + Tagline */}
				<div className='flex flex-col'>
					<h1 className='text-dashboard-dark font-bold text-lg'>Dashboard</h1>
					<p className='text-dashboard-title text-sm'>
						A clear look at the key details and structure
					</p>
				</div>
			</div>

			{/* Right side: Search, Notification, Profile */}
			<div className='flex items-center gap-5'>
				{/* Search Icon */}
				<button className='text-dashboard-text-secondary hover:text-dashboard-primary'>
					<SearchIcon className='w-5 h-5' />
				</button>

				{/* Notification Icon */}
				<button className='text-dashboard-text-secondary hover:text-dashboard-primary'>
					<NotificationIcon className='w-5 h-5' />
				</button>

				{/* Dropdown/Profile */}
				<div className='relative'>
					<button
						className='flex items-center gap-2 text-dashboard-text-secondary hover:text-dashboard-primary border border-dashboard-border rounded-[8px] p-1 '
						onClick={() => setDropdownOpen(!dropdownOpen)}
					>
						<Image
							width={32}
							height={32}
							src='/Avatar.png'
							alt='Avatar'
							className='w-10 h-10 rounded-[8px]'
						/>
						<div className='flex flex-col text-left'>
							<span className=' text-[14px] font-semibold'>John Doe</span>
						</div>
						<span className='text-dashboard-text-secondary mx-2 h-full flex items-center'>
							<svg
								width='10'
								height='6'
								viewBox='0 0 10 6'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M5 5.25L0.5 0.75H9.5L5 5.25Z' fill='#5C5C5C' />
							</svg>
						</span>
					</button>

					{/* Dropdown Menu */}
					{dropdownOpen && (
						<div className='absolute right-0 mt-2 w-40 bg-white border border-dashboard-border rounded shadow-dashboard-sm z-10'>
							<ul className='flex flex-col'>
								<li className='px-4 py-2 hover:bg-dashboard-card cursor-pointer'>
									Profile
								</li>
								<li className='px-4 py-2 hover:bg-dashboard-card cursor-pointer'>
									Settings
								</li>
								<li className='px-4 py-2 hover:bg-dashboard-card cursor-pointer text-dashboard-danger'>
									Logout
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
