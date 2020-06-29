const pick = (obj, arr) => {
  const newObj = {};
  for (let i = 0; i < arr.length; i += 1) {
    newObj[arr[i]] = obj[arr[i]];
  }
  return newObj;
};

const omit = (obj, arr) => {
  const newObj = { ...obj };
  for (let i = 0; i < arr.length; i += 1) {
    delete newObj[arr[i]];
  }
  return newObj;
};

const pickBy = (obj, func) => {
  const newObj = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (func(obj[keys[i]])) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
};

const omitBy = (obj, predicate) => {
  const newObj = { ...obj };
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (predicate(obj[keys[i]])) {
      delete newObj[keys[i]];
    }
  }
  return newObj;
};

const toPairs = (obj) => {
  const newArr = [];
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    newArr.push([keys[i], obj[keys[i]]]);
  }
  return newArr;
};

const merge = (obj1, obj2) => ({ ...obj1, ...obj2 });

module.exports = { pick, omit, pickBy, omitBy, toPairs, merge };
