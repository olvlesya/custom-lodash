const {
  pick,
  omit,
  pickBy,
  omitBy,
  toPairs,
  merge,
} = require('../src/objects');

describe('pick', () => {
  it('should return a new object  composed of the picked object properties', () => {
    expect(pick({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });
});

describe('omit', () => {
  it('should return object with removed keys', () => {
    expect(omit({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ b: '2' });
  });
});

describe('pickBy', () => {
  it('should return object with values is number', () => {
    expect(
      pickBy({ a: 1, b: '2', c: 3 }, (x) => typeof x === 'number'),
    ).toEqual({ a: 1, c: 3 });
  });

  it('should return object with values is string', () => {
    expect(
      pickBy({ a: 1, b: '2', c: 3 }, (x) => typeof x === 'string'),
    ).toEqual({ b: '2' });
  });
});

describe('omitBy', () => {
  it('should return object with keys where values is not a number', () => {
    expect(
      omitBy({ a: 1, b: '2', c: 3 }, (x) => typeof x === 'number'),
    ).toEqual({ b: '2' });
  });
});

describe('toPairs', () => {
  it('should return object with keys where values is not a number', () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    expect(toPairs(new Foo())).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });
});

describe('merge', () => {
  it('should merge two objects', () => {
    expect(merge({ a: 1, b: 2 }, { c: 3, d: 4 })).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });
});
