import {
	FaRegCalendarTimes,
	FaStar,
	FaCrown,
	FaFistRaised,
	FaChess,
	FaMountain,
	FaPuzzlePiece,
	FaCarSide,
	FaFootballBall,
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaMobileAlt,
	FaAndroid,
} from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { BsGraphUpArrow, BsNintendoSwitch } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaGun } from "react-icons/fa6";
import { createDateModule } from "./utilities";
const dateModule = createDateModule();

export const PLATFORM_IDS = {
	PC: 1,
	PlayStation: 2,
	Xbox: 3,
	IOS: 4,
	MacOS: 5,
	Nintendo: 7,
	Android: 8,
};

export const GENRE_IDS = {
	Action: 4,
	Adventure: 3,
	RPG: 5,
	Strategy: 10,
	Shooter: 2,
	Puzzle: 7,
	Racing: 1,
	Sports: 15,
};

export const sidebarSections = [
	{
		sectionTitle: "New Games",
		tabs: [
			{
				tabTitle: "Last 30 days",
				icon: <FaStar />,
				searchParams: {
					dates: dateModule.lastThirtyDaysStr,
				},
			},
			{
				tabTitle: "This week",
				icon: <FaRegCalendarTimes />,
				searchParams: {
					dates: dateModule.thisWeekStr,
				},
			},
			{
				tabTitle: "Upcoming",
				icon: <TbPlayerTrackNext />,
				searchParams: {
					dates: dateModule.nextYearStr,
				},
			},
		],
	},
	{
		sectionTitle: "Top",
		tabs: [
			{
				tabTitle: "Best of the year",
				icon: <GoTrophy />,
				searchParams: {
					dates: `${dateModule.year}-01-01,${dateModule.todayStr}`,
				},
				ignoreOrderDropDown: true,
			},
			{
				tabTitle: `Popular in ${dateModule.year - 1}`,
				icon: <BsGraphUpArrow />,
				searchParams: {
					dates: `${dateModule.year - 1}-01-01,${dateModule.year - 1}-12-31`,
					ordering: "-added",
				},
				ignoreOrderDropDown: true,
			},
			{
				tabTitle: "All time top",
				icon: <FaCrown />,
				searchParams: { ordering: "-added" },
				ignoreOrderDropDown: true,
			},
		],
	},
	{
		sectionTitle: "Genres",
		tabs: [
			{
				tabTitle: "Action",
				icon: <FaFistRaised />,
				searchParams: { genres: GENRE_IDS.Action },
			},
			{
				tabTitle: "Strategy",
				icon: <FaChess />,
				searchParams: { genres: GENRE_IDS.Strategy },
			},
			{
				tabTitle: "RPG",
				icon: <LuSwords />,
				searchParams: { genres: GENRE_IDS.Strategy },
			},
			{
				tabTitle: "Shooter",
				icon: <FaGun />,
				searchParams: { genres: GENRE_IDS.Shooter },
			},
			{
				tabTitle: "Adventure",
				icon: <FaMountain />,
				searchParams: { genres: GENRE_IDS.Adventure },
			},
			{
				tabTitle: "Puzzle",
				icon: <FaPuzzlePiece />,
				searchParams: { genres: GENRE_IDS.Puzzle },
			},
			{
				tabTitle: "Racing",
				icon: <FaCarSide />,
				searchParams: { genres: GENRE_IDS.Racing },
			},
			{
				tabTitle: "Sports",
				icon: <FaFootballBall />,
				searchParams: { genres: GENRE_IDS.Sports },
			},
		],
	},
];
// Options for the dropdown for ordering the games
export const orderingOptions = {
	dropDownTitle: "Order By",
	options: [
		{
			optionTitle: "None",
			searchParams: {
				ordering: null,
			},
		},
		{
			optionTitle: "Name",
			searchParams: {
				ordering: "-name",
			},
		},
		{
			optionTitle: "Release Date",
			searchParams: {
				ordering: "-released",
			},
		},
		{
			optionTitle: "Ratings",
			searchParams: {
				ordering: "-rating",
			},
		},
		{
			optionTitle: "Popularity",
			searchParams: {
				ordering: "-added",
			},
		},
	],
};

// Options for filtering the games via platform
export const platformOptions = {
	dropDownTitle: "Platforms",
	options: [
		{
			optionTitle: "All",
			searchParams: {
				parent_platforms: null,
			},
		},
		{
			optionTitle: "PC",
			searchParams: {
				parent_platforms: PLATFORM_IDS.PC,
			},
		},
		{
			optionTitle: "MacOS",
			searchParams: {
				parent_platforms: PLATFORM_IDS.MacOS,
			},
		},
		{
			optionTitle: "PlayStation",
			searchParams: {
				parent_platforms: PLATFORM_IDS.PlayStation,
			},
		},
		{
			optionTitle: "Xbox",
			searchParams: {
				parent_platforms: PLATFORM_IDS.Xbox,
			},
		},
		{
			optionTitle: "Nintendo",
			searchParams: {
				parent_platforms: PLATFORM_IDS.Nintendo,
			},
		},
		{
			optionTitle: "IOS",
			searchParams: {
				parent_platforms: PLATFORM_IDS.IOS,
			},
		},
		{
			optionTitle: "Android",
			searchParams: {
				parent_platforms: PLATFORM_IDS.Android,
			},
		},
	],
};

/*

+ platform_map: Array of platforms: Basically if a game is available on any of the platforms
  below, we'll render a related icon on the game's card.

  1. Using the substrings below, we will check if a game's platform contains
  the string, if so then we know a game runs on said platform.

+ icon_map: Link those strings with their corresponding icons representing 
  the platform. With this we'll be able to map those strings stored in
  'platformNames' and render the platform icons.

NOTE: We used Rawg API's 'games' endpoint to see what strings were acceptable 
  to use to match the games and we lowercased them. You can also reference 'parent_platforms' 
  endpoint, but cross-reference your information as a parent platform would be 'macintosh' 
  but the platform names received by the game endpoint would be 'macOS', so there
  could be differences.
*/

export const platform_map = {
	pc: "pc",
	macOS: "macos",
	playstation: "playstation",
	xbox: "xbox",
	ios: "ios",
	android: "android",
	nintendo: "nintendo",
};

export const icon_map = {
	[platform_map.pc]: <FaWindows />,
	[platform_map.macOS]: <FaApple />,
	[platform_map.playstation]: <FaPlaystation />,
	[platform_map.xbox]: <FaXbox />,
	[platform_map.ios]: <FaMobileAlt />,
	[platform_map.android]: <FaAndroid />,
	[platform_map.nintendo]: <BsNintendoSwitch />,
};

// Rawg api endpoint info
export const apiKey = "79e2d19924d040afa2644aa5867a40f4";
export const baseURL = "https://api.rawg.io/api/games";

// Small breakpoint for screens (in pixels)
export const SMALL_BREAKPOINT = 640;

export const CART_ACTIONS = {
	addToCart: "ADD_TO_CART",
	removeFromCart: "REMOVE_FROM_CART",
	setQuantity: "SET_QUANTITY",
};
