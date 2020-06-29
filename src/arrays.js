const property = (path) => (obj) => {
  const props = Array.isArray(path) ? path : path.split('.');
  let value = obj;
  for (let i = 0; i < props.length; i += 1) {
    value = value[props[i]];
  }
  return value;
};
const matchesProperty = (path, value) => (obj) => property(path)(obj) === value;
const matches = (match) => (obj) => {
  const keys = Object.keys(match);
  for (let i = 0; i < keys.length; i += 1) {
    const prop = keys[i];
    if (obj[prop] !== match[prop]) {
      return false;
    }
  }
  return true;
};

const take = (arr, n = 1) => {
  const newArr = [];
  if (n > arr.length) {
    return arr;
  }
  for (let i = 0; i < n; i += 1) {
    newArr.push(arr[i]);
  }
  return newArr;
};

const chunk = (arr, size) => {
  const newArr = [];
  let group = [];
  for (let i = 0; i < arr.length; i += 1) {
    group.push(arr[i]);
    if (group.length === size || i === arr.length - 1) {
      newArr.push(group);
      group = [];
    }
  }
  return newArr;
};

const compact = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i]) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const drop = (arr, n = 1) => {
  const newArr = [];
  if (n === 0) {
    return arr;
  }
  for (let i = n; i < arr.length; i += 1) {
    newArr.push(arr[i]);
  }
  return newArr;
};

const zip = (...arrays) => {
  let biggestArray = 0;
  for (let i = 0; i < arrays.length; i += 1) {
    if (biggestArray < arrays[i].length) {
      biggestArray = arrays[i].length;
    }
  }
  const newArr = [];
  for (let i = 0; i < biggestArray; i += 1) {
    const group = [];
    for (let n = 0; n < arrays.length; n += 1) {
      group.push(arrays[n][i]);
    }
    newArr.push(group);
  }
  return newArr;
};

const matchBy = (match) => {
  let checkMatches = () => true;
  if (typeof match === 'function') {
    checkMatches = match;
  } else if (Array.isArray(match)) {
    const [prop, value] = match;
    checkMatches = matchesProperty(prop, value);
  } else if (typeof match === 'string') {
    checkMatches = property(match);
  } else if (typeof match === 'object') {
    checkMatches = matches(match);
  }
  return checkMatches;
};

const dropWhile = (arr, match) => {
  const checkMatches = matchBy(match);

  for (let i = 0; i < arr.length; i += 1) {
    if (!checkMatches(arr[i])) {
      return arr.slice(i);
    }
  }
  return [];
};

const filter = (arr, match) => {
  const checkMatches = matchBy(match);

  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (checkMatches(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const find = (arr, match) => {
  const checkMatches = matchBy(match);

  for (let i = 0; i < arr.length; i += 1) {
    if (checkMatches(arr[i])) {
      return arr[i];
    }
  }
  return undefined;
};

const includes = (collection, value, fromIndex = 0) => {
  if (typeof collection === 'string' || Array.isArray(collection)) {
    return collection.indexOf(value, fromIndex) !== -1;
  }
  if (typeof collection === 'object') {
    const keys = Object.keys(collection);
    for (let i = 0; i < keys.length; i += 1) {
      if (collection[keys[i]] === value) {
        return true;
      }
    }
  }

  return false;
};

const map = (collection, iteratee) => {
  const mapEl = typeof iteratee === 'function' ? iteratee : property(iteratee);
  const collectionLocal = Array.isArray(collection)
    ? collection
    : Object.values(collection);

  const newArr = [];
  for (let i = 0; i < collectionLocal.length; i += 1) {
    newArr.push(mapEl(collectionLocal[i]));
  }
  return newArr;
};

module.exports = {
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
};
