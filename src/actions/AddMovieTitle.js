export const ADD_MOVIETITLE = 'ADD_MOVIETITLE';

export function addMovieTitle(movieTitile){
  return {
    type: ADD_MOVIETITLE,
    payload: movieTitile
  }
}