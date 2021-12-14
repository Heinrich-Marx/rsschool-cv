const obj = {
  day: 10,
  month: "December",
  description: {
    name: "Dima",
    surname: "Sotnikov",
    work: {
      railway: true,
      dev: false,
      a(a, b) {
        return a + b;
      },
      arr: [1, 2, 3, 4],
    },
  },
};

const deepCopy = (instanceObj) => {
  const newObj = {};
  for (let key in instanceObj) {
    if (instanceObj[key] instanceof Object) {
      if (Array.isArray(instanceObj[key]))
        newObj[key] = instanceObj[key].slice();
      else newObj[key] = deepCopy(instanceObj[key]);
    }
    newObj[key] = instanceObj[key];
  }
  return newObj;
};

console.log(obj);
const obj2 = deepCopy(obj);
console.log(obj2);
console.log(obj.description.work.arr === obj2.description.work.arr);
console.log(obj2.description.work.a);
