export const findItem = (arr, index, indexVal) => {
  arr.findIndex((item) => {
    if (item[index] === indexVal) {
      return item;
    }
    return false;
  });
};

export const available = (data, searchTerm, index) => data?.filter((option) => {
  const temp = option.constructor === Object ? option[index] : option;
  return temp?.toLowerCase()?.includes(searchTerm?.toLowerCase());
});

export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if ((typeof obj1 !== 'object' || obj1 === null) || (typeof obj2 !== 'object' || obj2 === null)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!deepEqual(val1, val2)) {
      return false;
    }
  }

  return true;
};
