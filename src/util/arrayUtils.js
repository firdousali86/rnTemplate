class ArrayUtils {
  sortArrayWithKey = property => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  insertItemAtIndex = (arrayInst, indexToAdd, newItem) => {
    return [
      ...arrayInst.slice(0, indexToAdd),
      newItem,
      ...arrayInst.slice(indexToAdd)
    ];
  };

  calculateObjectDifference = (object, base) => {
    changes = (object, base) => {
      return _.transform(object, function(result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    };
    return changes(object, base);
  };
}

export default new ArrayUtils();

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

// const groupBy = (items, key) => items.reduce(
//   (result, item) => ({
//     ...result,
//     [item[key]]: [
//       ...(result[item[key]] || []),
//       item,
//     ],
//   }),
//   {},
// );
