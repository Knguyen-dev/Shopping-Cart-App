import { useReducer } from "react";
import { CART_ACTIONS } from "../../utilities/constants";

function cartReducer(state, action) {
	let updatedItemMap, updatedPriceMap;
	switch (action.type) {
		case CART_ACTIONS.addToCart:
			return {
				itemArr: [...state.itemArr, action.payload.itemObj],
				itemMap: { ...state.itemMap, [action.payload.itemObj.id]: 1 },
				priceMap: {
					...state.priceMap,
					[action.payload.itemObj.id]: action.payload.itemObj.price,
				},
			};

		case CART_ACTIONS.removeFromCart:
			updatedItemMap = { ...state.itemMap };
			delete updatedItemMap[action.payload.itemID];

			updatedPriceMap = { ...state.priceMap };
			delete updatedPriceMap[action.payload.itemID];

			return {
				itemArr: state.itemArr.filter(
					(itemObj) => itemObj.id !== action.payload.itemID
				),
				itemMap: updatedItemMap,
				priceMap: updatedPriceMap,
			};

		// 					payload: { itemID: itemID, quantity: quantity },

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
		// List of items in cart
		itemArr: [],

		// Item ids and their quantities
		itemMap: {},

		// item ids and their prices
		priceMap: {},
	});

	/*
  + Handles logic for 'add to cart' buttons
  1. If item is already in cart, clicking will take it out of cart.
  2. If item isn't in the cart, clicking the item will put it in the cart.
  */
	const handleCartClick = (itemObj) => {
		if (isInCart(itemObj.id)) {
			removeFromCart(itemObj.id);
		} else {
			addToCart(itemObj);
		}
	};

	/*
  + Adds new item to the cart
  1. if item is already in cart, we throw an error
  2. Else it isn't already in the cart, so we add it to the cart.
  */
	const addToCart = (itemObj) => {
		if (isInCart(itemObj.id)) {
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
				"Cart (Update Quantity Error - item ID not in cart): ",
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
		if (isInCart(itemID)) {
			return cart.itemMap[itemID];
		} else {
			return 0;
		}
	};

	// Get the total amount of items in the cart, including quantity
	const getTotalQuantity = () => {
		let totalQuantity = 0;
		for (const itemObj of cart.itemArr) {
			totalQuantity += getItemQuantity(itemObj.id);
		}
		return totalQuantity;
	};

	// Helper function that gets individual price of an item
	const getItemPrice = (itemID) => {
		if (isInCart(itemID)) {
			return cart.priceMap[itemID];
		} else {
			throw new Error("Cart (Get Price Error - Item not in cart): ", itemID);
		}
	};

	/*
  - Loop through items:
    1. Get ID of item and its price.
    2. Using the ID get the quantity of the item.
    3. Multiply quantity and price to get the total for that item
  */
	const getItemTotal = (itemID) => {
		if (isInCart(itemID)) {
			return getItemPrice(itemID) * getItemQuantity(itemID);
		} else {
			throw new Error("Cart (Item Total Error) item not in cart: ", itemID);
		}
	};

	// Gets total cost of the cart by adding up costs of every time
	const getCartTotal = () => {
		let cartTotal = 0;
		for (const itemObj of cart.itemArr) {
			cartTotal += getItemTotal(itemObj.id);
		}
		return cartTotal;
	};

	const cartObject = {
		itemArr: cart.itemArr,
		itemMap: cart.itemMap,
		handleCartClick,
		addToCart,
		removeFromCart,
		updateItemQuantity,
		isInCart,
		getItemQuantity,
		getTotalQuantity,
		getItemTotal,
		getCartTotal,
	};
	return cartObject;
};
