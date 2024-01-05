export default function AccountHomePage() {
	return (
		<main className="account-home-page">
			{/* Title of the tab or account page you're on */}
			<header className="tw-mb-2 tw-text-center tw-text-3xl">
				<h1>Welcome to your account</h1>
			</header>

			{/* Main tab content; Assume this is for the home section */}
			<section className="tw-grid tw-grid-cols-3 tw-gap-x-4">
				<div className="custom-section">
					<header className="tw-mb-2 tw-text-xl tw-font-bold">
						<h2>Customize Profile</h2>
					</header>
					<div>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
						nihil commodi iste porro!
					</div>
				</div>
				<div className="custom-section">
					<header className="tw-mb-2 tw-text-xl tw-font-bold">
						<h2>Connect with Us</h2>
					</header>
					<div>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
						nihil commodi iste porro!
					</div>
				</div>
			</section>
		</main>
	);
}
