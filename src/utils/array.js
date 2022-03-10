/**
 * FILE CONTAINS ARRAY RELATED UTILITY FUNCTIONS
 */


/**
 * Produces a duplicate-free version of the array
 * @param {Array} arr 
 * @returns 
 */
export const getDuplicateFreeArray = arr => {
  return Array.isArray(arr) ? [...new Set(arr)] : [];
};