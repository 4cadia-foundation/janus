/**
 * Enhances a decorator by setting the name property of the decorated function.
 * This way we increase its traceability in error stack traces, which aids to the debugging process.
 *
 * @param {Function} decoratorFn the decorator function
 * @returns {Function} the decorated function with the proper properties
 */
export default function createDecorator (decoratorFn) {
  return decorateeFn => {
    const __decorated__ = decoratorFn(decorateeFn)

    const decoratorName = decoratorFn.name || '<anonymous>'
    const decorateeName = decorateeFn.name || '<anonymous>'

    Object.defineProperty(__decorated__, 'name', {
      value: `${decoratorName}(${decorateeName})`
    })

    return __decorated__
  }
}
