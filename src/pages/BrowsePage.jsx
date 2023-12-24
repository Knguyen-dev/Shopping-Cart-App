/*
1. sidebar section. 
2. Sidebar item, need an icon and text to make up this clickable item
*/

import PropTypes from "prop-types";
import {
	FaRegCalendarTimes,
	FaStar,
	FaCrown,
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaAndroid,
} from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { BsGraphUpArrow, BsNintendoSwitch } from "react-icons/bs";

function SidebarTab({ icon, tabTitle }) {
	return (
		<li className="sidebar-tab">
			<div className="sidebar-tab-icon">{icon}</div>
			<span className="sidebar-tab-title">{tabTitle}</span>
		</li>
	);
}
SidebarTab.propTypes = {
	icon: PropTypes.element,
	tabTitle: PropTypes.string,
};

function SidebarSection({ sectionObj }) {
	return (
		<section className="sidebar-section">
			<h2 className="sidebar-section-title">{sectionObj.sectionTitle}</h2>
			<ul className="sidebar-tab-list">
				{sectionObj.tabs.map((tabObj, index) => (
					<SidebarTab
						key={index}
						icon={tabObj.icon}
						tabTitle={tabObj.tabTitle}
					/>
				))}
			</ul>
		</section>
	);
}
SidebarSection.propTypes = {
	sectionObj: PropTypes.object,
};

import "../styles/BrowsingPage.css";
export default function BrowsingPage() {
	const sidebarSections = [
		{
			sectionTitle: "New Games",
			tabs: [
				{
					tabTitle: "Last 30 Days",
					icon: <FaStar />,
				},
				{
					tabTitle: "This Week",
					icon: <FaRegCalendarTimes />,
				},
				{
					tabTitle: "Next Week",
					icon: <TbPlayerTrackNext />,
				},
			],
		},
		{
			sectionTitle: "Top",
			tabs: [
				{
					tabTitle: "Best of the year",
					icon: <GoTrophy />,
				},
				{
					tabTitle: `Popular in ${new Date().getFullYear() - 1}`,
					icon: <BsGraphUpArrow />,
				},
				{
					tabTitle: "All time top",
					icon: <FaCrown />,
				},
			],
		},
		{
			sectionTitle: "Platforms",
			tabs: [
				{
					tabTitle: "PC",
					icon: <FaWindows />,
				},
				{
					tabTitle: "PlayStation",
					icon: <FaPlaystation />,
				},
				{
					tabTitle: "Xbox One",
					icon: <FaXbox />,
				},
				{
					tabTitle: "Nintendo Switch",
					icon: <BsNintendoSwitch />,
				},
				{
					tabTitle: "IOS",
					icon: <FaApple />,
				},
				{
					tabTitle: "Android",
					icon: <FaAndroid />,
				},
			],
		},
	];

	return (
		<div className="browsing-page">
			<div className="browsing-sidebar">
				{sidebarSections.map((sectionObj, index) => (
					<SidebarSection key={index} sectionObj={sectionObj} />
				))}
			</div>

			<main className="browsing-main">
				<h1 className="search-title">Search Title</h1>
				<div className="card-grid"></div>
			</main>
		</div>
	);
}
