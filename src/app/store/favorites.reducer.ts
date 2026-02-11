// store/favorites.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';

export const initialState: any[] = [];

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { job }) => [...state, job]),
  on(removeFavorite, (state, { jobId }) => state.filter(j => j.id !== jobId))
);
