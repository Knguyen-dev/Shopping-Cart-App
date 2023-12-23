/*
+ Steam home Page: https://store.steampowered.com/

- If using gaming background, have shown only one our home page. 


*/

import Card from "./components/Card";
import "../styles/HomePage.css";

export default function HomePage() {
	const sampleGame = {
		title: "Elden Ring",
		platforms: ["PC", "PlayStation", "Xbox"],
		price: "$12.98",
		img: "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
		release_date: "2022/02/25",
		details:
			"The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the ",
		store_link: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
	};

	return (
		<div className="home-page">
			<div className="tw-my-5 tw-flex tw-flex-col tw-items-center tw-gap-y-4 tw-text-center tw-text-black">
				<h2 className="tw-text-4xl">Welcome to GamerCity</h2>
				<p className="tw-text-md tw-mx-auto tw-w-2/4 ">
					Discover your favorite games. Not a real shop, but it imitates what a
					ecommerce site for games could look like. Feel free to look around
					though.
				</p>
				<button className="tw-inline-block tw-rounded-sm tw-bg-slate-500 tw-px-5 tw-py-2 tw-text-xl tw-text-white">
					Shop Now
				</button>
			</div>

			<section
				id="featured-items"
				className="mx-auto ck tw-container md:tw-container">
				<h1 className="tw-text-center tw-text-4xl">Featured Items</h1>

				{/* One giant card, with image, and then description for slide could work */}
				<div className="card-container"></div>
			</section>

			<div className="tw-mt-auto tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-gap-8 tw-bg-indigo-500 tw-p-10 md:tw-flex-row">
				<div className="tw-max-w-96 tw-text-white">
					<h2 className="tw-text-2xl">Lorem ipsum dolor sit amet.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod atque
						laboriosam harum pariatur quis tempore!
					</p>
				</div>

				<form id="subscribe-form" className="input-group tw-w-full md:tw-w-2/5">
					<input
						type="email"
						name="email"
						id="email"
						className="form-control tw-py-4 tw-text-white"
						placeholder="Enter Email:"
					/>
					<button
						type="submit"
						className="input-group-text tw-border-none tw-bg-sky-500 tw-font-bold tw-text-white">
						Subscribe
					</button>
				</form>
			</div>
		</div>
	);
}
