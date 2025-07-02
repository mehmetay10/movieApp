// Bu modül AI desteği ile geliştirildi (ChatGPT)
export const LOAD_FAVORITES = 'LOAD_FAVORITES';
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: any; // cursor ile geliştirildi
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: Movie;
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: number;
}

export interface SetFavoritesAction {
  type: typeof SET_FAVORITES;
  payload: Movie[];
}

export type FavoriteActionTypes = AddFavoriteAction | RemoveFavoriteAction | SetFavoritesAction; 