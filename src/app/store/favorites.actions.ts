import { createAction, props } from '@ngrx/store';

export const loadFavorites = createAction(
  '[Favorites] Load',
  props<{ userId: number }>()
);

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Success',
  props<{ favorites: any[] }>()
);

export const addFavorite = createAction(
  '[Favorites] Add',
  props<{ favorite: any }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove',
  props<{ id: number }>()
);
