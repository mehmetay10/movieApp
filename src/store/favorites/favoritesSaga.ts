// Bu modül AI desteği ile geliştirildi (ChatGPT)
import { call, put, takeEvery, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOAD_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE, FavoriteActionTypes } from './favoritesTypes';
import { setFavorites } from './favoritesActions';

function* saveFavoritesToStorage() {
  const favorites = yield select((state) => state.favorites.favorites);
  yield call([AsyncStorage, 'setItem'], 'favorites', JSON.stringify(favorites));
}

function* loadFavoritesFromStorage() {
  const data = yield call([AsyncStorage, 'getItem'], 'favorites');
  if (data) {
    const favorites = JSON.parse(data);
    yield put(setFavorites(favorites));
  }
}

function* addFavoriteSaga(action: FavoriteActionTypes) {
  yield call(saveFavoritesToStorage);
}

function* removeFavoriteSaga(action: FavoriteActionTypes) {
  yield call(saveFavoritesToStorage);
}

export default function* favoritesSaga() {
  yield takeEvery(ADD_FAVORITE, addFavoriteSaga);
  yield takeEvery(REMOVE_FAVORITE, removeFavoriteSaga);
  yield takeEvery(LOAD_FAVORITES, loadFavoritesFromStorage);
} 