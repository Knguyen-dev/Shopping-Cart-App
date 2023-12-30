import PropTypes from "prop-types";
function SidebarTab({ tabObj, onClick, isActive }) {
	return (
		<li className={`sidebar-tab ${isActive && "active-tab"}`} onClick={onClick}>
			<div className="sidebar-tab-icon">{tabObj.icon}</div>
			<span className="sidebar-tab-title">{tabObj.tabTitle}</span>
		</li>
	);
}
SidebarTab.propTypes = {
	tabObj: PropTypes.object,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};

// Creates a section on the sidebar
export default function SidebarSection({
	sectionObj,
	activeTabID,
	onTabClick,
}) {
	return (
		<section className="sidebar-section">
			<h2 className="sidebar-section-title">{sectionObj.sectionTitle}</h2>
			<ul className="sidebar-tab-list">
				{sectionObj.tabs.map((tabObj, index) => {
					/*
          - Map:
          1. Create a unique id for each tabObj. 
          2. Also create a boolean 
            to indicate whether a tab is active by comparison the active tab id to 
            a given tab's id, which we just generated.
          - onTabClick:
          1. Record the active tab for visually indicating what tab is being used.
          2. Get search parameters for our clicked tab, and loop through the dropdown parameters.
            If the tab is supposed to ignore the ordering drop down, ensure the "ordering"
            parameter is skipped and not included in our newSearchParams
          - NOTE: 
          1. For a section such as 'Top' where we show games ordered on some criteria,
            the ordering set in the tab should take priority over the user's drop down ordering. 
            As well as this the user shouldn't be able to interfere with the ordering of 
            the tabs here due to the nature of the section. For that reason, if we see
            a tab with ignoreOrderDropDown defined (which will always have the value true),
            we will skip the 'ordering' parameter provided in 'dropDownParams' to prevent 
            said parameter from either 'overwriting' or predefined 'ordering' parameter, 
            or deleting it.
          2. It should be noted that it seems without the 'ordering' parameter. Rawg api
            automatically gives back the most popular games, so you can think of it as 
            implicitly having "ordering='-added'" by default.
          */
					tabObj.id = `${sectionObj.sectionTitle}-${tabObj.tabTitle}-${index}`;
					const isActive = activeTabID === tabObj.id ? true : false;

					return (
						<SidebarTab
							key={index}
							tabObj={tabObj}
							onClick={() => onTabClick(tabObj)}
							isActive={isActive}
						/>
					);
				})}
			</ul>
		</section>
	);
}
SidebarSection.propTypes = {
	sectionObj: PropTypes.object,
	activeTabID: PropTypes.string,
	onTabClick: PropTypes.func,
};
