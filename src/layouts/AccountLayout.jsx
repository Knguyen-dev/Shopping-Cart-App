import { Outlet } from "react-router-dom";
import { accountSidebarSections } from "../pages/utilities/constants";
import SidebarSection from "../components/SidebarSection";

export default function AccountPage() {
	return (
		<div className="account-page tw-px-4">
			{/* This is where you'd put your breadcrumbs. */}
			<header className="tw-mb-8">
				<h1>My account / Home</h1>
			</header>

			{/* Main content for the account page */}
			<section className="tw-flex tw-gap-x-8">
				{/* Sidebar */}
				<div className="account-sidebar tw-basis-1/5">
					{/* Sidebar header */}
					<div className="custom-section tw-mb-2">
						<h1 className="tw-text-3xl">Hi, User</h1>
						<span className="tw-text-gray-300">
							Thanks for being a GamerCity customer!
						</span>
					</div>

					{/* The sidebar sections */}
					{accountSidebarSections.map((sectionObj, index) => (
						<SidebarSection
							key={`${sectionObj.sectionTitle}-${index}`}
							sectionObj={sectionObj}
							className="custom-section tw-mb-2"
						/>
					))}
				</div>

				<main className="tw-flex-1">
					<Outlet />
				</main>
			</section>
		</div>
	);
}
