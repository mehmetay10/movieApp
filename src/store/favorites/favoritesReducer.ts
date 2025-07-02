// Bu modül AI desteği ile geliştirildi (ChatGPT)
import { ADD_FAVORITE, REMOVE_FAVORITE, FavoriteActionTypes, Movie } from './favoritesTypes';

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action: FavoriteActionTypes): FavoritesState => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites.filter(fav => fav.id !== action.payload.id)],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer; 