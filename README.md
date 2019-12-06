# Searchable

## Creating a searchable list

```ts
new Searchable(list: Object[], options?: SearchableOptions);
```

### Options

```ts
type SearchableOptions<T> = {
  search?: {
    id?: keyof T | string;
    caseSensitive?: boolean;
    includeMatches?: boolean;
    includeScore?: boolean;
    shouldSort?: boolean;
    sortFn?: (a: { score: number }, b: { score: number }) => number;
    getFn?: (obj: any, path: string) => any;
    keys?: (keyof T | string)[] | { name: keyof T | string; weight: number }[];
    verbose?: boolean;
    tokenize?: boolean;
    tokenSeparator?: RegExp;
    matchAllTokens?: boolean;
    location?: number;
    distance?: number;
    threshold?: number;
    maxPatternLength?: number;
    minMatchCharLength?: number;
    findAllMatches?: boolean;
  },
  sorting?: {
    [strategy: string]: (string | ((a, b) => a - b))[]
  },
}
```

### Example

```ts
const LIST = [
  { id: 1, lastName: 'Doe', name: 'John' },
  { id: 2, lastName: 'Doe', name: 'Jane' },
  { id: 3, lastName: 'Arc', name: 'Janette' },
  { id: 4, lastName: 'Wilford', name: 'Marcus' },
];

const OPTIONS = {
  search: {
    location: 0,
    distance: 96,
    minMatchCharLength: 2,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: false,
    maxPatternLength: 32,
  },
  sorting: {
    id: ['id'],
    name: ['name', 'lastName'],
  },
};

const searchable = new Searchable(USERS, OPTIONS);

searchable
  .searchFor('name', 'Jane')
  .sortBy('name')
  .all();
```

## Actions

### searchFor()

Searches list.

```ts
searchable.searchFor(...keys, query);
```

#### Example 1: Simple search

```ts
searchable.searchFor('name', 'jane');
```

#### Example 2: Multiple fields search

```ts
searchable.searchFor('name', 'lastName', 'jane');
```

### sortBy()

Sorts list or results.

```ts
searchable.sortBy(strategy, orderBy);
```

> orderBy can be either `ASC` or `DESC` (`ASC` by default).

#### Example 1: Simple sort

```ts
searchable.sortBy('name');
```

#### Example 2: Sort with order

```ts
searchable.sortBy('name', 'DESC');
```

### paginate()

Defines the size of pagination of the list or results.

```ts
searchable.paginate(5);
```

## Response

### all()

Get all the results.

```ts
searchable.all();
```

### get()

Get a given amount of results and offset.

```ts
searchable.get(number, offset);
searchable.get(2);
searchable.get(2, 2);
```

### first()

Get the first result.

```ts
searchable.first();
```

### page()

Get a given page (should be used with the `pagination` method).

```ts
searchable.paginate(2).page(number);
searchable.paginate(2).page(1); // index 0 and 1
searchable.paginate(2).page(2); // index 2 and 3
```
