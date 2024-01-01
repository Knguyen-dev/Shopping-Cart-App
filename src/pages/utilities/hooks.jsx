import { useContext } from "react";
import { BrowsingContext } from "../Browse/BrowsePageProvider";

export function useBrowsingContext() {
	return useContext(BrowsingContext);
}
