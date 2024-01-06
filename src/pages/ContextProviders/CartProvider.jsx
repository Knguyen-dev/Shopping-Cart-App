import { createContext } from "react";
import PropTypes from "prop-types";
import { useShoppingCart } from "./hooks/useShoppingCart";

export const CartContext = createContext();
export default function CartProvider({ children }) {
	const shoppingCart = useShoppingCart();
	return (
		<CartContext.Provider value={shoppingCart}>{children}</CartContext.Provider>
	);
}
CartProvider.propTypes = {
	children: PropTypes.element,
};
