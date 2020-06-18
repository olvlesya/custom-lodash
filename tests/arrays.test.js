const {
  take,
  chunk,
  compact,
  drop,
  zip,
  dropWhile,
  filter,
  find,
  includes,
  map,
} = require('../src/arrays');

describe('take', () => {
  it('should return first element when only array passed', () => {
    expect(take([1, 2, 3])).toEqual([1]);
  });
  it('should return n first elements when array and n passed', () => {
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
  });
  it('should return all array when n > array length', () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });
  it('should empty array when n = 0', () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });
});

describe('chunk', () => {
  it('should be array with arrays where length of the first array is n', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
  it('should be array with arrays when not enough elements', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
  });
});

describe('compact', () => {
  it('should be only true values in new array', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });
});

describe('drop', () => {
  it('should remove first element and return new array with remaining elements when no n provided', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });
  it('should remove n = 1 first elements and return new array with remaining elements', () => {
    expect(drop([1, 2, 3], 1)).toEqual([2, 3]);
  });
  it('should remove n = 3 first elements and return new array with remaining elements', () => {
    expect(drop([1, 2, 3], 2)).toEqual([3]);
  });
  it('should remove all elements when n > array length and return empty array', () => {
    expect(drop([1, 2, 3], 5)).toEqual([]);
  });
  it('should return all elements when n = 0', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});

describe('zip', () => {
  it('should return group elements in new array', () => {
    expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  it('should return group elements when one array bigger', () => {
    expect(zip(['a', 'b'], [1, 2, 3], [true, false])).toEqual([
      ['a', 1, true],
      ['b', 2, false],
      [undefined, 3, undefined],
    ]);
  });
});

describe('dropWhile', () => {
  it('should remove first elements using function', () => {
    expect(
      dropWhile(
        [
          { user: 'barney', active: false },
          { user: 'fred', active: false },
          { user: 'pebbles', active: true },
        ],
        (o) => !o.active,
      ),
    ).toEqual([{ user: 'pebbles', active: true }]);
  });

  it('should remove all elements using function', () => {
    expect(
      dropWhile(
        [
          { user: 'barney', active: false },
          { user: 'fred', active: false },
          { user: 'pebbles', active: true },
        ],
        () => true,
      ),
    ).toEqual([]);
  });

  it('should remove first elements using object', () => {
    expect(
      dropWhile(
        [
          { user: 'barney', active: false },
          { user: 'fred', active: false },
          { user: 'pebbles', active: true },
        ],
        { user: 'barney', active: false },
      ),
    ).toEqual([
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
    ]);
  });

  it('should remove first elements using array of properties', () => {
    expect(
      dropWhile(
        [
          { user: 'barney', active: false },
          { user: 'fred', active: false },
          { user: 'pebbles', active: true },
        ],
        ['active', false],
      ),
    ).toEqual([{ user: 'pebbles', active: true }]);
  });

  it('should remove first elements using string', () => {
    expect(
      dropWhile(
        [
          { user: 'barney', active: false },
          { user: 'fred', active: false },
          { user: 'pebbles', active: true },
        ],
        'active',
      ),
    ).toEqual([
      { user: 'barney', active: false },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
    ]);
  });
});

describe('filter', () => {
  it('should filter by function', () => {
    expect(
      filter(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
        ],
        (o) => !o.active,
      ),
    ).toEqual([{ user: 'fred', age: 40, active: false }]);
  });

  it('should filter by object', () => {
    expect(
      filter(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
        ],
        { age: 36, active: true },
      ),
    ).toEqual([{ user: 'barney', age: 36, active: true }]);
  });

  it('should filter by array', () => {
    expect(
      filter(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
        ],
        ['active', false],
      ),
    ).toEqual([{ user: 'fred', age: 40, active: false }]);
  });

  it('should filter by string', () => {
    expect(
      filter(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
        ],
        'active',
      ),
    ).toEqual([{ user: 'barney', age: 36, active: true }]);
  });
});

describe('find', () => {
  it('should find first elements using function', () => {
    expect(
      find(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
          { user: 'pebbles', age: 1, active: true },
        ],
        (o) => o.age < 40,
      ),
    ).toEqual({ user: 'barney', age: 36, active: true });
  });

  it('should find first elements using object', () => {
    expect(
      find(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
          { user: 'pebbles', age: 1, active: true },
        ],
        { age: 1, active: true },
      ),
    ).toEqual({ user: 'pebbles', age: 1, active: true });
  });

  it('should find first elements using array', () => {
    expect(
      find(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
          { user: 'pebbles', age: 1, active: true },
        ],
        ['active', false],
      ),
    ).toEqual({ user: 'fred', age: 40, active: false });
  });

  it('should find first elements using string', () => {
    expect(
      find(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
          { user: 'pebbles', age: 1, active: true },
        ],
        'active',
      ),
    ).toEqual({ user: 'barney', age: 36, active: true });
  });

  it('if it is not found return undefined', () => {
    expect(
      find(
        [
          { user: 'barney', age: 36, active: true },
          { user: 'fred', age: 40, active: false },
          { user: 'pebbles', age: 1, active: true },
        ],
        'incorrect-prop',
      ),
    ).toEqual(undefined);
  });
});

describe('includes', () => {
  it('should return true if value is found in array', () => {
    expect(includes([1, 2, 3], 1)).toEqual(true);
  });

  it('should return false if value is not found in array from index', () => {
    expect(includes([1, 2, 3], 1, 2)).toEqual(false);
  });

  it('should return true if value is found in object', () => {
    expect(includes({ a: 1, b: 2 }, 1)).toEqual(true);
  });

  it('should return true if value is found in string', () => {
    expect(includes('abcd', 'bc')).toEqual(true);
  });
});

describe('map', () => {
  it('should return result function', () => {
    expect(map([4, 8], (n) => n * n)).toEqual([16, 64]);
  });

  it('should return result function for values of object', () => {
    expect(map({ a: 4, b: 8 }, (n) => n * n)).toEqual([16, 64]);
  });

  it('should return array with values if second argument is string and it the same as key(s) in object', () => {
    expect(map([{ user: 'barney' }, { user: 'fred' }], 'user')).toEqual([
      'barney',
      'fred',
    ]);
  });
});
