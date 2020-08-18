import { Action } from '@ngrx/store';
import { FavoriteModel } from '../../models/favorites.model';

export enum FavoritesActionTypes {
  LOAD_FAVORITES = '[Favorites] Load Favorites',
  ADD_TO_FAVORITES = '[Favorites] Add to Favorites',
  REMOVE_FROM_FAVORITES = '[Favorites] Remove from Favorites'
}

export class FavoritesAction implements Action {
  type: string;
  favorite: FavoriteModel;
  favorites: Array<FavoriteModel>;
}

export class LoadFavorites implements Action {
  readonly type = FavoritesActionTypes.LOAD_FAVORITES;

  constructor(readonly favorites: Array<FavoriteModel>) {
  }
}

export class AddToFavorites implements Action {
  readonly type = FavoritesActionTypes.ADD_TO_FAVORITES;

  constructor(readonly favorite: FavoriteModel) {
  }
}

export class RemoveFromFavorites implements Action {
  readonly type = FavoritesActionTypes.REMOVE_FROM_FAVORITES;

  constructor(readonly favorite: FavoriteModel) {
  }
}

export type ActionsUnion = LoadFavorites | AddToFavorites | RemoveFromFavorites;