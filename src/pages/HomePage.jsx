import Card from "./components/Card";
import { sampleGames } from "../assets/sampleData";


/*
- BOOK MARK: 

+ Create react or styled components:

1. Hovering buttons
2. Floating Labels
3. Input group: So like the input with floating label and then button, like a smooth search bar

4. A general rounded button component or style that we can use would be nice 

*/




export default function HomePage() {
	return (
		<div className="tw-flex tw-flex-col tw-min-h-screen">
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


      <section id="featured" className=" tw-py-6 tw-mt-auto tw-mb-6">
        <h1 className="tw-text-center tw-text-black tw-text-6xl tw-mb-10">Featured Games</h1>
        <div className="featured-container tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4 tw-px-16 tw-mx-auto lg:tw-flex-row">
          {
            sampleGames.map((game,index) => <Card key={index} item={game} cardSize={400}/>)
          }
        </div>
      </section>


    
			<div className="tw-text-center tw-mt-auto tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-gap-8 tw-bg-indigo-500 tw-p-10 md:tw-flex-row">
				<div className="tw-max-w-96 tw-text-white">
					<h2 className="tw-text-2xl">Sign up to our newsletter!</h2>
					<p>
						The GamerCity newsletter delivers fresh videogame content every week. Sign up
            to receive the latest news in the industry!
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
