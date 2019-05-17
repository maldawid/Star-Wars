import { ADD_MOVIETITLE } from "../actions/AddMovieTitle";

const initialState = {
  movieTitle: ""
};

export default function movieTitleReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_MOVIETITLE:
      return [...state, payload];
    default:
      return state;
  }
}
