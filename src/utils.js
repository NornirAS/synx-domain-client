// Check if JSON string
export const _isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Return array of unique values from two arrays
export const _arrayUniqValues = (arr1, arr2) => {
  return arr1.filter(obj => {
    return arr2.indexOf(obj) == -1;
  });
};
