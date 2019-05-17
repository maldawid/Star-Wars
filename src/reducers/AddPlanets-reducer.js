import { ADD_PLANETS } from "../actions/AddPlanets";

const initialState = {
  Planets: ""
};

export default function planetsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_PLANETS:
      return [...state, payload];
    default:
      return state;
  }
}
