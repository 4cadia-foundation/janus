import { createDecorator } from './helpers'

function withLoading (fn) {
  return async function withLoadingWrapper (...args) {
    const loader = this.$loading.show({
      container: this.fullPage ? null : this.$refs.formContainer
    })

    try {
      return await fn.apply(this, args)
    } catch (err) {
      throw err
    } finally {
      loader.hide()
    }
  }
}

export default createDecorator(withLoading)
