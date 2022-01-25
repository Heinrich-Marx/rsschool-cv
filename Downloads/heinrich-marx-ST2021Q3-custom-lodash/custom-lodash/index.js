class CustomLodash {
  constructor() {}

  customPush(arr, el) {
    return (arr[arr.length] = el);
  }
  customSlice(arr, start, end) {
    const newArr = [];
    let counter = 0;
    for (let i = start; i < end; i++) {
      if (arr[i]) {
        newArr[counter] = arr[i];
        counter++;
      }
    }
    return newArr;
  }
  isNumber(num) {
    return typeof num === 'number' && !Number.isNaN(num);
  }
  getPickOmit(obj, paths, value = false) {
    const newObj = {};
    for (let elem in obj) {
      let flag = false;
      if (Array.isArray(paths)) {
        for (let i of paths) {
          if (elem === i) {
            flag = true;
            break;
          }
        }
        if (value) {
          if (!flag) newObj[elem] = obj[elem];
        } else {
          if (flag) newObj[elem] = obj[elem];
        }
      } else {
        if (value) {
          if (elem !== paths) newObj[elem] = obj[elem];
        } else {
          if (elem === paths) newObj[elem] = obj[elem];
        }
      }
    }
    return newObj;
  }
  getPickByOmitBy(obj, predicate, value = false) {
    const newObj = {};
    for (let el in obj) {
      if (value) {
        if (!predicate(obj[el])) newObj[el] = obj[el];
      } else {
        if (predicate(obj[el])) newObj[el] = obj[el];
      }
    }
    return newObj;
  }
  identity(value) {
    return value;
  }
  customIsNaN(value) {
    return Number.isNaN(value);
  }
  chunk(arr, size = 1) {
    if (!Array.isArray(arr)) return [];
    const newArr = [];
    for (let i = 0; i < arr.length; i = i + size)
      this.customPush(newArr, this.customSlice(arr, i, i + size));
    return newArr;
  }
  compact(arr) {
    if (!Array.isArray(arr)) return [];
    const newArr = [];
    for (let i of arr) !!i === true ? this.customPush(newArr, i) : '';
    return newArr;
  }
  drop(arr, size = 1) {
    const newArr = this.customSlice(arr, size, arr.length);
    return newArr;
  }
  dropWhile(arr, predicate = this.identity) {
    if (predicate === this.identity) return this.identity(arr);
    if (!Array.isArray(arr)) return [];
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!predicate(arr[i])) this.customPush(newArr, arr[i]);
    }
    return newArr;
  }
  take(arr, size = 1) {
    if (!Array.isArray(arr)) return [];
    const newArr = this.customSlice(arr, 0, size);
    return newArr;
  }
  filter(arr, predicate = this.identity) {
    if (predicate === this.identity) return this.identity(arr);
    if (!Array.isArray(arr)) return [];
    for (let i = 0; i < arr.length; i++) {
      if (typeof predicate === 'function') {
        if (predicate(arr[i])) return arr[i];
      } else if (typeof predicate === 'object') {
        if (Array.isArray(predicate)) {
          if (predicate.length <= 1) return undefined;
          if (arr[i][predicate[0]] === predicate[1]) return arr[i];
        } else {
          let count = 0;
          for (let key in arr[i]) if (predicate[key] === arr[i][key]) count++;
          if (count === Object.keys(predicate).length) return arr[i];
        }
      } else if (arr[i][predicate]) return arr[i];
    }
    return undefined;
  }
  find(collection, predicate = this.identity, index = 0) {
    if (predicate === this.identity) return this.identity(collection);
    for (let i = index; i < collection.length; i++) {
      if (predicate(collection[i])) return collection[i];
    }
    return undefined;
  }
  includes(collection, value, index = 0) {
    if (collection instanceof Object) {
      const arrWithKeys = Array.isArray(collection)
        ? collection
        : Object.values(collection);
      if (index < 0) index = arrWithKeys.length + index;
      for (let i = index; i < arrWithKeys.length; i++) {
        if (this.customIsNaN(value))
          if (this.customIsNaN(value) === this.customIsNaN(arrWithKeys[i]))
            return true;
        if (arrWithKeys[i] === value) return true;
      }
      return false;
    }
    if (collection.includes(value, index)) return true;
    return false;
  }
  map(collection, predicate = this.identity) {
    if (predicate === this.identity) return this.identity(collection);
    const newArr = [];
    const arrWithValues = Array.isArray(collection)
      ? collection
      : Object.values(collection);
    for (let i = 0; i < arrWithValues.length; i++) {
      this.customPush(newArr, predicate(arrWithValues[i]));
    }
    return newArr;
  }
  zip() {
    const newArr = [];
    const arr = Array.from(arguments);
    let MaxArrLength = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > MaxArrLength) MaxArrLength = arr[i].length;
    }
    for (let i = 0; i < MaxArrLength; i++) {
      const miniArr = [];
      for (let k = 0; k < arr.length; k++) {
        if (arr[k][i] !== undefined) this.customPush(miniArr, arr[k][i]);
        else this.customPush(miniArr, undefined);
      }
      if (miniArr.length !== 0) this.customPush(newArr, miniArr);
    }
    return newArr;
  }
  merge(object, ...collectionObj) {
    const recursiveMerge = (sourceObj, obj) => {
      if (!(sourceObj instanceof Object) || !(obj instanceof Object))
        return sourceObj;
      for (let k in obj) {
        if (obj[k] instanceof Object) {
          if (sourceObj[k]) recursiveMerge(sourceObj[k], obj[k]);
          else Object.assign(sourceObj, { [k]: obj[k] });
        } else sourceObj[k] = obj[k];
      }
      return sourceObj;
    };
    for (let i = 0; i < collectionObj.length; i++) {
      recursiveMerge(object, collectionObj[i]);
    }
    return object;
  }
  omit(obj, paths) {
    return this.getPickOmit(obj, paths, true);
  }
  omitBy(obj, predicate = this.identity) {
    if (predicate === this.identity) return this.identity(obj);
    return this.getPickByOmitBy(obj, predicate, true);
  }
  pick(obj, paths) {
    return this.getPickOmit(obj, paths);
  }
  pickBy(obj, predicate = this.identity) {
    if (predicate === this.identity) return this.identity(obj);
    return this.getPickByOmitBy(obj, predicate);
  }
  toPairs(obj) {
    if (obj instanceof Object) {
      if (obj instanceof Map) {
        const newArr = [];
        const MapEntries = obj.entries();
        for (let i = 0; i < obj.size; i++) {
          this.customPush(newArr, MapEntries.next().value);
        }
        return newArr;
      }
      if (obj instanceof Set) {
        const newArr = [];
        const SetEntries = obj.entries();
        for (let el of SetEntries) {
          this.customPush(newArr, el);
        }
        return newArr;
      }
      return Object.entries(obj);
    }
  }
}
