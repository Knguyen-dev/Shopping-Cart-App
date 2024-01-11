import { Outlet } from "react-router-dom";
import { accountSidebarSections } from "../pages/utilities/constants";
import SidebarSection from "../components/SidebarSection";
import { useAuthContext } from "../pages/ContextProviders/hooks/useAuthContext";
import { Button, Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AccountPage() {
	const auth = useAuthContext();

	return (
		<div className="account-page tw-px-4">
			{/* This is where you'd put your breadcrumbs. */}
			<header className="tw-mb-4">
				<Typography variant="h6">My Account / Home</Typography>
			</header>

			{/* Main content for the account page */}
			<section className="tw-flex tw-gap-x-8">
				{/* Sidebar */}
				<div className="account-sidebar tw-basis-1/5">
					{/* Sidebar header */}
					<Box className="custom-section tw-mb-2">
						<Typography variant="h4">Hi, User</Typography>
						<Typography variant="span">
							Thanks for being a GamerCity customer!
						</Typography>
					</Box>

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
					<Box>
						<Button
							variant="contained"
							startIcon={<LogoutIcon />}
							onClick={auth.onLogout}>
							Sign Out
						</Button>
					</Box>
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
