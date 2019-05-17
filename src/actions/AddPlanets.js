export const ADD_PLANETS = 'ADD_PLANETS';

export function addPlanets(planets){
  return {
    type: ADD_PLANETS,
    payload: planets
  }
}