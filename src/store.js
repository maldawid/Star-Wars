import { combineReducers, createStore } from "redux";
import movieTitleReducer from "./reducers/AddMovieTitle-reducer";
import planetsReducer from "./reducers/AddPlanets-reducer";

const allReducer = combineReducers({
  planets: planetsReducer,
  movieTitle: movieTitleReducer
});

const store = createStore(
  allReducer,
  {
    planets: [],
    movieTitle: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
