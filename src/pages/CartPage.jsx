/*
- Structure:
1. main section on the left, basically a flexbox with cart cards that show the image, name, price of 
  the item. There should be options for removing the item, and a component that lets you 
  control the quantity of the item. Minimum being 1, and maximum being maybe 5.
2. Sidebar on the right side that shows subtotal, and a button for 'proceed to checkout'

NOTE: About shopping carts. In a real shopping cart you'd probably
  store the ids of the products and fetch data for each product. This is to 
  ensure you get the latest prices.
*/

import { sampleGameData } from "../assets/sampleData";
import "../styles/CartPage.css";
export default function CartPage() {
	return (
		<div className="cart-page tw-px-12 tw-py-4">
			<header className="cart-page-header tw-text-2xl tw-font-bold">
				<h1>
					Cart <span className="tw-text-gray-400">(5 items)</span>
				</h1>
			</header>

			<main className="cart-page-main">
				<div className="cart-page-main-content">
					{sampleGameData.map((gameObj) => {
						return (
							<div key={gameObj.id} className="cart-card">
								<div className="item-image">
									<img src={gameObj.background_image} />
								</div>
								<div className="item-content tw-flex tw-flex-1 tw-flex-col tw-justify-between">
									<div className="tw-flex tw-justify-between tw-text-xl">
										<span className="tw-w-3/4">
											{gameObj.name} a really long name and we should name it
										</span>
										<span className="tw-font-bold">{gameObj.price}</span>
									</div>

									<div className="tw-flex tw-gap-x-4">
										<button className="btn btn-outline-danger tw-transition-all">
											Remove
										</button>

										<div className="input-group tw-flex tw-items-center">
											<button className="btn btn-outline-primary tw-transition-all">
												Down
											</button>
											<span className="input-group-text border-primary tw-bg-transparent tw-text-white">
												5
											</span>
											<button className="btn btn-outline-primary tw-transition-all">
												Up
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="cart-page-sidebar">Sample Sidebar content</div>
			</main>
		</div>
	);
}
