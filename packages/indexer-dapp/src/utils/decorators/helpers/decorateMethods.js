const getOwnMethodNames = obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => (typeof value === 'function' ? [...acc, key] : acc),
    []
  )

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
