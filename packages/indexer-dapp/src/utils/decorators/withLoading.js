import { createDecorator } from './helpers'

/**
 * Wraps a Vue component method call with loading behavior using `vue-loading-overlay`.
 * It requires `vue-loading-overlay` to be already included by Vue.
 *
 * It will create the loading element and display it right before the method call.
 * Once the method finishes its execution, the loading will be hidden,
 * regardless whether an exception is throw or not.
 *
 * @param {Function | AsyncFunction} method the Vue component method
 * @return {AsyncFunction} the wrapped method.
 * @throws {Error} if `vue-loading-overlay` was not previously include by Vue.
 */
function withLoading (method) {
  return async function withLoadingWrapper (...args) {
    if (!this.$loading) {
      throw new Error(`vue-loading-overlay was not included by Vue.
Please add the following to your main file:

  import Loading from 'vue-loading-overlay'
  Vue.use(Loading, {
    // ...options
  })`)
    }

    const loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.loadingContainer
    })

    try {
      return await method.apply(this, args)
    } catch (err) {
      throw err
    } finally {
      loader.hide()
    }
  }
}

export default createDecorator(withLoading)
