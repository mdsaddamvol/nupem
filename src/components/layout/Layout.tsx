"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex max-h-screen min-h-screen overflow-hidden'>
			<Sidebar />

			{/* Main Content */}
			<div className=' flex-1 flex flex-col min-h-screen overflow-y-scroll'>
				<Topbar />
				<main className='flex-1 p-6 bg-gray-50'>{children}</main>
			</div>
		</div>
	);
}
