import { createContext } from "react";
import PropTypes from "prop-types";
import { useShoppingCart } from "../utilities/hooks";

export const CartContext = createContext();
export default function CartProvider({ children }) {
	const {
		cartItems,
		addToCart,
		removeFromCart,
		updateItemQuantity,
		isInCart,
		getItemQuantity,
	} = useShoppingCart();

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateItemQuantity,
				isInCart,
				getItemQuantity,
			}}>
			{children}
		</CartContext.Provider>
	);
}
CartProvider.propTypes = {
	children: PropTypes.element,
};
