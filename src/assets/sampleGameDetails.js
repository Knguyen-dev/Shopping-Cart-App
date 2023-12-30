export const sampleGameScreenshots = [
	{
		id: 1827221,
		image:
			"https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
	{
		id: 1827222,
		image:
			"https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
	{
		id: 1827223,
		image:
			"https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
	{
		id: 1827225,
		image:
			"https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
	{
		id: 1827226,
		image:
			"https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
	{
		id: 1827227,
		image:
			"https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg",
		width: 1920,
		height: 1080,
		is_deleted: false,
	},
];

/*
- Example response data for getting the game's details. 

NOTE: Some of these attributes such as parent_platforms, developers, genres, and publishers
  aren't properly mentioned in the docs
*/
export const sampleGameDetails = {
	id: 3498,
	slug: "grand-theft-auto-v",
	name: "Grand Theft Auto V",
	name_original: "Grand Theft Auto V",
	description:
		"<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>\n<p>Español<br />\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.<br />\nNarración simultánea desde tres perspectivas únicas:<br />\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.<br />\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.</p>",
	metacritic: 92,
	metacritic_platforms: [
		{
			metascore: 96,
			url: "https://www.metacritic.com/game/pc/grand-theft-auto-v",
			platform: {
				platform: 4,
				name: "PC",
				slug: "pc",
			},
		},
		{
			metascore: 97,
			url: "https://www.metacritic.com/game/playstation-3/grand-theft-auto-v",
			platform: {
				platform: 16,
				name: "PlayStation 3",
				slug: "playstation3",
			},
		},
		{
			metascore: 97,
			url: "https://www.metacritic.com/game/playstation-4/grand-theft-auto-v",
			platform: {
				platform: 18,
				name: "PlayStation 4",
				slug: "playstation4",
			},
		},
		{
			metascore: 81,
			url: "https://www.metacritic.com/game/playstation-5/grand-theft-auto-v",
			platform: {
				platform: 187,
				name: "PlayStation 5",
				slug: "playstation5",
			},
		},
		{
			metascore: 97,
			url: "https://www.metacritic.com/game/xbox-360/grand-theft-auto-v",
			platform: {
				platform: 14,
				name: "Xbox 360",
				slug: "xbox360",
			},
		},
		{
			metascore: 97,
			url: "https://www.metacritic.com/game/xbox-one/grand-theft-auto-v",
			platform: {
				platform: 1,
				name: "Xbox One",
				slug: "xbox-one",
			},
		},
		{
			metascore: 79,
			url: "https://www.metacritic.com/game/xbox-series-x/grand-theft-auto-v",
			platform: {
				platform: 186,
				name: "Xbox Series S/X",
				slug: "xbox-series-x",
			},
		},
	],
	released: "2013-09-17",
	tba: false,
	updated: "2023-12-28T07:04:18",
	background_image:
		"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
	background_image_additional:
		"https://media.rawg.io/media/screenshots/5f5/5f5a38a222252d996b18962806eed707.jpg",
	website: "http://www.rockstargames.com/V/",
	rating: 4.47,
	rating_top: 5,
	ratings: [
		{
			id: 5,
			title: "exceptional",
			count: 3995,
			percent: 59.09,
		},
		{
			id: 4,
			title: "recommended",
			count: 2210,
			percent: 32.69,
		},
		{
			id: 3,
			title: "meh",
			count: 431,
			percent: 6.37,
		},
		{
			id: 1,
			title: "skip",
			count: 125,
			percent: 1.85,
		},
	],
	reactions: {
		1: 29,
		2: 8,
		3: 37,
		4: 19,
		5: 13,
		6: 10,
		7: 19,
		8: 22,
		9: 2,
		10: 10,
		11: 19,
		12: 15,
		13: 1,
		14: 3,
		15: 2,
		16: 6,
		18: 4,
		20: 1,
		21: 2,
	},
	added: 20406,
	added_by_status: {
		yet: 518,
		owned: 11720,
		beaten: 5762,
		toplay: 607,
		dropped: 1079,
		playing: 720,
	},
	playtime: 74,
	screenshots_count: 57,
	movies_count: 8,
	creators_count: 11,
	achievements_count: 539,
	parent_achievements_count: 75,
	reddit_url: "https://www.reddit.com/r/GrandTheftAutoV/",
	reddit_name: "",
	reddit_description: "",
	reddit_logo: "",
	reddit_count: 5184,
	twitch_count: 104,
	youtube_count: 1000000,
	reviews_text_count: 99,
	ratings_count: 6662,
	suggestions_count: 430,
	alternative_names: ["GTA 5", "GTA V", "GTA5", "GTAV"],
	metacritic_url: "https://www.metacritic.com/game/pc/grand-theft-auto-v",
	parents_count: 0,
	additions_count: 3,
	game_series_count: 11,
	user_game: null,
	reviews_count: 6761,
	saturated_color: "0f0f0f",
	dominant_color: "0f0f0f",
	parent_platforms: [
		{
			platform: {
				id: 1,
				name: "PC",
				slug: "pc",
			},
		},
		{
			platform: {
				id: 2,
				name: "PlayStation",
				slug: "playstation",
			},
		},
		{
			platform: {
				id: 3,
				name: "Xbox",
				slug: "xbox",
			},
		},
	],
	platforms: [
		{
			platform: {
				id: 187,
				name: "PlayStation 5",
				slug: "playstation5",
				image: null,
				year_end: null,
				year_start: 2020,
				games_count: 991,
				image_background:
					"https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
		{
			platform: {
				id: 186,
				name: "Xbox Series S/X",
				slug: "xbox-series-x",
				image: null,
				year_end: null,
				year_start: 2020,
				games_count: 853,
				image_background:
					"https://media.rawg.io/media/games/718/71891d2484a592d871e91dc826707e1c.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
		{
			platform: {
				id: 4,
				name: "PC",
				slug: "pc",
				image: null,
				year_end: null,
				year_start: null,
				games_count: 523552,
				image_background:
					"https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
			},
			released_at: "2013-09-17",
			requirements: {
				minimum:
					"Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.",
				recommended:
					"Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:",
			},
		},
		{
			platform: {
				id: 18,
				name: "PlayStation 4",
				slug: "playstation4",
				image: null,
				year_end: null,
				year_start: null,
				games_count: 6741,
				image_background:
					"https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
		{
			platform: {
				id: 16,
				name: "PlayStation 3",
				slug: "playstation3",
				image: null,
				year_end: null,
				year_start: null,
				games_count: 3160,
				image_background:
					"https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
		{
			platform: {
				id: 14,
				name: "Xbox 360",
				slug: "xbox360",
				image: null,
				year_end: null,
				year_start: null,
				games_count: 2786,
				image_background:
					"https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
		{
			platform: {
				id: 1,
				name: "Xbox One",
				slug: "xbox-one",
				image: null,
				year_end: null,
				year_start: null,
				games_count: 5568,
				image_background:
					"https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg",
			},
			released_at: "2013-09-17",
			requirements: {},
		},
	],
	stores: [
		{
			id: 290375,
			url: "",
			store: {
				id: 3,
				name: "PlayStation Store",
				slug: "playstation-store",
				domain: "store.playstation.com",
				games_count: 7874,
				image_background:
					"https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
			},
		},
		{
			id: 438095,
			url: "",
			store: {
				id: 11,
				name: "Epic Games",
				slug: "epic-games",
				domain: "epicgames.com",
				games_count: 1305,
				image_background:
					"https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
			},
		},
		{
			id: 290376,
			url: "",
			store: {
				id: 1,
				name: "Steam",
				slug: "steam",
				domain: "store.steampowered.com",
				games_count: 86904,
				image_background:
					"https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
			},
		},
		{
			id: 290377,
			url: "",
			store: {
				id: 7,
				name: "Xbox 360 Store",
				slug: "xbox360",
				domain: "marketplace.xbox.com",
				games_count: 1912,
				image_background:
					"https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
			},
		},
		{
			id: 290378,
			url: "",
			store: {
				id: 2,
				name: "Xbox Store",
				slug: "xbox-store",
				domain: "microsoft.com",
				games_count: 4787,
				image_background:
					"https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
			},
		},
	],
	developers: [
		{
			id: 10,
			name: "Rockstar Games",
			slug: "rockstar-games",
			games_count: 27,
			image_background:
				"https://media.rawg.io/media/screenshots/4eb/4eb5a5bcc8f2df12f1ccad3456822a3c.jpg",
		},
		{
			id: 3524,
			name: "Rockstar North",
			slug: "rockstar-north",
			games_count: 29,
			image_background:
				"https://media.rawg.io/media/screenshots/b98/b98adb52b2123a14d1c88e828a6b49f3.jpg",
		},
	],
	genres: [
		{
			id: 4,
			name: "Action",
			slug: "action",
			games_count: 177403,
			image_background:
				"https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
		},
		{
			id: 3,
			name: "Adventure",
			slug: "adventure",
			games_count: 137048,
			image_background:
				"https://media.rawg.io/media/games/e2d/e2d3f396b16dded0f841c17c9799a882.jpg",
		},
	],
	tags: [
		{
			id: 31,
			name: "Singleplayer",
			slug: "singleplayer",
			language: "eng",
			games_count: 216179,
			image_background:
				"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
		},
		{
			id: 40847,
			name: "Steam Achievements",
			slug: "steam-achievements",
			language: "eng",
			games_count: 34955,
			image_background:
				"https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
		},
		{
			id: 7,
			name: "Multiplayer",
			slug: "multiplayer",
			language: "eng",
			games_count: 36829,
			image_background:
				"https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg",
		},
		{
			id: 40836,
			name: "Full controller support",
			slug: "full-controller-support",
			language: "eng",
			games_count: 16359,
			image_background:
				"https://media.rawg.io/media/games/8e4/8e4de3f54ac659e08a7ba6a2b731682a.jpg",
		},
		{
			id: 13,
			name: "Atmospheric",
			slug: "atmospheric",
			language: "eng",
			games_count: 31602,
			image_background:
				"https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg",
		},
		{
			id: 42,
			name: "Great Soundtrack",
			slug: "great-soundtrack",
			language: "eng",
			games_count: 3380,
			image_background:
				"https://media.rawg.io/media/games/198/1988a337305e008b41d7f536ce9b73f6.jpg",
		},
		{
			id: 24,
			name: "RPG",
			slug: "rpg",
			language: "eng",
			games_count: 19393,
			image_background:
				"https://media.rawg.io/media/games/15c/15c95a4915f88a3e89c821526afe05fc.jpg",
		},
		{
			id: 18,
			name: "Co-op",
			slug: "co-op",
			language: "eng",
			games_count: 10896,
			image_background:
				"https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
		},
		{
			id: 36,
			name: "Open World",
			slug: "open-world",
			language: "eng",
			games_count: 6993,
			image_background:
				"https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
		},
		{
			id: 411,
			name: "cooperative",
			slug: "cooperative",
			language: "eng",
			games_count: 4614,
			image_background:
				"https://media.rawg.io/media/games/55e/55ee6432ac2bf224610fa17e4c652107.jpg",
		},
		{
			id: 8,
			name: "First-Person",
			slug: "first-person",
			language: "eng",
			games_count: 30250,
			image_background:
				"https://media.rawg.io/media/games/9dd/9ddabb34840ea9227556670606cf8ea3.jpg",
		},
		{
			id: 149,
			name: "Third Person",
			slug: "third-person",
			language: "eng",
			games_count: 10631,
			image_background:
				"https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg",
		},
		{
			id: 4,
			name: "Funny",
			slug: "funny",
			language: "eng",
			games_count: 23894,
			image_background:
				"https://media.rawg.io/media/screenshots/8f0/8f0b94922ad5e59968852649697b2643.jpg",
		},
		{
			id: 37,
			name: "Sandbox",
			slug: "sandbox",
			language: "eng",
			games_count: 6495,
			image_background:
				"https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg",
		},
		{
			id: 123,
			name: "Comedy",
			slug: "comedy",
			language: "eng",
			games_count: 11803,
			image_background:
				"https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
		},
		{
			id: 150,
			name: "Third-Person Shooter",
			slug: "third-person-shooter",
			language: "eng",
			games_count: 3204,
			image_background:
				"https://media.rawg.io/media/games/5bf/5bf88a28de96321c86561a65ee48e6c2.jpg",
		},
		{
			id: 62,
			name: "Moddable",
			slug: "moddable",
			language: "eng",
			games_count: 863,
			image_background:
				"https://media.rawg.io/media/games/149/149bbed9d90dc09328ba79bbacfda3c8.jpg",
		},
		{
			id: 144,
			name: "Crime",
			slug: "crime",
			language: "eng",
			games_count: 2688,
			image_background:
				"https://media.rawg.io/media/games/d46/d46373f39458670305704ef089387520.jpg",
		},
		{
			id: 62349,
			name: "vr mod",
			slug: "vr-mod",
			language: "eng",
			games_count: 17,
			image_background:
				"https://media.rawg.io/media/screenshots/1bb/1bb3f78f0fe43b5d5ca2f3da5b638840.jpg",
		},
	],
	publishers: [
		{
			id: 2155,
			name: "Rockstar Games",
			slug: "rockstar-games",
			games_count: 79,
			image_background:
				"https://media.rawg.io/media/games/682/682973f711e9ea6fcf11f71cbb39cdd5.jpeg",
		},
	],
	esrb_rating: {
		id: 4,
		name: "Mature",
		slug: "mature",
	},
	clip: null,
	description_raw:
		"Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.\n\nEspañol\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.\nNarración simultánea desde tres perspectivas únicas:\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.",
};
