import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useShoppingCart } from "../utilities/hooks";

describe("useShopping Cart Hook", () => {
	const sampleItemArr = [
		{
			id: 1,
			name: "Pizza",
			price: 7,
		},
		{
			id: 2,
			name: "Cookies",
			price: 4,
		},
		{
			id: 3,
			name: "Lemonade",
			price: 3,
		},
		{
			id: 4,
			name: "Ice Cream",
			price: 5,
		},
		{
			id: 5,
			name: "Chocolate",
			price: 3,
		},
	];

	it("Adds items correctly", () => {
		const { result } = renderHook(() => useShoppingCart());
		let sampleTotal = 0;
		act(() => {
			sampleItemArr.forEach((item) => {
				result.current.addToCart(item);
				sampleTotal += item.price;
			});
		});

		expect(result.current.itemArr.length).toBe(sampleItemArr.length);
		expect(result.current.getCartTotal()).toEqual(sampleTotal);
	});

	it("Removes items correctly", () => {
		const { result } = renderHook(() => useShoppingCart());
		const itemObj = sampleItemArr[0];
		const itemObj2 = sampleItemArr[1];

		act(() => {
			result.current.addToCart(itemObj);
			result.current.addToCart(itemObj2);
		});

		expect(result.current.itemArr.length).toBe(2);
		expect(result.current.getItemQuantity(itemObj.id)).toBe(1);
		expect(result.current.getItemQuantity(itemObj2.id)).toBe(1);
		expect(result.current.getCartTotal()).toBe(itemObj.price + itemObj2.price);

		act(() => {
			result.current.removeFromCart(itemObj.id);
		});

		expect(result.current.itemArr.length).toBe(1);
		expect(result.current.getItemQuantity(itemObj.id)).toBe(0);
		expect(result.current.getItemQuantity(itemObj2.id)).toBe(1);
		expect(result.current.getCartTotal()).toBe(itemObj2.price);
	});

	it("Updates Quantity Correctly", () => {
		const { result } = renderHook(() => useShoppingCart());
		const itemObj = sampleItemArr[0];
		const newQuantity = 5;

		act(() => {
			result.current.addToCart(itemObj);
		});

		act(() => {
			result.current.updateItemQuantity(itemObj.id, newQuantity);
		});

		expect(result.current.getItemQuantity(itemObj.id)).toBe(newQuantity);
		expect(result.current.getCartTotal()).toBe(itemObj.price * newQuantity);

		act(() => {
			result.current.updateItemQuantity(itemObj.id, 0);
		});

		expect(result.current.getItemQuantity(itemObj.id)).toBe(0);
		expect(result.current.isInCart(itemObj.id)).toBe(false);
	});

	it("Handles errors and edge cases", () => {
		const { result } = renderHook(() => useShoppingCart());
		const itemObj = sampleItemArr[0];

		act(() => {
			result.current.addToCart(itemObj);
		});

		expect(() => {
			act(() => {
				result.current.addToCart(itemObj);
			});
		}).toThrowError(/Cart \(Add Item Error - Already in Cart\)/);

		expect(() => {
			act(() => {
				result.current.updateItemQuantity(9);
			});
		}).toThrowError(/Cart \(Update Quantity Error - item ID not in cart\)/);

		expect(() => {
			act(() => {
				result.current.getItemTotal(8);
			});
		}).toThrowError(/Cart \(Item Total Error\) item not in cart/);
	});
});
