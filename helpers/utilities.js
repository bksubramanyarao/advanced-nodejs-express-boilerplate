
/**
 * DESCRIPTION: checks if null or undefined
 * @param {function} func - function
 * @return {boolean|function} func or false
 */
exports.nullOrUndefined = (func) => {
  try {
    const value = func();
    return (value === null || value === undefined) ? false : value;
  } catch (e) {
    return false;
  }
}