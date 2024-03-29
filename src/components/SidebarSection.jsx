import "../styles/SidebarSection.css";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
function SidebarTab({ tabObj, onClick, isActive }) {
	return (
		<li className={`sidebar-tab ${isActive && "active-tab"}`} onClick={onClick}>
			<div className="sidebar-tab-icon">{tabObj.icon}</div>
			<Typography className="sidebar-tab-title">{tabObj.tabTitle}</Typography>
		</li>
	);
}
SidebarTab.propTypes = {
	tabObj: PropTypes.shape({
		tabTitle: PropTypes.string,
		icon: PropTypes.element,
	}),
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};

// Creates a section on the sidebar
export default function SidebarSection({
	sectionObj,
	activeTabID,
	onTabClick,
	className,
}) {
	return (
		<section className={`sidebar-section ${className}`}>
			<h2 className="sidebar-section-title">{sectionObj.sectionTitle}</h2>
			<ul className="sidebar-tab-list">
				{sectionObj.tabs.map((tabObj, index) => {
					tabObj.id = `${sectionObj.sectionTitle}-${tabObj.tabTitle}-${index}`;
					const isActive = activeTabID === tabObj.id ? true : false;
					return (
						<SidebarTab
							key={tabObj.id}
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
	sectionObj: PropTypes.shape({
		sectionTitle: PropTypes.string,
		tabs: PropTypes.arrayOf(
			PropTypes.shape({
				tabTitle: PropTypes.string,
				icon: PropTypes.element,
			})
		),
	}),
	activeTabID: PropTypes.string,
	onTabClick: PropTypes.func,
	className: PropTypes.string,
};
