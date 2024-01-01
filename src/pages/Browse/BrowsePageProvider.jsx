import { useState, createContext } from "react";

import PropTypes from "prop-types";
export const BrowsingContext = createContext();

export default function BrowsingProvider({ children }) {
	const [activeTab, setActiveTab] = useState("");
	const [itemOrder, setItemOrder] = useState({});
	const [platform, setPlatform] = useState({});
	const [gameList, setGameList] = useState([]);
	const [searchParams, setSearchParams] = useState({});
	const [useDefault, setUseDefault] = useState(true);
	return (
		<BrowsingContext.Provider
			value={{
				activeTab,
				setActiveTab,
				itemOrder,
				setItemOrder,
				platform,
				setPlatform,
				gameList,
				setGameList,
				searchParams,
				setSearchParams,
				useDefault,
				setUseDefault,
			}}>
			{children}
		</BrowsingContext.Provider>
	);
}
BrowsingProvider.propTypes = {
	children: PropTypes.element,
};
