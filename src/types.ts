import { FuseOptions } from 'fuse.js';

export type SearchOptions<T> = FuseOptions<T>;

export type SortingOptions = {
  [key: string]: any[];
};

export type SearchableOptions<T> = {
  search: SearchOptions<T>;
  sorting: SortingOptions;
};

export interface SearchableInterface {

}
