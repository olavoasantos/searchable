import Fuse from 'fuse.js';
import { firstBy } from 'thenby';
import { DEFAULT_SEARCH_OPTIONS, DEFAULT_SORTING_OPTIONS } from './constants';
import { SearchableInterface, SearchableOptions } from './types';

class Searchable<T = any> implements SearchableInterface {
  protected list: any[];
  protected results: any[];
  protected options: SearchableOptions<T>;

  protected pageSize: number = -1;

  constructor(list: any[], options: Partial<SearchableOptions<T>> = {}) {
    this.list = [...list];
    this.results = [...list];
    this.options = {
      search: { ...DEFAULT_SEARCH_OPTIONS, ...(options.search || {}) },
      sorting: { ...DEFAULT_SORTING_OPTIONS, ...(options.sorting || {}) },
    };
  }

  public sortBy(strategy: string, order: 'ASC' | 'DESC' = 'ASC') {
    const sortBy = [...this.options.sorting[strategy]];
    const first = sortBy.shift();

    if (Boolean(first) && sortBy.length === 0) {
      this.results = this.results.sort(firstBy(first, order === 'ASC' ? 1 : -1));
    }

    if (Boolean(first) && sortBy.length > 0) {
      this.results = this.results.sort(
        sortBy.reduce(
          (sort: any, then: any) => sort.thenBy(then, order === 'ASC' ? 1 : -1),
          firstBy(first),
        ),
      );
    }

    return this;
  }

  public searchFor(...keys: any[]) {
    const value = keys.pop();
    this.results = new Fuse(this.results, {
      ...this.options.search,
      keys: keys.length > 0 ? keys : this.options.search.keys,
    }).search(String(value));

    return this;
  }

  public paginate(size: number = 5) {
    this.pageSize = size;

    return this;
  }

  public all() {
    return this.results;
  }

  public first() {
    return this.results[0];
  }

  public get(num: number = 1, offset: number = 0) {
    return this.results.slice(offset, offset + num);
  }

  public page(num: number = 1) {
    const size = this.pageSize >= 0 ? this.pageSize : this.results.length;
    const START = (num - 1) * size;
    const END = START + size;

    return this.results.slice(START, END);
  }
}

export default Searchable;
