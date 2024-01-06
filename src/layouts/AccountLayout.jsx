import { Outlet } from "react-router-dom";
import { accountSidebarSections } from "../pages/utilities/constants";
import SidebarSection from "../components/SidebarSection";
import { useAuthContext } from "../pages/ContextProviders/hooks/useAuthContext";
import { CiLogout } from "react-icons/ci";

export default function AccountPage() {
	const auth = useAuthContext();

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

					{/* The sidebar section, where each tab would navigate you to a different
            page controlled by the AccountLayout */}
					{accountSidebarSections.map((sectionObj, index) => (
						<SidebarSection
							key={`${sectionObj.sectionTitle}-${index}`}
							sectionObj={sectionObj}
							className="custom-section tw-mb-2"
						/>
					))}

					{/* Section for signing out */}
					<div>
						<button
							className="btn btn-primary tw-flex tw-cursor-pointer tw-items-center tw-gap-x-2"
							onClick={auth.onLogout}>
							<CiLogout />
							<span>Sign Out</span>
						</button>
					</div>
				</div>

				{/* Main section where all of the sub pages will appear. Should be located
          on the right of the sidebar */}
				<main className="tw-flex-1">
					<Outlet />
				</main>
			</section>
		</div>
	);
}
