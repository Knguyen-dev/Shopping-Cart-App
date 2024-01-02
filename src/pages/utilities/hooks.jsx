import { useContext, useReducer } from "react";
import { CartContext } from "../ContextProviders/CartProvider";
import { CART_ACTIONS } from "./constants";

function cartReducer(state, action) {
	switch (action.type) {
		case CART_ACTIONS.addToCart:
			return {
				itemArr: [...state.itemArr, action.payload.itemObj],
				itemMap: { ...state.itemMap, [action.payload.itemObj.id]: 1 },
			};

		case CART_ACTIONS.removeFromCart:
			// eslint-disable-next-line no-case-declarations
			const updatedItemMap = { ...state.itemMap };
			delete updatedItemMap[action.payload.itemID];
			return {
				itemArr: state.itemArr.filter(
					(itemObj) => itemObj.id !== action.payload.itemID
				),
				itemMap: updatedItemMap,
			};

		case CART_ACTIONS.setQuantity:
			return {
				...state,
				itemMap: {
					...state.itemMap,
					[action.payload.itemID]: action.payload.quantity,
				},
			};
		default:
			throw new Error("Unknown action type: ", action.type);
	}
}

export const useShoppingCart = () => {
	const [cart, cartDispatch] = useReducer(cartReducer, {
		itemArr: [],
		itemMap: {},
	});

	/*
  + Adds new item to the cart
  1. if item is already in cart, we throw an error
  2. Else it isn't already in the cart, so we add it to the cart.
  */
	const addToCart = (itemObj) => {
		if (isInCart(itemObj)) {
			throw new Error("Cart (Add Item Error - Already in Cart): ", itemObj);
		} else {
			cartDispatch({
				type: CART_ACTIONS.addToCart,
				payload: { itemObj: itemObj },
			});
		}
	};

	// + Removes an item from the cart. If item doesn't exist, no error is thrown.
	const removeFromCart = (itemID) => {
		cartDispatch({
			type: CART_ACTIONS.removeFromCart,
			payload: { itemID: itemID },
		});
	};

	/*
  + Updates the quantity of an item that's in our cart.
  1. First check if item is in the cart, if not throw an error.

  2. If the quantity being set is 0, we can interpret that as the user trying to remove an item, else 
    we're going to update the item quantity.
  */
	const updateItemQuantity = (itemID, quantity) => {
		if (isInCart(itemID)) {
			if (quantity === 0) {
				cartDispatch({
					type: CART_ACTIONS.removeFromCart,
					payload: { itemID: itemID },
				});
			} else {
				cartDispatch({
					type: CART_ACTIONS.setQuantity,
					payload: { itemID: itemID, quantity: quantity },
				});
			}
		} else {
			throw new Error(
				"Cart (Update Quantity Error - item ID not in cart) itemID: ",
				itemID
			);
		}
	};

	// Check if an item is already in our cart.
	const isInCart = (itemID) => {
		if (cart.itemMap[itemID]) {
			return true;
		} else {
			return false;
		}
	};

	// Gets an item's quantity given its ID
	const getItemQuantity = (itemID) => {
		if (cart.itemMap[itemID]) {
			return cart.itemMap[itemID];
		} else {
			throw new Error(
				"Cart (Get Quantity Error - Item not in cart) ID: ",
				itemID
			);
		}
	};

	return {
		cartItems: cart.itemArr,
		addToCart,
		removeFromCart,
		updateItemQuantity,
		isInCart,
		getItemQuantity,
	};
};

export const useCartContext = () => {
	return useContext(CartContext);
};
