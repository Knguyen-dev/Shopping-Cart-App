# GamerCity, A mock shopping application for buying videogames
- Imitates an eccomerce website with a shopping cart. In this case the user
  is shopping for video games. Video game data provided by Rawg API. However since our 
  api doesn't provide prices for the games, we hard-coded those in our fetch calls to simulate 
  us actually getting the prices. Again this isn't a real shopping platform, just a pretend one.


+ Live Preview: https://knguyen-dev-gamercity.netlify.app/

+ Features:
1. Increase or decrease quantity in shopping cart, removing items from shopping cart.
2. Filter or order products via different categories.
3. Searching for products on any page. 
4. Protected routing and mock authentication.


+ How to use:
1. Before you can add games to your cart, login on the login page.
  Use any email and password, and it will 'login' for you.
2. Now you can add and remove stuff from your cart. Go
  to the cart page to see your cart. Note you can't 
  checkout your cart as this is just a pretend ecommerce site.

+ Tech used:
1. Vite and React (Project setup)
2. React Router Dom (Client side routing)
3. Tailwindcss (For easy styling) and Boostrap (Components)


+ Design Inspirations and credits:
1. Rawg API: https://rawg.io/apidocs
2. Alex Dishen's Game Harbor: https://alex-dishen.github.io/game-harbor/
3. Odin Project: https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart


+ Deploying via Netlify:
1. First put "_redirects" in your public directory. 
  This will redirect all routes to index page and let react-router-dom
  handle the rest. Basically fixes some routing issues.
2. Create a Netfliy account and after it should let you
  deploy a site.
3. Choose the repository you want to deploy from and select it.
4. You should be done as it does all work for you.
