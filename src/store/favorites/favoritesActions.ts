// Bu modül AI desteği ile geliştirildi (ChatGPT)
import { LOAD_FAVORITES, SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, Movie, AddFavoriteAction, RemoveFavoriteAction } from './favoritesTypes';
 
export const loadFavorites = () => ({ type: LOAD_FAVORITES });
export const setFavorites = (favorites: Movie[]) => ({
  type: SET_FAVORITES,
  payload: favorites,
});
export const addFavorite = (movie: Movie): AddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: movie,
});
export const removeFavorite = (movieId: number): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: movieId,
}); 