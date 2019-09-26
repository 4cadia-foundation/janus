export default function createDecorator (decoratorFn) {
  return decorateeFn => {
    const __decorated__ = decoratorFn(decorateeFn)

    const decoratorName = decoratorFn.name || '<anonymous>'
    const decorateeName = decorateeFn.name || '<anonymous>'

    /**
     * By setting the name property of the decorated function
     * we increase its traceability in error stack traces,
     * which aids to the debugging process.
     */
    Object.defineProperty(__decorated__, 'name', {
      value: `${decoratorName}(${decorateeName})`
    })

    return __decorated__
  }
}
