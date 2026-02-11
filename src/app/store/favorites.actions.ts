// store/favorites.actions.ts
import { createAction, props } from '@ngrx/store';

export const addFavorite = createAction(
  '[Favorites] Add',
  props<{ job: any }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove',
  props<{ jobId: number }>()
);
