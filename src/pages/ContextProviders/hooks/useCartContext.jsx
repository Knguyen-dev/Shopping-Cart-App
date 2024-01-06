import { useContext } from "react";
import { CartContext } from "../CartProvider";

export const useCartContext = () => {
	return useContext(CartContext);
};
