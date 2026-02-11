import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  favorites: any[];
  loading: boolean;
}

export const initialState: FavoritesState = {
  favorites: [],
  loading: false
};

export const favoritesReducer = createReducer(
  initialState,

  on(FavoritesActions.loadFavorites, (state) => ({
    ...state,
    loading: true
  })),

  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
    loading: false
  })),

  on(FavoritesActions.addFavorite, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite]
  })),

  on(FavoritesActions.removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== id)
  }))
);
