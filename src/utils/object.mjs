/**
 * FILE CONTAINS OBJECT RELATED UTILITY FUNCTIONS
 */

/**
 * Checks if value is an empty object or collection.
 * @param {*} obj
 * @returns {Boolean}
 */
export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

/**
 * Check if given object is JSON string
 * @param {String} obj
 * @returns {Boolean}
 */
export const isJsonString = obj => {
  if (!obj) return false;
  try {
    const json = JSON.parse(obj);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
};

/**
 * Removes all spaces, tabs, and line breaks from the string
 * @param {String} obj
 * @returns
 */
export const cleanString = obj => {
  if (!obj && typeof obj !== "string") return;
  return obj.replace(/\s+/g, "");
};
