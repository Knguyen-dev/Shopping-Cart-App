/*
- NOTE: About shopping carts. In a real shopping cart you'd probably
  store the ids of the products and fetch data for each product. This is to 
  ensure you get the latest prices. So yeah realistically you'd probably
  just want a map of IDS and their quantities and you'd fetch. But 
  here, we'll just use an array and such since we're making up our prices

*/

import { useCartContext } from "./ContextProviders/hooks/useCartContext";
import "../styles/CartPage.css";
export default function CartPage() {
	const shoppingCart = useCartContext();
	const cartQuantity = shoppingCart.getTotalQuantity();
	const subtotal = shoppingCart.getCartTotal();

	// Let's define a maximum and minimum quantity that we can't go over
	// or under a certain quantity.
	const MIN_QUANTITY = 1;
	const MAX_QUANTITY = 5;

	const handleIncreaseQuantity = (itemID, itemQuantity) => {
		shoppingCart.updateItemQuantity(itemID, itemQuantity + 1);
	};

	const handleDecreaseQuantity = (itemID, itemQuantity) => {
		shoppingCart.updateItemQuantity(itemID, itemQuantity - 1);
	};

	// Markup we show when there are no items in the cart
	if (cartQuantity === 0) {
		return (
			<div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
				<h1 className="tw-text-4xl">No items in cart!</h1>
			</div>
		);
	}

	return (
		<div className="tw-px-12 tw-py-4">
			{/* Cart page header */}
			<header className="tw-mb-2 tw-text-2xl tw-font-bold">
				<h1>
					Cart <span className="tw-text-gray-400">({cartQuantity} items)</span>
				</h1>
			</header>

			{/* Main content for cart page */}
			<main className="tw-flex tw-flex-col-reverse tw-gap-x-4 md:tw-flex-row">
				{/* Main content for the cart that contains the cards for the cart items */}
				<div className="cart-page-main-content tw-flex tw-flex-col tw-gap-y-2">
					{shoppingCart.itemArr.map((gameObj) => {
						const itemQuantity = shoppingCart.getItemQuantity(gameObj.id);

						// Render a cart card
						return (
							<div
								key={gameObj.id}
								className="custom-section tw-flex tw-gap-x-4">
								{/* Image for cart item */}
								<div className="tw-my-auto tw-hidden tw-self-start tw-overflow-hidden tw-rounded-md sm:tw-block">
									<img
										className="tw-h-36 tw-w-36 tw-object-cover lg:tw-h-48 lg:tw-w-48"
										src={gameObj.background_image}
									/>
								</div>
								{/* Cart item's main content */}
								<div className="tw-flex tw-flex-1 tw-flex-col tw-justify-between">
									<div className="tw-text-md tw-flex tw-justify-between lg:tw-text-xl">
										<span className="tw-w-3/4">{gameObj.name}</span>
										<span className="tw-font-bold">${gameObj.price}</span>
									</div>

									{/*
                  1. Button that removes item from the cart.
                  
                  2. Buttons that control the quantity for an item. Here 
                  we disable the 'decrease quantity' button when our current
                  quantity is <= our MIN_QUANTITY, and we do similar logic for 
                  our MAX_QUANTITY. 
                     */}
									<div className="tw-mt-4 tw-flex tw-flex-col-reverse tw-gap-x-4 tw-gap-y-4 lg:tw-flex-row">
										<button
											className="btn btn-outline-danger tw-transition-all"
											onClick={() => shoppingCart.removeFromCart(gameObj.id)}>
											Remove
										</button>

										<div className="input-group">
											<button
												className="btn btn-outline-primary tw-transition-all"
												onClick={() =>
													handleDecreaseQuantity(gameObj.id, itemQuantity)
												}
												disabled={itemQuantity <= MIN_QUANTITY}>
												Down
											</button>
											<span className="input-group-text border-primary tw-justify-center tw-bg-transparent tw-text-white">
												{itemQuantity === MAX_QUANTITY
													? `Max Qty: ${itemQuantity}`
													: `Qty: ${itemQuantity}`}
											</span>
											<button
												className="btn btn-outline-primary tw-transition-all"
												onClick={() =>
													handleIncreaseQuantity(gameObj.id, itemQuantity)
												}
												disabled={itemQuantity >= MAX_QUANTITY}>
												Up
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{/* Sidebar for the cart page */}
				<div className="cart-page-sidebar tw-mb-4 md:tw-sticky md:tw-top-4 md:tw-self-start">
					{/* Subtotal section */}
					<div className="custom-section tw-flex tw-flex-col tw-gap-y-1">
						<div className="tw-flex tw-justify-between tw-text-lg">
							<span className="tw-w-3/4">Subtotal ({cartQuantity} items)</span>
							<span>${subtotal}</span>
						</div>
						<div className="tw-flex tw-justify-between tw-text-gray-300">
							<span>Shipping</span>
							<span>Free</span>
						</div>
						<div className="tw-flex tw-justify-between">
							<span className="tw-font-bold">Taxes</span>
							<span>Calculated at checkout</span>
						</div>
						<div className="tw-flex tw-justify-between tw-font-bold">
							<span>Estimated Total</span>
							<span>${subtotal}</span>
						</div>

						<button className="btn btn-primary tw-my-3 tw-rounded-full">
							Continue to checkout
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
