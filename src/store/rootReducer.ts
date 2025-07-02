// Bu modül AI desteği ile geliştirildi (ChatGPT)
import { combineReducers } from 'redux';
import favoritesReducer from './favorites/favoritesReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer; 