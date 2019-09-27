import { createDecorator } from './helpers'

function withLoading (method) {
  return async function withLoadingWrapper (...args) {
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
