import "../styles/NotFoundPage.css";
import { NavLink } from "react-router-dom";
export default function NotFoundPage() {
	return (
		<div className="not-found-page">
			<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
				<h1 className="tw-mb-6 tw-text-3xl md:tw-text-6xl">
					Sorry we couldn&apos;t find that page!
				</h1>
				<p className="tw-text-lg md:tw-text-2xl">
					Return to the <NavLink to="/">home page</NavLink>!
				</p>
			</div>
		</div>
	);
}
