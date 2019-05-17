# Star Wars planet encyclopedia.
The project was created for ReactJS learning. 

Built app is deployed to [https://maldawid.github.io/Star-Wars/](https://maldawid.github.io/Star-Wars/)

## Project requirements
### Overview
We want you to complete a task that will show off your React skills and knowledge of JS tools and features. Here are some key things we will be looking for:
- Project structure and architecture; patterns and naming conventions
- Use of the latest React features
- Use of the latest language features
- Communication with the API
- Your code style

### Business requirements:
- The application communicates with an open Star Wars REST API (https://swapi.co/) or the GraphQL version of the same API (https://graphql.org/swapi-graphql/)
- The mockups are available on Figma - https://www.figma.com/file/UUUuTRYk4kelxxUueQpVfC/front-end-task-1.0-(Copy)

#### Here are the steps you should complete:
1. On the application load, fetch all movies from the API
2. Render a collapsible element on the list for each movie
3. Render a table that displays data for the planets in each movie inside the collapsible element. The planets for a specific movie should be fetched when we expand the movie details, not on initial app load. Tables should be sortable by column
4. In the last collapsible element on the list, plan your own Star Wars movie. Provide a movie title and search for the planets you want to include in the movie. The title must start with a capital letter and be at least three letters long
5. Use search to fetch data from the API (search is implemented for each resource - dive into documentation). The dropdown can be implemented or you can use any library or datalist. When you complete the form, saving the movie should transform it into a list that behaves the same as movies fetched from the API, and the form should be cleared

### Requirements:
- The app can use one of the following state patterns: class components state, redux, react hooks or Apollo Client cache
- You can use JavaScript with babel or TypeScript
- We are looking for responsive design
- For styling use SCSS or any css-in-js solution
- The app must work. Please verify that, after cloning the repo and installing the dependencies, the app builds and works in the browser
- It need to work in Chrome (additional browser support is not required)
- Please send us your code as a git repository

#### It’s a great chance to show us what you can do. We’ll be giving out additional points for:
- Using a GraphQL API
- Own webpack configuration (not using create-react-app or boilerplates)
- Simple component tests in Jest with Enzyme/react-testing-library
- PropTypes or TypeScript types defined for components
- Persisting custom movies between page reloads (you can use localStorage for example)
- Built app is deployed to https://pages.github.com/

## Installing a project
### 1. Clone a repository
 - Open terminal and execute the command `git clone https://github.com/maldawid/Star-Wars.git`
### 2. Runs the app in the development mode.
- cd [Repository-Directory] (you need to go to project's main directory which contains package.json file)
- Execute the command `npm install`
- Execute the command `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

