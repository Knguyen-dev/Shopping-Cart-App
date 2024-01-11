/*
- NOTE: About shopping carts. In a real shopping cart you'd probably
  store the ids of the products and fetch data for each product. This is to 
  ensure you get the latest prices. So yeah realistically you'd probably
  just want a map of IDS and their quantities and you'd fetch. But 
  here, we'll just use an array and such since we're making up our prices

*/
import { Button, ButtonGroup, Typography, Box } from "@mui/material";
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
			<header className="tw-mb-4">
				<Typography variant="h3" className="tw-font-bold">
					Cart ({cartQuantity} items)
				</Typography>
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
									<div className="tw-flex tw-justify-between">
										<Typography variant="span" className="tw-w-3/4">{`${
											gameObj.name
										} (${
											itemQuantity === MAX_QUANTITY ? "Max Qty" : "Qty"
										}: ${itemQuantity})`}</Typography>

										<Typography variant="span" fontWeight="700">
											${gameObj.price}
										</Typography>
									</div>

									{/*
                  1. Button that removes item from the cart.
                  
                  2. Buttons that control the quantity for an item. Here 
                  we disable the 'decrease quantity' button when our current
                  quantity is <= our MIN_QUANTITY, and we do similar logic for 
                  our MAX_QUANTITY. 
                     */}
									<Box className="tw-mt-4 tw-flex tw-gap-x-4 tw-gap-y-4">
										<Button
											variant="contained"
											className="tw-bg-red-700"
											onClick={() => shoppingCart.removeFromCart(gameObj.id)}>
											Remove
										</Button>
										<ButtonGroup>
											<Button
												onClick={() =>
													handleDecreaseQuantity(gameObj.id, itemQuantity)
												}
												disabled={itemQuantity <= MIN_QUANTITY}>
												Down
											</Button>
											<Button
												onClick={() =>
													handleIncreaseQuantity(gameObj.id, itemQuantity)
												}
												disabled={itemQuantity >= MAX_QUANTITY}>
												Up
											</Button>
										</ButtonGroup>
									</Box>
								</div>
							</div>
						);
					})}
				</div>

				{/* Sidebar for the cart page */}
				<div className="cart-page-sidebar tw-mb-4 md:tw-sticky md:tw-top-4 md:tw-self-start">
					{/* Subtotal section */}
					<div className="custom-section tw-flex tw-flex-col tw-gap-y-1">
						{/* Subtotal */}
						<Box className="tw-flex tw-justify-between tw-text-lg">
							<Typography className="tw-w-3/4">
								Subtotal ({cartQuantity} items)
							</Typography>
							<Typography>${subtotal}</Typography>
						</Box>

						{/* Shipping */}
						<Box className="tw-flex tw-justify-between">
							<Typography variant="span">Shipping</Typography>
							<Typography variant="span">Free</Typography>
						</Box>

						{/* Tax */}
						<Box className="tw-flex tw-justify-between">
							<Typography variant="span">Taxes</Typography>
							<Typography variant="span">Calculated at checkout</Typography>
						</Box>

						{/* Estimated Total */}
						<Box className="tw-flex tw-justify-between tw-font-bold">
							<Typography>Estimated Total</Typography>
							<Typography>${subtotal}</Typography>
						</Box>

						<Button
							color="primary"
							variant="contained"
							className="tw-mt-3 tw-rounded-full">
							Continue to Checkout
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
