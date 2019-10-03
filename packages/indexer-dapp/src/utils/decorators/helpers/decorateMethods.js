const getOwnMethodNames = obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => (typeof value === 'function' ? [...acc, key] : acc),
    []
  )

/**
 * Creates an object "enhancer" function.
 *
 * @param {Function} decorator a method decorator
 * @param {string[]} methods a list of methods to decorate
 *
 * @returns {Function} function that when called will decorate `methods`
 * from the object passed  as parameter with the given `decorator` function
 */
export default function decorateMethods (decorator, methods) {
  return obj => {
    if (!Array.isArray(methods)) {
      methods = getOwnMethodNames(obj)
    }

    return methods.reduce(
      (acc, methodName) =>
        typeof obj[methodName] === 'function'
          ? Object.assign(acc, { [methodName]: decorator(obj[methodName]) })
          : acc,
      { ...obj }
    )
  }
}
