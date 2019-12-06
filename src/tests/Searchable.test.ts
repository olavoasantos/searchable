import Searchable from '../Searchable';

describe('Searchable tests', () => {
  it('should return the whole list', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.all()).toMatchObject(LIST);
  });
  it('should return the first entry', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.first()).toMatchObject({ id: 1, name: 'John' });
  });
  it('should return an array with the first entry', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.get()).toMatchObject([{ id: 1, name: 'John' }]);
  });
  it('should return the first n entries', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.get(2)).toMatchObject([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });
  it('should paginate the results', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.paginate(2).page(1)).toMatchObject([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });
  it('should get the right page', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.paginate(3).page(2)).toMatchObject([{ id: 4, name: 'Marcus' }]);
  });
  it('should return an empty array if page is over the limit', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.paginate(200).page(2)).toMatchObject([]);
  });
  it('should return all results if page size isn not set', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST);

    expect(searchable.page(1)).toMatchObject(LIST);
  });
  it('should return search for a term', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: { keys: ['id', 'name'] }, sorting: {} });

    expect(searchable.searchFor(2).first()).toMatchObject({ id: 2, name: 'Jane' });
  });
  it('should return search for a term on a given field', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: { keys: ['id', 'name'] }, sorting: {} });

    expect(searchable.searchFor('id', 2).first()).toMatchObject({ id: 2, name: 'Jane' });
  });
  it('should return search for a term on a given field', () => {
    const LIST = [
      { id: 1, lastName: 'Doe', name: 'John' },
      { id: 2, lastName: 'Doe', name: 'Jane' },
      { id: 3, lastName: 'Arc', name: 'Janette' },
      { id: 4, lastName: 'Wilford', name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: { keys: ['id', 'name'] }, sorting: {} });

    expect(searchable.searchFor('name', 'lastName', 'arc').all()).toMatchObject([
      { id: 3, lastName: 'Arc', name: 'Janette' },
      { id: 4, lastName: 'Wilford', name: 'Marcus' },
    ]);
  });
  it('should return search for a partial name', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: { keys: ['id', 'name'] }, sorting: {} });

    expect(searchable.searchFor('cus').all()).toMatchObject([{ id: 4, name: 'Marcus' }]);
  });
  it('should sort results by name', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: {}, sorting: { id: ['id'], name: ['name'] } });

    expect(searchable.sortBy('name').all()).toMatchObject([
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 1, name: 'John' },
      { id: 4, name: 'Marcus' },
    ]);
  });
  it('should sort results by name in DESC order', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, { search: {}, sorting: { id: ['id'], name: ['name'] } });

    expect(searchable.sortBy('id', 'DESC').all()).toMatchObject([
      { id: 4, name: 'Marcus' },
      { id: 3, name: 'Janette' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
    ]);
  });
  it('should search and sort a list', () => {
    const LIST = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
      { id: 4, name: 'Marcus' },
    ];

    const searchable = new Searchable(LIST, {
      sorting: { id: ['id', 'name'], name: ['name', 'id'] },
    });

    expect(searchable.searchFor('name', 'Jane').sortBy('name').all()).toMatchObject([
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Janette' },
    ]);
  });
});
