// Bu modül AI desteği ile geliştirildi (ChatGPT)
import { all } from 'redux-saga/effects';
import favoritesSaga from './favorites/favoritesSaga';

export default function* rootSaga() {
  yield all([
    favoritesSaga(),
  ]);
} 