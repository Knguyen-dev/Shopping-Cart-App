# GamerCity
## Introduction
This is a front-end application that imitates an ecommerce website. Here the user is shopping for video games at the company "GamerCity"! 

[Live Preview](https://shopping-cart-app-kac0.onrender.com/)

Video game data provided by Rawg API. However since our api doesn't provide prices for the games, we hard-coded those in our fetch calls to simulate us actually getting the prices. Again this isn't a real shopping platform, just a pretend one.

## Technologies:
#### Frontend
- ReactJS
- Material UI
- TailwindCSS
#### MISC
- Vite
- NPM

## Features
- Shopping Cart: User is able to add or remove video games from the shopping cart. As well you're able to increase or decrease the quantity of each item.
- Search and filtering: User is able to search for games via their titles. They're also able to filter games by their genres (action, strategy, adventure, etc) and also the platform those games are available on (Windows, Playstation, Xbox, etc).
- Mock authentication: Before you can add games to your cart, login on the login page. Use any email and password, and it will 'login' for you. This is to simulate the idea that people have to login on these shopping platforms before they can actually add or remove stuff from their cart. 

## Getting Started

#### Pre-reqs
- Node.js installed on your machine.

#### Installation and setup
1. Fork the repo.
2. Then do `npm install` once you're in the project repo
2. `npm run dev` to run the app

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again, and it's been fun!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Future considerations and improvements
- Integrate this with the steam API. As a result you'd be able to query games, get their prices, etc.

## License
Distributed under the MIT License

## Acknowledgements 
1. Rawg API (for videogame data): https://rawg.io/apidocs
2. Alex Dishen's Game Harbor (Design inspiration): https://alex-dishen.github.io/game-harbor/
3. Odin Project (Project Idea): https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart